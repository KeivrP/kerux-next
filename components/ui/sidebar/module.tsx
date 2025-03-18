import React from 'react';
import { CodMenu, getColor, MenuItemUser } from './sidebar-utils';
import { useRouter } from 'next/navigation';

interface ModuleItemProps {
  item: MenuItemUser;
  onClick?: () => void;
  disabled?: boolean; // Add disabled prop
}

const ModuleItem: React.FC<ModuleItemProps> = ({ item, onClick, disabled }) => {
  const router = useRouter();

  const isLinkDisabled = disabled || (item.path.toLocaleLowerCase() !== '/menulog' && item.path.toLocaleLowerCase() !== '/menudoc');

  const handleClick = () => {
    if (!isLinkDisabled) {
      router.push(item.path.toLocaleLowerCase());
    }
  };

  return (
    <li>
      <button
        className={`px-3 py-5 transition-all w-full duration-500 flex items-center ${
          isLinkDisabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:rounded-xl hover:bg-[#5680cf]'
        }`}
        onClick={handleClick}
        disabled={isLinkDisabled} // Disable the button when needed
      >
        <div
          className={`rounded-lg w-12 h-12 flex items-center justify-center`}
          style={{ backgroundColor: getColor(item.menu as CodMenu) }}
        >
          {item.icon}
        </div>
        <div className="ml-4 w-4/5">
          <h5 className="text-gray-900 text-base mb-1.5 font-semibold">{item.label}</h5>
          <p className="text-xs font-medium text-gray-400">{item.menu}</p>
        </div>
      </button>
    </li>
  );
};

export default ModuleItem;