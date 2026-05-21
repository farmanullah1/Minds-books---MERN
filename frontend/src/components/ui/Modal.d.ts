import React, { ReactNode } from 'react';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  noCloseBtn?: boolean;
  className?: string;
}

declare const Modal: React.FC<ModalProps>;
export default Modal;
