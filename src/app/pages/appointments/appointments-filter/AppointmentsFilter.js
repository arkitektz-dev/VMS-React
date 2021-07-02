import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useAppointmentsUIContext } from "../AppointmentsUIContext";

const prepareFilter = (queryParams, values) => {
  const { searchText } = values;
  const newQueryParams = { ...queryParams };
  newQueryParams.keyword = "";

  // Filter by all fields
  if (searchText) {
    newQueryParams.keyword = searchText;
  }
  return newQueryParams;
};

const AppointmentsFilter = () => {
  // Appointments UI Context
  const appointmentsUIContext = useAppointmentsUIContext();
  const appointmentsUIProps = useMemo(() => {
    return {
      setQueryParams: appointmentsUIContext.setQueryParams,
      queryParams: appointmentsUIContext.queryParams,
    };
  }, [appointmentsUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      appointmentsUIProps.queryParams,
      values
    );
    if (!isEqual(newQueryParams, appointmentsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      appointmentsUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          searchText: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search</b> in all fields
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AppointmentsFilter;
