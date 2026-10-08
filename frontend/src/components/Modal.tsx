import styles from "../styles/Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles["modal-backdrop"]} onClick={onClose}>
      <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
        <div className={styles["modal-header"]}>
          <h2>{title}</h2>
          <button className={styles["close-btn"]} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles["modal-body"]}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
