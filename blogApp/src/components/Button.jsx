import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
    className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor} transition-all duration-300 outline-none shadow-none focus:outline-none focus:shadow-none active:shadow-outline`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
