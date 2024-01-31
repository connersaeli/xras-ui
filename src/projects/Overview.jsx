import { useProject, useRequest } from "./helpers/hooks";

import OverviewHistory from "./OverviewHistory";
import OverviewResources from "./OverviewResources";
import OverviewUsers from "./OverviewUsers";

export default function Overview({ requestId, grantNumber }) {
  const { request } = useRequest(requestId, grantNumber);
  const { project, username } = useProject(grantNumber || request.grantNumber);

  if (!request || !project || request.error || project.error) return;

  if (request)
    return (
      <div className="overview">
        <OverviewResources requestId={requestId} grantNumber={grantNumber} />
        {project.isManager ? (
          <div className="row">
            <div className="col-lg-6">
              <OverviewUsers requestId={requestId} grantNumber={grantNumber} />
            </div>
            <div className="col-lg-6">
              <OverviewHistory requestId={requestId} />
            </div>
          </div>
        ) : null}
      </div>
    );
}
