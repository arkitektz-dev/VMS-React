import React from "react";
import Header from "./header/Header";
import SubHeader from "./subheader/SubHeader";
import Footer from "./footer/Footer";
import Sidebar from "./sidebar/Sidebar";
import { useSubheader } from "./../core/Subheader";

export function Layout({ children }) {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Page*/}
        <div className="d-flex flex-row flex-column-fluid page">
          {/* <Aside/> */}

          {/*begin::Wrapper*/}
          <div
            className="d-flex flex-column flex-row-fluid wrapper"
            id="kt_wrapper"
          >
            {/* <Header/> */}

            {/*begin::Content*/}
            <div
              id="kt_content"
              className={`content d-flex flex-column flex-column-fluid`}
            >
              {/* <SubHeader/> */}

              {/*begin::Entry*/}

              <div className="d-flex flex-column-fluid">
                {/*begin::Container*/}
                <div className='container'>
                  {children}
                </div>
                {/*end::Container*/}
              </div>

              {/*end::Entry*/}
            </div>
            {/*end::Content*/}

            {/* <Footer /> */}

          </div>
          {/*end::Wrapper*/}
        </div>
        {/*end::Page*/}
      </div>
    </>

    // <div className="container-scroller">
    //   <Sidebar />
    //   <div className="container-fluid page-body-wrapper">
    //     <Header />
    //     <div className="main-panel">
    //       <SubHeader />

    //       <div className="content-wrapper">{children}</div>
    //       <Footer />
    //     </div>
    //   </div>
    // </div>
  );
}
