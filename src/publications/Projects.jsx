import { connect } from "react-redux";
import { getProjects } from "./helpers/selectors";
import { toggleProject } from "./helpers/actions";

const Projects = ({ projects, toggleProject }) => {
  const projectClass = (project) => {
    return `list-group-item list-group-item-action clickable ${
      project.selected ? "list-group-item-success" : ""
    }`;
  };

  const projectsSelected = () => {
    return projects.filter((p) => p.selected).length > 0;
  };

  return (
    <div className={"row"}>
      <div className={"col"}>
        {projectsSelected() ? (
          ""
        ) : (
          <div className="alert alert-danger">
            You must select at least one project
          </div>
        )}

        <div className={"list-group"}>
          {projects.map((p, idx) => (
            <div
              key={`project_${p.grant_number}`}
              className={projectClass(p)}
              onClick={() => toggleProject(idx)}
            >
              {p.grant_number}: {p.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  projects: getProjects(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggleProject: (data) => dispatch(toggleProject(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
