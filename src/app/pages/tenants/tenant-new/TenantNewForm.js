import React from "react";
import { Formik, Form, Field } from "formik";
import { Input } from "./../../../../_ui/layout/elements";
import * as Yup from "yup";

// Validation schema
const TenantNewSchema = Yup.object().shape({
  tenancyName: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Tenant Name is required"),
  name: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  adminEmailAddress: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
  connectionString: Yup.string(),
  isActive: Yup.boolean(),
});

function TenantNewForm({ tenant, btnRef, saveTenant }) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={tenant}
        validationSchema={TenantNewSchema}
        onSubmit={(values) => {
          saveTenant(values);
        }}
      >
        {({ values, handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="tenancyName"
                    component={Input}
                    placeholder="Tenancy Name"
                    className="form-control"
                    label="Tenancy Name"
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="name"
                    component={Input}
                    placeholder="Name"
                    className="form-control"
                    label="Name"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="adminEmailAddress"
                    component={Input}
                    placeholder="Admin Email Address"
                    className="form-control"
                    label="Admin Email Address"
                  />
                </div>
                {/* <div className="col-lg-6">
                  <Field
                    name="connectionString"
                    component={Input}
                    placeholder="Connection String"
                    className="form-control"
                    label="Connection String"
                  />
                </div> */}
              </div>
              <div className="form-group row">
                <div className="col-lg-6">
                  <label>Active</label>
                  <Field type="checkbox" name="isActive" />
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

export default TenantNewForm;
