import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { PUBLIC_ROUTES } from "./routes";
import DefautlLayout from "./layouts/website/DefaultLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/App.scss";

function App() {
  return (
    <BrowserRouter>
      <Container fluid className="p-0">
        <Routes>
          {PUBLIC_ROUTES.map((route, index) => {
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
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
