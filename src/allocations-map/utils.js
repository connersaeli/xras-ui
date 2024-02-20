import { organizationTypes } from './config';

const mapDataCache = {};

export function formatNumber(value, sigFigs=3) {
  let power = 0;
  while (value / Math.pow(1000, power) > 1000) power += 1;

  const digits = value.toString().length;
  const  roundFactor = Math.pow(10, digits - sigFigs);
  return (
    Math.round(value / roundFactor) * roundFactor / Math.pow(1000, power)
  ).toString() + ["", "K", "M", "B", "T"][power];
}

export async function getBasemapStyle() {
  const esriBaseUrl = "https://basemaps-api.arcgis.com/arcgis/rest/services";
  const basemap = "ArcGIS:Community";
  const token = "AAPK220079f462f24fda89c27fa210c3f887EJPCECuukKD8PnCIBqktgGTKZWPlVXWjRoSsZYGkOJ12QemGItZ4liRZkcUzYyme";
  const response = await fetch(
    `${esriBaseUrl}/styles/${basemap}?type=style&token=${token}`
  );
  return await response.json();
}

export async function getMapData(datasetName) {
  if (mapDataCache[datasetName]) return mapDataCache[datasetName];

  const loc = document.location;
  const baseUrl = `${loc.protocol}//${loc.host}${loc.pathname}`;
  const response = await fetch(`${baseUrl}/${datasetName}`);
  const json = await response.json();
  mapDataCache[datasetName] = json;
  return json;
}

export function getCreditLevels(geoJSON) {
  const lineValues = [...geoJSON.creditLines.features.map(line => line.properties.credits)];
  const pointValues = [
    ...geoJSON.rpPoints.features.map(point => point.properties.rpCredits),
    ...geoJSON.userPoints.features.map(point => point.properties.userCredits)
  ];
  return {
    lines: makeLevels(lineValues),
    points: makeLevels(pointValues),
  };
};

export function getStyle({activeOrg, basemapStyle, creditLevels, creditType, geoJSON, organizationType}) {
  const sources = {};
  const layers = [];

  if (geoJSON && creditLevels) {
    const oppOrganizationType = (organizationType === "user") ? "rp" : "user";
    const data = geoJSON[`${organizationType}Points`];
    const oppData = geoJSON[`${oppOrganizationType}Points`];
    const attr = `${organizationType}Credits`;
    const oppAttr = `${oppOrganizationType}Credits`;
    sources["organizations"] = {
      type: "geojson",
      data,
    };
    const colorLevels = {user: [], rp: []};
    const radiusLevels = [];
    creditLevels.points.forEach((level, i) => {
      Object.keys(organizationTypes).forEach((orgType) => {
        colorLevels[orgType].push(level[1], organizationTypes[orgType].colors[i]);
      });
      radiusLevels.push(level[1], 5 * (i + 1));
    });
    const widthLevels = [];
    creditLevels.lines.forEach((level, i) => {
      widthLevels.push(level[1], 1 * (i + 1));
    });
    layers.push({
      id: "organizations",
      type: "circle",
      source: "organizations",
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["get", attr], ...radiusLevels],
        "circle-color": ["interpolate", ["linear"], ["get", attr], ...colorLevels[organizationType]],
        "circle-opacity": activeOrg ? ["match", ["id"], activeOrg.id, 1, 0.3] : 1,
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 1
      }
    });

    if (activeOrg && creditType !== "allocated") {
      sources["opp"] = {
        type: "geojson",
        data: oppData,
      };
      const oppValueExp = ["get", activeOrg.id.toString(), ["get", `${oppAttr}Map`]];
      layers.push({
        id: "opp",
        type: "circle",
        source: "opp",
        filter: ["has", activeOrg.id.toString(), ["get", `${oppAttr}Map`]],
        paint: {
          "circle-radius": ["interpolate", ["linear"], oppValueExp, ...radiusLevels],
          "circle-color": ["interpolate", ["linear"], oppValueExp, ...colorLevels[oppOrganizationType]],
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 1
        }
      });

      sources["credits"] = {
        type: "geojson",
        data: geoJSON.creditLines
      };
      layers.push({
        id: "credits",
        type: "line",
        source: "credits",
        filter: ["==", ["get", `${organizationType}_organization_id`], activeOrg.id],
        paint: {
          "line-color": "#444444",
          "line-opacity": 0.4,
          "line-width": ["interpolate", ["linear"], ["get", "credits"], ...widthLevels]
        }
      });
    }
  }

  const baseStyle = basemapStyle || {
    version: 8,
    sources: {},
    layers: []
  };

  return {
    ...baseStyle,
    sources: {
      ...baseStyle.sources,
      ...sources
    },
    layers: [
      ...baseStyle.layers.filter((layer) => layer.id !== "Marine waterbody/label/2x large"),
      ...layers
    ]
  };
}

function makeArc(x1, y1, x2, y2, segments=20) {
  return [...Array(segments + 1).keys()]
    .map((val) => val/segments)
    .map((pct) => {
      let x = pct * (x2 - x1) + x1;
      let y = pct * (y2 - y1) + y1 + Math.abs(Math.sin(pct * Math.PI) * (x2 - x1) * 0.1);
      return [x, y];
    });
}

export function makeCreditsGeoJSON(organizations, credits, creditType) {
  const orgMap = {};
  organizations.features.forEach(
    (feature) => (
      orgMap[feature.id] = {
        type: feature.type,
        geometry: feature.geometry,
        id: feature.id,
        properties: {
          name: feature.properties.name,
          abbr: feature.properties.abbr,
          userCredits: 0,
          userCreditsMap: {},
          rpCredits: 0,
          rpCreditsMap: {}
        }
      }
    ), {});

  const creditLines = {
    type: "FeatureCollection",
    features: credits.result
      .filter((row) => orgMap[row.user_organization_id] !== undefined
        && (creditType === "allocated" || orgMap[row.rp_organization_id] !== undefined))
      .map((row) => {
        const userOrg = orgMap[row.user_organization_id];
        const rpOrg = orgMap[row.rp_organization_id];
        userOrg.properties.userCredits += row.credits;
        if (rpOrg) rpOrg.properties.rpCredits += row.credits;

        userOrg.properties.userCreditsMap[row.rp_organization_id] =
          (userOrg.properties.userCreditsMap[row.rp_organization_id] || 0) + row.credits;
        if (rpOrg) rpOrg.properties.rpCreditsMap[row.user_organization_id] =
          (rpOrg.properties.rpCreditsMap[row.user_organization_id] || 0) + row.credits;

        if (creditType !== "allocated") return {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: makeArc(
              ...orgMap[row.user_organization_id].geometry.coordinates,
              ...orgMap[row.rp_organization_id].geometry.coordinates
            )
          },
          properties: row
        };
      }).filter((feature) => feature !== undefined)
  };

  return {
    creditLines,
    userPoints: {
      type: "FeatureCollection",
      features: Object.values(orgMap)
        .filter((feature) => feature.properties.userCredits > 0)
        .sort((a, b) => a.properties.userCredits > b.properties.userCredits ? -1 : 1)
    },
    rpPoints: {
      type: "FeatureCollection",
      features: Object.values(orgMap)
        .filter((feature) => feature.properties.rpCredits > 0)
        .sort((a, b) => a.properties.rpCredits > b.properties.rpCredits ? -1 : 1)
    }
  };
}

export function makeLevels(values, quantiles=[0, 0.30, 0.60, 0.90]) {
  return quantiles.map((q, i) => {
    const value = quantile(values, q);
    const suffix = (i === quantiles.length - 1 ? "+" : "");
    return [
      `${formatNumber(Math.round(value))}${suffix}`,
      value
    ];
  });
}

export function quantile(values, q) {
  values.sort((a, b) => a - b);
  const pos = (values.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  return (values[base + 1] !== undefined) ?
    values[base] + rest * (values[base + 1] - values[base]) :
    values[base];
};