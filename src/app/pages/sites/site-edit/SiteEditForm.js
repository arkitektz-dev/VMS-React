import React from "react";
import { Formik, Form, Field } from "formik";
import { Input, TextArea } from "./../../../../_ui/layout/elements";
import * as Yup from "yup";

// Validation schema
const SiteEditSchema = Yup.object().shape({
  siteName: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Site Name is required"),
  siteNamePrefix: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Site Name Prefix is required"),
  siteAddress: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(70, "Maximum 70 symbols")
    .required("Site Address is required"),
});

function SiteEditForm({ site, btnRef, updateSite }) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={site}
        validationSchema={SiteEditSchema}
        onSubmit={(values) => {
          updateSite(values);
        }}
      >
        {({ values, handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="siteName"
                    component={Input}
                    placeholder="Site Name"
                    className="form-control"
                    label="Site Name"
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="siteNamePrefix"
                    component={Input}
                    placeholder="Site Name Prefix"
                    className="form-control"
                    label="Site Name Prefix"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-12">
                  <Field
                    name="siteAddress"
                    component={TextArea}
                    placeholder="Site Address"
                    className="form-control"
                    label="Site Address"
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

export default SiteEditForm;
