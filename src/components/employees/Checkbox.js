import React from "react";

const CheckBox = props => {
  const { text, ...children } = props;

  return (
    <div>
      <label className="checkbox">
        <input type="checkbox" style={{ marginRight: "4px" }} />
        {text}
      </label>
    </div>
  );
};

export default CheckBox;
