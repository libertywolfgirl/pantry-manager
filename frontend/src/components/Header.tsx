import { useAuth } from "../features/auth/hooks/useAuth";
import styles from "../styles/Header.module.css";

function LeafMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M30.5 8.5C21.6 8.6 13 11.9 10.2 19.2c-2 5.2.8 10.2 5.8 11.3 6.8 1.5 13.7-4.2 14.5-22Z"
        fill="currentColor"
      />
      <path
        d="M10 32c2.8-8.4 8.2-13.8 16-17.1"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
