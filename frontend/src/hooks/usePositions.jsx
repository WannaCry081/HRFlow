import { useState, useEffect } from "react";
import { GetPositionsApi } from "/src/services/positionService"

const usePositions = (submit, departmentId) => {

    const token = sessionStorage.getItem("token");

    const [positions, setPositions] = useState([]);

    useEffect(() => {

        const getPositions = async () => {
            if(departmentId){
                const response = await GetPositionsApi(token, departmentId);
                setPositions(response.data);
            } else {
                setPositions([]);
            }
        };

        getPositions();
    }, [submit]);

    return positions;

}   

export default usePositions;