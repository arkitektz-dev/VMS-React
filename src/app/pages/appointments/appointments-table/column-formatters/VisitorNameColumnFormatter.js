import React from "react";

export const VisitorNameColumnFormatter = (cellContent, row) => {
  return (
    <span>
      {row.visitor.firstName} {row.visitor.lastName}
    </span>
  );
};
