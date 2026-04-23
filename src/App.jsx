import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { FieldsPage } from './pages/FieldsPage';
import { FieldDetailPage } from './pages/FieldDetailPage';
import { EquipmentPage } from './pages/EquipmentPage';
import { SchedulePage } from './pages/SchedulePage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="fields" element={<FieldsPage />} />
            <Route path="fields/:id" element={<FieldDetailPage />} />
            <Route path="equipment" element={<EquipmentPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="settings" element={<PlaceholderPage title="Cài đặt" />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
