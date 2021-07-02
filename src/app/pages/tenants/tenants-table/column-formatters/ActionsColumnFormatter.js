import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "./../../../../../_ui/layout/utilities/AssetsUtilities";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openEditTenantPage, openDeleteTenantDialog }
) => (
  <>
    <OverlayTrigger
      overlay={<Tooltip id="tenants-edit-tooltip">Edit tenant</Tooltip>}
    >
      <a
        className="btn btn-icon btn-icon-blue btn-hover-primary btn-sm mx-2"
        onClick={() => openEditTenantPage(row.id)}
      >
        <span className="svg-icon svg-icon-sm svg-icon-primary">
          <SVG src={toAbsoluteUrl("/assets/images/icons/svg/pencil.svg")} />
        </span>
      </a>
    </OverlayTrigger>

    <> </>
    <OverlayTrigger
      overlay={<Tooltip id="tenants-delete-tooltip">Delete tenant</Tooltip>}
    >
      <a
        className="btn btn-icon btn-icon-red btn-hover-danger btn-sm"
        onClick={() => openDeleteTenantDialog(row.id)}
      >
        <span className="svg-icon svg-icon-sm svg-icon-danger">
          <SVG src={toAbsoluteUrl("/assets/images/icons/svg/trash.svg")} />
        </span>
      </a>
    </OverlayTrigger>
  </>
);
