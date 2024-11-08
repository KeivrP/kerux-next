import React from 'react';
import { CodMenu, getColor, MenuItemUser } from './sidebar-utils';
import { useRouter } from 'next/navigation'

interface ModuleItemProps {
  item: MenuItemUser;
  onClick?: () => void;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ item, onClick }) => {
  const router = useRouter()

  return (
    <li>
      <button
        className="px-3 py-5 transition-all w-full duration-500 hover:rounded-xl flex items-center hover:bg-[#5680cf]"
        onClick={() => router.push(item.path.toLocaleLowerCase())}      >
        <div className={`rounded-lg w-12 h-12 flex items-center justify-center`} style={{ backgroundColor: getColor(item.menu as CodMenu) }}>
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