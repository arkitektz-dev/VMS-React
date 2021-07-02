import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Checkbox } from "./../../../../_ui/layout/elements/";
import { shallowEqual, useSelector } from "react-redux";

// Validation schema
const UserEditSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("User Name is required"),
  name: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  surname: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(2020, "2020 is maximum")
    .max(50, "Maximum 50 symbols"),
  emailAddress: Yup.string().email().required("Email is required"),
  isActive: Yup.boolean(),
  fullName: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(2020, "2020 is maximum")
    .max(50, "Maximum 50 symbols"),
});

function UserEditForm({ user, btnRef, updateUser }) {
  // Getting roles list from store
  const { roles } = useSelector(
    (state) => ({ roles: state.roles.entities }),
    shallowEqual
  );

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={UserEditSchema}
        onSubmit={(values) => {
          updateUser(values);
        }}
      >
        {({ values, handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="userName"
                      component={Input}
                      placeholder="User Name"
                      className="form-control"
                      label="User Name"
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
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <label>
                      <Field type="checkbox" name="isActive" />
                      {`${values.isActive}`}
                    </label>
                  </div>
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
                        checked={values.roleNames.includes(role.normalizedName)}
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

export default UserEditForm;
