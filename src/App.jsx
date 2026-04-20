import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { FieldsPage } from './pages/FieldsPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import './App.css'; // Vite expects this or we can just leave it

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="fields" element={<FieldsPage />} />
          <Route path="equipment" element={<PlaceholderPage title="Thiết bị" />} />
          <Route path="schedule" element={<PlaceholderPage title="Lịch trình" />} />
          <Route path="settings" element={<PlaceholderPage title="Cài đặt" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
