import { useEffect, useState } from "react";

const noop = (value) => value;

export default function BlurInput({
  classes,
  clean = noop,
  format = noop,
  label,
  setValue,
  style,
  value,
}) {
  const formattedValue = format(value);
  const [text, setText] = useState(formattedValue);

  useEffect(() => {
    setText(formattedValue);
  }, [formattedValue]);

  return (
    <input
      type="text"
      aria-label={label}
      className={`form-control ${classes}`}
      value={text}
      style={style}
      onChange={(e) => setText(e.target.value)}
      onBlur={(e) => {
        const cleaned = clean(e.target.value);
        setText(format(cleaned));
        setValue(cleaned);
      }}
      onKeyDown={(e) => {
        if (e.code == "Enter") {
          e.preventDefault();
          e.target.blur();
        }
      }}
    />
  );
}
