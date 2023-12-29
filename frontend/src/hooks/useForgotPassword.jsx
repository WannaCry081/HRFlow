import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerifyCodeApi, ForgotPasswordApi } from "/src/services/authService.js";

const useForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      code: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      if (!isSubmit) {
        const response = await ForgotPasswordApi({
          email: values.email,
        });

        switch (response.status) {
          case 200:
            setSubmit(true);
            break;
          case 404:
            formik.setErrors({ email: response.data });
            break;
          default:
            navigate("/error");
            break;
        }
        setLoading(false);
      } else {
        const response = await VerifyCodeApi(values);
        setTimeout(() => {
          switch (response.status) {
            case 200:
              sessionStorage.setItem("token", response.data);
              navigate("/dashboard/home/", { replace: true });
              break;
            case 404:
            case 401:
              formik.setErrors({ code: response.data });
              break;
            default:
              navigate("/error");
              break;
          }
        }, 1000);
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email Address is required.")
        .email("Invalid Email Address")
        .min(5, "Email Address must be at least 5 characters.")
        .max(100, "Email Address can be at most 150 characters."),
      code: Yup.string().min(
        6,
        "Invalid Verification Code. Please enter again."
      ),
    }),
  });

  return [isLoading, isSubmit, formik];
};

export default useForgotPassword;
