import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear().toString();

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="d-sm-flex justify-content-center justify-content-sm-between py-2 w-100">
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
            Copyright ©{" "}
            <a
              href="https://www.vms.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              vms.com{" "}
            </a>
            {currentYear}
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
