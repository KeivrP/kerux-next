'use client'

import { Suspense, useEffect, useState } from "react"
import { motion } from "framer-motion"

import { CodMenu, completdMenus, MenuItemUser } from "@/components/ui/sidebar/sidebar-utils"
import { useMenu } from "@/server/session/useSession"
import Loader from "@/components/backdrop/loader"
import { ModuleCard } from "@/components/ui/sidebar/module-card"

export default function Home() {
  const [menus, setMenus] = useState<MenuItemUser[]>([])
  const { data, isLoading } = useMenu()

  useEffect(() => {
    if (data) {
      const menuFin = completdMenus(data)
      setMenus(menuFin)
    }
  }, [data, isLoading])

  return (
    <Suspense fallback={<Loader />}>
      <div className="min-h-full bg-gradient-to-b from-blue-50 to-white">
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#142F62] via-[#001944] to-[#575E71]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#141b2c]/50"></div>
            </div>
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                Bienvenido a KERUX: Innovación en la Gestión Administrativa
              </h1>
              <p className="mx-auto mt-3 max-w-md text-base text-blue-100 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                Optimizando la gestión financiera y administrativa de entidades públicas para un futuro más eficiente y transparente.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Nuestros Módulos
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Explore las diversas funcionalidades de KERUX diseñadas para mejorar la eficiencia administrativa.
              </p>
            </div>
            <div className="container mx-auto px-4 py-8">
              <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
                menus.length > 4 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
              } gap-6 mx-auto justify-items-center ${
                menus.length <= 4 ? 'max-w-5xl' : 'max-w-7xl'
              }`}>
                {menus.map((module, index) => (
                  <ModuleCard
                    key={index}
                    title={module.label}
                    description="Descripción detallada del módulo y sus funcionalidades principales."
                    icon={module.menu as CodMenu}
                    path={module.path}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>


      </div>
    </Suspense>
  )
}

