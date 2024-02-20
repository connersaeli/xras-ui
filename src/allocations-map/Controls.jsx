import RadioGroup from "./RadioGroup";
import style from "./Controls.module.scss";

export default function Controls({
  creditType,
  organizationType,
  setCreditType,
  setOrganizationType,
}) {
  return (
    <div className={style.controls}>
      <h2>ACCESS Allocations</h2>
      <RadioGroup
        choices={[
          ["allocated", "Allocations"],
          ["exchanged", "Exchanges"],
          ["used", "Usage"],
        ]}
        label="Credit Type"
        value={creditType}
        setValue={setCreditType}
      />
      <RadioGroup
        choices={[
          ["user", "By Research Institution"],
          ["rp", "By Resource Provider"],
        ]}
        disabledValues={creditType === "allocated" ? ["rp"] : []}
        label="Organization Type"
        value={organizationType}
        setValue={setOrganizationType}
      />
    </div>
  );
}
