import { formatDate } from "./helpers/utils";
import config from "./helpers/config";

import InlineButton from "../shared/InlineButton";

export default function ActionTitle({ action, request, toggleDeleteModal }) {
  const ops = action.allowedOperations || [];
  const buttons = [];

  if (ops.includes("Edit"))
    buttons.push(
      <InlineButton
        key="edit"
        href={
          action.isRequest
            ? config.routes.edit_request_path(request.requestId)
            : config.routes.edit_request_action_path(
                request.requestId,
                action.actionId
              )
        }
        icon="pencil"
        title="Edit action"
      />
    );

  if (ops.includes("Delete"))
    buttons.push(
      <InlineButton
        key="delete"
        color="danger"
        icon="trash"
        onClick={() => toggleDeleteModal(action.actionId)}
        title="Edit action"
      />
    );

  const actionName = `${action.type}: ${formatDate(action.date)}`;

  return (
    <>
      {action.detailAvailable ? (
        <a
          href={config.routes.request_action_path(
            request.requestId,
            action.actionId
          )}
        >
          {actionName}
        </a>
      ) : (
        actionName
      )}
      {buttons}
    </>
  );
}
