import React from "react";

import { Dropdown } from "primereact/dropdown";
import { Controller } from "react-hook-form";
const InputSelector = ({
  control,
  data,
  name,
  errors,
  labelname,
  optionLabel,
  form,
  dropdesign,

  defaultValue,
}) => {
  //     <InputSelector
  //     data={["cl", "el", "comp off"]}
  //     control={control}
  //     labelname="Project"
  //     name="project"
  // optionLabel={option label name}
  //     errors={errors.project?.message}
  //   />

  return (
    <div className="field mt-3 inputmarginwidth ">
      <span className="p-float-label">
        <Controller
          name={`${name}`}
          control={control}
          render={({ field }) => (
            <Dropdown
              id={field.name}
              value={field.value}
              form={form}
              autoComplete="off"
              onChange={(e) => field.onChange(e.value)}
              options={data}
              className={` textcamel  ${dropdesign} ${
                errors ? "border-red-500 " : null
              }`}
              optionLabel={`${optionLabel}`}
            />
          )}
        />
        <label
          htmlFor={`${name}`}
          className={`${errors ? "text-red-500" : null}`}
        >
          {labelname}
        </label>
      </span>
      {errors && <small className="p-error"> {errors}</small>}
    </div>
  );
};

export default InputSelector;
