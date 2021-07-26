import React from "react";
import HeaderSettings from "./header/HeaderSettings";
import SubHeaderSettings from "./subheader/SubHeaderSettings";
import Footer from "./footer/Footer";
import SidebarSettings from "./sidebar/SidebarSettings";

export function SettingsLayout({ children }) {
  return (
    <div className="container-scroller">
      {/* <SidebarSettings /> */}
      <div
        className="container-fluid"
        style={
          {
            // paddingRight: 260,
          }
        }
      >
        <HeaderSettings />
        <div className="main-panel">
          <SubHeaderSettings />

          <div className="content-wrapper">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
