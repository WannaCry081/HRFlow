import * as Yup from "yup";
import { useFormik } from "formik";
import { TextInput, SubmitButton } from "@Components/FormInput";
import { JoinTeamApi } from "@Services/userService.js";
import { CircularProgressBar } from "@Components/Loading";
import useToggle from "@Hooks/useToggle";

const JoinTeamSection = () => {
    const [submit, onSetSubmit] = useToggle();

    const formik = useFormik({
        initialValues : {
            code : ""
        },
        onSubmit : async (values) => {
            const token = sessionStorage.getItem("token");
            const response = await JoinTeamApi(token, values)
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