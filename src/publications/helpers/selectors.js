export const getPublication     = state => state.publications_store.publication;
export const getDoi             = state => state.publications_store.publication.doi;
export const getPubTypes        = state => state.publications_store.publication_types;
export const getAuthors         = state => state.publications_store.publication.authors;
export const getTagCategories   = state => state.publications_store.tag_categories;
export const getProjects        = state => state.publications_store.projects;
export const getPublicationTags = state => state.publications_store.publication.tags;
export const getErrors          = state => state.publications_store.errors;
export const getDataLoaded      = state => state.publications_store.data_loaded;
export const getShowSaved       = state => state.publications_store.show_saved;
export const getSaving          = state => state.publications_store.saving;
export const getModal           = state => state.publications_store.modal;
export const getFormValid       = state => state.publications_store.form_valid;

export const getSaveEnabled = (state) => {
  return !getSaving(state) 
    && getDataLoaded(state) 
    && getFormValid(state)
    && getAuthorsExist(state)
    && state.publications_store.projects.filter((p) => p.selected).length > 0
}

export const getAuthorsExist = (state) => {
  const authors = getAuthors(state);
  
  if(authors.length == 0){
    return false
  }

  //Make sure that all of the authors have a non-empty first and last name
  return authors.filter((a) => a.first_name == "" || a.last_name == "").length == 0;
}
