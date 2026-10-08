import { useState } from "react";
import styles from "../../../styles/Modal.module.css";

const AddIngredientForm = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: (formData: { name: string }) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({ name: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent standard page reload
    onSubmit(formData); // Send data to parent
  };

  return (
    <form onSubmit={handleSubmit} className={styles["modal-form"]}>
      <div className={styles["form-group"]}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles["modal-actions"]}>
        <button type="button" className={styles["btn-secondary"]} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles["btn-primary"]}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddIngredientForm;
