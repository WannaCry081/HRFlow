import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUserApi } from "@Services/authService";

const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const response = await LoginUserApi(values);

      setTimeout(() => {
        switch (response.status) {
          case 200:
            sessionStorage.setItem("token", response.data);
            navigate("/dashboard/home", { replace: true });
            break;
          case 401:
          case 404:
            formik.setErrors({ password: response.data });
            break;
          default:
            navigate("/error", { replace: true });
            break;
        }
        setLoading(false);
      }, 1000);
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email Address is required.")
        .email("Invalid Email Address")
        .min(5, "Email Address must be at least 5 characters.")
        .max(100, "Email Address can be at most 100 characters."),
      password: Yup.string()
        .required("Password is required.")
        .min(8, "Password must be at least 8 characters.")
        .max(100, "Password can be at most 100 characters."),
    }),
  });

  return [isLoading, formik];
};

export default useLogin;
