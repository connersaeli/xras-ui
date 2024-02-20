import style from "./RadioGroup.module.scss";

export default function RadioGroup({
  choices,
  disabledValues = [],
  label,
  value,
  setValue,
}) {
  const radios = [];
  choices.forEach(([name, text]) =>
    radios.push(
      <input
        type="radio"
        className="btn-check"
        key={name}
        name={name}
        id={name}
        autoComplete="off"
        checked={value === name}
        onChange={() => setValue(name)}
        disabled={disabledValues.includes(name)}
      />,
      <label
        className={`btn btn-outline-primary ${style.button}`}
        key={`${name}-label`}
        htmlFor={name}
        disabled={disabledValues.includes(name)}
      >
        {value === name ? <i className={`bi bi-check ${style.icon}`} /> : null}{" "}
        {text}
      </label>
    )
  );
  return (
    <div className="mb-2">
      <div
        className={`btn-group ${style.group}`}
        role="group"
        aria-label={label}
      >
        {radios}
      </div>
    </div>
  );
}
