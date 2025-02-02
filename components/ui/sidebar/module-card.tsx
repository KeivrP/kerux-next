import { CodMenu, getMenuIcon } from "@/components/ui/sidebar/sidebar-utils"
import { motion } from "framer-motion"

interface ModuleCardProps {
  title: string
  description: string
  icon: CodMenu
  path: string
}

export function ModuleCard({ title, description, icon, path }: ModuleCardProps) {
  return (
    <motion.a
      href={path}
      className="group flex h-full flex-col justify-between overflow-hidden rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg"
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <div>
        <motion.div
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-[#142F62] transition-all group-hover:bg-[#d9e2ff] group-hover:text-white"
          whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
        >
          {getMenuIcon(icon)}
        </motion.div>
        <h3 className="mb-1 text-lg font-semibold text-gray-900 group-hover:text-[#142F62] transition-colors">
          {title}
        </h3>
        <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors line-clamp-2">
          {description}
        </p>
      </div>
      <motion.div
        className="mt-2 h-0.5 w-full bg-gradient-to-r from-[#142F62] to-purple-600"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  )
}

