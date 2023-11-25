import React from "react";

const Divpaireddata = ({ datakey, datavalue }) => {
  // <Divpaireddata datakey="issue place" datavalue="Bangalore" />
  return (
    <div className="divpairedData mx-1">
      <p className=" profilefontSize minwithforSidelines ">{datakey}</p>
      <p className="minwithforSidelines1 flex flex-row flex-wrap text-600 ">
        {datavalue}
        {datavalue === 0 || null || undefined || " " || "" || "invalid Date"
          ? ""
          : "."}
      </p>
    </div>
  );
};

export default Divpaireddata;
