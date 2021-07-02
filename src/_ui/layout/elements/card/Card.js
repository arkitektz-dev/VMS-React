import React, { forwardRef } from "react";
import clsx from "clsx";

export const Card = forwardRef(
  ({ fluidHeight, className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={clsx(
        "card card-custom gutter-b",
        { "card-height-fluid": fluidHeight },
        className
      )}
    />
  )
);
