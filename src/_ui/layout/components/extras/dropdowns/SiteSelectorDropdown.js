import React from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

function SiteSelectorDropdown() {
  const { user } = useSelector((state) => state.auth);

  if (!user.assignedSites) {
    return null;
  }

  return (
    <Form.Control as="select">
      {user.assignedSites.map((s) => (
        <option key={s.id} value={s.id}>
          {s.siteName}
        </option>
      ))}
    </Form.Control>
  );
}

export default SiteSelectorDropdown;
