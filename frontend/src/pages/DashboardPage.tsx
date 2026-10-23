import { useAuth } from "../features/auth/hooks/useAuth";
import DescriptionCard from "../features/dashboard/components/DescriptionCard";
import Logo from "../features/dashboard/components/Logo";
import PantryCard from "../features/dashboard/components/PantryCard";
import RecipeCard from "../features/dashboard/components/RecipeCard";
import styles from "../features/dashboard/styles/DashboardPage.module.css";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <main>
      <div className={styles["dashboard-container"]}>
        <div className={styles["header-text"]}>
          <p className={styles.tagline}>YOUR KITCHEN DASHBOARD</p>
          <h1 className={styles.heading}>
            Welcome back{user?.username ? `, ${user.username}` : ""}.
          </h1>
          <p className={styles.description}>
            Your next great meal starts with knowing what you already have. Keep
            your kitchen organized and your recipe ideas close at hand.
          </p>
        </div>
        <Logo />
      </div>
      <div className={styles["dashboard-content"]}>
        <PantryCard />
        <RecipeCard />
      </div>
      <DescriptionCard />
    </main>
  );
};

export default DashboardPage;
