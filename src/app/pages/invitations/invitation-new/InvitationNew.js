import React, { useEffect, useState, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/invitations/invitationsActions";
import * as visitorActions from "../../../store/visitors/visitorsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_ui/layout/elements";
import InvitationNewForm from "./InvitationNewForm";
import SVG from "react-inlinesvg";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";

const initInvitation = {
  visitorId: "",
  date: "",
  time: "",
  purposeOfVisit: "",
  arrivalInstructions: "",
  destination: "",
};

function InvitationNew({ history }) {
  const title = "New Invitation";

  // Subheader
  const subheader = useSubheader();

  const dispatch = useDispatch();

  // Getting visitors list from store
  const { visitors } = useSelector(
    (state) => ({ visitors: state.visitors.entities }),
    shallowEqual
  );

  useEffect(() => {
    subheader.setTitle(title);

    if (!visitors) {
      dispatch(visitorActions.fetchVisitors());
    }
  }, []);

  const saveInvitation = (values) => {
    dispatch(actions.createInvitation(values)).then(() =>
      backToInvitationsList()
    );
  };

  const btnRef = useRef();
  const saveInvitationClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToInvitationsList = () => {
    history.push(`/invitations`);
  };

  return (
    <Card>
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToInvitationsList}
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
            onClick={saveInvitationClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <InvitationNewForm
          invitation={initInvitation}
          btnRef={btnRef}
          saveInvitation={saveInvitation}
        />
      </CardBody>
    </Card>
  );
}

export default InvitationNew;
