import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { PiPlusBold, PiTrashBold } from "react-icons/pi";
import { useDeletePosition } from "/src/hooks";
import usePositions from "/src/hooks/usePositions";
import Toast from "/src/components/Toast";
import CreatePosition from "./CreatePosition";
import ConfirmModalBox from "/src/components/ConfirmModalBox";


const PositionList = (prop) => {

    const [openModal, onSetOpenModal] = useState(false);
    const positions = usePositions(prop.createPosition, prop.selectedDepartment.id);

    const [deletePosition, toast, confirmModal, onSetConfirmModal] = useDeletePosition(prop.selectedDepartment, prop.selectedPosition?.id, prop.onSetCreatePosition);

    return (
        <div className="h-full w-full">
            {toast && <Toast message="Position successfully deleted!" />}
            {openModal && <CreatePosition
                selectedDepartment={prop.selectedDepartment}
                selectedPosition={prop.selectedPosition}
                createPosition={prop.createPosition}
                onSetCreatePosition={prop.onSetCreatePosition}
                onSetOpenModal={onSetOpenModal}
                onCancel={() => {
                    onSetOpenModal(false);
                    prop.onSetCreatePosition(false)}}
            />}

            {confirmModal && <ConfirmModalBox
                onCancel={onSetConfirmModal}
                header="Confirm Delete Position"
                operation="delete"
                title={prop.selectedPosition?.title || ""}
                option="Delete"
                submit={() => {
                    prop.onSetCreatePosition();
                    deletePosition()}}
            />}

            <div className="w-full flex justify-between items-center pt-6">
                <h1 className="font-lato font-semibold text-gray-500 text-3xl">
                    Positions
                </h1>
                <div onClick={() => {
                        onSetOpenModal(true);
                        prop.onSetCreatePosition(true); }}
                    className="w-40 gap-2 bg-lilac hover:bg-lilac-dark flex items-center rounded-lg justify-center hover-bg-lilac-dark h-10 cursor-pointer">
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
                        title={position.title}
                        selectedPosition={prop.selectedPosition}
                        onSetConfirmModal={onSetConfirmModal}
                        onSetOpenModal={() => {
                            onSetOpenModal(true);
                            prop.onSetCreatePosition(false); }}
                        onSelect={() => {
                            if (prop.onPositionsSelect) {
                                prop.onPositionsSelect(position)}}} />
                ))}
            </div>
        </div>
    );
}

export default PositionList;



const PositionItem = (prop) => {
    return (
        <div onClick={prop.onSelect}
            className={` cursor-pointer hover:bg-purple-200 shadow-md p-4 flex w-full h-full rounded-lg justify-between items-center ${prop.selectedPosition && prop.selectedPosition.id === prop.position.id ? "bg-purple-200" : "bg-lilac-pastel"}`} >
            <h1 className="font-poppins">
                {prop.title}
            </h1>
            <div className="flex gap-2 items-center">
                <div onClick={prop.onSetOpenModal}
                    className="rounded-full bg-gray-300 hover:bg-pink-100 group h-full p-2">
                    <FiEdit3 size={22} className="stroke-gray-500 group-hover:stroke-pink-500" />
                </div>
                <div onClick={prop.onSetConfirmModal}
                    className="rounded-full bg-gray-300 hover:bg-red-200 h-full p-2 group">
                    <PiTrashBold size={22} className="fill-gray-500 group-hover:fill-red-500" />
                </div>
            </div>
        </div>
    );
}

