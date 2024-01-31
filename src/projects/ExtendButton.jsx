import { useRequest } from "./helpers/hooks";

export default function ExtendButton({ requestId, grantNumber }) {
  const { request, toggleActionsModal } = useRequest(requestId, grantNumber);
  if (
    !request ||
    !request.allowedActions ||
    !(
      "Extension" in request.allowedActions ||
      "Renewal" in request.allowedActions
    )
  )
    return;

  return (
    <button
      className="btn btn-primary ms-2 text-nowrap"
      onClick={toggleActionsModal}
    >
      Extend End Date
    </button>
  );
}
