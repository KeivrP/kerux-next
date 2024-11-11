import React, { MouseEvent } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

interface MyBreadcrumbsProps {
  numbers: number[];
  onNumberClick: (number: number) => void;
}

const BreadcumbsGlobal: React.FC<MyBreadcrumbsProps> = ({
  numbers,
  onNumberClick,
}) => {
  const handleNumberClick = (
    event: MouseEvent<HTMLAnchorElement>,
    number: number
  ) => {
    event.preventDefault();
    onNumberClick(number);
  };

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      {numbers.map((number, index) => (
        <Link
          key={index}
          color="primary"
          href="#"
          onClick={(event) => handleNumberClick(event, number)}
        >
          {number}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default BreadcumbsGlobal;
