import React, { forwardRef } from "react";
import clsx from "clsx";

export const CardHeaderIcon = forwardRef(({ className }, ref) => (
  <span ref={ref} className={clsx("card-head-icon", className)} />
));
