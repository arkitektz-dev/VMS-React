import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Input,
  ReactSelectAsync,
  TextArea,
} from "./../../../../_ui/layout/elements";
import AsyncSelect from "react-select/async";
import * as Yup from "yup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import InvitationRepository from "../../../repositories/invitation/invitationRepository";

// Validation schema
const InvitationNewSchema = Yup.object().shape({
  // visitorId: Yup.string().required("Visitor is required"),
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  purposeOfVisit: Yup.string(),
  arrivalInstructions: Yup.string(),
  destination: Yup.string(),
});

function InvitationNewForm({ invitation, btnRef, saveInvitation }) {

  const visitorLoadOptions = async (inputValue) => {
    const response = await InvitationRepository.getVisitorsByKeyword({
      term: inputValue,
    });
    const options = response.data.result.map((visitor) => ({
      value: visitor.id,
      label: visitor.fullNameWithContactNumber,
    }));

    return new Promise((resolve) => {
      resolve(options);
    });
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={invitation}
        validationSchema={InvitationNewSchema}
        onSubmit={(values) => {
          const reqObj = {
            ...values,
            visitorId: values.visitorId.value
          };

          saveInvitation(reqObj);
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-12">
                  <Field
                    name="visitorId"
                    component={ReactSelectAsync}
                    loadOptions={visitorLoadOptions}
                    label="Visitor"
                    onChange={(selectedOption) => setFieldValue("visitorId", selectedOption)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="purposeOfVisit"
                    component={Input}
                    placeholder="Purpose Of Visit"
                    className="form-control"
                    label="Purpose Of Visit"
                  />
                </div>

                <div className="col-lg-6">
                  <Field
                    name="destination"
                    component={Input}
                    placeholder="Destination"
                    className="form-control"
                    label="Destination"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-12">
                  <Field
                    name="arrivalInstructions"
                    component={TextArea}
                    placeholder="Arrival Instructions"
                    className="form-control"
                    label="Arrival Instructions"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    type="date"
                    name="date"
                    component={Input}
                    placeholder="Date"
                    className="form-control"
                    label="Date"
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    type="time"
                    name="time"
                    component={Input}
                    placeholder="Time"
                    className="form-control"
                    label="Time"
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}

export default InvitationNewForm;
