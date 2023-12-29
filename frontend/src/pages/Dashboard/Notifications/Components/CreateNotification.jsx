import { ModalBox } from "/src/components/ModalBox";
import { CircularProgressBar } from "/src/components/Loading";
import { TextInput, SubmitButton, TextArea } from "/src/components/FormInput";
import Toast from "/src/components/Toast";
import { useUpsertNotification } from "/src/hooks";


const CreateNotification = (prop) => {
    const [
        submit,
        { errors, values, touched, handleBlur, handleSubmit, handleChange },
        toast
    ] = useUpsertNotification(prop.createNotification, prop.selectNotification, prop.onSetCreateNotification, prop.onSetOpenModal);

    return (
        <ModalBox top="" onCancel={prop.onCancel}>
            {toast && <Toast message={`Notification successfully ${prop.createNotification ? "created!" : "updated!"}`} />}

            <header className="mb-6">
                <span className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-lato font-bold text-lilac ">
                        {prop.createNotification ? "Add" : "Update"} Notification
                    </h1>
                </span>
            </header>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
                <TextInput nameId="subject"
                    required="required"
                    name="Subject"
                    type="text"
                    placeholder="Subject"
                    maxLength={100}
                    onBlur={handleBlur}
                    errors={errors.subject}
                    touched={touched.subject}
                    onChange={handleChange}
                    value={values.subject} />
                <TextArea nameId="message"
                    required="required"
                    name="Message"
                    type="text"
                    placeholder="Message"
                    maxLength={100}
                    onBlur={handleBlur}
                    errors={errors.message}
                    touched={touched.message}
                    onChange={handleChange}
                    rows={5}
                    value={values.message} />

                <div className="self-end w-1/2 flex gap-2">
                    <button className="bg-gray-200 hover:bg-gray-100 rounded-full h-14 font-semibold w-full shadow-lg">
                        <h1 onClick={prop.onCancel}
                            className="w-full h-full flex items-center justify-center">
                            Cancel
                        </h1>
                    </button>
                    <SubmitButton>
                        {submit ? (
                            <CircularProgressBar>
                                <p className="ml-2 text-poppins text-white">Loading...</p>
                            </CircularProgressBar>
                        ) : (
                            <p className="text-poppins text-white">
                                {prop.createNotification ? "Submit" : "Update"}
                            </p>
                        )}
                    </SubmitButton>
                </div>
            </form>
        </ModalBox>
    );
}

export default CreateNotification;