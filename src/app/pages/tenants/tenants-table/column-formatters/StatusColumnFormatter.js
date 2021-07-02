import React from "react";
import {
  TenantStatusCssClasses,
  TenantStatusTitles,
} from "../../TenantsUIHelpers";

export const StatusColumnFormatter = (cellContent, row) => {
  return (
    <span
      className={`label label-lg label-light-${
        TenantStatusCssClasses[row.isActive ? 0 : 1]
      } label-inline`}
    >
      {TenantStatusTitles[row.isActive ? 0 : 1]}
    </span>
  );
};
