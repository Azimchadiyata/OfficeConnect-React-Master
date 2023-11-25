import React from "react";
import { Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

const SmallInputNormal = ({
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

  //   <SmallInputNormal
  //                   control={control}
  //                   name="Company"
  //                   errors={errors}
  //                   labelname="File Name"
  //                   className="inputfieldspace"
  //                   errorsName={errors.Company}
  //                 />

  return (
    <div className="field  ">
      <span className="">
        <Controller
          name={`${name}`}
          control={control}
          render={({ field, fieldState }) => (
            <InputText
              id={field.name}
              {...field}
              form={form}
              autoFocus
              defaultValue={placeholdervalue}
              placeholder={`${placeholdervalue}`}
              className={`inputfieldspace ${classNames({
                "p-invalid p-inputtext-xs": fieldState.invalid,
              })}`}
            />
          )}
        />
        <label
          htmlFor={`${name}`}
          className={`capitalize  ${classNames({ "p-error": errorsName })}`}
        ></label>
      </span>
      {getFormErrorMessage(name)}
    </div>
  );
};

export default SmallInputNormal;
