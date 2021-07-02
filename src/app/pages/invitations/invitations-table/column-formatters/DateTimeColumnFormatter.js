import React from "react";

export const DateTimeColumnFormatter = (cellContent, row) => {
  const formattedDate = new Date(row.date).toDateString();
  const formattedTime = new Date(row.time).toTimeString();
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return <span>{formattedDateTime}</span>;
};
