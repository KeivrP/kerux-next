import React from "react";

interface BadgeActProps {
  status: "S" | "N";
}

export function BadgeAct({ status }: BadgeActProps) {
  
  switch (status) {
    case "S":
      return (
        <div className="py-1.5 px-2.5 rounded-full bg-emerald-50 flex justify-center items-center gap-1">
          <svg
            width="5"
            height="6"
            viewBox="0 0 5 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.5" cy="3" r="2.5" fill="#059669"></circle>
          </svg>
          <span className="font-medium text-xs text-emerald-600 ">Activo</span>
        </div>
      );
    case "N":
      return (
        <div className="py-1.5 px-2.5 rounded-full bg-red-50 flex items-center justify-center gap-1">
          <svg
            width="5"
            height="6"
            viewBox="0 0 5 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.5" cy="3" r="2.5" fill="#D97706"></circle>
          </svg>
          <span className="font-medium text-xs text-amber-600">Inactivo</span>
        </div>
      );
    default:
      return null;
  }
}


export function BadgeRev({ status }: BadgeActProps) {
  
  switch (status) {
    case "S":
      return (
        <div className="py-1.5 px-2.5 rounded-full bg-emerald-50 flex justify-center items-center gap-1">
          <svg
            width="5"
            height="6"
            viewBox="0 0 5 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.5" cy="3" r="2.5" fill="#059669"></circle>
          </svg>
          <span className="font-medium text-xs text-emerald-600 ">Si</span>
        </div>
      );
    case "N":
      return (
        <div className="py-1.5 px-2.5 rounded-full bg-red-50 flex items-center justify-center gap-1">
          <svg
            width="5"
            height="6"
            viewBox="0 0 5 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.5" cy="3" r="2.5" fill="#D97706"></circle>
          </svg>
          <span className="font-medium text-xs text-amber-600">No</span>
        </div>
      );
    default:
      return null;
  }
}


