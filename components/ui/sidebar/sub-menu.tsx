import React, { useEffect, useMemo, useState } from 'react';
import MenuAvatar from './menu-avatar';
import { completdMenus, MenuItemUser } from './sidebar-utils';
import { useMenu } from '@/server/session/useSession';
import ModuleItem from './module';
import Image from 'next/image';

export interface SubMenuItem {
    label: string;
    path: string;
}


const SubMenu = ({ isOpen }: { isOpen: boolean }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menus, setMenus] = useState<MenuItemUser[]>([]);
    const { data, isLoading } = useMenu();


    useEffect(() => {
        if (data) {
            const menuFin = completdMenus(data);
            setMenus(menuFin);
        }
    }, [data, isLoading]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownOpen && !document.getElementById('full-width-megamenu')?.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    return (
        <nav style={{
            marginLeft: isOpen ? '18.2rem' : '6.2rem',
            minWidth: isOpen ? 'calc(100% - 18.2rem)' : 'calc(100% - 6.2rem)',
            transition: 'margin-left 0.2s ease-in-out, min-width 0.2s ease-in-out',

        }} className={`fixed top-0 left-0 flex border-gray-200  border-b py-3 bg-white border-b-default border-solid border-prime-gray-200`}>
            <div className="w-full flex flex-row p-2 px-4 justify-between">


                <div className="hidden lg:flex lg:pl-8 gap-4" id="megamenu-cta">
                <a href="/" className="flex items-center " >
                    <Image src="/KeruxLogoBlue.png" alt="Kerux Logo" width={200} height={200} />
                </a>

                    <ul className="flex lg:items-center gap-y-4 flex-col my-4 lg:my-0 lg:flex-row">



                        <li className="">
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} data-target="full-width-megamenu" className="dropdown-toggle flex items-center justify-between text-gray-500 text-sm text-center lg:text-base font-medium hover:text-prime-blue-700 transition-all duration-500 mb-2 lg:mr-6 lg:mb-0 mr-auto lg:text-left  lg:m-0">Modulos <svg className="w-3 h-2 ml-1.5 " width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L3.58579 3.58579C4.25245 4.25245 4.58579 4.58579 5 4.58579C5.41421 4.58579 5.74755 4.25245 6.41421 3.58579L9 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            </button>


                            {dropdownOpen && (
                                <div
                                    id="full-width-megamenu"
                                    aria-labelledby="full-width-megamenu"
                                    className="dropdown-menu animate-fade w-auto z-10 sm:absolute top-full  bg-white rounded-lg shadow-[0px_15px_30px_0px_rgba(16,24,40,0.1)] lg:px-10 xl:px-8 md:px-5 p-4 max-w-screen-2xl xl:py-8 lg:py-4 md:py-2"
                                >
                                    {/* <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"> */}
                                    <div className="grid grid-cols-1 gap-3">
                                        <ul className="text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                                            <h6 className="font-medium text-sm text-gray-500 mb-2">Módulos Kerux</h6>
                                            {menus.map((menu) => (

                                                <ModuleItem key={menu.path} item={menu} />
                                            )
                                            )

                                            }
                                        </ul>
                                        {/* Add more columns or content as needed */}
                                    </div>
                                </div>
                            )}
                        </li>

                    </ul>
                </div>

                <div className=''>
                    <MenuAvatar />
                </div>
            </div>
        </nav>
    );
};

export default SubMenu;
