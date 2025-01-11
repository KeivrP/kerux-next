import { handleSignOut } from '@/app/actions/authSignout';
import MenuDropdown from '@/components/dropdown/menu-dropdown';
import { UserLogin } from 'next-auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useMemo, useEffect, useState } from 'react';

const MenuAvatar = () => {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<UserLogin | null>(null);
    const [isSigningOut, setIsSigningOut] = useState(false);

    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            setUser(session.user as unknown as UserLogin);
        }
    }, [session, status]);

    if (status === 'loading') {
        return (
            <div className="animate-pulse">
                <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const handleSignOutClick = async () => {
        setIsSigningOut(true);
        await handleSignOut();
    };

    return (
        <MenuDropdown buttonText={user.name ?? ''} icon={<Image src="https://avatar.iran.liara.run/public/3" alt="user photo" width={32} height={32} />}>
            <div className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl min-w-[250px]">
                {/* Header con información del usuario */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="h-12 w-12 rounded-full bg-[#142F62] flex items-center justify-center text-white">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div className="text-[#142F62] font-semibold capitalize">
                                {user.name?.toLowerCase()}
                            </div>
                            <div className="text-gray-500 text-sm">
                                {user.email}
                            </div>
                        </div>
                    </div>
                    <div className="inline-flex px-3 py-1.5 bg-[#142F62] text-white rounded-full text-xs">
                        {user.descundejec ? user.descundejec.slice(0, 15) + (user.descundejec.length > 15 ? '...' : '') : '*'}
                    </div>
                </div>

                {/* Opciones del menú */}
                <div className="p-2">
                    <a href="#" className="group/item flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-50">
                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-[#142F62] group-hover/item:bg-[#142F62] group-hover/item:text-white transition-colors">
                            <span className="text-lg">📝</span>
                        </div>
                        <span className="text-gray-700 group-hover/item:text-[#142F62]">Reportar Problema</span>
                    </a>
                    <a href="/profile/settings" className="group/item flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-50">
                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-[#142F62] group-hover/item:bg-[#142F62] group-hover/item:text-white transition-colors">
                            <span className="text-lg">⚙️</span>
                        </div>
                        <span className="text-gray-700 group-hover/item:text-[#142F62]">Configuración</span>
                    </a>
                </div>

                {/* Botón de cerrar sesión */}
                <div className="p-2 border-t border-gray-100">
                    <form action={handleSignOutClick}>
                        <button
                            type="submit"
                            disabled={isSigningOut}
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed group/signout"
                        >
                            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 group-hover/signout:bg-red-600 group-hover/signout:text-white transition-colors">
                                <span className="text-lg">🚪</span>
                            </div>
                            {isSigningOut ? (
                                <div className="flex items-center gap-2 text-red-600">
                                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                    <span>Cerrando sesión...</span>
                                </div>
                            ) : (
                                <span className="text-red-600">Cerrar Sesión</span>
                            )}
                        </button>
                    </form>
                </div>

                {/* Barra de gradiente en la parte inferior */}
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#142F62] to-blue-500 transform scale-x-0 transition-transform group-hover:scale-x-100"></div>
            </div>
        </MenuDropdown>
    );
};

export default MenuAvatar;

