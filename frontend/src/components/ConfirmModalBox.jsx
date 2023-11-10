import { ModalBox } from "@Components/ModalBox";

const ConfirmModalBox = (prop) => {
    return (
        <ModalBox top="mt-10" onCancel={prop.onCancel}>
            <header className="mb-6">
                <span className="flex items-center gap-2">
                    <h1 className="text-[1.8rem] font-lato font-extrabold text-secondary-light ">
                        {prop.header}
                    </h1>
                </span>
            </header>
            <p className="font-poppins text-md text-gray-600">
                Are you sure you want to {prop.operation}
                <span className="ml-1 text-secondary-light font-semibold">
                    {prop.title}
                </span>?
            </p>
            <div className="flex justify-end gap-2 w-full mt-6">
                <button className="bg-gray-200 hover:bg-gray-100 rounded-full h-14 font-semibold w-1/4 shadow-lg">
                    <h1 onClick={prop.onCancel}
                        className="w-full h-full flex items-center justify-center">
                        Cancel
                    </h1>
                </button>
                <button onClick={prop.submit}
                    className="bg-secondary-light hover:bg-secondary-dark shadow-secondary rounded-full h-14 font-semibold w-1/4">
                    <h1 className="w-full h-full flex items-center justify-center text-white">
                        {prop.option}
                    </h1>
                </button>
            </div>
        </ModalBox>
    );
}

export default ConfirmModalBox;