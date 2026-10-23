import { MdOutlineLogout } from "react-icons/md";
import { useAuth } from "../features/auth/hooks/useAuth";
import styles from "../styles/Header.module.css";
import LeafMark from "./icons/LeafMark";

const Header = () => {
  const { logout } = useAuth();
  const routes = [
    { name: "Dashboard", path: "/" },
    { name: "Pantry", path: "/pantry" },
    { name: "Recipe Book", path: "/recipes" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles["header-left"]}>
        <a href="/" className={styles["logo-link"]}>
          <span className={styles["logo-icon"]}>
            <span className={styles["leaf-mark"]}>
              <LeafMark />
            </span>
          </span>
          <span className={styles["logo-text"]}>Stocked</span>
        </a>
        <button className={styles.badge} onClick={logout}>
          <MdOutlineLogout />
          Logout
        </button>
      </div>
      <div className={styles["header-right"]}>
        {routes.map((route) => (
          <a key={route.path} href={route.path}>
            <span className={styles.badge}>{route.name}</span>
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;
