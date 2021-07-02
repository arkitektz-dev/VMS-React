import React from "react";
import { useSelector } from "react-redux";

function Brand() {
  const { tenant } = useSelector((state) => state.auth);
  let logo = tenant ? tenant.logo : "";

  return (
    <>
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <a className="sidebar-brand brand-logo" href="index.html">
          <img src={logo} alt="logo" />
        </a>
        <a className="sidebar-brand brand-logo-mini" href="index.html">
          {/* <img src={require("../../assets/images/logo-mini.svg")} alt="logo" /> */}
        </a>
      </div>
    </>
  );
}

export default Brand;
