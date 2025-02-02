import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { MenuIcon } from './sidebar-utils';

interface IDropdown {
    title: string,
    submenu: any[]
    open: boolean
    setOpen: (open: boolean) => void
}

const Dropdown = ({ title, submenu, open, setOpen }: IDropdown) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!open && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    useEffect(() => {
        if (isOpen && !open) {
            const updatePosition = () => {
                if (dropdownRef.current) {
                    const rect = dropdownRef.current.getBoundingClientRect();
                    dropdownRef.current.style.setProperty('--trigger-top', `${rect.top}px`);
                }
            };

            window.addEventListener('scroll', updatePosition);
            return () => window.removeEventListener('scroll', updatePosition);
        }
    }, [isOpen, open]);

    const handleItemClick = (path: string) => {
        router.push(path.toLowerCase());
        if (!open) {
            setIsOpen(false);
        }
    };

    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <li ref={dropdownRef} className="relative">
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

            {isOpen && (
                <ul className={`${
                    !open 
                        ? 'fixed left-[4.5rem] top-[var(--trigger-top)] bg-gray-50 rounded-lg shadow-lg z-50 max-h-[calc(100vh-100px)] overflow-y-auto' 
                        : 'w-full max-h-[300px] overflow-y-auto'
                    } flex flex-col min-w-[200px]`}
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#4B5563 transparent',
                        '--trigger-top': dropdownRef.current ? `${dropdownRef.current.getBoundingClientRect().top + 20}px` : '0px'
                    } as React.CSSProperties}
                >
                    {!open && (
                        <>
                            <div className="px-4 py-3 bg-[#142F62] rounded-t-lg sticky top-0 z-10">
                                <span className="text-white font-bold text-sm">
                                    {title}
                                </span>
                            </div>
                            <div className="h-[1px] bg-gray-200 w-full"></div>
                        </>
                    )}
                    {submenu.map((item) => (
                        <a
                            key={item.label}
                            onClick={() => handleItemClick(item.path)}
                            className={!open ? 
                                "inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-transparent text-[#142F62] hover:bg-gray-100 last:rounded-b-lg cursor-pointer" :
                                "inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-transparent border-gray-300 text-gray-900 border-l -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg cursor-pointer hover:text-indigo-600"
                            }
                        >
                            <div className="group flex justify-between w-full text-sm">
                                {!open ? (
                                    <span className="hover:translate-x-1 transition-transform duration-200">
                                        • {item.label}
                                    </span>
                                ) : (
                                    <span className="text-white">
                                        * {item.label}
                                    </span>
                                )}
                            </div>
                        </a>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Dropdown;