import { ModalBox } from "@Components/ModalBox";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TextInput, SubmitButton} from "@Components/FormInput";
import { AddEmployeeApi } from "@Services/employeeService";
import { ProgressBar, CircularProgressBar } from "@Components/Loading";
import useToggle from "@Hooks/useToggle";

const AddEmployeeForm = ( prop ) => {
    const token = sessionStorage.getItem("token");

    const formik = useFormik({
        initialValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: "",
            personalEmail: "",
            companyEmail: "",
            mobileNumber: "",
            landlineNumber: "000"
        },
        onSubmit: async (values) => {
            prop.onSetSubmit();

            const { status, data } = await AddEmployeeApi(token, values);
            setTimeout(() => {
                if (status === 200) {
                    prop.onSetAddEmployee();
                } else if (status === 400) {
                    formik.setErrors({
                        companyEmail: data
                    });
                } else {
                    navigate("/error");
                }
                prop.onSetSubmit();
            }, 1000)
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First Name is required.")
                .min(2, "First Name must be at least 2 characters.")
                .max(50, "First Name can be at most 50 characters."),
            middleName: Yup.string()
                .min(2, "Last Name must be at least 2 characters.")
                .max(50, "Last Name can be at most 50 characters."),
            lastName: Yup.string().required("Last Name is required.")
                .min(2, "Last Name must be at least 2 characters.")
                .max(50, "Last Name can be at most 50 characters."),
            personalEmail: Yup.string()
                .email("Invalid Email Address")
                .min(4, "Email Address must be at least 4 characters.")
                .max(150, "Email Address can be at most 150 characters."),
            companyEmail: Yup.string().required("Company Email Address is required.")
                .email("Invalid Email Address")
                .min(4, "Email Address must be at least 4 characters.")
                .max(150, "Email Address can be at most 150 characters."),
            mobileNumber: Yup.string()
                .min(11, "Mobile Number must at least 11 digits.")
                .max(13, "Mobile Number can be at most 13 digits."),
            landlineNumber: Yup.string()
                .min(3, "Landline Number must be at least 3 digits.")
                .max(13, "Landline Number can be at most 13 digits."),
        })
    });


    return (
        < ModalBox top="mt-4"
            topBreakpoint="sm:" >
            <header className="mb-6">
                <span className="flex items-center gap-2">
                    <h1 className="text-3xl font-lato font-extrabold text-primary-light ">
                        Add Employee
                    </h1>
                </span>
            </header>
            <section className="flex flex-col">
                <form onSubmit={formik.handleSubmit}>
                    <TextInput nameId="firstName"
                        name="First Name"
                        type="text"
                        placeholder="Johnny"
                        maxLength={100}
                        onBlur={formik.handleBlur}
                        errors={formik.errors.firstName}
                        touched={formik.touched.firstName}
                        onChange={formik.handleChange}
                        value={formik.values.firstName} />

                    <TextInput nameId="middleName"
                        name="Middle Name"
                        type="text"
                        placeholder="Watson"
                        maxLength={100}
                        onBlur={formik.handleBlur}
                        errors={formik.errors.middleName}
                        touched={formik.touched.middleName}
                        onChange={formik.handleChange}
                        value={formik.values.middleName} />

                    <TextInput nameId="lastName"
                        name="Last Name"
                        type="text"
                        placeholder="Doe"
                        maxLength={100}
                        onBlur={formik.handleBlur}
                        errors={formik.errors.lastName}
                        touched={formik.touched.lastName}
                        onChange={formik.handleChange}
                        value={formik.values.lastName} />

                    <TextInput nameId="companyEmail"
                        name="Company Email"
                        type="text"
                        placeholder="johndoe@company.com"
                        maxLength={100}
                        onBlur={formik.handleBlur}
                        errors={formik.errors.companyEmail}
                        touched={formik.touched.companyEmail}
                        onChange={formik.handleChange}
                        value={formik.values.companyEmail} />

                    <TextInput nameId="personalEmail"
                        name="Personal Email"
                        type="text"
                        placeholder="johndoe@gmail.com"
                        maxLength={100}
                        onBlur={formik.handleBlur}
                        errors={formik.errors.personalEmail}
                        touched={formik.touched.personalEmail}
                        onChange={formik.handleChange}
                        value={formik.values.personalEmail} />

                    <TextInput nameId="mobileNumber"
                        name="Mobile Number"
                        type="text"
                        placeholder="09123456789"
                        maxLength={100}
                        onBlur={formik.handleBlur}
                        errors={formik.errors.mobileNumber}
                        touched={formik.touched.mobileNumber}
                        onChange={formik.handleChange}
                        value={formik.values.mobileNumber} />

                    <SubmitButton>
                        {(prop.submit) ? (
                            <CircularProgressBar>
                                <p className="ml-2 text-poppins text-white">Loading...</p>
                            </CircularProgressBar>
                        ) : (
                            <p className="text-poppins text-white">Submit</p>
                        )}
                    </SubmitButton>
                </form>
            </section>
        </ModalBox >
    )
}

export default AddEmployeeForm;