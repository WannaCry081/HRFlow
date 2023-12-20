import { useState, useEffect } from "react";
import { GetUserProfileApi } from "/src/services/userService.js";
import { BiEditAlt } from "react-icons/bi";
import useToggle from "/src/hooks/useToggle";
import { ModalBox } from "/src/components/ModalBox";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TextInput, SubmitButton } from "/src/components/FormInput";
import { CircularProgressBar } from "/src/components/Loading";
import { UpdateUserProfileApi } from "/src/services/userService.js";

const Profile = () => {
    const [show, onSetShow] = useToggle();
    const [userData, setUserData] = useState({});
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setAccessToken(token);

        const getUserProfile = async () => {
            const { status, data } = await GetUserProfileApi(token);
            setUserData(data);
        };

        getUserProfile();
    }, [show]);

    return (
        <section className="w-full  flex p-6 gap-6">
            { show && <EditUserProfile onCancel={onSetShow} userData={userData} token={accessToken}/> }
            <div className="bg-white min-w-[24rem] shadow-lg rounded-xl flex flex-col items-center p-6">
                <div className="relative h-32 w-32 bg-lilac-pastel rounded-full my-2 flex items-center justify-center">
                    <h1 className="font-poppins text-lilac text-5xl font-semibold">
                        {userData.firstName !== undefined ? userData.firstName[0].toUpperCase() : ""}
                        {userData.lastName !== undefined ? userData.lastName[0].toUpperCase() : ""}
                    </h1>
                    <div className="h-8 w-8 bg-blush rounded-full absolute bottom-0 right-0 flex items-center justify-center cursor-pointer" onClick={onSetShow}>
                        <BiEditAlt size={18} className="fill-white"/>
                    </div>
                </div>

                <h1 className="font-lato text-2xl font-semibold mb-4 ">
                    {`${userData.firstName} ${userData.middleName} ${userData.lastName} ${userData.suffix}`}
                </h1>

                <div className="bg-green-200 text-green-700 text-sm font-medium px-4 py-2 rounded-lg mb-6">
                    {userData.role}
                </div>

                <ItemDetail title="Email Address" body={userData.personalEmail} />
                <ItemDetail title="Company Email" body={userData.companyEmail} />
                <ItemDetail title="Mobile No." body={userData.mobileNumber} />
                <ItemDetail title="Landline No." body={userData.landlineNumber} />
             
            </div>
            <div className="bg-white shadow-lg rounded-xl w-full">

            </div>
        </section>
    );
};

const ItemDetail = (prop) => {
    return (
        <div className="border rounded-3xl w-full p-4 px-6 my-2">
            <h1 className="font-lato text-sm text-gray-400">
                {prop.title}
            </h1>
            <p className="font-poppins font-semibold">
                {prop.body !== "" ? prop.body : "N/A"}
            </p>
        </div>
    );
};

const EditUserProfile = (prop) => {
    const [submit, onSetSubmit] = useToggle();

    const formik = useFormik({
        initialValues : {
            mobileNumber: prop.userData.mobileNumber,
            landlineNumber: prop.userData.landlineNumber,
            personalEmail: prop.userData.personalEmail,
            middleName: prop.userData.middleName,
            suffix: prop.userData.suffix
        },
        onSubmit : async (values) => {
            onSetSubmit();
            const { status, data } = await UpdateUserProfileApi(prop.token, values);

            setTimeout(() => {
                if (status === 200) {
                    prop.onCancel();
                } else if (data === 404 || data === 401) {
                    formik.setErrors({
                        email : data
                    });
                } else {
                    navigate("/error"); 
                }
                onSetSubmit();
            }, 1000);
        },
        validationSchema : Yup.object({
            mobileNumber: Yup.string().required("Mobile Number is required.")
                .min(11, "Mobile Number must at least 11 digits.")
                .max(13, "Mobile Number can be at most 13 digits."),
            landlineNumber: Yup.string()
                .min(3, "Landline Number must at least 3 digits.")
                .max(13, "Landline Number can be at most 13 digits."),
            personalEmail : Yup.string().required("Email Address is required.")
                .email("Invalid Email Address")
                .min(5, "Email Address must be at least 5 characters.")
                .max(150, "Email Address can be at most 150 characters."),
            middleName : Yup.string().required("Middle Name is required.")
                .min(2, "Middle Name must be at least 2 characters.")
                .max(150, "Middle Name can be at most 150 characters."),
            suffix : Yup.string()
                .min(2, "Suffix must be at least 2 characters.")
                .max(150, "Suffix can be at most 150 characters."),
        })
    });

    return (
        <ModalBox onCancel={prop.onCancel} top={"-mt-10"}>
            <form onSubmit={formik.handleSubmit}
                className="w-full flex flex-col gap-4">

                <div className="flex gap-2 w-full">
                    <div className="w-full">
                        <TextInput nameId="middleName"
                            required="required"
                            name="Middle Name"
                            type="text"
                            minLength={5}
                            maxLength={150}
                            placeholder="Doe"
                            errors={formik.errors.middleName}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.middleName}
                            onChange={formik.handleChange}
                            value={formik.values.middleName} />
                    </div>

                    <div className="w-full">
                        <TextInput nameId="suffix"
                            name="Suffix"
                            type="text"
                            minLength={5}
                            maxLength={150}
                            placeholder="Jr."
                            errors={formik.errors.suffix}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.suffix}
                            onChange={formik.handleChange}
                            value={formik.values.suffix} />
                    </div>
                </div>

                <TextInput nameId="personalEmail"
                        required="required"
                        name="Personal Email"
                        type="email"
                        minLength={5}
                        maxLength={150}
                        placeholder="JohnDoe@example.com"
                        errors={formik.errors.personalEmail}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.personalEmail}
                        onChange={formik.handleChange}
                        value={formik.values.personalEmail}/>

                <TextInput nameId="mobileNumber"
                        required="required"
                        name="Mobile No."
                        type="text"
                        minLength={5}
                        maxLength={15}
                        placeholder="09760292633"
                        errors={formik.errors.mobileNumber}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.mobileNumber}
                        onChange={formik.handleChange}
                        value={formik.values.mobileNumber}/>

                <TextInput nameId="landlineNumber"
                        required="required"
                        name="Landline No."
                        type="type"
                        minLength={5}
                        maxLength={15}
                        placeholder="09760292633"
                        errors={formik.errors.landlineNumber}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.landlineNumber}
                        onChange={formik.handleChange}
                        value={formik.values.landlineNumber}/>

                <SubmitButton>
                    {(submit) ? (
                        <CircularProgressBar>
                            <p className="ml-2 text-poppins text-white">Loading...</p>
                        </CircularProgressBar>
                    ) : (
                        <p className="text-poppins text-white">Submit</p>
                    )}
                </SubmitButton>

            </form>
        </ModalBox>
    )
}

export default Profile;