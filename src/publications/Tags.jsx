import { useRef } from "react";
import { updateSelectedTags } from "./helpers/actions";
import { connect } from "react-redux";
import Select from "react-select";
import { getPublicationTags } from "./helpers/selectors";

const Tags = ({ category, publication_tags, updateSelectedTags, index }) => {
  const ref = useRef(null);

  const defaultSelected = () => {
    const selected = publication_tags.filter(
      (pt) => pt.label == category.label
    )[0];
    if (selected) {
      return selected.options;
    }

    return [];
  };

  const updateTags = (tags) => {
    updateSelectedTags({ category: category.label, tags: tags });
  };

  return (
    <>
      <div className={"fw-bold mb-1"}>{category.label}</div>
      <div className={"mb-3"}>
        <Select
          classNames={{
            control: (state) =>
              state.isFocused ? "custom-select-selected" : "border-grey-300",
          }}
          defaultValue={defaultSelected()}
          options={category.options}
          isMulti
          openMenuOnClick={true}
          name={`tags_${index}`}
          inputId={`tags_${index}`}
          ref={ref}
          closeMenuOnSelect={false}
          onChange={updateTags}
        />
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateSelectedTags: (data) => dispatch(updateSelectedTags(data)),
});

const mapStateToProps = (state) => ({
  publication_tags: getPublicationTags(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
