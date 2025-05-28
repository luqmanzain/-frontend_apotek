import React from "react";

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`text-white font-medium py-2 px-6 rounded ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
