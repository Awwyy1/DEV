import { Routes, Route, Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Archive from './pages/Archive';
import PlateDetail from './pages/PlateDetail';
import Inscribe from './pages/Inscribe';
import Done from './pages/Done';
import Journal from './pages/Journal';
import Article from './pages/Article';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cards from './pages/Cards';

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
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="archive" element={<Archive />} />
          <Route path="plate/:id" element={<PlateDetail />} />
          <Route path="inscribe/:id" element={<Inscribe />} />
          <Route path="done" element={<Done />} />
          <Route path="journal" element={<Journal />} />
          <Route path="journal/:slug" element={<Article />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="cards" element={<Cards />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}
