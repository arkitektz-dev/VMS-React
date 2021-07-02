import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Input, Checkbox } from "./../../../../_ui/layout/elements";

// Validation schema
const AssignedSiteNewSchema = Yup.object().shape({
  assignedSiteName: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("AssignedSite Name is required"),
  name: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  surname: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Sur Name is required"),
  emailAddress: Yup.string().email().required("Email is required"),
  isActive: Yup.boolean(),
  password: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});

function AssignedSiteNewForm({ assignedSite, btnRef, saveAssignedSite }) {
  // Getting roles list from store
  const { roles } = useSelector(
    (state) => ({ roles: state.roles.entities }),
    shallowEqual
  );

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={assignedSite}
        validationSchema={AssignedSiteNewSchema}
        onSubmit={(values) => {
          saveAssignedSite(values);
        }}
      >
        {({ values, handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="assignedSiteName"
                    component={Input}
                    placeholder="AssignedSite Name"
                    className="form-control"
                    label="AssignedSite Name"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="name"
                    component={Input}
                    placeholder="Name"
                    className="form-control"
                    label="Name"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="surname"
                    component={Input}
                    placeholder="Surname"
                    className="form-control"
                    label="Surname"
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
                    type="password"
                    name="password"
                    component={Input}
                    placeholder="Password"
                    className="form-control"
                    label="Password"
                  />
                </div>
              </div>

              <div>
                <h3>Roles</h3>
                {roles &&
                  roles.map((role) => (
                    <div
                      key={role.id}
                      className="d-flex align-items-center flex-grow-1"
                    >
                      <Field
                        name="roleNames"
                        component={Checkbox}
                        value={role.normalizedName}
                      />
                      <div className="d-flex flex-wrap align-items-center justify-content-between w-100">
                        <div className="d-flex flex-column align-items-cente py-2 w-75">
                          <p className="text-dark-75 font-weight-bold text-hover-primary font-size-lg mb-1">
                            {role.name}
                          </p>
                          <span className="text-muted font-weight-bold">
                            {role.description}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
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
