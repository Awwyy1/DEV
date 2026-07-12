import { Routes, Route, Outlet, Navigate, useParams } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import ScrollToTop from './components/ScrollToTop';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Archive from './pages/Archive';
import PlateDetail from './pages/PlateDetail';
import Done from './pages/Done';
import Journal from './pages/Journal';
import Article from './pages/Article';
import Walk from './pages/Walk';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Create from './pages/Create';
import Card from './pages/Card';
import Hotel from './pages/Hotel';
import NotFound from './pages/NotFound';

// The old inscribe editor is retired; keep the URL working by sending it
// to the new card editor.
function InscribeToCreate() {
  const { id } = useParams();
  return <Navigate to={`/create/${id}`} replace />;
}

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
        {/* Hidden QR landings — standalone, no nav/footer, not linked anywhere. */}
        <Route path="/c/:slug" element={<Card />} />
        <Route path="/hotel/:partner" element={<Hotel />} />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="archive" element={<Archive />} />
          <Route path="plate/:id" element={<PlateDetail />} />
          <Route path="inscribe/:id" element={<InscribeToCreate />} />
          <Route path="create/:id" element={<Create />} />
          <Route path="done" element={<Done />} />
          <Route path="journal" element={<Journal />} />
          <Route path="journal/:slug" element={<Article />} />
          <Route path="walk" element={<Walk />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="cards" element={<Navigate to="/archive" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Analytics />
    </>
  );
}
