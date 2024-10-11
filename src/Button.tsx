import React from "react";

interface Props {
  children: string;
  color?: "danger" | "secondary" | "warning";
  onClick: () => void;
}

const Button = ({ children, onClick, color = "danger" }: Props) => {
  return (
    <button className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
