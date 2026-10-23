import { FaPlus } from "react-icons/fa";
import styles from "../styles/AddButton.module.css";
import Modal from "./Modal";
import type { AddButtonProps } from "../types/sharedTypes";

const AddButton = <FormData,>({
  name,
  handleClick,
  isModalOpen,
  setIsModalOpen,
  FormComponent,
}: AddButtonProps<FormData>) => {
  return (
    <div className="button-container">
      <button
        type="button"
        className={styles["add-button"]}
        onClick={() => setIsModalOpen(true)}
      >
        <span>
          <FaPlus />
        </span>
        <span>Add {name}</span>
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={name}
      >
        <FormComponent
          onSubmit={handleClick}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default AddButton;
