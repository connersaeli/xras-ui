import { formatNumber } from "./utils";
import legendStyle from "./Legend.module.scss";
import style from "./OrgInfo.module.scss";

function formatOrgs(orgs, orgType, label) {
  orgs.sort((a, b) => b[1] - a[1]);
  const displayNames = orgs.slice(0, 3).map((org) => org[0]);
  if (orgs.length > 3) displayNames[2] = `${orgs.length - 2} other ${label}s`;
  return displayNames.reduce(
    (acc, name, i, names) => [
      acc,
      <span className={`name ${style[orgType]}`} key={name}>
        {name}
      </span>,
      ["", " and ", ", "][names.length - i - 1],
    ],
    []
  );
}

export default function OrgInfo({
  activeOrg,
  creditType,
  organizationMap,
  organizationType,
}) {
  if (!activeOrg || !organizationMap) return;
  const props = activeOrg.properties;
  const credits = props[`${organizationType}Credits`];
  const oppOrganizationType = organizationType === "rp" ? "user" : "rp";
  const creditsMap = JSON.parse(props[`${organizationType}CreditsMap`]);
  const orgs = {
    user: [],
    rp: [],
  };

  orgs[organizationType].push([props.name, credits]);
  Object.keys(creditsMap).forEach((orgId) =>
    orgs[oppOrganizationType].push([organizationMap[orgId], creditsMap[orgId]])
  );

  return (
    <div className={`${legendStyle.legend} ${style.info}`}>
      <p className={style[organizationType]}>
        Researchers at {formatOrgs(orgs.user, "user", "research institution")}{" "}
        {creditType === "allocated" ? "were " : ""}
        {creditType}{" "}
        <span className={style.credits}>
          {formatNumber(credits)} ACCESS Credits
        </span>
        {creditType !== "allocated" ? (
          <>
            {" "}
            {creditType === "exchanged" ? "for" : "on"} resources at{" "}
            {formatOrgs(orgs.rp, "rp", "resource provider")}
          </>
        ) : (
          ""
        )}
        .
      </p>
    </div>
  );
}
