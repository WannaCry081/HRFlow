import { useState } from "react";

const useToggle = () => {
    const [toggle, setToggle] = useState(false);

    const onSetToggle = () => {
        setToggle(prev => !prev);
    };

    return [ toggle, onSetToggle ];
}

export default useToggle;