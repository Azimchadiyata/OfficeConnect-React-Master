import React from "react";
import { Controller } from "react-hook-form";

import Select from "react-select";
const DropDownSelector = ({
  control,
  data,
  name,
  errors,
  labelname,
  optionLabel,
  optionValue,
  form,
  dropdesign,
  defaultValue,
}) => {
  //   <div className="w-full ">
  //   <DropDownSelector
  //     data={moduleData}
  //     control={control}
  //     labelname="module name"
  //     name="moduleId"
  //     optionLabel="moduleName"
  //     errors={errors.moduleId?.message}
  //   />
  // </div>

  const data1 = () => {
    const datafilter = data.map((item, index) => {
      return {
        value: item[`${optionValue}`],
        label: item[`${optionLabel}`],
      };
    });

    return datafilter;
  };
  data1();
  return (
    <div className="field mt-3 border-round-md  ">
      <span className="p-float-label">
        <Controller
          name={`${name}`}
          control={control}
          render={({ field }) => (
            <Select
              placeholder={`${labelname}`}
              isClearable
              options={data1()}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused
                    ? errors
                      ? "red"
                      : "rgb(214, 214, 214)"
                    : errors
                    ? "red"
                    : "rgb(214, 214, 214)",

                  padding: state.isFocused ? "5px" : "4px",
                }),
              }}
              value={
                field.value
                  ? data1().find((x) => x.value === field.value)
                  : field.value
              }
              onChange={(option) =>
                field.onChange(option ? option.value : option)
              }
            />
          )}
        />
      </span>

      {errors && <small className="p-error"> {errors}</small>}
    </div>
  );
};

export default DropDownSelector;
