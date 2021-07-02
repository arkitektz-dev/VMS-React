import React from "react";

export const CreatedTimeColumnFormatter = (cellContent, row) => {
  const formattedDateTime = new Date(row.creationTime).toLocaleString();

  return <span>{formattedDateTime}</span>;
};
