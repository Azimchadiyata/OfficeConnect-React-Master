import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
const ButtonDialog = ({ btnlabel, btnicon, header, Content }) => {
  const [displayResponsive, setDisplayResponsive] = useState(false);

  const [setPosition] = useState("center");
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
    <div>
      <div className="flex-1 flex align-items-center justify-content-end  ">
        <Button
          label={`${btnlabel}`}
          icon={`${btnicon}`}
          onClick={() => onClick("displayResponsive")}
          className="bg-indigo-600 "
        />
        <div className="card shadow-2">
          <div>
            <Dialog
              header={`${header}`}
              visible={displayResponsive}
              onHide={() => onHide("displayResponsive")}
              breakpoints={{ "960px": "75vw" }}
              style={{ width: "60vw", backgroundColor: "bg-blue-500" }}
            >
              <Content />
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonDialog;
