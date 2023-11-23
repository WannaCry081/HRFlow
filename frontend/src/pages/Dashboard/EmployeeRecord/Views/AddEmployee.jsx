import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { TextInput, 
        SubmitButton, 
        DatePickerInput, 
        DropdownMenu } from "/src/components/FormInput";
import { AddEmployeeApi } from "/src/services/employeeService";
import { CircularProgressBar } from "/src/components/Loading";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useToggle from "/src/hooks/useToggle";
import Toast from "/src/components/Toast";
import useDepartments from "/src/hooks/useDepartments";
import usePositions from "/src/hooks/usePositions";


const AddEmployeeForm = (prop) => {
    const token = sessionStorage.getItem("token");

    const navigate = useNavigate();

    const [date, onSetDate] = useState(null);
    const [age, onSetAge] = useState(null)
    const [sex, onSetSex] = useState("");
    const [password, onSetPassword] = useState("");

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [department, setDepartment] = useState("");
    const [position, setPosition] = useState("");


    const [toast, onSetToast] = useToggle();

    const departments = useDepartments(prop.submit);
    const positions = usePositions(selectedDepartment, selectedDepartment?.id || "");

    const handleDepartmentChange = (event) => {
        const selected = departments.find((dept) => dept.name === event.target.value);
        if (selected) {
            setDepartment(event.target.value);
            setSelectedDepartment(selected);
            formik.setFieldValue("department", event.target.value);
        } else {
            setSelectedDepartment(null);
        }
    }

    const handlePositionChange = (event) => {
        setPosition(event.target.value);
        formik.setFieldValue("position", event.target.value);
    }

    const departmentOptions = departments.map((department) => (
        <option key={department.id} value={department.name} className="py-2">
            {department.name}
        </option>
    ));

    const positionOptions = positions.map((position) => (
        <option key={position.id} value={position.name} className="py-2">
            {position.title}
        </option>
    ));

    const generatePassword = (length) => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            code += chars.charAt(randomIndex);
        }

        onSetPassword(code);
    };

    const calculateAge = (selectedDate) => {
        if (selectedDate) {
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

    const handleGeneratePassword = () => {
        generatePassword(8);
        formik.setFieldValue('password', password);
    }

    const formik = useFormik({
        initialValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: "",
            age: "",
            birthdate: "",
            sex: "",
            personalEmail: "",
            companyEmail: "",
            mobileNumber: "",
            landlineNumber: "",
            department: "",
            position: "",
            password: "",
            confirmPassword: ""
        },
        onSubmit: async (values) => {
            prop.onSetSubmit();

            values.birthdate = date;
            values.department = department;
            values.position = position;
            values.password = password;
            values.confirmPassword = password;
            values.sex = sex;

            const { status, data } = await AddEmployeeApi(token, values);

            setTimeout(() => {
                if (status === 200) {
                    onSetToast();
                    console.log("Creation successful!");
                    setTimeout(() => {
                        onSetToast();
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
            companyEmail: Yup.string().required("Company Email Address is required.")
                .email("Invalid Email Address")
                .min(5, "Email Address must be at least 5 characters.")
                .max(150, "Email Address can be at most 150 characters."),
            personalEmail: Yup.string().required("Personal Email Address is required.")
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
            department: Yup.string().required("Department is required."),
            position: Yup.string().required("Position is required."),
            password: Yup.string().required("Password is required."),
        })
    });


    return (
        <div className="flex h-full w-full">
            {toast && <Toast message="Employee successfully added!" />}

            <section className=" bg-white overflow-y-auto p-4 md:p-10 w-full rounded-2xl flex flex-col rounded-top-3xl 2xl:rounded-top-[2.5rem]">
                <section className="w-full">
                    <header className="flex gap-6 items-center mb-8">
                        <AiOutlineArrowLeft
                            onClick={prop.onSetAddEmployee}
                            size={32} className="fill-gray-500 cursor-pointer" />
                        <h1 className="text-3xl md:text-4xl font-lato font-bold text-lilac">
                            Add New Employee
                        </h1>
                    </header>
                    <form onSubmit={formik.handleSubmit} className="flex w-full mt-4 gap-8">
                        <div className="w-full">
                            <h1 className="text-lg font-semibold font-lato text-blush uppercase">Personal Information</h1>
                            <div className="flex flex-col mt-3 gap-2 w-full">
                                <div className="w-full flex gap-3">
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
                                <div className="flex w-full gap-3">
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
                                    <div className="w-full">
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
                                <div className="flex w-full gap-3">
                                    <div className="flex w-full gap-3">
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
                                        <div className="w-full">
                                            <DatePickerInput nameId="birthdate"
                                                id="birthdate"
                                                name="Birthdate"
                                                placeholder="Jan 01 2023"
                                                selected={date}
                                                onChange={handleDateChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <p className="font-poppins mb-2 text-sm">
                                            Sex
                                            <span className="text-red-500">*</span>
                                        </p>
                                        <div className="flex gap-3 w-full">
                                            <div className={`p-4 font-lato rounded-md w-full text-center cursor-pointer 
                                                ${sex == "M" ? "bg-green-100 border-2 border-green-400 font-semibold" : "bg-gray-100"}`}
                                                onClick={() => onSetSex("M")}>
                                                Male
                                            </div>
                                            <div className={`p-4 font-lato rounded-md w-full text-center cursor-pointer
                                                ${sex == "F" ? "bg-green-100 border-2 border-green-400 font-semibold" : "bg-gray-100"}`}
                                                onClick={() => onSetSex("F")}>
                                                Female
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
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
                                            required="required"
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
                                <div className="flex gap-3">
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

                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-10">
                            <div>
                                <h1 className="text-lg font-semibold font-lato text-blush uppercase">Company Details</h1>
                                <div className="flex flex-col gap-4 mt-2">
                                    {/* Select Department */}
                                    <DropdownMenu
                                        label="Department"
                                        id="department"
                                        name="department"
                                        value={department}
                                        onChange={handleDepartmentChange}
                                        defaultOption="Select a deparment"
                                        options={departmentOptions}
                                        errors={formik.errors.department}
                                        touched={formik.touched.department}
                                    />

                                    <DropdownMenu
                                        label="Position"
                                        id="position"
                                        name="position"
                                        value={position}
                                        onChange={handlePositionChange}
                                        defaultOption="Select a position"
                                        options={positionOptions}
                                        errors={formik.errors.position}
                                        touched={formik.touched.position}
                                    />

                                </div>
                            </div>
                            <div className="w-full">
                                <h1 className="text-lg font-semibold font-lato text-blush uppercase">Setting up Password</h1>
                                <div className="flex justify-between gap-3 items-start my-4">
                                    <div className="flex flex-col w-full">
                                        <input
                                            value={formik.values.password}
                                            onChange={(e) => onSetPassword(e.target.value)}
                                            placeholder="c03mv8dh"
                                            className=" border border-primary-pastel rounded-md bg-gray-100 p-3 font-lato focus:border focus:outline-primary-light h-12 lg:h-14"
                                        />
                                        <div className="text-sm mt-2 text-start text-red-500 font-semibold">
                                            {formik.errors.password && formik.touched.password && formik.errors.password}
                                        </div>
                                    </div>
                                    <div onClick={() => {
                                        generatePassword(8);
                                        formik.setFieldValue('password', password) }}

                                        className="w-72 gap-2 bg-blush flex items-center rounded-lg justify-center p-4 hover:bg-blush-dark h-full">
                                        <p className="hidden lg:block text-white font-poppins font-medium cursor-pointer">
                                            Generate Password
                                        </p>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="pt-12 flex gap-2 2xl:self-end w-full justify-center 2xl:w-1/2">
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
                        </div>
                    </form>
                </section>
            </section>
        </div>
    )
}

export default AddEmployeeForm;