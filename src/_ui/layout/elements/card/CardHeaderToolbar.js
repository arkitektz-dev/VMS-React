import React, { forwardRef } from "react";
import clsx from "clsx";

export const CardHeaderToolbar = forwardRef(
  ({ children, className, ...props }, ref) => (
    <div {...props} ref={ref} className={clsx("card-toolbar", className)}>
      {children}
    </div>
  )
);
