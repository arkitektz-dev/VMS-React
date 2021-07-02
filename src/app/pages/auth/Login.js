import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import SVG, { Props as SVGProps } from "react-inlinesvg";
import AuthRepository from "../../repositories/auth/authRepository";
import { actions } from "../../store/auth/action";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import TenantRepository from "../../repositories/tenant/tenantRepository";

const initialValues = {
  email: "",
  password: "",
  rememberMe: false,
  tenantId: "",
};

const abp = window.abp;

function Login() {
  const dispatch = useDispatch();

  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tenantId, setTenantId] = useState("");

  const getTenants = async () => {
    var result = await TenantRepository.getAll1();
    const tenants = result.items.filter((i) => i.isActive);
    setTenants(tenants);
  };

  useEffect(() => {
    getTenants();
  }, []);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("This field is required"),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(),
  });

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);

      const input = {
        userNameOrEmailAddress: values.email,
        password: values.password,
        rememberClient: values.rememberMe,
        tenantId,
      };

      AuthRepository.authenticate(input)
        .then((data) => {
          data.rememberMe = input.rememberClient;

          dispatch(actions.login(data));
        })
        .catch((err) => {
          setLoading(false);
          setSubmitting(false);
          setStatus("error");
        });
    },
  });

  const handleTenantChange = (e) => {
    var tenantId = e.currentTarget.value;
    setTenantId(tenantId);
    abp.multiTenancy.setTenantIdCookie(tenantId);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {formik.status ? (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : (
          <div className="mb-10 alert alert-custom alert-light-info alert-dismissible">
            <div className="alert-text ">
              Use account <strong>admin@demo.com</strong> and password{" "}
              <strong>demo</strong> to continue.
            </div>
          </div>
        )}
        <div className="wrap-input100 validate-input mb-3">
          <select
            value={tenantId}
            className={`input100 ${getInputClasses("tenantId")}`}
            onChange={handleTenantChange}
          >
            <option value="">Select</option>
            {tenants.map((t) => (
              <option key={t.id} value={t.id}>
                {t.tenancyName}
              </option>
            ))}
          </select>
          <span className="svg-icon svg-icon-sm symbol-input100">
            <SVG src="/assets/images/icons/svg/mail.svg" />
          </span>
        </div>

        <div className="wrap-input100 validate-input mb-3">
          <input
            placeholder="Email Or User Name"
            type="text"
            className={`input100 ${getInputClasses("email")}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          <span className="svg-icon svg-icon-sm symbol-input100">
            <SVG src="/assets/images/icons/svg/mail.svg" />
          </span>
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="wrap-input100 validate-input mb-3">
          <input
            placeholder="Password"
            type="password"
            className={`input100 ${getInputClasses("password")}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          <span className="svg-icon svg-icon-sm symbol-input100">
            <SVG src="/assets/images/icons/svg/lock.svg" />
          </span>
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className="contact100-form-checkbox">
          <input
            type="checkbox"
            className="input-checkbox100"
            name="rememberMe"
            id="ckb1"
            {...formik.getFieldProps("rememberMe")}
          />

          <label className="label-checkbox100" htmlFor="ckb1">
            Remember me
          </label>
        </div>
        <div className="container-login100-form-btn pt-3">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="btn btn-block btn-primary"
          >
            <span>Sign In</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
        <div className="text-center w-full pt-4 pb-4">
          <span className="txt1">Or login with</span>
        </div>
        <div>
          <button className="btn-face mr-1" type="button">
            Okta
          </button>

          <button className="btn-face" type="button">
            Adfs
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
