import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeletePositionApi } from "/src/services/positionService";
import { UpdateEmployeesProperty } from "/src/services/employeeService";
import { PiTrashBold, PiPlusBold } from "react-icons/pi";
import { FiEdit3 } from "react-icons/fi";
import useToggle from "/src/hooks/useToggle";
import usePositions from "/src/hooks/usePositions";
import useEmployees from "/src/hooks/useEmployees";
import ConfirmModalBox from "/src/components/ConfirmModalBox";
import Toast from "/src/components/Toast";
import CreatePosition from "./CreatePosition";

const PositionList = (prop) => {
    const token = sessionStorage.getItem("token");

    const navigate = useNavigate();

    const [toast, onSetToast] = useToggle();
    const [confirmModal, onSetConfirmModal] = useToggle();

    const employees = useEmployees(prop.submit);


    const [addPosition, onSetAddPosition] = useState(false);
    const [openModal, onSetOpenModal] = useState(false);

    const positions = usePositions(prop.submit, prop.selectedDepartment.id);

    const deletePosition = async () => {
        try {
            const { status, data } = await DeletePositionApi(
                token,
                prop.selectedDepartment.id,
                prop.selectedPosition.id
            );

            setTimeout(() => {
                if (status === 200) {
                    onSetToast();
                    console.log("Deletion successful!");
                    setTimeout(() => {
                        onSetToast();
                    }, 1000);

                } else if (status === 400) {
                    formik.setErrors({
                        title: data
                    });
                } else {
                    navigate("/error");
                }
                onSetConfirmModal();
                prop.onSetSubmit();
                prop.onSetPositionSubmit();
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };

    const updateEmployees = async () => {
        try {
            const employeesInPosition = employees.filter(employee => employee.positionId === prop.selectedPosition.id);
            const employeeIds = employeesInPosition.map(employee => employee.id);

            const responses = [];

            for (let i = 0; i < employeeIds.length; i++) {
                const employeeId = employeeIds[i];
                const { status, data } = await UpdateEmployeesProperty(
                    token,
                    employeeId,
                    [{
                        path: "/positionId",
                        op: "replace",
                        value: ""
                    }]);
                responses.push({ status, data });
            }

            setTimeout(() => {
                for (const response of responses) {
                    if (response.status === 200) {
                        prop.onSetSubmit();
                    } else {
                        navigate("/error");
                    }
                }
                prop.onSetSubmit();
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="h-full w-full">

            {toast && <Toast message="Position successfully deleted!" />}

            {openModal && <CreatePosition
                addPosition={addPosition}
                selectedPosition={prop.selectedPosition}

                submit={prop.submit}
                onSetSubmit={prop.onSetSubmit}
                onSetPositionSubmit={prop.onSetPositionSubmit}

                selectedDepartment={prop.selectedDepartment}
                onSetOpenModal={onSetOpenModal}

                onCancel={() => {
                    onSetOpenModal(false);
                    onSetAddPosition(false);
                }}
            />}

            {confirmModal && <ConfirmModalBox
                onCancel={onSetConfirmModal}
                header="Confirm Delete Position"
                operation="delete"
                title={prop.selectedPosition.title}
                option="Delete"
                submit={() => {
                    updateEmployees();
                    deletePosition();
                }}
            />}

            <div className="w-full flex justify-between items-center pt-6">
                <h1 className="font-lato font-black text-gray-600 text-3xl">
                    Positions
                </h1>
                <div onClick={() => {
                    onSetOpenModal(true)
                    onSetAddPosition(true)
                }}
                    className="w-40 gap-2 bg-primary-light hover:bg-primary-dark flex items-center rounded-lg justify-center hover-bg-primary-dark h-10 cursor-pointer">
                    <PiPlusBold size={24} className="fill-white" />
                    <p className="text-white font-poppins font-semibold cursor-pointer">
                        Add Position
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-3 py-8">
                {positions.map((position) => (
                    <PositionItem
                        key={position.id}
                        position={position}
                        onSetConfirmModal={onSetConfirmModal}
                        onSetOpenModal={() => {
                            onSetOpenModal(true);
                            onSetAddPosition(false);
                        }}
                        title={position.title}
                        selectedPosition={prop.selectedPosition}
                        onSelect={() => {
                            if (prop.onPositionsSelect) {
                                prop.onPositionsSelect(position);
                            }
                        }} />
                ))}
            </div>
        </div>
    );
}

export default PositionList;



const PositionItem = (prop) => {
    return (
        <div onClick={prop.onSelect}
            className={` cursor-pointer hover:bg-purple-200 shadow-md p-4 flex w-full h-full rounded-lg justify-between items-center ${prop.selectedPosition && prop.selectedPosition.id === prop.position.id ? "bg-purple-200" : "bg-primary-pastel"}`} >
            <h1 className="font-poppins">
                {prop.title}
            </h1>
            <div className="flex gap-2 items-center">
                <div onClick={prop.onSetOpenModal}
                    className="rounded-full bg-gray-300 hover:bg-pink-100 group h-full p-2">
                    <FiEdit3 size={22} className="stroke-gray-600 group-hover:stroke-pink-500" />
                </div>
                <div onClick={prop.onSetConfirmModal}
                    className="rounded-full bg-gray-300 hover:bg-red-200 h-full p-2 group">
                    <PiTrashBold size={22} className="fill-gray-600 group-hover:fill-red-500" />
                </div>
            </div>
        </div>
    );
}

