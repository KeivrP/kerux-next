import { CheckCircle, Circle } from "lucide-react";
import React from "react";

interface BadgeActProps {
  status: "S" | "N";
}

export function BadgeAct({ status }: BadgeActProps) {
  switch (status) {
    case "S":
      return (
        <span className="flex justify-center items-center">
          <CheckCircle className="text-emerald-500" />
        </span>
      );
    case "N":
      return (
        <span className="flex justify-center items-center">
          <Circle className="text-red-500" />
        </span>
      );
    default:
      return null;
  }
}
