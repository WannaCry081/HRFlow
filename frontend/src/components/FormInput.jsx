import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const TextInput = (prop) => {
    return (
        <span>
            <label htmlFor={prop.nameId} 
                    className="block font-poppins mb-2 text-sm">{prop.name}
                {prop.required && <span className="text-red-500">*</span>}
            </label>
            <input type={prop.type} 
                    maxLength={prop.maxLength}
                    minLength={prop.minLength}
                    id={prop.nameId} 
                    value={prop.value} 
                    name={prop.nameId} 
                    onChange={prop.onChange}
                    readOnly={prop.readOnly}
                    placeholder={prop.placeholder}
                    onBlur={prop.onBlur}
                    className="w-full border border-primary-pastel rounded-md bg-gray-200 p-3 font-lato focus:border focus:outline-primary-light sm:p-3"/>

            <div className="text-sm mt-2 text-start text-red-500 font-semibold">
                {prop.errors && prop.touched && prop.errors }
            </div>
        </span>
    );
};

export const PasswordInput = (prop) => {
    const [showPassword, setShowPassword] = useState(false); 
    const onSetShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };
    
    return (
        <span>
            <label htmlFor={prop.nameId}
                className="block font-poppins mb-2 text-sm">{prop.name} 
                <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
                <input type={ (showPassword) ? "text" : prop.type}
                    maxLength={prop.maxLength}
                    minLength={prop.minLength}
                    id={prop.nameId}
                    value={prop.value}
                    name={prop.nameId}
                    onChange={prop.onChange}
                    placeholder={prop.placeholder}
                    onBlur={prop.onBlur}
                    className="w-full border border-primary-pastel rounded-md bg-gray-200 py-3 pr-12 pl-3 font-lato focus:border focus:outline-primary-light" />
                <button className="absolute right-4"
                    onClick={onSetShowPassword}>
                    {showPassword ? (
                        <VscEyeClosed size={24} />
                    ) : (
                        <VscEye size={24} />
                    )}
                </button>
            </div>
            <div className="text-sm mt-2 text-start text-red-500 font-semibold">
                {prop.errors && prop.touched && prop.errors }
            </div>
        </span>
    );
};

    
export const CodeInput = (prop) => {
    return (
        <input className="w-full rounded-xl h-14 sm:h-16 text-center text-xl border border-primary-pastel bg-gray-200 font-poppins font-semibold focus:border focus:outline-primary-light"
            maxLength={prop.maxLength}
            minLength={prop.minLength}
            id={prop.nameId}
            name={prop.nameId}
            value={prop.value}
            onBlur={prop.onBlur}
            placeholder={prop.placeholder}
            onChange={prop.onChange}
            type="text" />
    );
};

export const SubmitButton = (prop) => {
    return (
        <button type="submit"
            className="bg-primary-light rounded-full h-14 font-semibold shadow-primary w-full">
            <div className="w-full h-full flex items-center justify-center">
                {prop.children}
            </div>
        </button>
    );
};

export const DatePickerInput = (prop) => {
    return (
        <span className="w-full">
            <label htmlFor={prop.nameId}
                className="block font-poppins mb-2 text-sm">{prop.name}
                <span className="text-red-500">*</span>
            </label>
            <DatePicker 
                id={prop.nameId}
                name={prop.nameId}
                placeholder={prop.placeholder}
                selected={prop.selected}
                onChange={prop.onChange} 
                showYearDropdown
                className="max-w-[24.8rem] border border-primary-pastel rounded-md bg-gray-200 p-3 font-lato focus:border focus:outline-primary-light sm:p-3"/>
        </span>
    )
}