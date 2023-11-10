import * as Yup from "yup";
import { useFormik } from "formik";
import { AddDepartmentApi, UpdateDepartmentPropertyApi } from "@Services/departmentService";
import { useNavigate } from "react-router-dom";
import { ModalBox } from "@Components/ModalBox";
import { TextInput, SubmitButton } from "@Components/FormInput";
import { CircularProgressBar } from "@Components/Loading";
import Toast from "@Components/Toast";
import useToggle from "@Hooks/useToggle";

const CreateDepartment = (prop) => {
    const token = sessionStorage.getItem("token");

    const navigate = useNavigate();

    const [toast, onSetToast] = useToggle();

    const formik = useFormik({
        initialValues: {
            name: prop.addDepartment ? "" : prop.selectedDepartment.name
        },

        onSubmit: async (values) => {
            prop.onSetSubmit();

            const response = prop.addDepartment
                ? await AddDepartmentApi(token, values)
                : await UpdateDepartmentPropertyApi(
                    token,
                    prop.selectedDepartment.id,
                    [{
                        path: "/name",
                        op: "replace",
                        value: values.name
                    }]
                );

            setTimeout(() => {
                if (response.status === 200) {
                    onSetToast();

                    console.log("Department Creation successful!");

                    setTimeout(() => {
                        prop.onSetOpenModal();
                    }, 1200);

                } else if (response.status === 400) {
                    formik.setErrors({
                        name: response.data
                    });
                } else {
                    navigate("/error");
                }

                prop.onSetSubmit();
            }, 800)
        },

        validationSchema: Yup.object({
            name: Yup.string().required("Department Name is required.")
                .min(2, "Department Name must be at least 2 characters.")
                .max(50, "Department Name can be at most 50 characters.")
        })
    });

    return (
        <ModalBox top="mt-8" onCancel={prop.onCancel}>

            {toast && <Toast message={`Department successfully ${prop.addDepartment ? "created!" : "updated!"}`} />}

            <header className="mb-6">
                <span className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-lato font-extrabold text-primary-light ">
                        {prop.addDepartment ? "Add" : "Update"} Department
                    </h1>
                </span>
            </header>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 ">
                <TextInput nameId="name"
                    name="Name"
                    type="text"
                    placeholder="Administration"
                    minLength={2}
                    maxLength={50}
                    onBlur={formik.handleBlur}
                    errors={formik.errors.name}
                    touched={formik.touched.name}
                    onChange={formik.handleChange}
                    value={formik.values.name} />

                <div className="self-end w-full sm:w-44 ">
                    <SubmitButton>
                        {(prop.submit) ? (
                            <CircularProgressBar>
                                <p className="ml-2 text-poppins text-white">Loading...</p>
                            </CircularProgressBar>
                        ) : (
                            <p className="text-poppins text-white">
                                {prop.addDepartment ? "Submit" : "Update"}
                            </p>
                        )}
                    </SubmitButton>
                </div>
            </form>
        </ModalBox>
    )
}

export default CreateDepartment;