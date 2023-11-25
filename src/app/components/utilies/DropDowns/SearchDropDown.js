import React, { useState } from "react";

import Select from "react-select";

const SearchDropDown = ({
  data,
  labelname,
  optionLabel,
  optionValue,
  DropDownvalue,
  setDropDownvalue,
}) => {
  const [selectedOption, setSelectedOption] = useState("none");
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

  const handleTypeSelect = (e) => {
    setSelectedOption(e.value);
  };
  return (
    <div className="field mt-3 border-round-md  ">
      <span className="p-float-label">
        <Select
          options={data1()}
          onChange={handleTypeSelect}
          placeholder={`${labelname}`}
          value={data1().filter(function (option) {
            return option.value === selectedOption;
          })}
          label="Single select"
        />
      </span>
    </div>
  );
};

export default SearchDropDown;
