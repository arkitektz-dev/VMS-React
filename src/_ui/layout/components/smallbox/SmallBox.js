import React, { useEffect, useState } from "react";
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";

// register lottie and define custom element
defineLordIconElement(loadAnimation);

function SmallBox({ iconLink, iconText, iconValue }) {
  return (
    <>
      <span
        className={`svg-icon-primary`}
        style={{ width: "250", height: "250" }}
      >
        <lord-icon trigger="hover" src={iconLink}></lord-icon>

        <div className={`text-dark fw-bolder fs-2 mb-2 mt-1 display-5`}>
          <strong>{iconValue}</strong>
        </div>

        <div className={`fw-bold text-grey fs-7`}>{iconText}</div>
      </span>
    </>
  );
}

export default SmallBox;
