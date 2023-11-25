import React from "react";
import { Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

const ArrayFIedInput = ({ name, labelname, control, errorsName, form }) => {
  return (
    <div className="field mt-3 ">
      <span className="p-float-label">
        <Controller
          name={`${name}`}
          control={control}
          render={({ field, fieldState }) => (
            <InputText
              id={field.name}
              {...field}
              form={form}
              autoFocus
              autoComplete="off"
              placeholder={`${labelname}`}
              className={classNames({
                "p-invalid p-inputtext-sm block ": fieldState.invalid,
              })}
            />
          )}
        />
        <label
          htmlFor={`${name}`}
          className={`capitalize  ${classNames({ "p-error": errorsName })}`}
        >
          {labelname}
        </label>
      </span>
    </div>
  );
};

export default ArrayFIedInput;
