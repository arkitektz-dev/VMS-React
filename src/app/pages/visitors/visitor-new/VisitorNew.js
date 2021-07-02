import React, { useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/visitors/visitorsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_ui/layout/elements";
import VisitorNewForm from "./VisitorNewForm";
import SVG from "react-inlinesvg";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";

const initVisitor = {
  firstName: "",
  lastName: "",
  contactNumber: "",
  company: "",
  emailAddress: "",
  isBlackListed: false,
};

function VisitorNew({ history }) {
  const title = "New Visitor";

  // Subheader
  const subheader = useSubheader();

  const dispatch = useDispatch();

  useEffect(() => {
    subheader.setTitle(title);
  }, []);

  const saveVisitor = (values) => {
    dispatch(actions.createVisitor(values)).then(() => backToVisitorsList());
  };

  const btnRef = useRef();
  const saveVisitorClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToVisitorsList = () => {
    history.push(`/visitors`);
  };

  return (
    <Card>
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToVisitorsList}
            className="btn btn-light"
          >
            <span className="svg-icon svg-icon-sm svg-icon-primary">
              <SVG src="/assets/images/icons/svg/arrow-left.svg" />
            </span>
            Back
          </button>
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveVisitorClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <VisitorNewForm
          visitor={initVisitor}
          btnRef={btnRef}
          saveVisitor={saveVisitor}
        />
      </CardBody>
    </Card>
  );
}

export default VisitorNew;
