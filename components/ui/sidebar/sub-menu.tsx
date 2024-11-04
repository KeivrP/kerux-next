import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { getSubMenuUser } from '@/server/session/api';
import { useSession } from 'next-auth/react';
import MenuAvatar from './menu-avatar';

export interface SubMenuItem {
    label: string;
    path: string;
}

export interface MenuItemUser {
    menu: string;
    submenu: SubMenuItem[];
}

export interface SubMenuProps {
    codmenu: string;

}

const SubMenu = ({ codmenu, }: SubMenuProps) => {

    const [menus, setMenus] = useState<MenuItemUser[]>([]);
    const { data: session, update } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const navElement = document.querySelector('nav');
            if (navElement && !navElement.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const token = useMemo(() => {
        if (session) {
            return session.user.token;
        }
    }, [session]);

    const email = useMemo(() => {
        if (session) {
            return session.user.email;
        }
    }, [session]);


    console.log("codmenu", codmenu, token, email);

    useEffect(() => {
        const fetchMenus = async () => {
            if (token && email) {
                try {
                    const menus = await getSubMenuUser({ token, email, codmenu });
                    setMenus(menus);
                }
                catch (e) {
                    console.error(e);
                }

                // Do something with menus
            }
        };

        fetchMenus();
    }, [token, email, codmenu]);

    console.log("menus", menus);

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
                <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>
                <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <MenuAvatar />

                    <button data-collapse-toggle="mega-menu-icons" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu-icons" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div id="mega-menu-icons" className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">


                        {menus.map((menu, index) => (
                            <>

                                <button key={index} onClick={() => setDropdownOpen(!dropdownOpen)} id="mega-menu-icons-dropdown-button" className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                                    {menu.menu}
                                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                <div id="mega-menu-icons-dropdown" className={`absolute grid ${dropdownOpen ? 'block' : 'hidden'} top-20 w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-5 dark:bg-gray-700`}>
                                    <ul className="space-y-4" aria-labelledby="mega-menu-icons-dropdown-button">
                                        {menu.submenu.map((submenu, index) => (
                                            <li key={index}>
                                                <a href={submenu.path} className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                                    <span className="sr-only">{submenu.label}</span>
                                                    <svg className="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                                    </svg>
                                                    {submenu.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>

                        ))}

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default SubMenu;
