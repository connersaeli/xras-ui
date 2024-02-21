import { useEffect, useState } from "react";

import Overlay from "react-bootstrap/Overlay";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function InfoTip({
  bg = "dark",
  children,
  color = "light",
  fontWeight = "bold",
  icon = "info-circle-fill",
  initial = false,
  maxWidth = "200px",
  padding = "10px",
  placement,
  target,
  trigger = "click",
  visible = true,
}) {
  const hasKey = typeof initial == "string" || initial instanceof String;
  const [show, setShow] = useState(
    hasKey ? localStorage.getItem(initial) != "true" : initial
  );
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Hack to allow time for target to be rendered so that the tooltip is
    // positioned correctly.
    setTimeout(() => setReady(true), 100);
  }, []);

  const recordToggle = () => {
    if (hasKey) localStorage.setItem(initial, "true");
  };
  const overlay = (
    <Tooltip
      style={{
        "--bs-tooltip-bg": `var(--bs-${bg})`,
        "--bs-tooltip-color": `var(--bs-${color})`,
        "--bs-tooltip-max-width": maxWidth,
        "--bs-tooltip-padding-x": padding,
        "--bs-tooltip-padding-y": padding,
        fontWeight,
      }}
    >
      <button
        aria-label="Close"
        onClick={() => {
          recordToggle();
          setShow(false);
        }}
        style={{
          background: "transparent",
          border: "0 none transparent",
          float: "right",
        }}
      >
        <i className="bi bi-x-lg" />
      </button>
      {children}
    </Tooltip>
  );

  if (target && target.current)
    return (
      <Overlay
        target={target.current}
        placement={placement}
        show={show && visible && ready}
      >
        {overlay}
      </Overlay>
    );

  return (
    <OverlayTrigger
      placement={placement}
      onToggle={(show) => {
        recordToggle();
        setShow(show);
      }}
      overlay={overlay}
      show={show && visible && ready}
      trigger={trigger}
    >
      <button
        className="btn bnt-clear border-0"
        style={{ backgroundColor: "transparent" }}
      >
        <i className={`bi bi-${icon}`} />
      </button>
    </OverlayTrigger>
  );
}
