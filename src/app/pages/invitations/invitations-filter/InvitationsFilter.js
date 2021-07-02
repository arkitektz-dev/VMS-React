import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useInvitationsUIContext } from "../InvitationsUIContext";

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

const InvitationsFilter = () => {
  // Invitations UI Context
  const invitationsUIContext = useInvitationsUIContext();
  const invitationsUIProps = useMemo(() => {
    return {
      setQueryParams: invitationsUIContext.setQueryParams,
      queryParams: invitationsUIContext.queryParams,
    };
  }, [invitationsUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(
      invitationsUIProps.queryParams,
      values
    );
    if (!isEqual(newQueryParams, invitationsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      invitationsUIProps.setQueryParams(newQueryParams);
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

export default InvitationsFilter;
