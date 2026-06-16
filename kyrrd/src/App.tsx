import { Routes, Route, Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Archive from './pages/Archive';
import PlateDetail from './pages/PlateDetail';
import Inscribe from './pages/Inscribe';
import Checkout from './pages/Checkout';
import About from './pages/About';

function Layout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="archive" element={<Archive />} />
        <Route path="plate/:id" element={<PlateDetail />} />
        <Route path="inscribe/:id" element={<Inscribe />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
