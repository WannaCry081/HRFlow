import { useState } from "react";
import { CircularProgressBar } from "/src/components/Loading";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAddEmployee,useDepartments, usePositions } from "/src/hooks";
import Toast from "/src/components/Toast";
import { TextInput, 
        SubmitButton, 
        DatePickerInput, 
        DropdownMenu } from "/src/components/FormInput";


const AddEmployeeForm = (prop) => {
    
    const [department, setDepartment] = useState("");
    const [position, setPosition] = useState("");
    const [
        submit,
        { errors, values, touched, handleBlur, handleSubmit, handleChange, setFieldValue },
        toast
    ] = useAddEmployee(department, position, prop.onSetAddEmployee); 

    const [date, onSetDate] = useState(null);
    const [sex, onSetSex] = useState("");
    const [password, onSetPassword] = useState("");

    const [selectedDepartment, setSelectedDepartment] = useState(null);
    
    const departments = useDepartments();
    const positions = usePositions(selectedDepartment, selectedDepartment?.id || "");

    const generatePassword = (length) => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            code += chars.charAt(randomIndex)}
        return code;
    };

    const calculateAge = (selectedDate) => {
        if (selectedDate) {
            const today = new Date();
            const birthdate = new Date(selectedDate);
            const age = today.getFullYear() - birthdate.getFullYear();
            setFieldValue("age", age);
        }
    }

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
                    <form onSubmit={handleSubmit} className="flex w-full mt-4 gap-8">
                        <div className="w-full">
                            <h1 className="text-lg font-semibold font-lato text-blush uppercase">Personal Information</h1>
                            <div className="flex flex-col mt-3 gap-2 w-full">
                                {/* First Name */}   
                                <div className="w-full flex gap-3">
                                    <div className="w-full">
                                        <TextInput nameId="firstName"
                                            required="required"
                                            name="First Name"
                                            type="text"
                                            placeholder="John"
                                            maxLength={100}
                                            onBlur={handleBlur}
                                            errors={errors.firstName}
                                            touched={touched.firstName}
                                            onChange={handleChange}
                                            value={values.firstName} />
                                    </div>
                                    <div className="w-full">
                                        <TextInput nameId="middleName"
                                            name="Middle Name"
                                            type="text"
                                            placeholder="Watson"
                                            maxLength={100}
                                            onBlur={handleBlur}
                                            errors={errors.middleName}
                                            touched={touched.middleName}
                                            onChange={handleChange}
                                            value={values.middleName} />
                                    </div>
                                </div>
                                {/* Last Name and Suffix */}   
                                <div className="flex w-full gap-3">
                                    <div className="w-full">
                                        <TextInput nameId="lastName"
                                            required="required"
                                            name="Last Name"
                                            type="text"
                                            placeholder="Doe"
                                            maxLength={100}
                                            onBlur={handleBlur}
                                            errors={errors.lastName}
                                            touched={touched.lastName}
                                            onChange={handleChange}
                                            value={values.lastName} />
                                    </div>
                                    <div className="w-full">
                                        <TextInput nameId="suffix"
                                            name="Suffix"
                                            type="text"
                                            placeholder="Jr"
                                            maxLength={100}
                                            onBlur={handleBlur}
                                            errors={errors.suffix}
                                            touched={touched.suffix}
                                            onChange={handleChange}
                                            value={values.suffix} />
                                    </div>
                                </div>
                                {/* Age, Birthdate, and Sex */}                            
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
                                                onBlur={handleBlur}
                                                errors={errors.age}
                                                touched={touched.age}
                                                onChange={handleChange}
                                                value={values.age} />
                                        </div>
                                        <div className="w-full">
                                            <DatePickerInput nameId="birthdate"
                                                id="birthdate"
                                                name="Birthdate"
                                                placeholder="Jan 01 2023"
                                                selected={date}
                                                onChange={(selectedDate) => {
                                                    onSetDate(selectedDate);
                                                    calculateAge(selectedDate);
                                                    setFieldValue("birthdate", selectedDate);
                                                }}/>
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
                                                onClick={() => {
                                                    onSetSex("M");
                                                    setFieldValue("sex", "M");
                                                }}>
                                                Male
                                            </div>
                                            <div className={`p-4 font-lato rounded-md w-full text-center cursor-pointer
                                                ${sex == "F" ? "bg-green-100 border-2 border-green-400 font-semibold" : "bg-gray-100"}`}
                                                onClick={() => {
                                                    onSetSex("F");
                                                    setFieldValue("sex", "F");
                                                }}>
                                                Female
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Company Email and Personal Email */}                            
                                <div className="flex gap-3">
                                    <div className="w-full">
                                        <TextInput nameId="companyEmail"
                                            required="required"
                                            name="Company Email"
                                            type="text"
                                            placeholder="johndoe@company.com"
                                            maxLength={100}
                                            onBlur={handleBlur}
                                            errors={errors.companyEmail}
                                            touched={touched.companyEmail}
                                            onChange={handleChange}
                                            value={values.companyEmail} />
                                    </div>
                                    <div className="w-full">
                                        <TextInput nameId="personalEmail"
                                            name="Personal Email"
                                            required="required"
                                            type="text"
                                            placeholder="johndoe@gmail.com"
                                            maxLength={100}
                                            onBlur={handleBlur}
                                            errors={errors.personalEmail}
                                            touched={touched.personalEmail}
                                            onChange={handleChange}
                                            value={values.personalEmail} />
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
                                            onBlur={handleBlur}
                                            errors={errors.mobileNumber}
                                            touched={touched.mobileNumber}
                                            onChange={handleChange}
                                            value={values.mobileNumber} />
                                    </div>
                                    <div className="w-full">
                                        <TextInput nameId="landlineNumber"
                                            name="Landline Number"
                                            type="text"
                                            placeholder="520-1234"
                                            maxLength={100}
                                            onBlur={handleBlur}
                                            errors={errors.landlineNumber}
                                            touched={touched.landlineNumber}
                                            onChange={handleChange}
                                            value={values.landlineNumber} />
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
                                        onChange={(event) => {
                                            const selected = departments.find((dept) => dept.name === event.target.value);
                                            if (selected) {
                                                setDepartment(event.target.value);
                                                setSelectedDepartment(selected);
                                                setFieldValue("department", event.target.value);
                                            } else {
                                                setSelectedDepartment(null);
                                            }
                                        }}
                                        defaultOption="Select a department"
                                        options={ departments.map((department) => (
                                            <option key={department.id} value={department.name} className="py-2"> {department.name} </option>
                                        ))}
                                        errors={errors.department}
                                        touched={touched.department}
                                    />
                                    <DropdownMenu
                                        label="Position"
                                        id="position"
                                        name="position"
                                        value={position}
                                        onChange={(event) => {
                                            setPosition(event.target.value);
                                            setFieldValue("position", event.target.value);
                                        }}
                                        defaultOption="Select a position"
                                        options={positions.map((position) => (
                                            <option key={position.id} value={position.title} className="py-2"> {position.title} </option>
                                        ))}
                                        errors={errors.position}
                                        touched={touched.position}
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <h1 className="text-lg font-semibold font-lato text-blush uppercase">Setting up Password</h1>
                                <div className="flex justify-between gap-3 items-start my-4">
                                    <div className="flex flex-col w-full">
                                        <input
                                            value={values.password}
                                            onChange={(e) => onSetPassword(e.target.value)}
                                            placeholder="c03mv8dh"
                                            className=" border border-primary-pastel rounded-md bg-gray-100 p-3 font-lato focus:border focus:outline-primary-light h-12 lg:h-14"
                                        />
                                        <div className="text-sm mt-2 text-start text-red-500 font-semibold">
                                            {errors.password && touched.password && errors.password}
                                        </div>
                                    </div>
                                    <div onClick={() => {
                                        const newPassword = generatePassword(8);
                                        setFieldValue('password', newPassword);
                                        setFieldValue('confirmPassword', newPassword);
                                    }}
                                        className="w-72 gap-2 bg-blush flex items-center rounded-lg justify-center p-4 hover:bg-blush-dark h-full">
                                        <p className="hidden lg:block text-white font-poppins font-medium cursor-pointer"> Generate Password </p>
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
                                    {submit ? (
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