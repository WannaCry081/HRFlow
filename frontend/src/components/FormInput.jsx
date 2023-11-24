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
                className="w-full border border-gray-200 rounded-md bg-gray-100 p-3 font-lato focus:border focus:outline-lilac sm:p-3 h-12 lg:h-14" />

            <div className="text-sm mt-2 text-start text-red-500 font-semibold">
                {prop.errors && prop.touched && prop.errors}
            </div>
        </span>
    );
};

export const TextArea = (prop) => {
    return (
        <span>
            <label htmlFor={prop.nameId}
                className="block font-poppins mb-2 text-sm">{prop.name}
                {prop.required && <span className="text-red-500">*</span>}
            </label>
            <textarea type={prop.type}
                maxLength={prop.maxLength}
                minLength={prop.minLength}
                id={prop.nameId}
                value={prop.value}
                name={prop.nameId}
                rows={prop.rows || 5}
                onChange={prop.onChange}
                readOnly={prop.readOnly}
                placeholder={prop.placeholder}
                onBlur={prop.onBlur}
                className="w-full border border-gray-200 rounded-md bg-gray-100 p-3 font-lato focus:border focus:outline-lilac sm:p-3  resize-none transition focus:border-gray-400 focus:outline-none font-normal h-full" />

            <div className="text-sm mt-2 text-start text-red-500 font-semibold">
                {prop.errors && prop.touched && prop.errors}
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
                <input type={(showPassword) ? "text" : prop.type}
                    maxLength={prop.maxLength}
                    minLength={prop.minLength}
                    id={prop.nameId}
                    value={prop.value}
                    name={prop.nameId}
                    onChange={prop.onChange}
                    placeholder={prop.placeholder}
                    onBlur={prop.onBlur}
                    className="w-full border border-lilac rounded-md bg-gray-100 py-3 pr-12 pl-3 font-lato focus:border focus:outline-lilac-light h-12 lg:h-14" />
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
                {prop.errors && prop.touched && prop.errors}
            </div>
        </span>
    );
};


export const CodeInput = (prop) => {
    return (
        <input className="w-full rounded-xl h-12 lg:h-14 sm:h-16 text-center text-xl border border-lilac bg-gray-100 font-poppins font-semibold focus:border focus:outline-lilac-light"
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
            className="bg-lilac rounded-full h-14 font-semibold shadow-primary w-full">
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
                className="w-full border border-gray-200 rounded-md bg-gray-100 font-lato focus:border focus:outline-lilac-light p-4" />
        </span>
    );
};

export const DropdownMenu = (prop) => {
    return (
        <div className="flex flex-col">
            <label htmlFor="department" className="pb-2">
                {prop.label}
                <span className="text-red-500">*</span>
            </label>
            <select
                id={prop.id}
                name={prop.name}
                value={prop.department}
                onChange={prop.onChange}
                className="border rounded-md p-4 bg-gray-100 focus:border font-lato focus:outline-lilac-light"
            >
                <option value="">{prop.defaultOption}</option>
                {prop.options}
            </select>
            <div className="text-sm mt-2 text-start text-red-500 font-semibold">
                {prop.errors && prop.touched && prop.errors}
            </div>
        </div>

    );
}
