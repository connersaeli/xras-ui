import { useEffect, useId, useRef } from "react";

export const MultiStateCheckbox = ({
  description,
  disabled = false,
  onChange,
  selectedLength,
  totalLength,
}) => {
  const checkbox = useRef();
  const id = useId();

  let checked = selectedLength == totalLength;
  let indeterminate = selectedLength > 0 && !checked;

  useEffect(() => {
    if (checkbox.current) {
      checkbox.current.checked = checked;
      checkbox.current.indeterminate = indeterminate;
    }
  }, [checked, indeterminate]);

  return (
    <>
      <input
        className="custom-checkbox form-check-input"
        disabled={disabled}
        id={id}
        onChange={(e) => onChange(e.target.checked)}
        ref={checkbox}
        type="checkbox"
      />
      <label
        className="form-check-label"
        htmlFor={id}
        aria-description={`${checked ? "Deselect" : "Select"} ${description}`}
      ></label>
    </>
  );
};

export default MultiStateCheckbox;
