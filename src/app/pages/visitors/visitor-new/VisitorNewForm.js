import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "./../../../../_ui/layout/elements";

// Validation schema
const VisitorNewSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("LastName is required"),
  contactNumber: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Contact Number is required"),
  company: Yup.string(),
  emailAddress: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
  isBlackListed: Yup.boolean(),
});

function VisitorNewForm({ visitor, btnRef, saveVisitor }) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={visitor}
        validationSchema={VisitorNewSchema}
        onSubmit={(values) => {
          saveVisitor(values);
        }}
      >
        {({ values, handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="firstName"
                    component={Input}
                    placeholder="First Name"
                    className="form-control"
                    label="First Name"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="lastName"
                    component={Input}
                    placeholder="Last Name"
                    className="form-control"
                    label="Last Name"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="contactNumber"
                    component={Input}
                    placeholder="Contact Number"
                    className="form-control"
                    label="Contact Number"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    type="email"
                    name="emailAddress"
                    component={Input}
                    placeholder="Email"
                    className="form-control"
                    label="Email"
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="company"
                    component={Input}
                    placeholder="Comapny"
                    className="form-control"
                    label="Company"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-lg-6">
                  <div className="col-lg-6">
                    <label>Blacklist</label>
                    <Field type="checkbox" name="isBlackListed" />
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

export default VisitorNewForm;
