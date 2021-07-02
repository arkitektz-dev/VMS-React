import React from "react";

const inputLabel = ({ label, touched, error }) => {
  if (touched && error) {
    return <div className="invalid-feedback">{error}</div>;
  }

  // if (touched && !error && label) {
  //   return <div className="valid-feedback">{label} was entered correct</div>;
  // }

  return null;
};

export function FieldFeedbackLabel({ label, touched, error }) {
  return inputLabel({ label, touched, error });
}
