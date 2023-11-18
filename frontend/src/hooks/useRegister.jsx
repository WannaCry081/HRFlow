import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUserApi } from "/src/services/authService.js";

const useRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [isSubmit, setSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      setLoading(true);

      const response = await RegisterUserApi(values);
      setTimeout(() => {
        switch (response.status) {
          case 200:
            sessionStorage.setItem("token", response.data);
            setSubmit(true);
            break;
          case 400:
            formik.setErrors({ confirmPassword: response.data });
            break;
          default:
            navigate("/error");
            break;
        }
        setLoading(false);
      }, 1000);
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First Name is required.")
        .min(2, "First Name must be at least 2 characters.")
        .max(50, "First Name can be at most 50 characters."),
      lastName: Yup.string()
        .required("Last Name is required.")
        .min(2, "Last Name must be at least 2 characters.")
        .max(50, "Last Name can be at most 50 characters."),
      email: Yup.string()
        .required("Email Address is required.")
        .email("Invalid Email Address")
        .min(5, "Email Address must be at least 5 characters.")
        .max(100, "Email Address can be at most 100 characters."),
      password: Yup.string()
        .required("Password is required.")
        .min(8, "Password must be at least 8 characters.")
        .max(100, "Password can be at most 100 characters."),
      confirmPassword: Yup.string()
        .required("Confirm Password is required.")
        .oneOf([Yup.ref("password"), null], "Passwords do not match."),
    }),
  });

  return [isLoading, isSubmit, formik];
};

export default useRegister;
