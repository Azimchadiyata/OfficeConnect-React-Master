import React from "react";
import { InputNumber } from "primereact/inputnumber";
import { Controller } from "react-hook-form";
import { classNames } from "primereact/utils";

const NumberInput = ({ name, labelname, control, errors, errorsName }) => {
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  //   <div className="col-lg-6">
  //   <NumberInput
  //     control={control}
  //     name="utilized"
  //     errors={errors}
  //     labelname="utilized hours"
  //     errorsName={errors.utilized}
  //   />
  // </div>
  return (
    <div className="field mt-3 imagemarigin ">
      <span className="p-float-label">
        <Controller
          name={`${name}`}
          control={control}
          render={({ field, fieldState }) => (
            <InputNumber
              inputId={field.name}
              value=" "
              onValueChange={(e) => field.onChange(e.value)}
              mode="decimal"
              autoComplete="off"
              useGrouping={false}
              className={classNames({
                "p-invalid": fieldState.invalid,
              })}
            />
          )}
        />

        <label
          htmlFor={`${name}`}
          className={`capitalize   ${classNames({
            "p-error": errorsName,
          })}`}
        >
          {labelname}
        </label>
      </span>
      {getFormErrorMessage({ name })}
    </div>
  );
};

export default NumberInput;
