import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { OpeningsPage } from '@/pages/OpeningsPage';
import { PuzzlesPage } from '@/pages/PuzzlesPage';
import { GamesPage } from '@/pages/GamesPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { useTheme } from '@/hooks/useTheme';

function AppContent() {
  // Initialize theme
  useTheme();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/openings" element={<OpeningsPage />} />
        <Route path="/openings/:openingId" element={<OpeningsPage />} />
        <Route path="/puzzles" element={<PuzzlesPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
