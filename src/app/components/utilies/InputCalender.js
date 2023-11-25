import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";
const InputCalender = ({
  control,
  name,
  labelname,
  errors,
  errorsName,
  minDate,
  maxDate,
}) => {
  const [minDateD, setMinDateD] = useState(minDate);

  const [maxDateD, setMaxDateD] = useState(maxDate);

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  useEffect(() => {
    if (minDate === undefined) {
      setMinDateD("");
    }

    if (maxDate === undefined) {
      setMaxDateD("");
    }
  }, [maxDate, minDate, minDateD, setMinDateD, maxDateD, setMaxDateD]);

  //   <div className="col-lg-6">
  //   <InputCalender
  //     control={control}
  //     name="date"
  //     labelname="date"
  //     errors={errors}
  //     errorsName={errors.date}
  //   />
  // </div>

  return (
    <div className="field mt-3">
      <span className="p-float-label">
        <Controller
          name={`${name}`}
          control={control}
          render={({ field }) => (
            <Calendar
              id={field.name}
              value={field.value}
              disabledDays={[0, 6]}
              onChange={(e) => field.onChange(e.value)}
              dateFormat="dd/mm/yy"
              mask="99/99/9999"
              autoComplete="off"
              minDate={minDateD}
              maxDate={maxDateD}
              showIcon
              touchUI
              className={`${
                errors
                  ? "border-red-500 p:calendar"
                  : "hover:border-blue-500 p:calendar"
              }`}
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

      {getFormErrorMessage(name)}
    </div>
  );
};

export default InputCalender;
