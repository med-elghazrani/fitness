import { Routes, Route, Navigate } from "react-router-dom";
import RecommendationView from "./modules/recommendation/views/RecommendationView";
import CaloriesView from "./modules/calories/views/CaloriesView";
import DietPage from "./modules/Macronutritions/views/DietPage";
import IngredientsPage from "./modules/ingredients/views/IngredientsPage";
import MicroPage from "./modules/micronutritions/views/MicroPage";
import BmiView from "./modules/bmi/views/BmiView";
import AccountView from "./modules/account/views/AccountView";
import StatsView from "./modules/stats/views/StatsView";
import HomePage from "./modules/home/views/HomePage";
import LoginPage from "./modules/auth/views/LoginPage";
import RegisterPage from "./modules/auth/views/RegisterPage";

export const routes = [
  { path: "/calories", label: "Calories brûlées", element: <CaloriesView /> },
  { path: "/recommendation", label: "Recommendation", element: <RecommendationView /> },
  { path: "/diet", label: "Diet Goal Road", element: <DietPage /> },
  { path: "/bmi", label: "BMI", element: <BmiView /> },
  { path: "/stats", label: "My Stats", element: <StatsView /> },
  { path: "/account", label: "My Account", element: <AccountView /> },
];

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {routes.map((r) => (
        <Route key={r.path} path={r.path} element={r.element} />
      ))}
      <Route path="/ingredients" element={<IngredientsPage />} />
      <Route path="/micro" element={<MicroPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
