import React from "react";
import styles from "./button.module.css";

const Button = ({
  children,
  handleClick,
  type = "button",
  shadow = false,
  style = "primary",
}) => {
  return (
    <button
      onClick={handleClick}
      type={type}
      className={`${styles.button} ${styles[style]} ${shadow && styles.shadow}`}
    >
      {children}
    </button>
  );
};

export default Button;
