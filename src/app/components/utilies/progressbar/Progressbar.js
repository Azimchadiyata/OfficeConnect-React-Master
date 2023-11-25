import React, { useEffect, useState, useRef } from "react";
const Progressbar = ({ bgcolor, height }) => {
  const [completed, setCompleted] = useState(0);

  const interval = useRef(null);
  const containerStyles = {
    height: height,
    width: "100%",
    backgroundColor: "#ddd",
    borderRadius: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  //   const labelStyles = {
  //     padding: 5,
  //     color: "#ddd",
  //     fontWeight: "bold",
  //   };

  useEffect(() => {
    let _val = completed;

    interval.current = setInterval(() => {
      _val += Math.floor(Math.random() * 10) + 1;

      if (_val >= 100) {
        _val = 100;
        clearInterval(interval.current);
      }
      setCompleted(_val);
    }, 50);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, [setCompleted, interval, completed]);

  return (
    <div>
      {completed <= 99 && (
        <div style={containerStyles}>
          {/* <span style={labelStyles}>{`${completed}%`}</span> */}
          <div style={fillerStyles}></div>
        </div>
      )}
    </div>
  );
};

export default Progressbar;
