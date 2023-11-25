import React from "react";
import { Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

const AddressInput = ({
  name,
  labelname,
  control,
  errors,
  errorsName,
  form,
  placeholder,
}) => {
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <div className="field mt-3 ">
      <label
        htmlFor={`${name}`}
        className={`capitalize  ${classNames({ "p-error": errorsName })}`}
      >
        {labelname}
      </label>
      <span>
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
              placeholder={`${placeholder}`}
              className={classNames({
                "p-invalid p-inputtext-sm block ": fieldState.invalid,
              })}
            />
          )}
        />
      </span>
      {getFormErrorMessage(name)}
    </div>
  );
};

export default AddressInput;
