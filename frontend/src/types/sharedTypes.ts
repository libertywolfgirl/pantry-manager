import type { ComponentType } from "react";

export interface AddButtonProps<FormData> {
  name: string;
  handleClick: (formData: FormData) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  FormComponent: ComponentType<{
    onSubmit: (formData: FormData) => void;
    onCancel: () => void;
  }>;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
