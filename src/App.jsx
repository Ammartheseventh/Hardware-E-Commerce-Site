import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import CheckoutLayout from './components/checkout/CheckoutLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutInformationPage from './pages/checkout/InformationPage';
import CheckoutDeliveryPage from './pages/checkout/DeliveryPage';
import CheckoutReviewPage from './pages/checkout/ReviewPage';
import CheckoutConfirmationPage from './pages/checkout/ConfirmationPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>

      <Route element={<CheckoutLayout />}>
        <Route path="/checkout" element={<CheckoutInformationPage />} />
        <Route path="/checkout/delivery" element={<CheckoutDeliveryPage />} />
        <Route path="/checkout/review" element={<CheckoutReviewPage />} />
        <Route path="/checkout/confirmation/:orderId" element={<CheckoutConfirmationPage />} />
      </Route>
    </Routes>
  );
}

export default App;