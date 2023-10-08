import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalBox } from "@Components/ModalBox";
import { MdGroups } from "react-icons/md";

const Group = (prop) => {
    const navigate = useNavigate();

    const NavigateToDashboard = () => {
        navigate("/dashboard/home", {replace : true});  
    };

    return (
        <ModalBox onCancel={prop.onCancel}
                top="mt-16"
                topBreakpoint="sm:mt-36">
            <header className="mb-6">
                <span className="flex items-center gap-2">
                    <MdGroups size={30} className="fill-primary-light "/>
                    <h1 className="text-3xl font-lato font-extrabold text-primary-light ">
                        Join or Create Groups
                    </h1>
                </span>
                <p className="font-poppins text-sm text-gray-600 mt-2">
                    Choose to join existing groups or create your own after registering. Connect and collaborate your way!
                </p>
            </header>
            <section className="flex flex-col">
                <div className="flex items-center gap-8 flex-col sm:flex-row mb-6">
                    <GroupContainer title="Create Group">
                      
                    </GroupContainer>
                    <GroupContainer title="Join Group">
                        
                    </GroupContainer>
                </div>
                <button className="bg-primary-light rounded-full self-end h-14 w-full sm:w-44 text-poppins text-white font-semibold shadow-primary" onClick={NavigateToDashboard}>
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
            <div className="p-4 flex items-center h-full w-full justify-center">
                {show ? (
                    <>
                        {prop.children}
                    </>
                ) : (
                    <div className="">
                        <h1>{prop.title}</h1>
                    </div>
                )}
            </div>
        </section>
    );
};


export default Group;