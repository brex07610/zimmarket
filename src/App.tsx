import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ListingDetailPage from './pages/ListingDetailPage';
import PostAdPage from './pages/PostAdPage';
import SearchPage from './pages/SearchPage';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category/:id" element={<CategoryPage />} />
          <Route path="listing/:id" element={<ListingDetailPage />} />
          <Route path="post-ad" element={<PostAdPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="listings" element={<SearchPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
