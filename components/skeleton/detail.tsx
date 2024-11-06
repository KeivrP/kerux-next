import { ReactNode } from "react";
import Skeleton from '@mui/material/Skeleton';
import { SkeletonList } from "../."

/*
Parameters:
  children[ReactNode] = children used to infer height
*/
export const SkeletonDetailTitle = ({ children }: { children: ReactNode }) => {
  return <Skeleton width="100%">{children}</Skeleton>
}

/*
Parameters:
  children[ReactNode] = children used to infer height
*/
export const SkeletonDetailContent = ({ children }: { children: ReactNode }) => {
  return <SkeletonList number={6}>{ children }</SkeletonList>
}

/*
Parameters:
  children[ReactNode] = children used to infer height
*/
export const SkeletonDetailActivity = () => {
  return <div>
    {[...Array(4)].map((_, index) => <Skeleton className="activity-skeleton-detail-row" key={index} ></Skeleton>)}
  </div>
}

export const SkeletonInput = () => {
  return <Skeleton variant="rectangular" width="100%" height="2.4rem" />
}
export const SkeletonMultiLine = () => {
  return <Skeleton variant="rectangular" width="100%" height="4rem" />
}
export const SkeletonCheck = () => {
  return <Skeleton variant="circular" width={15} height={15} />

}