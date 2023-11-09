import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JoinTeamApi } from "@Services/teamService.js";

const useJoinTeam = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const response = await JoinTeamApi(token, values);

      setTimeout(() => {
        switch (response.status) {
          case 200:
            navigate("/dashboard/home/", { replace: true });
            break;
          case 404:
          case 400:
            formik.setErrors({ code: response.data });
            break;
          default:
            navigate("/error");
            break;
        }
        setLoading(false);
      }, 1000);
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .required("Team Code is required.")
        .min(6, "Invalid Team Code. Please enter again."),
    }),
  });

  return [isLoading, formik];
};

export default useJoinTeam;
