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
import SVG from "react-inlinesvg";
import InvitationEditForm from "./InvitationEditForm";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";
import { CardProgressBar } from "./../../../../_ui/layout/elements";

const initInvitation = {
  id: undefined,
  visitorId: "",
  date: "",
  time: "",
  purposeOfVisit: "",
  arrivalInstructions: "",
  destination: "",
};

function InvitationEdit({
  history,
  match: {
    params: { id },
  },
}) {
  //state
  const [title, setTitle] = useState("");

  // Subheader
  const subheader = useSubheader();

  const dispatch = useDispatch();

  //get state from store
  const { actionsLoading, invitationForEdit, visitors } = useSelector(
    (state) => ({
      actionsLoading: state.invitations.actionsLoading,
      invitationForEdit: state.invitations.invitationForEdit,
      visitors: state.visitors.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchInvitation(id));

    if (!visitors) {
      dispatch(visitorActions.fetchVisitors());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (invitationForEdit && id) {
      const _title = `Edit invitation`;
      // const _title = `Edit invitation '${invitationForEdit.name}'`;
      setTitle(_title);
      subheader.setTitle(_title);
    }
  }, [invitationForEdit, id]);

  const updateInvitation = (values) => {
    var val = {
      ...values,
      id,
    };
    dispatch(actions.updateInvitation(val)).then(() => backToInvitationsList());
  };

  const btnRef = useRef();
  const updateInvitationClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToInvitationsList = () => {
    history.push(`/invitations`);
  };

  return (
    <Card>
      {actionsLoading && <CardProgressBar />}

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
            onClick={updateInvitationClick}
          >
            Update
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <InvitationEditForm
          actionsLoading={actionsLoading}
          invitation={invitationForEdit || initInvitation}
          btnRef={btnRef}
          updateInvitation={updateInvitation}
        />
      </CardBody>
    </Card>
  );
}

export default InvitationEdit;
