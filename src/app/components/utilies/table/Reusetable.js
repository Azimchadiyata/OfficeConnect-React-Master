import React from "react";

const Reusetable = ({ title, headerData, initialData }) => {
  return (
    <div className="col-lg-12 grid-margin stretch-card ">
      <div className="card useshadow-table ">
        <div className="card-body">
          <h4 className="card-title " style={{ textTransform: "uppercase" }}>
            {title}
          </h4>
          <div className="table-responsive">
            <table className="table ">
              <thead>
                <tr>
                  {headerData.map((item, index) => {
                    if (Object.keys(item)[0] === Object.keys(item)[index]) {
                      return <React.Fragment key={index}></React.Fragment>;
                    }
                    return (
                      <th
                        key={index}
                        className="textuppercase text-blue-400 text-center"
                      >
                        {item}
                      </th>
                    );
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
                        return (
                          <td key={index} className="text-center">
                            {item[element]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reusetable;
