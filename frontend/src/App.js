import { BrowserRouter , Routes, Route } from "react-router"
import { PUBLIC_ROUTES } from "./routes";
import '@assets/styles/App.scss'

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Routes>
              {
                PUBLIC_ROUTES.map((route, index) => {
                  const Page = route.component;
                  return <Route key={index} path={route.path} element={<Page/>} />
                })
              }
            </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
