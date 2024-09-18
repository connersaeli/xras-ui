import { useSelector } from "react-redux";
import { selectResources } from "./helpers/catalogSlice";
import Resource from "./Resource";
import FilterBar from "./FilterBar";

const ResourceList = () => {
  const resources = useSelector(selectResources);

  if (resources.length == 0) {
    return <div className="fw-bold">No Resources Match Your Filters</div>;
  }

  return (
    <div className="card shadow">
      <div className="card-body">
        <FilterBar />
        {resources.map((r) => (
          <Resource resource={r} key={r.resourceId} />
        ))}
      </div>
    </div>
  );
};

export default ResourceList;
