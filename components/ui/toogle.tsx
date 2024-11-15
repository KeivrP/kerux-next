import React, { useState, useEffect } from 'react';

interface ToggleProps {
    onToggle: (isChecked: boolean) => void;
    isChecked?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ onToggle, isChecked = false }) => {
    const [checked, setChecked] = useState(isChecked);

    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked]);

    const handleToggle = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        onToggle(newChecked);
    };

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input 
                type="checkbox" 
                value="" 
                className="sr-only peer" 
                checked={checked} 
                onChange={handleToggle} 
            />
            <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
        </label>
    );
};

export default Toggle;