import * as Yup from "yup";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TextInput, SubmitButton } from "@Components/FormInput";
import { CreateTeamApi } from "@Services/teamService.js";
import { CircularProgressBar } from "@Components/Loading";
import useToggle from "@Hooks/useToggle";

const CreateTeamSection = () => {
    const navigate = useNavigate();
    const [submit, onSetSubmit] = useToggle();
    const formik = useFormik({
        initialValues : {
            name : ""
        },
        onSubmit : async (values) => {
            onSetSubmit();
            const token = sessionStorage.getItem("token");
            const { status, data } = await CreateTeamApi(token, values);
            setTimeout(() => {
                if (status === 200) {
                    navigate("/dashboard/home", {replace : true});
                } else if (status === 404 || status === 400) {
                    formik.setErrors({
                        name : data
                    });
                } else {
                    navigate("/error");
                }
                onSetSubmit();
            }, 1000);
        },
        validationSchema : Yup.object({
            name : Yup.string().required("Team Name is required.")
                .min(2, "Team Name must be at least 2 characters.")
                .max(50, "Team Name can be at most 50 characters."),
        })
    });

    return (
        <motion.div initial={{ translateX : 20 }}
                    animate={{ translateX : 0 }}>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                <TextInput nameId="name"
                    name="Team Name"
                    type="text"
                    placeholder="HR Flow"   
                    maxLength={100}
                    errors={formik.errors.name}
                    touched={formik.touched.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}/>

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
        </motion.div>
    );
};

export default CreateTeamSection;