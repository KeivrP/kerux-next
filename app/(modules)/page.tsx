"use client";
import Loader from "@/components/backdrop/loader";
import {
  CodMenu,
  completdMenus,
  getMenuIcon,
  MenuItemUser,
  getColor,
} from "@/components/ui/sidebar/sidebar-utils";
import { useMenu } from "@/server/session/useSession";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [menus, setMenus] = useState<MenuItemUser[]>([]);
  const { data, isLoading } = useMenu();

  useEffect(() => {
    if (data) {
      const menuFin = completdMenus(data);
      setMenus(menuFin);
    }
  }, [data, isLoading]);

  return (
    <Suspense fallback={<Loader />}>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="text-4xl text-center font-bold text-gray-900 py-5">
              KERUX: Innovación en la Gestión Administrativa
            </h2>
            <p className="text-lg font-normal text-gray-500 max-w-md md:max-w-2xl mx-auto">
              KERUX es un sistema administrativo integral desarrollado por
              Kentron, diseñado para optimizar la gestión financiera y
              administrativa de las entidades públicas. Con una variedad de
              módulos, este sistema mejora la eficiencia en el manejo de
              recursos y promueve la transparencia en la administración. Su
              implementación busca fortalecer la confianza de la ciudadanía en
              las instituciones gubernamentales.{" "}
            </p>
          </div>
          <div className="flex justify-center items-center gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
            {menus.map((module, index) => (
              <a
                href={module.path}
                key={index}
                className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4"
              >
                <div className="bg-indigo-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-[#142F62]">
                  {getMenuIcon(module.menu as CodMenu)}
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-3 capitalize">
                  {module.label}
                </h4>
                <p className="text-sm font-normal text-gray-500">Descripcion</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Suspense>
  );
}

{
  /* <div className="flex flex-col h-full items-center justify-center bg-gray-100">
  <h1 className="text-3xl font-bold mb-8">¡Bienvenido a la Aplicación!</h1>
  <h1 className="text-3xl font-bold mb-8">{session?.user.name}</h1>
  <div className="flex flex-wrap justify-center">
    {menus.map((module, index) => (
      <a
      href={module.path}
      style={{ backgroundColor: getColor(module.menu as CodMenu) }}
        className="bg-white border justify-center w-32 border-gray-300 rounded-lg shadow-md p-4 m-2 flex flex-col items-center transition-transform transform hover:scale-105"
        key={index}
      >
        <span className="text-4xl ">{getMenuIcon(module.menu as CodMenu)}</span>
      </a>        <span className="mt-2 font-semibold text-center">{module.label}</span>

    ))}
  </div>
</div> */
}
