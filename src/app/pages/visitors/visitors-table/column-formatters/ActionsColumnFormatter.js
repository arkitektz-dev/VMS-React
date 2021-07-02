import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openEditVisitorPage, openDeleteVisitorDialog }
) => (
  <>
    <OverlayTrigger
      overlay={<Tooltip id="visitors-edit-tooltip">Edit visitor</Tooltip>}
    >
      <a
        className="btn btn-icon btn-icon-blue btn-hover-primary btn-sm mx-2"
        onClick={() => openEditVisitorPage(row.id)}
      >
        <span className="svg-icon svg-icon-sm svg-icon-primary">
          <SVG src="/assets/images/icons/svg/pencil.svg" />
        </span>
      </a>
    </OverlayTrigger>

    <> </>
    <OverlayTrigger
      overlay={<Tooltip id="visitors-delete-tooltip">Delete visitor</Tooltip>}
    >
      <a
        className="btn btn-icon btn-icon-red btn-hover-danger btn-sm"
        onClick={() => openDeleteVisitorDialog(row.id)}
      >
        <span className="svg-icon svg-icon-sm svg-icon-danger">
          <SVG src="/assets/images/icons/svg/trash.svg" />
        </span>
      </a>
    </OverlayTrigger>
  </>
);
