import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import PreviewPage from "./pages/PreviewPage";
import IssueCertificatePage from "./pages/admin/IssueCertificatePage";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="certificates/:id" element={<PreviewPage />} />
          <Route path="admin/certificates/new" element={<IssueCertificatePage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
