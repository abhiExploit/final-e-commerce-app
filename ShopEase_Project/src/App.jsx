import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import OrdersPage from './pages/OrdersPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ReturnPage from './pages/ReturnPage';
import AccountPage from './pages/AccountPage';

export default function App() {
  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id/tracking" element={<OrderTrackingPage />} />
          <Route path="/orders/:id/return" element={<ReturnPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}
