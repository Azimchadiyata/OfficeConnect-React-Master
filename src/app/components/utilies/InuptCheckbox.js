import React, { useState } from "react";

import { Checkbox } from "primereact/checkbox";
const InuptCheckbox = () => {
  const [projectchecked, setProjectchecked] = useState(false);
  return (
    <div className="col-md-4 mt-3 ">
      <div className="field-checkbox m-1 row">
        <Checkbox
          inputId="binary"
          checked={projectchecked}
          onChange={(e) => setProjectchecked(e.checked)}
        />
        <label htmlFor="binary" className="text-xs mt-1">
          Project Connect User
        </label>
      </div>
    </div>
  );
};

export default InuptCheckbox;
