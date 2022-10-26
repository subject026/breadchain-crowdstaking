import { ReactNode } from 'react';

type TProps =
  { children: ReactNode }

export function IconContainer({ children }: TProps) {
  return (
    <span className="h-6 w-6 flex justify-center items-center text-neutral-200">
      {children}
    </span>
  );
}

export default IconContainer;
