import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getResources,
  selecthasErrors,
  selectResourcesLoaded,
} from "./helpers/catalogSlice";
import ResourceList from "./ResourceList";
import Filters from "./Filters";
import LoadingSpinner from "../shared/LoadingSpinner";

const ResourceCatalog = ({
  apiUrl,
  excludedCategories = [],
  excludedFilters = [],
  allowedCategories = [],
  allowedFilters = [],
}) => {
  const dispatch = useDispatch();
  const resourcesLoaded = useSelector(selectResourcesLoaded);
  const hasErrors = useSelector(selecthasErrors);

  useEffect(() => {
    dispatch(
      getResources({
        apiUrl,
        excludedCategories,
        excludedFilters,
        allowedCategories,
        allowedFilters,
      })
    );
  }, []);

  if (hasErrors) {
    return (
      <div className="row">
        <div className="col text-center mt-2">
          <h4>Unable to Load Resources</h4>
        </div>
      </div>
    );
  }

  if (!resourcesLoaded) return <LoadingSpinner />;

  return (
    <>
      <div className="row mt-3">
        <div className="col-sm-4">
          <Filters />
        </div>
        <div className="col-sm-8">
          <ResourceList />
        </div>
      </div>
    </>
  );
};

export default ResourceCatalog;
