import { useState } from "react";
import { ModalBox } from "@Components/ModalBox";
import { MdGroups } from "react-icons/md";
import CreateTeamSvg from "@Assets/svg/CreateTeam.svg";
import JoinTeamSvg from "@Assets/svg/JoinTeam.svg";

const Team = () => {
    const [container, setContainer] = useState(0);
    const onSetContainer = (value) => setContainer(value);

    return (
        <ModalBox top="mt-4"
                topBreakpoint="sm:mt-36">
            <header className="mb-6">
                <span className="flex items-center gap-2">
                    <MdGroups size={30} className="fill-primary-light "/>
                    <h1 className="text-3xl font-lato font-extrabold text-primary-light ">
                        Join or Create Teams
                    </h1>
                </span>
                <p className="font-poppins text-sm text-gray-600 mt-2">
                    Choose to join existing teams or create your own after registering. Connect and collaborate your way!
                </p>
            </header>
            <section className="flex flex-col">
                <div className="flex items-center gap-8 flex-col sm:flex-row mb-6">
                    <GroupContainer title="Create Team"
                        container={container}
                        activeContainer={1}
                        onSetContainer={onSetContainer}>
                        <img src={CreateTeamSvg} alt="create team svg" />
                    </GroupContainer>
                    <GroupContainer title="Join Team"
                        container={container}
                        activeContainer={2}
                        onSetContainer={onSetContainer}>
                        <img src={JoinTeamSvg} alt="join team svg" />
                    </GroupContainer>
                </div>
                <button className="bg-primary-light rounded-full self-end h-14 w-full sm:w-44 text-poppins text-white font-semibold " onClick={null}>
                    Proceed
                </button>
            </section>
        </ModalBox>
    );
};

const GroupContainer = (prop) => {
    return (
        <section className={`flex-grow w-full border h-56 rounded-lg cursor-pointer ${ prop.container === prop.activeContainer ? "border-primary-light shadow-primary" : ""}`}
        onClick={() => prop.onSetContainer(prop.activeContainer)}>
            <div className={`${ prop.container == 0 || prop.container === prop.activeContainer ? "" : "grayscale" } p-4 flex items-center h-full w-full justify-center flex-col relative`}>
                <p className="absolute bottom-2 font-poppins font-semibold text-secondary-light">{prop.title}</p>
                {prop.children}
            </div>
        </section>  
    );
};


export default Team;