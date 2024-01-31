import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addResource,
  addUser,
  closeUsageDetailModal,
  deleteAction,
  fetchProjectDetail,
  fetchProjectsList,
  fetchRequestDetail,
  fetchUsageDetail,
  resetResources,
  resetUsers,
  saveResources,
  saveUsers,
  selectError,
  selectProjectDetail,
  selectProjectsList,
  selectProjectListLoading,
  selectRequestDetail,
  selectUsername,
  setRequest,
  setResourceQuestionValues,
  setResourceRequest,
  setResourcesReason,
  setTab,
  setUserRole,
  statuses,
  toggleActionsModal,
  toggleConfirmModal,
  toggleDeleteModal,
  toggleResourcesModal,
  toggleUsersResources,
} from "./apiSlice";

export const useProjectsList = (username) => {
  const error = useSelector(selectError);
  const loading = useSelector(selectProjectListLoading);
  const projects = useSelector(selectProjectsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectsList(username));
  }, []);
  return { error, loading, projects };
};

export const useProject = (grantNumber, skipFetch) => {
  const project = useSelector((state) =>
    selectProjectDetail(state, grantNumber)
  );
  const username = useSelector(selectUsername);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!project && !skipFetch) dispatch(fetchProjectDetail({ grantNumber }));
  }, [skipFetch]);

  return {
    project,
    addUser: (user) => dispatch(addUser({ grantNumber, user })),
    resetUsers: () => dispatch(resetUsers({ grantNumber })),
    saveUsers: () => dispatch(saveUsers({ grantNumber })),
    setRequest: (requestId) => dispatch(setRequest({ grantNumber, requestId })),
    setTab: (tab) => dispatch(setTab({ grantNumber, tab })),
    setUserRole: (username, role) =>
      dispatch(setUserRole({ grantNumber, username, role })),
    statuses,
    toggleUsersResources: (checked, username, resourceId) =>
      dispatch(
        toggleUsersResources({ grantNumber, username, resourceId, checked })
      ),
    username,
  };
};

export const useRequest = (requestId, grantNumber) => {
  const request = useSelector((state) => selectRequestDetail(state, requestId));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!request) dispatch(fetchRequestDetail({ grantNumber, requestId }));
  }, [grantNumber, requestId]);

  return {
    request,
    addResource: (resourceId) =>
      dispatch(addResource({ requestId, resourceId })),
    closeUsageDetailModal: () => dispatch(closeUsageDetailModal({ requestId })),
    deleteAction: (actionId) => dispatch(deleteAction({ actionId, requestId })),
    openUsageDetailModal: (resourceRepositoryKey) =>
      dispatch(
        fetchUsageDetail({
          grantNumber: request.grantNumber,
          requestId,
          resourceRepositoryKey,
        })
      ),
    resetResources: () => dispatch(resetResources({ requestId })),
    saveResources: () => dispatch(saveResources({ requestId })),
    setResourceQuestionValues: (resourceId, attributeSetId, values) =>
      dispatch(
        setResourceQuestionValues({
          requestId,
          resourceId,
          attributeSetId,
          values,
        })
      ),
    setResourceRequest: (resourceId, requested) =>
      dispatch(setResourceRequest({ requestId, resourceId, requested })),
    setResourcesReason: (reason) =>
      dispatch(setResourcesReason({ requestId, reason })),
    statuses,
    toggleActionsModal: () => dispatch(toggleActionsModal({ requestId })),
    toggleConfirmModal: () => dispatch(toggleConfirmModal({ requestId })),
    toggleDeleteModal: (actionId) =>
      dispatch(toggleDeleteModal({ requestId, actionId })),
    toggleResourcesModal: () => dispatch(toggleResourcesModal({ requestId })),
  };
};
