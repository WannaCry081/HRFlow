import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { TextInput, SubmitButton } from "@Components/FormInput";
import { JoinTeamApi } from "@Services/userService.js";
import { CircularProgressBar } from "@Components/Loading";
import useToggle from "@Hooks/useToggle";

const JoinTeamSection = () => {
    const navigate = useNavigate();
    const [submit, onSetSubmit] = useToggle();

    const formik = useFormik({
        initialValues : {
            code : ""
        },
        onSubmit : async (values) => {
            onSetSubmit();
            const token = sessionStorage.getItem("token");
            const {status, data} = await JoinTeamApi(token, values)
            
            setTimeout(() => {
                if (status === 200) {
                    sessionStorage.setItem("token", data);
                    navigate("/dashboard/error");
                } else if (status === 404 || status === 400) {
                    formik.setErrors({
                        code : status
                    });
                } else {
                    navigate("/error");
                }
                onSetSubmit();
            }, 1000);
        },
        validationSchema : Yup.object({
            code : Yup.string().required("Team Code is required.")    
                .min(6, "Invalid Team Code. Please enter again.")
        })
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                <TextInput nameId="teamCode"
                    name="Team Code"
                    type="text"
                    placeholder="7HX7J8"
                    maxLength={150}
                    errors={formik.errors.code}
                    touched={formik.touched.code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.code}/>

                <div className="w-full sm:w-44 self-end">
                    <SubmitButton>
                        {(submit) ? (
                            <CircularProgressBar>
                                <p className="ml-2 text-poppins text-white">Loading...</p>
                            </CircularProgressBar>
                        ) : (
                            <p className="text-poppins text-white">Submit</p>
                        )}
                    </SubmitButton>
                </div>
            </form>
        </>
    );
};

export default JoinTeamSection;