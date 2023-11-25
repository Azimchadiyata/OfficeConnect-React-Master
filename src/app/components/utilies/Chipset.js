import React from "react";

import { Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Chips } from "primereact/chips";
const Chipset = ({
  placeholdervalue,
  name,
  control,
  errors,
  errorsName,
  form,
}) => {
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <div className="field  ">
      <span className="">
        <Controller
          name={`${name}`}
          control={control}
          rules={{ required: "At least one chip is required." }}
          render={({ field, fieldState }) => (
            <Chips
              id={field.name}
              name="chipArray"
              form={form}
              autoComplete="off"
              value={field.value}
              onChange={(e) => field.onChange(e.value)}
              className={classNames({ "p-invalid": fieldState.error })}
            />
          )}
        />
      </span>
      {getFormErrorMessage(name)}
    </div>
  );
};

export default Chipset;
