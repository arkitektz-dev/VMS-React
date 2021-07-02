import React, { forwardRef } from "react";
import clsx from "clsx";

export const CardBody = forwardRef(
  ({ fit, fluid, className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={clsx(
        "card-body",
        {
          "card-body-fit": fit,
          "card-body-fluid": fluid,
        },
        className
      )}
    />
  )
);
