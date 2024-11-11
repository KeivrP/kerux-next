import React from 'react';

interface CheckboxProps {
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, disabled = false }) => {
    return (
        <input
            type="checkbox"
            className={`w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 cursor-pointer hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 ${disabled ? 'cursor-not-allowed bg-gray-100' : ''}`}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
        />
    );
};

export default Checkbox;