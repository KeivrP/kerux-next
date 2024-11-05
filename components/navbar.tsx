
'use client';
import React, { use, useEffect, useState } from "react";
import SubMenu from "./ui/sidebar/sub-menu";
import Dropdown from "./ui/sidebar/dropdown";
import { CodMenu, getMenuIcon } from "./ui/sidebar/sidebar-utils";
import { ReactNode } from "react";
import { useRouter } from 'next/router';
import { usePathname } from "next/navigation";
import { useSubMenu } from "@/server/session/useSession";

const Navbar = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const firstPathSegment = pathname.split('/')[1].toLocaleUpperCase();
  const { data, isLoading } = useSubMenu(firstPathSegment);
  const [submenu, setMenu] = useState<{ menu: string, submenu: any }[]>([]);


  useEffect(() => {
    if (data) {
      setMenu(data);
    }
  }, [data, isLoading]);

  return (
    <>
      <div className="flex">

        <aside className="fixed top-0 left-0 z-50 flex">
          <div className={`transition-all duration-300 ${open ? 'w-72' : 'w-24'} xl:p-4 p-2 bg-white flex-col justify-start items-${open ? 'start' : 'center'} gap-5 inline-flex border-r bg-red border-r h-screen`}>
            <button
              className="w-full p-3 rounded-lg border border-gray-300 hover:bg-gray-100"
              onClick={() => setOpen(!open)}
            >
              <div className="w-full items-center flex">
                <div className="w-full justify-between items-center inline-flex">
                  <div className="items-center flex ml-1">
                    {getMenuIcon(firstPathSegment as CodMenu)}
                    {open && (
                      <div className="flex-col inline-flex ml-2.5">
                        <h2 className="transition-all duration-300 text-gray-700 text-sm font-semibold leading-snug">
                          Documentos
                        </h2>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>

            <div className="w-full">
              <div className="w-full h-8 px-3 items-center flex">
                <h6 className="text-gray-500 text-xs font-semibold leading-4">MENU</h6>
              </div>
              {submenu.map((item, i) => (

                <ul key={i} className="flex-col gap-1 flex">
                  <Dropdown title={item.menu} path='' icon='' submenu={item.submenu} open={open} setOpen={() => setOpen(!open)} />
                </ul>
              ))
              }
            </div>
          </div>
        <SubMenu isOpen={open} />
        </aside>

        <div
          style={{
            marginLeft: open ? '18.2rem' : '6.2rem',
            marginTop: '4.3rem',
            maxHeight: 'calc(100vh - 6rem)', // Corrige '98hv' a '98vh'
          }}
          className="flex-1 transition-all duration-300 "
        >
          {children}

        </div>
      </div>


    </>
  );
};

export default Navbar;
