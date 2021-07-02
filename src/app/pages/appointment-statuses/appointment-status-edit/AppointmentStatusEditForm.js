import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "./../../../../_ui/layout/elements/";

// Validation schema
const AppointmentStatusEditSchema = Yup.object().shape({
  status: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Status is required"),
});

function AppointmentStatusEditForm({
  appointmentStatus,
  btnRef,
  updateAppointmentStatus,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={appointmentStatus}
        validationSchema={AppointmentStatusEditSchema}
        onSubmit={(values) => {
          updateAppointmentStatus(values);
        }}
      >
        {({ values, handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      name="status"
                      component={Input}
                      placeholder="Status"
                      className="form-control"
                      label="Status"
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

export default AppointmentStatusEditForm;
