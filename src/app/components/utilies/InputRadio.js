import React from "react";
import { RadioButton } from "primereact/radiobutton";

const InputRadio = ({ label, radioid, value, name, data, setData, form }) => {
  return (
    <div className="row">
      <RadioButton
        inputId={radioid}
        name={name}
        value={value}
        form={form}
        onChange={(e) => setData(e.value)}
        checked={data === value}
      />
      <label htmlFor={radioid} className="text-sm px-1">
        {label}
      </label>
    </div>
  );
};

export default InputRadio;
