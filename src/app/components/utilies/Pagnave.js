import React, { useState } from "react";

import { Dropdown } from "primereact/dropdown";

const Pagnave = ({ title, icon }) => {
  const [Filterinfoshow, setFilterIfoShow] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "3DCAD", code: "NY" },
    { name: "RIM", code: "RM" },
  ];

  const [selectedCity1, setSelectedCity1] = useState(null);
  const cities1 = [
    { name: "", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const [selectedCity2, setSelectedCity2] = useState(null);
  const cities2 = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const [selectedCity3, setSelectedCity3] = useState(null);
  const cities3 = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  console.log(selectedCity);
  const onCityChange = (e) => {
    setSelectedCity(e.value);
    setSelectedCity1(e.value);
    setSelectedCity2();
    setSelectedCity3();
  };

  const onCityChange1 = (e) => {
    setSelectedCity1(e.value);
  };
  return (
    <div className=" flex flex-row p-2 text-3xl relative ">
      <i
        className="mdi mdi-filter-variant"
        onClick={() => {
          setFilterIfoShow(!Filterinfoshow);
        }}
      ></i>
      {Filterinfoshow ? (
        <div className="pt-3 pb-1 px-2 border-round-md bg-700 bg-white useshadow-2 absolute dropdownDatafolder">
          <div className="card flex justify-content-center dropdown-demo mb-1">
            <Dropdown
              value={selectedCity}
              options={cities}
              onChange={onCityChange}
              optionLabel="name"
              placeholder="company"
              editable
              className="dropdownfilterui"
            />
          </div>

          <div className="card flex justify-content-center dropdown-demo mb-1">
            <Dropdown
              value={selectedCity1}
              options={cities1}
              onChange={onCityChange1}
              optionLabel="name"
              placeholder="dept"
              editable
              className="dropdownfilterui"
            />
          </div>

          <div className="card flex justify-content-center dropdown-demo mb-1">
            <Dropdown
              value={selectedCity2}
              options={cities2}
              onChange={onCityChange}
              optionLabel="name"
              placeholder="Designation"
              editable
              className="dropdownfilterui"
            />
          </div>

          <div className="card flex justify-content-center dropdown-demo mb-1">
            <Dropdown
              value={selectedCity3}
              options={cities3}
              onChange={onCityChange}
              optionLabel="name"
              placeholder="Role"
              editable
              className="dropdownfilterui"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Pagnave;
