import React from "react";
import { Controller } from "react-hook-form";

import Select from "react-select";
const DropDownNumbers = ({
  control,
  data,
  name,
  errors,
  labelname,
  totalcount,
  startNumber,
  optionLabel,
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
    const datafilter = [...Array(totalcount)].map((item, index) => {
      return {
        value: startNumber + index,
        label: startNumber + index,
      };
    });

    return datafilter;
  };
  data1();
  return (
    <div className="field mt-3 border-round-md  ">
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
                border: state.isFocused
                  ? "soild 2px rgb(214, 214, 214)"
                  : "soild 2px rgb(214, 214, 214)",

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

      {errors && <small className="p-error"> {errors}</small>}
    </div>
  );
};

export default DropDownNumbers;
