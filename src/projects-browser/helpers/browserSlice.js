import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

export const getProjects = createAsyncThunk(
  "projectBrowser/getProjects",
  async (args, { getState }) => {
    const state = getState().projectBrowser;

    const filters = state.filters;
    const typeLists = state.typeLists;
    const fosList = typeLists.fosTypes.filter((fos) => fos.checked);
    let url = `/current-projects.json?page=${state.pageData.current_page}`;

    if (fosList.length != typeLists.fosTypes.length) {
      url += `&fos=${fosList.map((fos) => fos.fos_type_id)}`;
    }

    if (filters.org != "") {
      url += `&org=${filters.org}`;
    }

    if (filters.allocationType != "") {
      url += `&allocation_type=${filters.allocationType}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

export const browserSlice = createSlice({
  name: "projectBrowser",
  initialState,
  reducers: {
    resetFilters: (state) => {
      state.filters = {
        org: "",
        allocationType: "",
        allFosToggled: false,
      };

      browserSlice.caseReducers.toggleAllFos(state);
    },
    setShowPagination: (state, { payload }) => {
      state.showPagination = payload;
    },
    toggleAllFos: (state) => {
      state.typeLists.fosTypes.forEach(
        (fos) => (fos.checked = !state.filters.allFosToggled)
      );
      state.filters.allFosToggled = !state.filters.allFosToggled;
    },
    toggleFos: (state, { payload }) => {
      state.typeLists.fosTypes.forEach((fos) => {
        if (fos.fos_type_id == payload.fos_type_id) {
          fos.checked = !fos.checked;
        }
      });

      if (
        state.typeLists.fosTypes.filter((f) => f.checked).length !=
        state.typeLists.fosTypes.length
      ) {
        state.filters.allFosToggled = false;
      } else {
        state.filters.allFosToggled = true;
      }
    },
    updateFilter: (state, { payload }) => {
      state.filters[payload.name] = payload.value;
    },
    updatePageData: (state, { payload }) => {
      if (payload.current_page) {
        state.pageData.current_page = payload.current_page;
      }

      if (payload.last_page) {
        state.pageData.last_page = payload.last_page;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.projectsLoaded = false;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        const data = action.payload;
        state.projectsLoaded = true;
        state.projects = data.projects;
        if (data.pages != state.pageData.last_page) {
          state.pageData.current_page = 1;
        }
        state.showPagination = true;
        state.pageData.last_page = data.pages;
      })
      .addCase(getProjects.rejected, (state, data) => {
        console.log(data.error);
      });
  },
});

export const {
  resetFilters,
  setShowPagination,
  toggleAllFos,
  toggleFos,
  updateFilter,
  updatePageData,
} = browserSlice.actions;

export const selectFilters = (state) => state.projectBrowser.filters;
export const selectFosTypes = (state) => state.projectBrowser.fosTypes;
export const selectProjectsLoaded = (state) =>
  state.projectBrowser.projectsLoaded;
export const selectPageData = (state) => state.projectBrowser.pageData;
export const selectPages = (state) => state.projectBrowser.selectPages;
export const selectProjects = (state) => state.projectBrowser.projects;
export const selectShowPagination = (state) =>
  state.projectBrowser.showPagination;
export const selectTypeLists = (state) => state.projectBrowser.typeLists;
export default browserSlice.reducer;
