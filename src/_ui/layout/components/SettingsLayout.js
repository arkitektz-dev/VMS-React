import React from "react";
import HeaderSettings from "./header/HeaderSettings";
import SubHeader from "./subheader/SubHeader";
import Footer from "./footer/Footer";
import Sidebar from "./sidebar/Sidebar";

export function SettingsLayout({ children }) {
  return (
      <div className="container">
        <HeaderSettings />
        <div className="main-panel">
          {/* <SubHeader /> */}

          <div className="content-wrapper">{children}</div>
          <Footer />
        </div>
      </div>
  );
}
