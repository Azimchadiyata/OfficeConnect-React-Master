import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

const CardSpaceInput = ({
  name,
  placeholder,
  labelname,
  control,
  errors,
  errorsName,
  form,
}) => {
  const [placeholding2, setplaceholding2] = useState(placeholder);
  const [placeholding, setplaceholding] = useState(labelname);
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name]?.message}</small>
    );
  };

  useEffect(() => {
    if (placeholder === undefined) {
      setplaceholding2(placeholding);
    }
  }, [
    placeholding2,
    setplaceholding2,
    placeholding,
    setplaceholding,
    placeholder,
  ]);
  const dataequalto = (value) => {
    return value.replace(/[^a-z0-9]+/gi, "").replace(/(.{4})/g, "$1 ");
  };
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
              value={dataequalto(field.value)}
              autoComplete="off"
              placeholder={`${placeholding2}`}
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
      {getFormErrorMessage(name)}
    </div>
  );
};

export default CardSpaceInput;
