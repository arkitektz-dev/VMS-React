import React from "react";
import { Formik, Form, Field } from "formik";
import { Input, TextArea } from "./../../../../_ui/layout/elements/";
import * as Yup from "yup";
import { shallowEqual, useSelector } from "react-redux";

// Validation schema
const InvitationEditSchema = Yup.object().shape({
  visitorId: Yup.string().required("Visitor is required"),
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  purposeOfVisit: Yup.string(),
  arrivalInstructions: Yup.string(),
  destination: Yup.string(),
});

function InvitationEditForm({ invitation, btnRef, updateInvitation }) {
  // Getting users and visitors list from store
  const { users, visitors } = useSelector(
    (state) => ({
      users: state.users.entities,
      visitors: state.visitors.entities,
    }),
    shallowEqual
  );

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={invitation}
        validationSchema={InvitationEditSchema}
        onSubmit={(values) => {
          updateInvitation(values);
        }}
      >
        {({ values, handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      as="select"
                      name="visitorId"
                      className="form-control"
                      label="Visitor"
                    >
                      <option value="">Please Select Visitor</option>
                      {visitors &&
                        visitors.map((visitor) => (
                          <option key={visitor.id} value={visitor.id}>
                            {visitor.firstName}
                          </option>
                        ))}
                    </Field>
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

export default InvitationEditForm;
