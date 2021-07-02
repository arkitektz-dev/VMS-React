import React from "react";
import { UserStatusCssClasses, UserStatusTitles } from "../../UsersUIHelpers";

export const StatusColumnFormatter = (cellContent, row) => {
  return (
    <span
      className={`label label-lg label-light-${
        UserStatusCssClasses[row.isActive ? 0 : 1]
      } label-inline`}
    >
      {UserStatusTitles[row.isActive ? 0 : 1]}
    </span>
  );
};
