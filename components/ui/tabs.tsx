import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabProps {
  id: string;
  label: string;
  children: React.ReactNode; // Cambiado a children para permitir componentes
}

interface TabsProps {
  tabs: TabProps[];
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ tabs, children }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col">
      <div className="flex p-1 dark:bg-neutral-700 dark:hover:bg-neutral-600">
        <nav
          className="flex gap-x-1"
          aria-label="Tabs"
          role="tablist"
          aria-orientation="horizontal"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#142f62] to-[#354f8e] text-white"
                  : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-white"
              } py-3 px-4 inline-flex items-center gap-x-2 text-sm focus:outline-none font-medium rounded-lg`}
              id={tab.id}
              aria-selected={activeTab === tab.id}
              onClick={() => handleTabClick(tab.id)}
              aria-controls={tab.id}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="flex-1 flex justify-end">{children}</div>
      </div>

      <div className="mt-3">
        <AnimatePresence>
          {tabs.map((tab) => (
            <motion.div
              key={tab.id}
              id={tab.id}
              role="tabpanel"
              aria-labelledby={tab.id}
              variants={variants}
              initial="hidden"
              animate={activeTab === tab.id ? "visible" : "hidden"}
              exit="hidden"
              className={activeTab === tab.id ? "block" : "hidden"}
            >
              <div>{tab.children}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tabs;
