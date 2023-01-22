import { Toast } from 'primereact/toast';
import React, { createRef, PropsWithChildren } from 'react';

export const ToastContext = React.createContext<React.RefObject<Toast> | null>(null);

type Props = PropsWithChildren<{}>;
export const ToastContextProvider = ({ children }: Props) => {
  const ref = createRef<Toast>();
  return (
    <ToastContext.Provider value={ref}>
      <Toast ref={ref} />
      {children}
    </ToastContext.Provider>
  );
};

export function useToast() {
  return React.useContext(ToastContext);
}
