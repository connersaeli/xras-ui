export const updatePublication = (data) => ({
  type: 'UPDATE_PUBLICATION',
  payload: data
});

export const updateField = (data) => ({
  type: 'UPDATE_FIELD',
  payload: data
});

export const changePubType = (data) => ({
  type: 'CHANGE_PUB_TYPE',
  payload: data
});

export const setPublication = (data) => ({
  type: 'SET_PUBLICATION',
  payload: data
});

export const addAuthor = () => ({
  type: 'ADD_AUTHOR'
});

export const updateAuthor = (data) => ({
  type: 'UPDATE_AUTHOR',
  payload: data
});

export const toggleProject = (data) => ({
  type: 'TOGGLE_REQUEST',
  payload: data
});

export const updateErrors = (data) => ({
  type: 'UPDATE_ERRORS',
  payload: data
});

export const hideError = (data) => ({
  type: 'HIDE_ERROR',
  payload: data
});

export const updateSelectedTags = (data) => ({
  type: 'UPDATE_SELECTED_TAGS',
  payload: data
});

export const deleteAuthor = (data) => ({
  type: 'DELETE_AUTHOR',
  payload: data
});

export const setDefaults = (data) => ({
  type: 'SET_DEFAULTS',
  payload: data
});

export const dataLoaded = (data) => ({
  type: 'DATA_LOADED',
  payload: data
});

export const updateShowSaved = (data) => ({
  type: 'UPDATE_SHOW_SAVED',
  payload: data
});

export const resetState = () => ({
  type: 'RESET_STATE'
});

export const updateSaving = (data) => ({
  type: 'UPDATE_SAVING',
  payload: data
});

export const setFormValid = (data) => ({
  type: 'SET_FORM_VALID',
  payload: data
});

export const setGrantNumber = (data) => ({
  type: 'SET_GRANT_NUMBER',
  payload: data
});

export const addProject = (data) => ({
  type: 'ADD_PROJECT',
  payload: data
})