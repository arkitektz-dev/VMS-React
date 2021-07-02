import React, { forwardRef } from "react";
import clsx from "clsx";

export const CardHeaderTitle = forwardRef(({ className, ...props }, ref) => (
  <h3 {...props} ref={ref} className={clsx("card-label", className)} />
));
