import { handleSignOut } from '@/app/actions/authActions';
import MenuDropdown from '@/components/dropdown/menu-dropdown';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useMemo } from 'react';

const MenuAvatar = () => {
    const { data: session } = useSession();

    const user = useMemo(() => {
        if (session) {
            return session.user.name?.toString();
        }
    }, [session]);


    return (
        <MenuDropdown buttonText={user ?? ''} icon={<Image src="https://avatar.iran.liara.run/public/3" alt="user photo" width={32} height={32} />}>

                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div className="font-medium">Pro User</div>
                    <div className="truncate">name@flowbite.com</div>
                </div>
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownAvatarNameButton"
                >
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Settings
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Earnings
                        </a>
                    </li>
                </ul>
                <div className="py-2">
                    <form action={handleSignOut}>
                        <button
                            type="submit"
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                            Sign out
                        </button>
                    </form>
                </div>
        </MenuDropdown>
    );
};

export default MenuAvatar;

