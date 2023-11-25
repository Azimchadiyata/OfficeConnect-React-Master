import React from "react";

import { classNames } from "primereact/utils";
import { Controller } from "react-hook-form";
import { InputTextarea } from "primereact/inputtextarea";

const TextareaInput = ({
  name,
  labelname,
  control,
  errors,
  errorsName,
  cols,
  form,
  row,
}) => {
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  //   <TextareaInput
  //   control={control}
  //   name="empremarks"
  //   errors={errors}
  //   cols="2"
  //   row="3"
  //   labelname="empremarks hours"
  //   errorsName={errors.empremarks}
  // />

  return (
    <div className="field mt-3">
      <span className="p-float-label">
        <Controller
          name={`${name}`}
          control={control}
          render={({ field, fieldState }) => (
            <InputTextarea
              id={field.name}
              {...field}
              cols={cols}
              rows={row}
              form={form}
              placeholder={`${labelname}`}
              className={classNames({
                "p-invalid": fieldState.invalid,
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

export default React.memo(TextareaInput);
