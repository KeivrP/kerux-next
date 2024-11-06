import React from 'react';
import Skeleton from '@mui/material/Skeleton';


type SkeletonACProps = {
    children: React.ReactNode;
  };
  
  export const SkeletonAC: React.FC<SkeletonACProps> = ({ children }) => {
    return <Skeleton width="100%">{children}</Skeleton>;
  };
  