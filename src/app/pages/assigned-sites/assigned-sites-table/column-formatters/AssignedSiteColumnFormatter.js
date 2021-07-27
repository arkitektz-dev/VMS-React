import React from "react";

export const AssignedSiteColumnFormatter = (cellContent, row) => {
  return <span>{cellContent.join(', ')}</span>;
};
