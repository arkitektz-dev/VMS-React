import React from "react";
import { Formik, Form, Field } from "formik";
import { Input, TextArea } from "./../../../../_ui/layout/elements";
import * as Yup from "yup";

// Validation schema
const RoleNewSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Role Name is required"),
  displayName: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Display Name is required"),
  description: Yup.string(),
  grantedPermissions: Yup.array(),
  actions: Yup.array(),
});

function RoleNewForm({ role, btnRef, saveRole }) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={role}
        // validationSchema={RoleNewSchema}
        onSubmit={(values) => {
          saveRole(values);
        }}
      >
        {({ values, handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="name"
                    component={Input}
                    placeholder="Name"
                    className="form-control"
                    label="Name"
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="displayName"
                    component={Input}
                    placeholder="Display Name"
                    className="form-control"
                    label="Display Name"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-12">
                  <Field
                    name="description"
                    component={TextArea}
                    placeholder="Description"
                    className="form-control"
                    label="Description"
                    rows={4}
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

export default RoleNewForm;
