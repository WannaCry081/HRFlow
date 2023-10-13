import * as Yup from "yup";
import { useFormik } from "formik";
import { TextInput, SubmitButton } from "@Components/FormInput";
import { CreateTeamApi } from "@Services/userService.js";
import { CircularProgressBar } from "@Components/Loading";
import useToggle from "@Hooks/useToggle";

const CreateTeamSection = () => {
    const [submit, onSetSubmit] = useToggle();
    const formik = useFormik({
        initialValues : {
            name : ""
        },
        onSubmit : async (values) => {
            const token = sessionStorage.getItem("token");
            const response = await CreateTeamApi(token, values);
        },
        validationSchema : Yup.object({
            name : Yup.string().required("Team Name is required.")
                .min(2, "Team Name must be at least 2 characters.")
                .max(50, "Team Name can be at most 50 characters."),
        })
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                <TextInput nameId="teamName"
                    name="Team Name"
                    type="text"
                    placeholder="HR Flow"
                    maxLength={150}
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
        </>
    );
};

export default CreateTeamSection;