import { useState } from "react";
import CreateTeamSvg from "@Assets/svg/CreateTeam.svg";
import JoinTeamSvg from "@Assets/svg/JoinTeam.svg";

const DefaultTeamSection = (prop) => {
    return (
        <>
            <div className="flex items-center gap-4 sm:gap-6 flex-col sm:flex-row mb-6">
                <GroupContainer title="Create Team"
                    container={prop.container}
                    activeContainer={1}
                    onSetContainer={prop.onSetContainer}>
                    <img src={CreateTeamSvg} alt="create team svg" />
                </GroupContainer>
                <GroupContainer title="Join Team"
                    container={prop.container}
                    activeContainer={2}
                    onSetContainer={prop.onSetContainer}>
                    <img src={JoinTeamSvg} alt="join team svg" />
                </GroupContainer>
            </div>
            <button className="bg-primary-light rounded-full self-end h-14 w-full sm:w-44 text-poppins text-white font-semibold shadow-primary" onClick={prop.onSetSubmit}>
                Proceed
            </button>
        </>
    );
}

const GroupContainer = (prop) => {
    return (
        <section className={`flex-grow w-full border h-56 rounded-lg cursor-pointer ${ prop.container === prop.activeContainer ? "border-none shadow-primary" : ""} transition-in `}
        onClick={() => prop.onSetContainer(prop.activeContainer)}>
            <div className={`${ prop.container == 0 || prop.container === prop.activeContainer ? "" : "grayscale" } p-4 flex items-center h-full w-full justify-center flex-col relative`}>
                <p className="absolute bottom-2 font-poppins font-semibold text-secondary-light">{prop.title}</p>
                {prop.children}
            </div>
        </section>  
    );
};


export default DefaultTeamSection;