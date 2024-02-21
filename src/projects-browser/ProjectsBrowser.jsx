import { useEffect } from "react";
import Filters from "./Filters";
import ProjectList from "./ProjectList";
import Pagination from "./Pagination";
import {
  getProjects,
  selectProjectsLoaded,
  selectShowPagination,
} from "./helpers/browserSlice";
import { useDispatch, useSelector } from "react-redux";

import LoadingSpinner from "../shared/LoadingSpinner";

const ProjectsBrowser = () => {
  const dispatch = useDispatch();
  const projectsLoaded = useSelector(selectProjectsLoaded);
  const showPagination = useSelector(selectShowPagination);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3">
          <Filters />
        </div>
        <div className="col-sm-9">
          <div className="row">
            <div className="col">{showPagination ? <Pagination /> : ""}</div>
          </div>

          <div className="row">
            <div className="col">
              {projectsLoaded ? <ProjectList /> : <LoadingSpinner />}
            </div>
          </div>

          <div className="row">
            <div className="col">{showPagination ? <Pagination /> : ""}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsBrowser;
