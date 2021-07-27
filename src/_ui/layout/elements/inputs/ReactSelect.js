import React from "react";
import { useField } from "formik";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";
import Select from "react-select";

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

export function ReactSelect({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  options,
  dataFields,
  ...props
}) {
  const transformedOptions = () => {
    if (options.length <= 0) return [];

    if (dataFields) {
      return options.map((option) => ({
        value: option[dataFields.value],
        label: option[dataFields.label],
      }));
    }

    return [];
  };

  return (
    <>
      {label && <label>Select {label}</label>}
      <Select
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        options={transformedOptions()}
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
