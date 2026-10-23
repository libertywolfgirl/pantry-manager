import LeafMark from "../../../components/icons/LeafMark";
import styles from "../styles/Logo.module.css";

const Logo = () => {
  return (
    <div className={styles["container-box"]}>
      <div className={styles["circle-border"]}></div>
      <div className={styles["circle-solid"]}></div>
      <div className={styles["icon-box"]}>
        <span className={styles["icon-svg"]}>
          <LeafMark />
        </span>
      </div>
    </div>
  );
};

export default Logo;
