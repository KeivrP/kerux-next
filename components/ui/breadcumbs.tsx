'use client'

import { useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState, useMemo } from 'react';
import { MenuIcon } from './sidebar/sidebar-utils';
import { useSubMenu } from '@/server/session/useSession';

interface MenuItem {
    path: string;
    label: string;
}

interface Menu {
    menu: string;
    submenu: MenuItem[];
}

interface FindMenuItemResult {
    menu: string;
    label: string;
}

const findMenuItem = (menuData: Menu[] | undefined, pathname: string): FindMenuItemResult | null => {
    if (!menuData) {
        return null; // Return null if no data
    }

    const pathToFind = pathname.toUpperCase(); // Convert to uppercase for matching

    for (const menu of menuData) {
        for (const item of menu.submenu) {
            if (item.path === pathToFind) {
                return { menu: menu.menu, label: item.label }; // Return found result
            }
        }
    }
    return null; // Return null if item not found
};

const Breadcrumbs: React.FC = () => {
    const pathname = usePathname();
    const pathnames = pathname.split('/').filter((x) => x);
    const { data: menu, isLoading } = useSubMenu(pathnames[0].toLocaleUpperCase());

    const [data, setData] = useState<FindMenuItemResult | null>(null);

    // Memoize the menu item finding to avoid unnecessary recalculations
    const menuItem = useMemo(() => findMenuItem(menu as Menu[], pathname), [menu, pathname]);

    useEffect(() => {
        if (!isLoading) {
            setData(menuItem); // Update state only when not loading
        }
    }, [menuItem, isLoading]); // Only depend on menuItem and isLoading

    // Handle state when no data is found
    if (!data) {
        return (
            <nav className="flex py-4" aria-label="Breadcrumb">
                <span className="text-base font-medium text-gray-500"></span>
            </nav>
        );
    }

    return (
        <nav className="flex py-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <div className="dropdown relative inline-flex">
                        <button id="dropdown-default" type="button" className="dropdown-toggle inline-flex justify-center items-center text-base font-medium text-gray-900 hover:text-[#142f62] bg-transparent whitespace-nowrap" disabled>
                            <MenuIcon menu={data.menu} size='25' color='#142F62' />
                            {data.menu}
                        </button>
                    </div>
                </li>

                <li aria-current="page">
                    <div className="flex items-center">
                        <svg className="mx-1 w-5 h-5" viewBox="0 0 5 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.12561 1.13672L0.999943 18.8633" stroke="#E5E7EB" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                        <span className="ml-1 text-base font-medium text-[#142F62] md:ml-2 whitespace-nowrap">{data.label}</span>
                    </div>
                </li>
            </ol>
        </nav>
    );
};

export default Breadcrumbs;