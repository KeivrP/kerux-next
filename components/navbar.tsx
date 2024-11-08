"use client";
import React, { use, useEffect, useState } from "react";
import SubMenu from "./ui/sidebar/sub-menu";
import Dropdown from "./ui/sidebar/dropdown";
import { CodMenu, getLabel, getMenuIcon } from "./ui/sidebar/sidebar-utils";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useSubMenu } from "@/server/session/useSession";
import Image from "next/image";

const Navbar = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const firstPathSegment = pathname.split("/")[1].toLocaleUpperCase();
  const { data, isLoading } = useSubMenu(firstPathSegment);
  const [submenu, setMenu] = useState<{ menu: string; submenu: any }[]>([]);

  useEffect(() => {
    if (data) {
      setMenu(data);
    }
  }, [data, isLoading]);

  return (

    <div className="h-screen flex flex-col">
      <header className="sticky h-16 bg-gray-200">
        <SubMenu isOpen={open} />
      </header>
      <aside className="fixed top-0 left-0 z-50 flex">
        <div
          className={`transition-all duration-300 ${open ? "w-72" : "w-24"
            } xl:p-4 p-2 bg-[#142f62] flex-col justify-start items-${open ? "start" : "center"
            } gap-5 inline-flex border-r bg-red h-screen`}
        >
          {firstPathSegment === "" ? (
            <></>
          ) : (
            <>
              {open ? (
                <div className="flex justify-center items-center w-full p-2 transition-all duration-300">
                  <a href="/" className="flex items-center">
                    <Image
                      src="/KeruxLogo.png"
                      alt="Kerux Logo"
                      width={200}
                      height={200}
                      className={`transition-all duration-300 ${open ? "opacity-100" : "opacity-0"
                        }`}
                    />
                  </a>
                </div>
              ) : (
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    marginTop: "0.25rem",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22.6016 9.65528H31.4592V0.149902H21.9538V9.02278L18.4771 12.4995H13.4829L10.0061 9.02279V0.149902H0.500735V9.65528H9.35835L12.8496 13.1466V18.127L9.35875 21.6179H0.5V30.4766V31.1232H10.0054V22.2515L13.5495 18.7074H18.4105L21.9545 22.2515V31.1232H31.4599V30.4766V21.6179H22.6012L19.0575 18.0742V13.1994L22.6016 9.65528Z"
                    fill="#fff"
                  />{" "}
                </svg>
              )}
              <button
                className="w-full p-3 rounded-lg border border-gray-500 text-white text-sm font-semibold leading-snug hover:bg-gray-500 hover:text-white transition-all duration-300"
                onClick={() => setOpen(!open)}
              >
                <div className="w-full items-center flex">
                  <div className="w-full justify-between items-center inline-flex">
                    <div className="items-center flex ml-1">
                      {getMenuIcon(firstPathSegment as CodMenu)}
                      {open && (
                        <div className="flex-col inline-flex ml-2.5">
                          <h2 className="transition-all duration-300 text-sm font-semibold leading-snug text-white">
                            {getLabel(firstPathSegment as CodMenu)}
                          </h2>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>

              <div className="w-full">
                <div className="w-full h-8 px-3 items-center flex">
                  <h6 className=" text-xs font-semibold leading-4 text-white">
                    MENU
                  </h6>
                </div>
                {submenu.map((item, i) => (
                  <ul key={i} className="flex-col gap-1 flex">
                    <Dropdown
                      title={item.menu}
                      submenu={item.submenu}
                      open={open}
                      setOpen={() => setOpen(!open)}
                    />
                  </ul>
                ))}
              </div>
            </>
          )}
        </div>
      </aside>
      <div className="flex flex-1 overflow-auto">
        <div
          style={{
            marginLeft: open ? "18.2rem" : "6.2rem",
            transition: "margin-left 0.2s ease-in-out",
          }}
          className="flex-1 transition-all duration-300"
        >
          {children}
        </div>
      </div>
      

    </div>
  );
};

export default Navbar;
