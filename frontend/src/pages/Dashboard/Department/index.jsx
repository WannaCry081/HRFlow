import { useState } from "react";
import useToggle from "/src/hooks/useToggle";
import Position from "../Position";
import DepartmentListView from "./Views/DepartmentListView";

const Department = () => {
    const [viewDepartment, onSetViewDepartment] = useToggle();
    const [submit, onSetSubmit] = useToggle();
    const [positionSubmit, onSetPositionSubmit] = useToggle();
    const [selectedDepartment, onSetSelectedDepartment] = useState(null);
    
    
    return (
        <div className="flex h-full">
            <section className="w-full h-full bg-lilac-pale rounded-t-[2.5rem] p-8 flex flex-col">
                { viewDepartment ? (
                    <Position 
                        submit={submit}
                        selectedDepartment={selectedDepartment}
                        positionSubmit={positionSubmit}
                        onSetPositionSubmit={onSetPositionSubmit}
                        onSetViewDepartment={onSetViewDepartment} />
                        ) : (
                        <DepartmentListView 
                            selectedDepartment={selectedDepartment}
                            onSetViewDepartment={onSetViewDepartment} 
                            onSetSelectedDepartment={onSetSelectedDepartment}
                        />
                    )
                }
            </section>
        </div>
    );
}

export default Department;