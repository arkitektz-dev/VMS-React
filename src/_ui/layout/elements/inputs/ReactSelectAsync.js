import React from "react";
import { useField } from "formik";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";
import Select from "react-select";
import AsyncSelect from "react-select/async";

const getFieldCSSClasses = (touched, errors) => {
  //   const classes = ["form-control", "form-control-solid"];
  const classes = [];
  if (touched && errors) {
    classes.push("is-invalid-select");
  }

  if (touched && !errors) {
    classes.push("is-valid-select");
  }

  return classes.join(" ");
};

export function ReactSelectAsync({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  options,
  dataFields,
  ...props
}) {
  return (
    <>
      {label && <label>Select {label}</label>}
      <AsyncSelect
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        cacheOptions
        defaultOptions
        {...field}
        {...props}
      />

      {touched[field.name] && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          label={label}
        />
      )}
    </>
  );
}
