import React from "react";
import {
  VisitorBlacklistCssClasses,
  VisitorBlacklistTitles,
} from "../../VisitorsUIHelpers";

export const BlacklistColumnFormatter = (cellContent, row) => {
  return (
    <span
      className={`label label-lg label-light-${
        VisitorBlacklistCssClasses[row.isBlackListed ? 0 : 1]
      } label-inline`}
    >
      {VisitorBlacklistTitles[row.isBlackListed ? 0 : 1]}
    </span>
  );
};
