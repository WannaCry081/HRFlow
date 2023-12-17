import { ModalBox } from "/src/components/ModalBox";
import { CircularProgressBar } from "/src/components/Loading";
import { TextInput, SubmitButton } from "/src/components/FormInput";
import Toast from "/src/components/Toast";

const UpsertModalBox = (prop) => {
    return(
        <ModalBox top="mt-8" onCancel={prop.onCancel}>
            {prop.toast && <Toast message={`${prop.department ? "Department" : "Position"} successfully ${prop.create ? "created!" : "updated!"}`} />}
            <header className="mb-6">
                <span className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-lato font-bold text-lilac ">
                        {prop.create ? "Add" : "Update"} {prop.department ? "Department" : "Position"}
                    </h1>
                </span>
            </header>
            <form onSubmit={prop.handleSubmit} className="flex flex-col gap-4 ">
                { prop.department 
                    ? (
                        <TextInput nameId="name"
                            name="Name"
                            type="text"
                            placeholder="Administration"
                            minLength={2}
                            maxLength={50}
                            onBlur={prop.handleBlur}
                            errors={prop.errors.name}
                            touched={prop.touched.name}
                            onChange={prop.handleChange}
                            value={prop.values.name} />
                    ) : (
                        <TextInput nameId="title"
                            name="Title"
                            type="text"
                            placeholder="Manager"
                            minLength={2}
                            maxLength={50}
                            onBlur={prop.handleBlur}
                            errors={prop.errors.title}
                            touched={prop.touched.title}
                            onChange={prop.handleChange}
                            value={prop.values.title} />
                    )
                }
                <div className="self-end w-1/2 flex gap-2">
                    <button className="bg-gray-200 hover:bg-gray-100 rounded-full h-14 font-semibold w-full shadow-lg">
                        <h1 onClick={prop.onCancel}
                            className="w-full h-full flex items-center justify-center">
                            Cancel
                        </h1>
                    </button>
                    <SubmitButton>
                        {prop.submit ? (
                            <CircularProgressBar>
                                <p className="ml-2 text-poppins text-white">Loading...</p>
                            </CircularProgressBar>
                        ) : (
                            <p className="text-poppins text-white">
                                {prop.create ? "Submit" : "Update"}
                            </p>
                        )}
                    </SubmitButton>
                </div>
            </form>
        </ModalBox>
    );
}

export default UpsertModalBox;