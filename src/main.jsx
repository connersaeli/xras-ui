import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import AllocationsMap from "./allocations-map/AllocationsMap";
import Projects from "./projects/Projects";
import apiSlice from "./projects/helpers/apiSlice";
import projectsConfig from "./projects/helpers/config";

export function allocationsMap({ target }) {
  ReactDOM.createRoot(target).render(<AllocationsMap />);
}

export function projects({ target, username, routes }) {
  // Override the default routes with the ones from Rails.
  if (routes) projectsConfig.routes = routes;
  const projectsStore = configureStore({
    reducer: {
      api: apiSlice,
    },
  });
  ReactDOM.createRoot(target).render(
    <Provider store={projectsStore}>
      <Projects username={username} />
    </Provider>
  );
}
