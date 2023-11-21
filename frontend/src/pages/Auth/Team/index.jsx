import { useState } from "react";
import { ModalBox } from "/src/components/ModalBox";
import { MdGroups } from "react-icons/md";
import { useToggle } from "/src/hooks";
import DefaultTeamSection from "./sections/DefaultTeamSection";
import JoinTeamSection from "./sections/JoinTeamSection";
import CreateTeamSection from "./sections/CreateTeamSection";

const Team = () => {
  const [submit, onSetSubmit] = useToggle();
  const [container, setContainer] = useState(0);
  const onSetContainer = (value) => setContainer(value);

  const TeamSection = () => {
    const pages = {
      0: <></>,
      1: <CreateTeamSection />,
      2: <JoinTeamSection />,
    };
    return pages[container];
  };

  return (
    <ModalBox
      top={submit && container != 0 ? "" : "mt-8"}
      topBreakpoint={submit && container != 0 ? "" : "sm:mt-36"}
    >
      <header className="mb-6">
        <span className="flex items-center gap-2">
          <MdGroups size={30} className="fill-primary-light " />
          <h1 className="text-2xl font-lato font-extrabold text-primary-light ">
            Join or Create Teams
          </h1>
        </span>
        <p className="font-poppins text-sm text-gray-600 mt-2">
          Choose to join existing teams or create your own after registering.
          Connect and collaborate your way!
        </p>
      </header>
      <section className="flex flex-col">
        {!submit ? (
          <DefaultTeamSection
            container={container}
            onSetContainer={onSetContainer}
            onSetSubmit={onSetSubmit}
          />
        ) : (
          <TeamSection />
        )}
      </section>
    </ModalBox>
  );
};

export default Team;
