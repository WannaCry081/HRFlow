import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateTeamApi } from "@Services/teamService.js";

const useCreateTeam = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const response = await CreateTeamApi(token, values);
      setTimeout(() => {
        switch (response.status) {
          case 200:
            navigate("/dashboard/home", { replace: true });
            break;
          case 404:
          case 400:
            formik.setErrors({ name: response.data });
            break;
          default:
            navigate("/error");
            break;
        }
        setLoading(false);
      }, 1000);
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Team Name is required.")
        .min(2, "Team Name must be at least 2 characters.")
        .max(50, "Team Name can be at most 50 characters."),
    }),
  });

  return [isLoading, formik];   
};

export default useCreateTeam;
