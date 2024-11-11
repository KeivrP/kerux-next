import { DialogTitle, useTheme } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";

interface DrawerProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position: "top" | "bottom" | "left" | "right";
  width?: string;
  height?: string;
}

const TopDrawer: React.FC<DrawerProps> = ({
  title,
  isOpen,
  onClose,
  children,
  position,
  width,
  height,
}) => {
  const theme = useTheme();
  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "top-0 left-0 right-0 w-full";
      case "bottom":
        return "bottom-0 left-0 right-0 w-full";
      case "left":
        return "top-0 left-0 bottom-0 h-full";
      case "right":
        return "top-0 right-0 bottom-0 h-full";
      default:
        return "";
    }
  };

  const drawerContent = (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
      )}
      <div
        className={`fixed z-50 p-4 transition-transform ${
          isOpen ? "translate-x-0" : position === "top" ? "-translate-y-full" : "-translate-x-full"
        } ${getPositionClasses()} p-4 overflow-y-auto bg-white border-b ${
          position === "left" ? "border-r" : "border-l"
        } border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg`}
        style={{
          width: position === "top" ? "100%" : width || "24rem",
          maxHeight: position === "top" ? height : "auto",
          borderRadius: "1rem",
        }}
        tabIndex={-1}
        aria-labelledby="drawer-label"
        aria-hidden="true"
      >
        <DialogTitle
          sx={{
            height: "4rem",
            margin: 0,
            width: "100%",
            background: theme.palette.background.default,
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h5
              id="drawer-label"
              className="inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
            >
              {title}
            </h5>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
          </div>
        </DialogTitle>
        <div className="mb-6 p-4 text-sm text-gray-500 dark:text-gray-400">
          {children}
        </div>
      </div>
    </>
  );

  return isOpen ? ReactDOM.createPortal(drawerContent, document.body) : null;
};

export default TopDrawer;
