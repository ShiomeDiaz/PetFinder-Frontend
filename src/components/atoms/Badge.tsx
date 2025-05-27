import React from "react";

const Badge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className = "", children, ...props }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-bold shadow ${className}`}
    {...props}
  >
    {children}
  </span>
);

export default Badge;
