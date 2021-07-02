import React from "react";
import SVG from "react-inlinesvg";

export const sortCaret = (order, column) => {
  if (!order) return (
    <span className="svg-icon svg-icon-sm svg-icon-primary ml-1 svg-icon-sort">
       {/* <SVG src="/assets/images/icons/svg/switch-vertical.svg"/> */}
    </span>
  );
  else if (order === "asc")
    return (
      <span className="svg-icon svg-icon-sm svg-icon-primary ml-1">
        <SVG src="/assets/images/icons/svg/sort-ascending.svg"/>
      </span>
    );
  else if (order === "desc")
    return (
      <span className="svg-icon svg-icon-sm svg-icon-primary ml-1">
        <SVG src="/assets/images/icons/svg/sort-descending.svg"/>
      </span>
    );
  return null;
};

export const headerSortingClasses = (column, sortOrder, isLastSorting, colIndex) => (
  (sortOrder === 'asc' || sortOrder === "desc") ? 'sortable-active' : ''
);