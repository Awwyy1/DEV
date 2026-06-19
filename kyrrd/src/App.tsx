import { Routes, Route, Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Archive from './pages/Archive';
import PlateDetail from './pages/PlateDetail';
import Inscribe from './pages/Inscribe';
import Done from './pages/Done';
import About from './pages/About';
import Journal from './pages/Journal';
import Article from './pages/Article';

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
        <Route path="done" element={<Done />} />
        <Route path="journal" element={<Journal />} />
        <Route path="journal/:slug" element={<Article />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
