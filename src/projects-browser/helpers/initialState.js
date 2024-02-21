export const initialState = {
  pages: 1,
  projects: [],
  projectsLoaded: false,
  showPagination: false,
  filters: {
    org: "",
    allocationType: "",
    allFosToggled: true,
  },
  pageData: {
    current_page: 1,
    last_page: 1,
  },
  typeLists: {
    orgs: [], // Replaced by data from host element.
    fosTypes: [], // Replaced by data from host element.
    allocationTypes: [], // Replaced by data from host element.
  },
};
