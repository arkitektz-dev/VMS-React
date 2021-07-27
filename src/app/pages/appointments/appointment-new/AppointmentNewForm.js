import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, TextArea } from "./../../../../_ui/layout/elements";
import AsyncSelect from "react-select/async";
import * as Yup from "yup";
import AppointmentRepository from "../../../repositories/appointment/appointmentRepository";

// Validation schema
const AppointmentNewSchema = Yup.object().shape({
  visitorId: Yup.string().required("Visitor is required"),
  employeeId: Yup.string().required("Employee is required"),
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  purposeOfVisit: Yup.string(),
  arrivalInstructions: Yup.string(),
  destination: Yup.string(),
});

function AppointmentNewForm({ appointment, btnRef, saveAppointment }) {
  const [users, setUsers] = useState([]);

  const visitorOptions = async (inputValue) => {
    const response = await AppointmentRepository.getVisitorsByKeyword({
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

  const onVisitorChange = async (visitorId) => {
    const response = await AppointmentRepository.getUsersByKeyword({
      term: visitorId,
    });
    setUsers(response.data.result);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={appointment}
        validationSchema={AppointmentNewSchema}
        onSubmit={(values) => {
          saveAppointment(values);
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-6">
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={visitorOptions}
                    onChange={({ value }) => {
                      onVisitorChange(value);
                      setFieldValue("visitorId", value);
                    }}
                    name="visitorId"
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    as="select"
                    name="employeeId"
                    className="form-control"
                    label="Employee"
                  >
                    <option value="">Please Select Employee</option>
                    {users &&
                      users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.fullName}
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

export default AppointmentNewForm;
