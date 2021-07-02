import React, { useEffect, useState, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/visitors/visitorsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_ui/layout/elements";
import SVG from "react-inlinesvg";
import VisitorEditForm from "./VisitorEditForm";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";
import { CardProgressBar } from "./../../../../_ui/layout/elements";

const initVisitor = {
  id: undefined,
  firstName: "",
  lastName: "",
  contactNumber: "",
  company: "",
  emailAddress: true,
  isBlackListed: false,
};

function VisitorEdit({
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
  const { actionsLoading, visitorForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.visitors.actionsLoading,
      visitorForEdit: state.visitors.visitorForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchVisitor(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (visitorForEdit && id) {
      const _title = `Edit visitor '${visitorForEdit.firstName} ${visitorForEdit.lastName} '`;
      setTitle(_title);
      subheader.setTitle(_title);
    }
  }, [visitorForEdit, id]);

  const updateVisitor = (values) => {
    dispatch(actions.updateVisitor(values)).then(() => backToVisitorsList());
  };

  const btnRef = useRef();
  const updateVisitorClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToVisitorsList = () => {
    history.push(`/visitors`);
  };

  return (
    <Card>
      {actionsLoading && <CardProgressBar />}

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
            onClick={updateVisitorClick}
          >
            Update
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <VisitorEditForm
          actionsLoading={actionsLoading}
          visitor={visitorForEdit || initVisitor}
          btnRef={btnRef}
          updateVisitor={updateVisitor}
        />
      </CardBody>
    </Card>
  );
}

export default VisitorEdit;
