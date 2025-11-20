import React from "react";
import styles from "./card.module.css";
import Button from "../button/button";

const Card = ({
  title,
  money,
  buttonText,
  buttonType,
  handleClick,
  success = true,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <h3>
          {`${title}: `}
          <span className={success ? styles.success : styles.failure}>
            {`₹${money}`}
          </span>
        </h3>
      </div>
      <Button handleClick={handleClick} style={buttonType}>
        {buttonText}
      </Button>
    </div>
  );
};

export default Card;
