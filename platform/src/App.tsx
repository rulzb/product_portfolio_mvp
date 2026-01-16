import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginView from './views/LoginView';
import SetupView from './views/SetupView';
import PortfolioView from './views/PortfolioView';
import DashboardView from './views/DashboardView';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/setup" element={<SetupView />} />
        <Route path="/portfolio" element={<PortfolioView />} />
        <Route path="/dashboard/:productId" element={<DashboardView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
