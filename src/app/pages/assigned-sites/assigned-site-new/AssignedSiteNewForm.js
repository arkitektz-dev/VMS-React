import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ReactSelect } from "./../../../../_ui/layout/elements";

// Validation schema
const AssignedSiteNewSchema = Yup.object().shape({
  userId: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("AssignedSite Name is required"),
  sites: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
});

function AssignedSiteNewForm({ assignedSite, btnRef, saveAssignedSite }) {
  // Getting users and sites list from store
  const { users, sites } = useSelector(
    (state) => ({ users: state.users.entities, sites: state.sites.entities }),
    shallowEqual
  );

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={assignedSite}
        // validationSchema={AssignedSiteNewSchema}
        onSubmit={(values) => {
          const reqObj = {
            ...values,
            sites: values.sites.map((s) => s.value),
          };
          
          saveAssignedSite(reqObj);
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <Field
                    name="user"
                    component={ReactSelect}
                    label="User"
                    options={users || []}
                    dataFields={{ value: "id", label: "name" }}
                    onChange={(selectedOption) => {
                      setFieldValue("userId", selectedOption.value);
                    }}
                  />
                </div>

                <div className="col-lg-6">
                  <Field
                    name="sites"
                    component={ReactSelect}
                    label="Sites"
                    options={sites || []}
                    dataFields={{ value: "id", label: "siteName" }}
                    onChange={(selectedOptions) => {
                      setFieldValue("sites", selectedOptions);
                    }}
                    isMulti
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

export default AssignedSiteNewForm;
