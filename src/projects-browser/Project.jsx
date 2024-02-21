import style from "./Project.module.scss";

const Project = ({ project }) => {
  const resources = project.resources;

  const formatNumber = (resource) => {
    if (resource.units == "[Yes = 1, No = 0]") {
      return resource.allocation == "1.0" ? "Yes" : "No";
    } else {
      const allocation = parseInt(resource.allocation)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      let units = resource.units;
      if (units == "ACCESS Credits") {
        units = (
          <span
            className="tooltip-underline"
            title="universal currency that can be exchanged for resource units"
          >
            ACCESS Credits
          </span>
        );
      }
      return (
        <>
          {allocation}&nbsp;{units}
        </>
      );
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white rounded-0">
        <span className="fw-bold">{project.title}</span> <br />
        <span className="fst-italic">
          {project.pi} <small> ({project.pi_institution}) </small>
        </span>
      </div>
      <div className="card-body">
        <div className="row fw-bold border-bottom">
          <div className="col">
            <h5 className="mb-1 pb-0">Field of Science</h5>
          </div>
          <div className="col">
            <h5
              className="mb-1 pb-0 tooltip-underline"
              title='A specific level of allocation; also referred to as "Opportunity"'
            >
              Project Type
            </h5>
          </div>
          <div className="col">
            <h5 className="mb-1 pb-0">Dates</h5>
          </div>
        </div>

        <div className="row">
          <div className="col">{project.primary_fos}</div>
          <div className="col">{project.allocation_type}</div>
          <div className="col">
            {project.start_date} to {project.end_date}
          </div>
        </div>

        <div className="accordion accordion-flush mt-3 mb-1">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#resources_${project.project_id}`}
                aria-expanded="false"
                aria-controls={`resources_${project.project_id}`}
              >
                Resources
              </button>
            </h2>
            <div
              id={`resources_${project.project_id}`}
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                <table className="table table-striped table-bordered mt-2 mb-0">
                  <thead>
                    <tr>
                      <td>
                        <h5 className="m-0 p-0">Resource</h5>
                      </td>
                      <td>
                        <h5 className="m-0 p-0 d-inline">Allocation</h5>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map((r, i) => (
                      <tr key={`resource_${project.project_id}_${i}`}>
                        <td>{r.resource_name}</td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {formatNumber(r)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#abstract_${project.project_id}`}
                aria-expanded="false"
                aria-controls={`abstract_${project.project_id}`}
              >
                Abstract
              </button>
            </h2>
            <div
              id={`abstract_${project.project_id}`}
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                <div className={style.abstract}>{project.abstract}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
