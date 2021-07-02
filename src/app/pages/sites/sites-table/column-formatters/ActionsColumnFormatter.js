import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openEditSitePage, openDeleteSiteDialog }
) => (
  <>
    <OverlayTrigger
      overlay={<Tooltip id="sites-edit-tooltip">Edit site</Tooltip>}
    >
      <a
        className="btn btn-icon btn-icon-blue btn-hover-primary btn-sm mx-2"
        onClick={() => openEditSitePage(row.id)}
      >
        <span className="svg-icon svg-icon-sm svg-icon-primary">
          <SVG src="/assets/images/icons/svg/pencil.svg" />
        </span>
      </a>
    </OverlayTrigger>

    <> </>
    <OverlayTrigger
      overlay={<Tooltip id="sites-delete-tooltip">Delete site</Tooltip>}
    >
      <a
        className="btn btn-icon btn-icon-red btn-hover-danger btn-sm"
        onClick={() => openDeleteSiteDialog(row.id)}
      >
        <span className="svg-icon svg-icon-sm svg-icon-danger">
          <SVG src="/assets/images/icons/svg/trash.svg" />
        </span>
      </a>
    </OverlayTrigger>
  </>
);
