import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import useToggle from "/src/hooks/useToggle";
import useNotifications from "/src/hooks/useNotifications";
import { CreateNotificationApi } from "/src/services/notificationService";
import Toast from "/src/components/Toast";

import { CircularProgressBar } from "/src/components/Loading";
import { FaRegImage } from "react-icons/fa6";
import { ScrollArea } from "/src/components/ui/scroll-area"
import { Separator } from "/src/components/ui/separator"
import ComputerChild from "/src/assets/svg/ComputerChild.svg";


import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "/src/components/ui/card";
import {
    TextInput,
    TextArea,
    SubmitButton,
} from "/src/components/FormInput";


const Notifications = () => {
    const [submit, onSetSubmit] = useToggle();
    const [toast, onSetToast] = useToggle();
    const notifications = useNotifications();
    const token = sessionStorage.getItem("token");

    const defaultImage = "/src/assets/svg/ComputerChild.svg";

    const formik = useFormik({
        initialValues: {
            subject: "",
            message: "",
            image: "", //imageName
            imageSrc: defaultImage,
            imageFile: null
        },

        onSubmit: async (values) => {
            onSetSubmit();
            console.log(values);

            const { status, data } = await CreateNotificationApi(token, values);

            setTimeout(() => {
                if (status === 200) {

                    onSetToast();
                    console.log("Creation successful!");

                    setTimeout(() => {
                        onSetToast();
                    }, 1200);
                } else if (status === 400) {
                    formik.setErrors({
                        subject: data
                    });
                } else {
                    navigate("/error");
                }
                onSetSubmit();
            }, 800)
        },

        validationSchema: Yup.object({
            subject: Yup.string().required("Subject is required.")
                .min(2, "Subject must be at least 2 characters.")
                .max(50, "Subject can be at most 50 characters."),
            message: Yup.string().required("Message is required.")
                .min(2, "Message must be at least 2 characters.")
                .max(100, "Message can be at most 100 characters."),
        })
    })

    const showPreview = (e) => {
        if(e.target.files && e.target.files[0]){
            let imageFile = e.target.files[0];

            const reader = new FileReader();
            reader.onload = x => {
                formik.setFieldValue("imageFile", imageFile);
                formik.setFieldValue("imageSrc", x.target.result)
            }
            reader.readAsDataURL(imageFile)
        } else {
            formik.setFieldValue("imageFile", null);
            formik.setFieldValue("imageSrc", defaultImage)
        }
    };

    return (
        <section className="bg-lilac-pale h-full flex gap-3 p-8">

            {toast && <Toast message="Notiification successfully added!" />}

            <div className="w-[55%] p-2">
                <CardTitle className="text-3xl font-semibold font-lato">Notifications List</CardTitle>
                <Card className="h-[91%] mt-4 p-4">
                    <ScrollArea className="h-[33rem] w-full">
                        {notifications.map((notification) => (
                            <NotificationCard
                                key={notification.id}
                                subject={notification.subject}
                                message={notification.message}
                                createdAt={notification.createdAt}
                            />
                        ))}
                    </ScrollArea>
                  
                </Card>
            </div>
            <div className="w-full self-center">
                <Card className="w-full p-4 ">
                    <CardHeader>
                        <CardTitle className="text-3xl font-semibold font-lato text-lilac">Create Notification</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit} >
                            <img src={formik.values.imageSrc} className="h-40" />
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <TextInput nameId="subject"
                                        required="required"
                                        name="Subject"
                                        type="text"
                                        placeholder="Subject"
                                        maxLength={100}
                                        onBlur={formik.handleBlur}
                                        errors={formik.errors.subject}
                                        touched={formik.touched.subject}
                                        onChange={formik.handleChange}
                                        value={formik.values.subject} />
                                    <TextArea nameId="message"
                                        required="required"
                                        name="Message"
                                        type="text"
                                        placeholder="Message"
                                        maxLength={100}
                                        onBlur={formik.handleBlur}
                                        errors={formik.errors.message}
                                        touched={formik.touched.message}
                                        onChange={formik.handleChange}
                                        rows={9}
                                        value={formik.values.message} />
                                </div>
                            </div>
                            <div className="flex justify-between mt-6 items-center">
                                <div className="flex gap-2 cursor-pointer items-center">
                                    <label htmlFor="imageUpload" className="flex items-center gap-2 hover:cursor-pointer">
                                        <FaRegImage size={26} className="fill-lilac" />
                                        <p className="text-lilac hover:underline text-lg">Add Image</p>
                                    </label>
                                    <input
                                        id="imageUpload"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={showPreview}
                                    />
                                </div>
                                <div className="w-1/4">
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
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default Notifications;


const NotificationCard = (prop) => {
    return(
        <div>
            <div className="flex gap-2 p-2 relative bg-gray-50 rounded-tl-xl rounded-bl-xl cursor-pointer hover:bg-gray-100">
                <div className="w-2 h-full absolute top-0 left-0 rounded-tl-xl rounded-bl-xl bg-lilac"/>
                <div className="truncate w-full ml-2">
                    <div className="flex flex-col justify-center h-full">
                        <h1 className="font-semibold">
                            {prop.subject}
                        </h1>
                        <p className="text-gray-500 truncate">
                            {prop.message}
                        </p>
                    </div>
                </div>
            </div>
            <Separator className="my-2" />
        </div>
    );
}