import React, { useState } from "react";

import { Dialog } from "primereact/dialog";

const InputImage = ({ title, imgtitle, name }) => {
  const [Imgview, setImgview] = useState(
    "https://pbs.twimg.com/media/DrM0nIdU0AEhG5b.jpg"
  );
  const [displayResponsive, setDisplayResponsive] = useState(false);

  const [setPosition] = useState("center");

  const onchangeimg = (e) => {
    setImgview(URL.createObjectURL(e.target.files[0]));
  };
  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive,
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };
  return (
    <div className="p-1">
      <Dialog
        header="Header"
        visible={displayResponsive}
        onHide={() => onHide("displayResponsive")}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
        footer=""
      >
        <img
          className="block ImageinputDocument1 rounded-lg flex-none bg-cover  "
          src={Imgview}
          alt="img"
          onClick={() => onClick("displayResponsive")}
        />
      </Dialog>
      <div>
        <img
          className="block  ImageinputDocument rounded-lg flex-none bg-cover  "
          src={Imgview}
          alt="img"
          onClick={() => onClick("displayResponsive")}
        />
      </div>
      <div>
        <label className="p-2  text-sm">{title}</label>
      </div>
      <div className="relative text-blue-500">
        <p className="">{imgtitle}</p>
        <div className="absolute imgabsolute">
          <input
            type="file"
            id={`${name}`}
            name={`${name}`}
            onChange={(e) => onchangeimg(e)}
            className="w-5rem opacity-0"
            accept="image/png, image/jpeg"
          />
        </div>
      </div>
    </div>
  );
};

export default InputImage;
