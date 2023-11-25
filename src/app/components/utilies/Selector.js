import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
const Selector = ({
  control,
  name,
  errors,
  labelname,
  errorsName,
  mappingData,
  showingvalue,
  passingvalue,
  selectedkey,
  selectedvalue,
  OnChanged,
  form,
}) => {
  const [dropdownvalue, setDropdownvalue] = useState(passingvalue);
  const [dropdownShow, setDropdownShow] = useState(showingvalue);
  // <InputSelector
  //               data={moduleData}
  //               control={control}
  //               labelname="module name"
  //               name="moduleId"
  //               optionLabel="moduleName"
  //               errors={errors.moduleId?.message}
  //             />

  const ShowingData = selectedkey;
  const selectingvalue = selectedvalue;

  const datainputfield = (valuedata, showField) => {
    setDropdownvalue(valuedata);
    setDropdownShow(showField);
  };

  console.log("dropdown value", dropdownvalue, dropdownShow);

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  useEffect(() => {}, [
    dropdownShow,
    setDropdownShow,
    dropdownvalue,
    setDropdownvalue,
  ]);

  console.log("module name", name);

  return (
    <div className="relative">
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
                autoComplete="off"
                onChange={(e) => field.onChange((e.value = "hello"))}
                placeholder={`${labelname}`}
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
      <div className="border-1 border-round-md border-400 px-1 selectdropDownlist ">
        {mappingData.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                datainputfield(
                  item[`${selectingvalue}`],
                  item[`${selectedkey}`]
                );
              }}
              className="h-2rem flex flex-row align-items-center justify-content-start pl-3 p-1 hover:surface-300"
            >
              <p className="">{item[`${ShowingData}`]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Selector;
