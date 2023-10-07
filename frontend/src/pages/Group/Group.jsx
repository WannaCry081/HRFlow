import { useState } from "react";
import { ModalBox } from "@Components/ModalBox";

const Group = (prop) => {
    return (
        <ModalBox onCancel={prop.onCancel}
                top="mt-16"
                topBreakpoint="sm:mt-36">
            <header className="mb-6">
                <span className="flex items-center gap-2">
                    {/* <LuMessagesSquare size={26} className="stroke-primary-light"/> */}
                    <h1 className="text-3xl font-lato font-extrabold text-primary-light ">Title Here</h1>
                </span>
                <p className="font-poppins text-sm text-gray-600 mt-2">lorem ipsum dolor et um lorem ipsum dolor.</p>
            </header>
            <section className="flex flex-col">
                <div className="flex items-center gap-8 flex-col sm:flex-row mb-6">
                    <GroupContainer>

                    </GroupContainer>
                    <GroupContainer>

                    </GroupContainer>
                </div>
                <button type="submit"
                    className="bg-primary-light rounded-full self-end h-14 w-full sm:w-44 text-poppins text-white font-semibold shadow-primary">
                    Proceed
                </button>
            </section>
        </ModalBox>
    );
};

const GroupContainer = (prop) => {
    const [show, setShow] = useState(false); 
    const onSetShow = () => setShow(!show);

    return (
        <section className="flex-grow w-full border h-56 rounded-lg cursor-pointer" onClick={onSetShow}>
            <div className="p-4 flex items-center h-full w-full">
                {show ? (
                    <>
                        {prop.children}
                    </>
                ) : (
                    <>
                        <h1>Hello World</h1>
                    </>
                )}
            </div>
        </section>
    );
};


export default Group;