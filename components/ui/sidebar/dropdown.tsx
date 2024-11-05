import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IDropdown {
    title: string,
    path: string
    icon: string
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
                <div className="flex-col flex p-3 bg-white rounded-lg h-fit">
                    <div className="h-5 gap-3 flex">
                        <div className={`ml-${open ? "0" : "1"} animate-scale duration-300`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={open ? "25" : "30"}
                                height={open ? "25" : "30"}
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <g id="category 02">
                                    <g id="icon">
                                        <path d="M2.5 5.41667C2.5 3.80584 3.80584 2.5 5.41667 2.5C7.0275 2.5 8.33333 3.80584 8.33333 5.41667C8.33333 7.0275 7.0275 8.33333 5.41667 8.33333C3.80584 8.33333 2.5 7.0275 2.5 5.41667Z" stroke="#6B7280" strokeWidth="1.6" />
                                        <path d="M11.6667 5.41667C11.6667 4.24628 11.6667 3.66109 11.9476 3.24072C12.0691 3.05873 12.2254 2.90248 12.4074 2.78088C12.8278 2.5 13.4129 2.5 14.5833 2.5C15.7537 2.5 16.3389 2.5 16.7593 2.78088C16.9413 2.90248 17.0975 3.05873 17.2191 3.24072C17.5 3.66109 17.5 4.24628 17.5 5.41667C17.5 6.58705 17.5 7.17224 17.2191 7.59262C17.0975 7.7746 16.9413 7.93085 16.7593 8.05245C16.3389 8.33333 15.7537 8.33333 14.5833 8.33333C13.4129 8.33333 12.8278 8.33333 12.4074 8.05245C12.2254 7.93085 12.0691 7.7746 11.9476 7.59262C11.6667 7.17224 11.6667 6.58705 11.6667 5.41667Z" stroke="#6B7280" strokeWidth="1.6" />
                                        <path d="M11.6667 14.5833C11.6667 12.9725 12.9725 11.6667 14.5833 11.6667C16.1942 11.6667 17.5 12.9725 17.5 14.5833C17.5 16.1942 16.1942 17.5 14.5833 17.5C12.9725 17.5 11.6667 16.1942 11.6667 14.5833Z" stroke="#6B7280" strokeWidth="1.6" />
                                        <path d="M2.5 14.5833C2.5 13.4129 2.5 12.8278 2.78088 12.4074C2.90248 12.2254 3.05873 12.0691 3.24072 11.9476C3.66109 11.6667 4.24628 11.6667 5.41667 11.6667C6.58705 11.6667 7.17224 11.6667 7.59262 11.9476C7.7746 12.0691 7.93085 12.2254 8.05245 12.4074C8.33333 12.8278 8.33333 13.4129 8.33333 14.5833C8.33333 15.7537 8.33333 16.3389 8.05245 16.7593C7.93085 16.9413 7.7746 17.0975 7.59262 17.2191C7.17224 17.5 6.58705 17.5 5.41667 17.5C4.24628 17.5 3.66109 17.5 3.24072 17.2191C3.05873 17.0975 2.90248 16.9413 2.78088 16.7593C2.5 16.3389 2.5 15.7537 2.5 14.5833Z" stroke="#6B7280" strokeWidth="1.6" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        {open && (
                            <h2 className="text-gray-500 text-sm font-medium leading-snug">
                                {title}
                            </h2>
                        )}
                    </div>
                </div>
            </a>

            {isOpen && open && (
                <ul className={` w-full flex flex-col `}>
                    {submenu.map((item) => (
                        <a
                            key={item.label}
                            onClick={()=> router.push(item.path.toLocaleLowerCase())} // Assuming 'path' contains the link URL
                            className="inline-flex items-center gap-x-2  py-3 px-4 text-sm font-semibold bg-white border-gray-300 text-gray-900 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg cursor-pointer hover:text-indigo-600"
                        >
                            <div className="group flex justify-between w-full text-sm">
                                {item.label}

                            </div>
                        </a>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Dropdown;