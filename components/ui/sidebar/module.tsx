import React from 'react';
import { MenuItemUser } from './sidebar-utils';
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
        className="px-3 py-5 transition-all w-full duration-500 hover:bg-gray-50 hover:rounded-xl flex items-center"
        onClick={() => router.push(item.path.toLocaleLowerCase())}      >
        <div className="bg-orange-50 rounded-lg w-12 h-12 flex items-center justify-center">
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