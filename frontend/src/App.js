import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { WEBSITE_ROUTES, ADMIN_ROUTES } from './routes';
import DefautlLayout from './layouts/website/DefaultLayout';
import DefaultLayoutAdmin from './layouts/admin/DefaultLayout';
import Loading from './config/loading';
import NotFoundPage from './pages/404/NotFoundPage';
import Unauthorized from './pages/Unauthorized';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/App.scss';
import { AuthAdmin } from './middleware';
import useAuthStore from './store';

function App() {
  const [loading, setLoading] = useState(true);
  const {user} = useAuthStore();
  useEffect(() => {
    // Giả lập API call
    setTimeout(() => setLoading(false), 4000);
  }, []);
  return (
    <BrowserRouter>
      <Container fluid className="p-0">
        {loading ? <Loading /> : ''}
        <ToastContainer />
        <Routes>
          {WEBSITE_ROUTES.map((route, index) => {
            const Layout = route.layout || DefautlLayout;
            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {ADMIN_ROUTES.map((route, index) => {
            const Layout = route.layout || DefaultLayoutAdmin;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <AuthAdmin role={user && user.role}>
                    <Layout>
                      <Page />
                    </Layout>
                  </AuthAdmin>
                }
              />
            );
          })}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/403" element={<Unauthorized />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
