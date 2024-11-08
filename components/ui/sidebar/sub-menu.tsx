import React, { useEffect, useMemo, useState } from "react";
import MenuAvatar from "./menu-avatar";
import { completdMenus, MenuItemUser } from "./sidebar-utils";
import { useMenu } from "@/server/session/useSession";
import ModuleItem from "./module";
import MenuDropdown from "@/components/dropdown/menu-dropdown";

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
      if (
        dropdownOpen &&
        !document
          .getElementById("full-width-megamenu")
          ?.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav
      style={{
        marginLeft: isOpen ? "18.2rem" : "6.2rem",
        minWidth: isOpen ? "calc(100% - 18.2rem)" : "calc(100% - 6.2rem)",
        transition: "margin-left 0.2s ease-in-out, min-width 0.2s ease-in-out",
      }}
      className={`fixed flex border-gray-200  border-b py-3 bg-white border-b-default h-16 border-solid border-prime-gray-200`}
    >
      <div className="w-full flex flex-row p-2 px-4 justify-between">
        <div className="hidden lg:flex lg:pl-8 gap-4" id="megamenu-cta">
          <ul className="flex lg:items-center gap-y-4 flex-col my-4 lg:my-0 lg:flex-row">
            <MenuDropdown onOpenChange={(a) => setDropdownOpen(a)} transformOrigin={{ vertical: 'top', horizontal: 'left' }} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} buttonText="" icon={<svg
              style={{
                transform: dropdownOpen ? "rotate(45deg)" : "rotate(0deg)",
                transition: "0.5s",
                visibility: "visible",
                color: "#FEFBFF",
                width: "1.8rem",
                height: "1.8rem",
              }}
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 10.4956C0 9.59512 0.725616 8.86951 1.62609 8.86951H6.50435C7.40482 8.86951 8.13043 9.59512 8.13043 10.4956V15.3739C8.13043 16.2743 7.40482 16.9999 6.50435 16.9999H1.62609C0.725616 16.9999 0 16.2743 0 15.3739V10.4956ZM1.62609 10.3478C1.54204 10.3478 1.47826 10.4115 1.47826 10.4956V15.3739C1.47826 15.4579 1.54204 15.5217 1.62609 15.5217H6.50435C6.5884 15.5217 6.65217 15.4579 6.65217 15.3739V10.4956C6.65217 10.4115 6.5884 10.3478 6.50435 10.3478H1.62609Z"
                fill="#142f62"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.86914 10.4956C8.86914 9.59512 9.59476 8.86951 10.4952 8.86951H15.3735C16.274 8.86951 16.9996 9.59512 16.9996 10.4956V15.3739C16.9996 16.2743 16.274 16.9999 15.3735 16.9999H10.4952C9.59476 16.9999 8.86914 16.2743 8.86914 15.3739V10.4956ZM10.4952 10.3478C10.4112 10.3478 10.3474 10.4115 10.3474 10.4956V15.3739C10.3474 15.4579 10.4112 15.5217 10.4952 15.5217H15.3735C15.4575 15.5217 15.5213 15.4579 15.5213 15.3739V10.4956C15.5213 10.4115 15.4575 10.3478 15.3735 10.3478H10.4952Z"
                fill="#142f62"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 1.62609C0 0.725616 0.725616 0 1.62609 0H6.50435C7.40482 0 8.13043 0.725616 8.13043 1.62609V6.50435C8.13043 7.40482 7.40482 8.13043 6.50435 8.13043H1.62609C0.725616 8.13043 0 7.40482 0 6.50435V1.62609ZM1.62609 1.47826C1.54204 1.47826 1.47826 1.54204 1.47826 1.62609V6.50435C1.47826 6.5884 1.54204 6.65217 1.62609 6.65217H6.50435C6.5884 6.65217 6.65217 6.5884 6.65217 6.50435V1.62609C6.65217 1.54204 6.5884 1.47826 6.50435 1.47826H1.62609Z"
                fill="#142f62"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.86914 1.62609C8.86914 0.725616 9.59476 0 10.4952 0H15.3735C16.274 0 16.9996 0.725616 16.9996 1.62609V6.50435C16.9996 7.40482 16.274 8.13043 15.3735 8.13043H10.4952C9.59476 8.13043 8.86914 7.40482 8.86914 6.50435V1.62609ZM10.4952 1.47826C10.4112 1.47826 10.3474 1.54204 10.3474 1.62609V6.50435C10.3474 6.5884 10.4112 6.65217 10.4952 6.65217H15.3735C15.4575 6.65217 15.5213 6.5884 15.5213 6.50435V1.62609C15.5213 1.54204 15.4575 1.47826 15.3735 1.47826H10.4952Z"
                fill="#142f62"
              />
            </svg>}>

                <div style={{ padding: "2rem" }}>
                <div className="grid grid-cols-1 gap-3">
                  <ul
                  className="text-sm text-gray-700"
                  aria-labelledby="dropdownLargeButton"
                  >
                  <h6 className="font-medium text-sm text-gray-500 mb-2">
                    Módulos Kerux
                  </h6>
                  {menus.map((menu) => (
                    <ModuleItem key={menu.path} item={menu} />
                  ))}
                  </ul>
                </div>
                </div>

            </MenuDropdown>
          </ul>
        </div>

        <div className="">
          <MenuAvatar />
        </div>
      </div>
    </nav>
  );
};

export default SubMenu;
