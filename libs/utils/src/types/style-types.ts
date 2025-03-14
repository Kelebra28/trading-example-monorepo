export type ClassValue = string | null | undefined | boolean | { [key: string]: boolean };
export type ClassArray = Array<ClassValue | ClassArray>;

export type LoadingVariant = 'spinner' | 'dots' | 'skeleton';
export type LoadingSize = 'sm' | 'md' | 'lg';