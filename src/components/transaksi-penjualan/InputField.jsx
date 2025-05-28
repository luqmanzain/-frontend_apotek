import React from "react";

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      className="w-full border rounded px-3 py-2"
      {...props}
    />
  </div>
);

export default InputField;
