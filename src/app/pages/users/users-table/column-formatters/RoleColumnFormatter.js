import React from "react";

export const RoleColumnFormatter = (cellContent, row) => {
  const roles = cellContent.length > 0 ? cellContent.join(", ") : "-";

  return <span>{roles}</span>;
};
