import React from "react";
import Header from "./header/Header";
import SubHeader from "./subheader/SubHeader";
import Footer from "./footer/Footer";
import Sidebar from "./sidebar/Sidebar";

export function SettingsLayout({ children }) {
  return (
    <div className="container-scroller">
      {/* <Sidebar /> */}
      <div className="container-fluid page-body-wrapper">
        <Header />
        <div className="main-panel">
          {/* <SubHeader /> */}

          <div className="content-wrapper">{children}</div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}
