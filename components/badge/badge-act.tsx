import { CircleCheck, CircleMinus } from "lucide-react";
import React from "react";

interface BadgeActProps {
  status: "S" | "N";
}

export function BadgeAct({ status }: BadgeActProps) {
  switch (status) {
    case "S":
      return (
        <div className="flex justify-center items-center">
          <CircleCheck className="text-emerald-500" />
        </div>
      );
    case "N":
      return (
        <div className="flex justify-center items-center">
          <CircleMinus className="text-red-500" />
        </div>
      );
    default:
      return null;
  }
}
