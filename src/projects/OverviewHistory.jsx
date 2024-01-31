import { useRequest } from "./helpers/hooks";

import ActionTitle from "./ActionTitle";
import Grid from "../shared/Grid";
import StatusBadge from "../shared/StatusBadge";

export default function OverviewHistory({ requestId, grantNumber }) {
  const { request, toggleDeleteModal } = useRequest(requestId, grantNumber);
  if (!request) return;

  const columns = [
    {
      key: "type",
      name: "Action Details",
      format: (value, row) => (
        <ActionTitle
          action={row}
          request={request}
          toggleDeleteModal={toggleDeleteModal}
        />
      ),
    },
    {
      key: "status",
      name: "Status",
      format: (value) => <StatusBadge status={value} />,
    },
  ];

  if (request.actions && request.actions.length)
    return <Grid rows={request.actions} columns={columns} />;
}
