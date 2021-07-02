import React, { forwardRef } from "react";
import clsx from "clsx";

export const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div {...props} ref={ref} className={clsx("card-footer", className)} />
));
