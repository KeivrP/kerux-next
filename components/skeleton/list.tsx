import { ReactNode } from 'react';
import Skeleton from '@mui/material/Skeleton';

/*
Parameters:
  number[INT] = Number of items for the list
*/
export const SkeletonList = ({ children, number = 2 }: { children: ReactNode, number?: number }) => {
  return (
    <div>
      {[...Array(number)].map((_, index) => (
        <Skeleton key={index} width="100%">
          {children}
        </Skeleton>
      ))}
    </div>
  );
};
