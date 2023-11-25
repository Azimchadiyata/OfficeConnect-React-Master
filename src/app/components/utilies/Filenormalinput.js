import React from "react";

const Filenormalinput = ({ onChange, name, accept }) => {
  return (
    <div>
      <input
        id="leaveimg"
        type="file"
        name={name}
        placeholder="please Enter "
        size="13"
        onChange={onChange}
        required
        className="w-2rem "
        accept={accept}
      />
    </div>
  );
};

export default Filenormalinput;
