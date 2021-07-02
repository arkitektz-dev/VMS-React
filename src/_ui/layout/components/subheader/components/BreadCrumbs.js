import React from "react";
import { Link } from "react-router-dom";

function BreadCrumbs({ items }) {
  if (!items || !items.length) {
    return "";
  }

  return (
    <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot p-0 my-2">
      <li className="breadcrumb-item">
        <Link to="/dashboard">
          <i className="mdi mdi-home" aria-hidden="true"></i>
        </Link>
      </li>
      {items.map((item, index) => (
        <li key={`bc${index}`} className="breadcrumb-item">
          <Link className="text-muted" to={{ pathname: item.pathname }}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default BreadCrumbs;
