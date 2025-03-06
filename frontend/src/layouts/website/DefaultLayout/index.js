import { Container } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";

function DefautlLayout({ children }) {
  return (
    <>
      <Header />
      <Container fluid style={{ minHeight: "80vh", padding: "20px" }}>
        <div>
            {children}
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default DefautlLayout;
