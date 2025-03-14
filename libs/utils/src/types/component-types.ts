import { LoadingVariant, LoadingSize } from "./style-types";


export interface LoadingProps {
  variant?: LoadingVariant;
  size?: LoadingSize;
  className?: string;
  fullScreen?: boolean;
  message?: string;
}