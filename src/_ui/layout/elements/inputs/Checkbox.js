import React from "react";

export function Checkbox({ field, form: { touched, errors }, ...props }) {
  return (
    <>
      <label className="checkbox checkbox-lg checkbox-lg checkbox-single flex-shrink-0 mr-4">
        <input type="checkbox" id={field.name} {...field} {...props} />
        <span></span>
      </label>
    </>
  );
}
