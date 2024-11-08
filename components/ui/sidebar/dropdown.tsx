import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MenuIcon } from './sidebar-utils';

interface IDropdown {
    title: string,
    submenu: any[]
    open: boolean
    setOpen: (open: boolean) => void
}

const Dropdown = ({ title, submenu, open, setOpen }: IDropdown) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!open) {
            setOpen(true);
        }

    };
    return (
        <li>
            <a onClick={toggleDropdown} className="cursor-pointer">
                <div className="flex-col space-x-6 mb-2 flex p-3 bg-transparent rounded-lg h-fit">
                    <div className="h-5 justify-start flex items-center space-x-11">
                        <div className={`ml-${open ? "0" : "1"} animate-scale duration-300`}>
                            {MenuIcon({ menu: title, color: 'white', size: "30" })}
                        </div>
                        {open && (
                            <div className="text-white text-md font-medium leading-snug ml-2">
                                {title}
                            </div>
                        )}
                    </div>
                </div>
            </a>

            {isOpen && open && (
                <ul className={` w-full flex flex-col `}>
                    {submenu.map((item) => (
                        <a
                            key={item.label}
                            onClick={() => router.push(item.path.toLocaleLowerCase())} // Assuming 'path' contains the link URL
                            className="inline-flex items-center gap-x-2  py-3 px-4 text-sm font-semibold bg-transparent border-gray-300 text-gray-900 border-l -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg cursor-pointer hover:text-indigo-600"
                        >
                            <div className="group flex justify-between w-full text-white text-sm ">
                                * {item.label}

                            </div>
                        </a>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Dropdown;