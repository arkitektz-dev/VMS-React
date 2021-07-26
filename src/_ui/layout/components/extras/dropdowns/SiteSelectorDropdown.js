import React from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

function SiteSelectorDropdown() {
  const { assignedSites } = useSelector((state) => state.auth.user);

  if (!assignedSites || assignedSites.length <= 0) {
    return null;
  }

  return (
    <Form.Control as="select">
      {assignedSites.map((site) => (
        <option key={site.id} value={site.id}>
          {site.siteName}
        </option>
      ))}
    </Form.Control>
  );
}

export default SiteSelectorDropdown;
