import * as Yup from "yup";
import { useFormik } from "formik";
import { TextInput, SubmitButton, DatePickerInput} from "@Components/FormInput";
import { AddEmployeeApi } from "@Services/employeeService";
import { CircularProgressBar } from "@Components/Loading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToggle from "@Hooks/useToggle";
import Toast from "@Components/Toast";


const AddEmployeeForm = ( prop ) => {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const [date, onSetDate] = useState(null);
    const [age, onSetAge] = useState(null)
    const [toast, onSetToast] = useToggle();

    const calculateAge = ( selectedDate ) => {
        if(selectedDate){
            const today = new Date();
            const birthdate = new Date(selectedDate);
            const age = today.getFullYear() - birthdate.getFullYear();
            formik.setFieldValue("age", age);
            onSetAge(age);
        }
    }

    const handleDateChange = (selectedDate) => {
        onSetDate(selectedDate);  
        calculateAge(selectedDate);
        formik.setFieldValue("birthdate", date);
    };

    const formik = useFormik({
        initialValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: "",
            age: "",
            birthdate: "",
            personalEmail: "",
            companyEmail: "",
            mobileNumber: "",
            landlineNumber: ""
        },
        onSubmit: async (values) => {
            prop.onSetSubmit();
            values.birthdate = date;
            console.log(values);
            const { status, data } = await AddEmployeeApi(token, values);
            
            setTimeout(() => {
                if (status === 200) {
                    onSetToast(); 
                    console.log("Creation successful!");
                    setTimeout(() => {
                        prop.onSetAddEmployee(); 
                    }, 1200);
                } else if (status === 400) {
                    formik.setErrors({
                        companyEmail: data
                    });
                } else {
                    navigate("/error");
                }
                prop.onSetSubmit();
            }, 800)
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First Name is required.")
                .min(2, "First Name must be at least 2 characters.")
                .max(50, "First Name can be at most 50 characters."),
            middleName: Yup.string()
                .min(2, "Middle Name must be at least 2 characters.")
                .max(50, "Middle Name can be at most 50 characters."),
            lastName: Yup.string().required("Last Name is required.")
                .min(2, "Last Name must be at least 2 characters.")
                .max(50, "Last Name can be at most 50 characters."),
            suffix: Yup.string()
                .min(1, "Suffix must be at least 1 characters.")
                .max(5, "Suffix can be at most 5 characters."),
            age: Yup.number()
                .integer("Age must be an number.")
                .min(1, "Age must be greater than 0")
                .max(100, "Age can be at most 100 years."),
            personalEmail: Yup.string()
                .email("Invalid Email Address")
                .min(5, "Email Address must be at least 5 characters.")
                .max(150, "Email Address can be at most 150 characters."),
            companyEmail: Yup.string().required("Company Email Address is required.")
                .email("Invalid Email Address")
                .min(5, "Email Address must be at least 5 characters.")
                .max(150, "Email Address can be at most 150 characters."),
            mobileNumber: Yup.string().required("Mobile Number is required.")
                .matches(/^[0-9]+$/, "Mobile Number must contain only numbers.")
                .min(11, "Mobile Number must at least 11 digits.")
                .max(13, "Mobile Number can be at most 13 digits."),
            landlineNumber: Yup.string()
                .matches(/^[0-9]+$/, "Landline Number must contain only numbers.")
                .min(3, "Landline Number must at least 3 digits.")
                .max(13, "Landline Number can be at most 13 digits."),
        })
    });


    return (
        <div className="w-full">
            {toast && <Toast message="Employee successfully added!" />}
            <section className="overflow-y-auto bg-white p-4 md:p-10 h-full w-full rounded-2xl flex flex-col rounded-tl-3xl rounded-tr-3xl 2xl:rounded-tl-[2.5rem] 2xl:rounded-tr-[2.5rem]">
                <section className="mx-auto max-w-[45rem]">
                    <header className="self-start">
                        <h1 className="text-3xl md:text-4xl font-lato font-black text-primary-light pt-12 md:pt-6 pb-4 self-start">
                            Add New Employee
                        </h1>
                    </header>
                    <form onSubmit={formik.handleSubmit} className="flex flex-col w-full py-2 gap-4 max-w-[60rem] min-w-[20rem]">
                    {/* Name */}
                    <div className="flex flex-col sm:flex-row gap-2 w-full">
                        <div className="w-full flex gap-2">
                            <div className="w-full">
                                <TextInput nameId="firstName"
                                    required="required"
                                    name="First Name"
                                    type="text"
                                    placeholder="John"
                                    maxLength={100}
                                    onBlur={formik.handleBlur}
                                    errors={formik.errors.firstName}
                                    touched={formik.touched.firstName}
                                    onChange={formik.handleChange}
                                    value={formik.values.firstName} />
                            </div>
                            <div className="w-full">
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
                            </div>
                        </div>
                        <div className="flex w-full gap-2">
                            <div className="w-full">
                                <TextInput nameId="lastName"
                                    required="required"
                                    name="Last Name"
                                    type="text"
                                    placeholder="Doe"
                                    maxLength={100}
                                    onBlur={formik.handleBlur}
                                    errors={formik.errors.lastName}
                                    touched={formik.touched.lastName}
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName} />
                            </div>
                            <div className="w-3/5">
                                <TextInput nameId="suffix"
                                    name="Suffix"
                                    type="text"
                                    placeholder="Jr"
                                    maxLength={100}
                                    onBlur={formik.handleBlur}
                                    errors={formik.errors.suffix}
                                    touched={formik.touched.suffix}
                                    onChange={formik.handleChange}
                                    value={formik.values.suffix} />
                            </div>
                        </div>
                    </div>

                    {/* Age and Birthdate */}
                    <div className="flex gap-2 w-full">
                        <div className="w-full">
                            <TextInput nameId="age"
                                name="Age"
                                type="text"
                                placeholder=""
                                required="required"
                                readOnly={true}
                                maxLength={100}
                                onBlur={formik.handleBlur}
                                errors={formik.errors.age}
                                touched={formik.touched.age}
                                onChange={formik.handleChange}
                                value={formik.values.age} />
                        </div>
                        <div className="">
                            <DatePickerInput nameId="birthdate" 
                                id="birthdate" 
                                name="Birthdate" 
                                placeholder="Jan 01 2023"
                                selected={date}
                                onChange={handleDateChange}
                            />
                        </div>
                    </div>

                    {/* Company Email and Personal Email */}
                    <div className="flex gap-2">
                        <div className="w-full">
                            <TextInput nameId="companyEmail"
                                required="required"
                                name="Company Email"
                                type="text"
                                placeholder="johndoe@company.com"
                                maxLength={100}
                                onBlur={formik.handleBlur}
                                errors={formik.errors.companyEmail}
                                touched={formik.touched.companyEmail}
                                onChange={formik.handleChange}
                                value={formik.values.companyEmail} />
                        </div>
                        <div className="w-full">
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
                        </div>
                    </div>

                    {/* Mobile Number and Landline Number */}
                    <div className="flex gap-2">
                        <div className="w-full">
                            <TextInput nameId="mobileNumber"
                                required="required"
                                name="Mobile Number"
                                type="text"
                                placeholder="09123456789"
                                maxLength={100}
                                onBlur={formik.handleBlur}
                                errors={formik.errors.mobileNumber}
                                touched={formik.touched.mobileNumber}
                                onChange={formik.handleChange}
                                value={formik.values.mobileNumber} />
                        </div>
                        <div className="w-full">
                            <TextInput nameId="landlineNumber"
                                name="Landline Number"
                                type="text"
                                placeholder="520-1234"
                                maxLength={100}
                                onBlur={formik.handleBlur}
                                errors={formik.errors.landlineNumber}
                                touched={formik.touched.landlineNumber}
                                onChange={formik.handleChange}
                                value={formik.values.landlineNumber} />
                        </div>
                    </div>
                    <div className="py-6 flex gap-2 2xl:self-end w-full justify-center 2xl:w-1/2">
                        <button 
                            onClick={prop.onSetAddEmployee}
                            className="border border-gray-300 rounded-full h-14 font-semibold w-full">
                            Cancel
                        </button>
                        <SubmitButton>
                            {(prop.submit) ? (
                                <CircularProgressBar>
                                    <p className="ml-2 text-poppins text-white">Loading...</p>
                                </CircularProgressBar>
                            ) : (
                                <p className="text-poppins text-white">Submit</p>
                            )}
                        </SubmitButton>
                    </div>
                  </form>
                </section>
            </section>
        </div>
    )
}

export default AddEmployeeForm;