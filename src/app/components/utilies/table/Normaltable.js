import React from "react";

const Normaltable = ({ initialData, headerData, design }) => {
  return (
    <div
      className={`${design} bg-white  table-responsive border-round-sm useshadow-table`}
    >
      <h4
        className="flex w-full pt-4 uppercase"
        style={{ textTransform: "uppercase" }}
      >
        leave table
      </h4>
      <table className="table">
        <thead>
          <tr>
            {headerData.map((item, index) => {
              if (Object.keys(item)[0] === Object.keys(item)[index]) {
                return <React.Fragment key={index}></React.Fragment>;
              }
              return <th key={index}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {initialData.map((item, index) => {
            return (
              <tr key={index}>
                {Object.keys(item).map((element, index) => {
                  if (Object.keys(item)[0] === Object.keys(item)[index]) {
                    return <React.Fragment key={index}></React.Fragment>;
                  }
                  return <td key={index}>{item[element]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Normaltable;
