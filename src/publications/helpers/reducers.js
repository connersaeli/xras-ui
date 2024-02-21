import { produce } from "immer";

const randomKey = () => {
  return `${Math.random().toString(36).slice(2)}`;
};

const root = document.querySelector("#publications-react");
const dataset = root ? root.dataset : {};

const DEFAULT_STATE = {
  publication_types: [],
  tag_categories: [],
  publication: {},
  projects: [],
  errors: [],
  selected_tags: {},
  data_loaded: false,
  saving: false,
  show_saved: false,
  redirect: dataset.redirect || false,
  modal: root == null,
  form_valid: false,
  grant_number: "",
};

export const publications_store = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_FIELD": {
      const nextState = produce(state, (draftState) => {
        draftState.publication.fields[payload.index].field_value =
          payload.value;
        return draftState;
      });

      return nextState;
    }

    case "CHANGE_PUB_TYPE": {
      const nextState = produce(state, (draftState) => {
        let newFields = draftState.publication_types.find(
          (pt) => pt.publication_type == payload
        ).fields;

        // If there is data already in the fields, and the publication type they're switching to
        // has the same fields, preserve the data.

        newFields.forEach((nf) => {
          const field = draftState.publication.fields.find(
            (f) => f.csl_field_name == nf.csl_field_name
          );
          if (field) {
            nf.value = field.value;
          }
        });

        draftState.publication.publication_type = payload;
        draftState.publication.fields = newFields;
        return draftState;
      });

      return nextState;
    }

    case "UPDATE_PUBLICATION": {
      return {
        ...state,
        publication: { ...state.publication, [payload.key]: payload.value },
      };
    }

    case "SET_PUBLICATION": {
      const nextState = produce(state, (draftState) => {
        // Prefilling the per PublicationType fields
        draftState.publication.fields.forEach((f) => {
          f.field_value = payload[f.csl_field_name];
        });

        // Prefilling the Publication fields
        Object.keys(draftState.publication).forEach((k) => {
          if (payload[k]) {
            draftState.publication[k] = payload[k];
          }
        });

        draftState.form_valid = payload["title"].trim() == "" ? false : true;

        return draftState;
      });

      return nextState;
    }

    case "ADD_AUTHOR": {
      const blank_author = {
        portal_username: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        prefix: "",
        suffix: "",
        initials: "",
        affiliation: "",
        hash: {},
      };

      const nextState = produce(state, (draftState) => {
        draftState.publication.authors.push(blank_author);
      });

      return nextState;
    }

    case "UPDATE_AUTHOR": {
      const nextState = produce(state, (draftState) => {
        draftState.publication.authors[payload.idx][payload.key] =
          payload.value;
      });

      return nextState;
    }

    case "TOGGLE_TAG": {
      const nextState = produce(state, (draftState) => {
        let tag_category = draftState.tag_categories.find(
          (tc) =>
            tc.publication_tags_category_id ==
            payload.publication_tags_category_id
        );
        tag_category.tags[payload.idx].selected =
          !tag_category.tags[payload.idx].selected;
      });

      return nextState;
    }

    case "TOGGLE_REQUEST": {
      const nextState = produce(state, (draftState) => {
        draftState.projects[payload].selected =
          !draftState.projects[payload].selected;
        return draftState;
      });

      return nextState;
    }

    case "UPDATE_ERRORS": {
      const err = {
        id: randomKey(),
        message: payload,
      };
      return {
        ...state,
        errors: [...state.errors, err],
      };
    }

    case "HIDE_ERROR": {
      const errors = state.errors.filter((e) => e.id != payload);

      return {
        ...state,
        errors: errors,
      };
    }

    case "UPDATE_SELECTED_TAGS": {
      const nextState = produce(state, (draftState) => {
        const new_tags = payload.tags.map((t) => t.value);
        draftState.selected_tags[payload.category] = new_tags;
        return draftState;
      });

      return nextState;
    }

    case "DELETE_AUTHOR": {
      const nextState = produce(state, (draftState) => {
        draftState.publication.authors.splice(payload, 1);
        return draftState;
      });

      return nextState;
    }

    case "DATA_LOADED": {
      const nextState = produce(state, (draftState) => {
        draftState.publication = payload.publication;
        draftState.form_valid =
          payload.publication.title.trim() == "" ? false : true;

        draftState.publication.authors.forEach((a) => {
          if (!a.affiliation) {
            a.affiliation = "";
          }
        });
        draftState.publication_types = payload.publication_types;
        draftState.tag_categories = payload.tag_categories;
        draftState.projects = payload.publication.projects;
        payload.publication.tags.forEach(
          (t) =>
            (draftState.selected_tags[t.label] = t.options.map((o) => o.value))
        );
        draftState.data_loaded = true;
        return draftState;
      });

      return nextState;
    }

    case "UPDATE_SHOW_SAVED": {
      return {
        ...state,
        show_saved: payload,
      };
    }

    case "UPDATE_SAVING": {
      return {
        ...state,
        saving: payload,
      };
    }

    case "RESET_STATE": {
      return DEFAULT_STATE;
    }

    case "SET_FORM_VALID": {
      return {
        ...state,
        form_valid: payload,
      };
    }

    case "SET_GRANT_NUMBER": {
      return {
        ...state,
        grant_number: payload,
      };
    }

    case "ADD_PROJECT": {
      return {
        ...state,
        projects: [...state.projects, payload],
      };
    }

    default:
      return state;
  }
};
