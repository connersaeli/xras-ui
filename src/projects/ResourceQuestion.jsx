import { useId } from "react";
import { useRequest } from "./helpers/hooks";

export default function ResourcesQuestion({
  question,
  requestId,
  grantNumber,
}) {
  const { request, setResourceQuestionValues } = useRequest(
    requestId,
    grantNumber
  );
  const id = useId();

  if (!question || !request || request.error) return;

  const { attributeSetId, attributes, fieldType, label, resourceId, values } =
    question;
  const first = attributes[0];
  const requiredClass = first.required ? "required" : "";

  const singleChange = (e) =>
    setResourceQuestionValues(
      resourceId,
      attributeSetId,
      e.target.value ? [e.target.value] : []
    );

  const multiChange = (e) => {
    setResourceQuestionValues(
      resourceId,
      attributeSetId,
      Array.from(e.target.options)
        .filter(({ selected }) => selected)
        .map(({ value }) => parseInt(value, 10))
    );
  };

  const checkChange = (e) => {
    const attrId = parseInt(e.target.value, 10);
    const newValues = e.target.checked
      ? [...values, attrId]
      : values.filter((value) => value != attrId);
    setResourceQuestionValues(resourceId, attributeSetId, newValues);
  };

  const intChange = (e) => {
    const intValue = parseInt(e.target.value);
    setResourceQuestionValues(
      resourceId,
      attributeSetId,
      isNaN(intValue) ? [] : [intValue]
    );
  };

  let field;

  if (["calendar", "integer_only", "text"].includes(fieldType)) {
    const inputType = {
      calendar: "date",
      integer_only: "number",
      text: "text",
    }[fieldType];
    field = (
      <input
        className="form-control"
        id={id}
        type={inputType}
        placeholder={first.label}
        required={first.required}
        value={values[0] || ""}
        onChange={fieldType == "integer_only" ? intChange : singleChange}
      />
    );
  } else if (fieldType == "textarea") {
    field = (
      <textarea
        className="form-control"
        id={id}
        placeholder={first.label}
        required={first.required}
        value={values[0] || ""}
        onChange={singleChange}
      />
    );
  } else if (fieldType == "drop_down" || attributes.length >= 10) {
    const isMulti = fieldType == "multi_sel";
    field = (
      <select
        id={id}
        className="form-select"
        required={first.required}
        multiple={isMulti}
        onChange={isMulti ? multiChange : intChange}
        value={isMulti ? values : values[0] || ""}
      >
        {isMulti ? null : <option></option>}
        {attributes.map((attr) => (
          <option
            key={attr.resourceAttributeId}
            value={attr.resourceAttributeId}
          >
            {attr.label}
          </option>
        ))}
      </select>
    );
  } else {
    field = (
      <div id={id}>
        {attributes.map((attr) => {
          const raId = `resource-attribute-${attr.resourceAttributeId}`;
          return (
            <div className="form-check" key={attr.resourceAttributeId}>
              <input
                className="form-check-input"
                type={fieldType == "single_sel" ? "radio" : "checkbox"}
                id={raId}
                value={attr.resourceAttributeId}
                checked={values.includes(attr.resourceAttributeId)}
                onChange={fieldType == "single_sel" ? intChange : checkChange}
              />
              <label className="form-check-label" htmlFor={raId}>
                {attr.label}
              </label>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className={`form-label ${requiredClass}`}>
        {label}
      </label>
      {field}
    </div>
  );
}
