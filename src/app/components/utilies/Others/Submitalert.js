import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";

const Submitalert = ({
  showMessage,
  setShowMessage,
  showinfoLabel,
  labelstate,
}) => {
  let timer1 = setTimeout(() => setShowMessage(false), 1000);

  useEffect(() => {
    return () => {
      clearTimeout(timer1);
    };
  }, [timer1]);
  return (
    <Dialog
      visible={showMessage}
      onHide={() => setShowMessage(false)}
      position="top"
      showHeader={false}
      breakpoints={{ "960px": "80vw" }}
      style={{ width: "30vw" }}
    >
      {labelstate === true ? (
        <div className="flexendwrap min-w-20rem  mt-3 ">
          <div className="flex flex-row align-items-center flex-wrap py-2 w-full max-w-20rem px-3 ">
            <i
              className="pi pi-check-circle"
              style={{ fontSize: "2.4rem", color: "var(--green-500)" }}
            ></i>
            <h5 className="mx-2">{showinfoLabel}</h5>
          </div>
        </div>
      ) : (
        <div className="flexendwrap min-w-20rem mt-3 ">
          <div className="flex flex-row align-items-center flex-wrap py-2 w-full max-w-20rem px-3 ">
            <i
              className="pi pi-check-circle"
              style={{ fontSize: "2.4rem", color: "var(--red-500)" }}
            ></i>
            <h5 className="mx-2">{showinfoLabel}</h5>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default Submitalert;
