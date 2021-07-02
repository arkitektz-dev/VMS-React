import React, { forwardRef } from "react";
import clsx from "clsx";
import { isFragment } from "react-is";
import { CardHeaderTitle } from "./CardHeaderTitle";

export const CardHeader = forwardRef(
  (
    {
      children,
      icon,
      title,
      toolbar,
      className,
      sticky = false,
      labelRef,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className="card-header">
        {title != null && (
          <div ref={labelRef} className={clsx("card-title", className)}>
            {icon}

            {typeof title === "string" || isFragment(title) ? (
              <CardHeaderTitle>{title}</CardHeaderTitle>
            ) : (
              title
            )}
          </div>
        )}
        {toolbar}
        {children}
      </div>
    );
  }
);
