import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { TablesPage } from './pages/TablesPage';
import { ChartsPage } from './pages/ChartsPage';
import { CalendarPage } from './pages/CalendarPage';
import { KanbanPage } from './pages/KanbanPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="tables" element={<TablesPage />} />
        <Route path="charts" element={<ChartsPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="kanban" element={<KanbanPage />} />
      </Route>
    </Routes>
  );
}

export default App;
