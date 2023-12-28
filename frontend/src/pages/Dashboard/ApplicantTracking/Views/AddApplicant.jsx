import { useState } from "react";
import {
  TextInput,
  SubmitButton,
  DatePickerInput,
  DropdownMenu
} from "/src/components/FormInput";
import { CircularProgressBar } from "/src/components/Loading";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Toast from "/src/components/Toast";
import useAddApplicant from "/src/hooks/useAddApplicant";

const AddApplicantForm = (prop) => {
  const [date, onSetDate] = useState(null);
  const [sex, onSetSex] = useState("");
  const [status, onSetStatus] = useState("");

  const [
    submit,
    { errors, values, touched, handleBlur, handleSubmit, handleChange, setFieldValue },
    toast
  ] = useAddApplicant(prop.onSetAddApplicant); 

  const calculateAge = (selectedDate) => {
    if (selectedDate) {
      const today = new Date();
      const birthdate = new Date(selectedDate);
      const age = today.getFullYear() - birthdate.getFullYear();
      setFieldValue("age", age);
    }
  };

  const options = [
    { value: "Hired"},
    { value: "Onboarding"},
    { value: "Offboarding"},
    { value: "Rejected"},
    { value: "Under Review"},
    { value: "Interview Scheduled"},
    { value: "Interviewed"},
    { value: "Skills Assessment"},
  ];

  return (
    <div className="flex h-full w-full">
      {toast && <Toast message="Applicant successfully added!" />}

      <section className=" bg-white overflow-y-auto p-4 md:p-10 w-full rounded-2xl flex flex-col rounded-top-3xl 2xl:rounded-top-[2.5rem]">
        <section className="w-full">
          <header className="flex gap-6 items-center mb-8">
            <AiOutlineArrowLeft
              onClick={prop.onSetAddApplicant}
              size={32}
              className="fill-gray-500 cursor-pointer"
            />
            <h1 className="text-3xl md:text-4xl font-lato font-bold text-lilac">
              Add New Applicant
            </h1>
          </header>
          <form
            onSubmit={handleSubmit}
            className="flex w-full mt-10 gap-8"
          >
            <div className="w-full">
              <h1 className="text-lg font-semibold font-lato text-blush uppercase">
                Personal Information
              </h1>
              <div className="flex flex-col mt-3 gap-2 w-full">
                <div className="w-full flex gap-3">
                  <div className="w-full">
                    <TextInput
                      nameId="firstName"
                      required="required"
                      name="First Name"
                      type="text"
                      placeholder="John"
                      maxLength={100}
                      onBlur={handleBlur}
                      errors={errors.firstName}
                      touched={touched.firstName}
                      onChange={handleChange}
                      value={values.firstName}
                    />
                  </div>
                  <div className="w-full">
                    <TextInput
                      nameId="middleName"
                      name="Middle Name"
                      required="required"
                      type="text"
                      placeholder="Watson"
                      maxLength={100}
                      onBlur={handleBlur}
                      errors={errors.middleName}
                      touched={touched.middleName}
                      onChange={handleChange}
                      value={values.middleName}
                    />
                  </div>
                </div>
                <div className="flex w-full gap-3">
                  <div className="w-full">
                    <TextInput
                      nameId="lastName"
                      required="required"
                      name="Last Name"
                      type="text"
                      placeholder="Doe"
                      maxLength={100}
                      onBlur={handleBlur}
                      errors={errors.lastName}
                      touched={touched.lastName}
                      onChange={handleChange}
                      value={values.lastName}
                    />
                  </div>
                  <div className="w-full">
                    <TextInput
                      nameId="suffix"
                      name="Suffix"
                      type="text"
                      required="required"
                      placeholder="Jr"
                      maxLength={100}
                      onBlur={handleBlur}
                      errors={errors.suffix}
                      touched={touched.suffix}
                      onChange={handleChange}
                      value={values.suffix}
                    />
                  </div>
                </div>
                <div className="flex w-full gap-3">
                  <div className="flex w-full gap-3">
                    <div className="w-full">
                      <TextInput
                        nameId="age"
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
                        value={values.age}
                      />
                    </div>
                    <div className="w-full">
                      <DatePickerInput
                        nameId="birthdate"
                        id="birthdate"
                        name="Birthdate"
                        placeholder="Jan 01 2023"
                        selected={date}
                        onChange={(selectedDate) => {
                          onSetDate(selectedDate);
                          calculateAge(selectedDate);
                          setFieldValue("birthdate", selectedDate);
                        }}
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

              </div>
            </div>
            <div className="w-full flex flex-col gap-10">
              <div>
                <div className="mb-10"></div>
                <div className="flex gap-3">
                  <div className="w-full">
                    <TextInput
                      nameId="email"
                      name="Email Address"
                      required="required"
                      type="text"
                      placeholder="johndoe@gmail.com"
                      maxLength={100}
                      onBlur={handleBlur}
                      errors={errors.email}
                      touched={touched.email}
                      onChange={handleChange}
                      value={values.email}
                    />
                  </div>
                </div>
                {/* Mobile Number and Landline Number */}
                <div className="flex gap-3 mt-2">
                  <div className="w-full">
                    <TextInput
                      nameId="mobileNumber"
                      required="required"
                      name="Mobile Number"
                      type="text"
                      placeholder="09123456789"
                      maxLength={100}
                      onBlur={handleBlur}
                      errors={errors.mobileNumber}
                      touched={touched.mobileNumber}
                      onChange={handleChange}
                      value={values.mobileNumber}
                    />
                  </div>
                  <div className="w-full">
                    <TextInput
                      nameId="landlineNumber"
                      name="Landline Number"
                      required="required"
                      type="text"
                      placeholder="520-1234"
                      maxLength={100}
                      onBlur={handleBlur}
                      errors={errors.landlineNumber}
                      touched={touched.landlineNumber}
                      onChange={handleChange}
                      value={values.landlineNumber}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <DropdownMenu
                    label="Status"
                    id="status"
                    name="status"
                    value={status}
                    onChange={(event) => {
                      onSetStatus(event.target.value);
                      onSetStatus(event.target.value);
                      setFieldValue("status", event.target.value);
                    }}
                    defaultOption="Select a status"
                    options={options.map((status) => (
                      <option key={status.id} value={status.value} className="py-2"> {status.value} </option>
                    ))}
                    errors={errors.status || ''}
                    touched={touched.status}
                  />
                </div>
              </div>

              <div className="pt-12 flex gap-2 2xl:self-end w-full justify-center 2xl:w-1/2">
                <button
                  onClick={prop.onSetAddApplicant}
                  className="border border-gray-300 rounded-full h-14 font-semibold w-full"
                >
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
  );
};

export default AddApplicantForm;
