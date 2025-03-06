import HeaderMap from "./Header";
import MapComponent from "./map";
import Footer from "../DefaultLayout/Footer";
function MapLayout() {
  return (
    <>
      <HeaderMap />
      <MapComponent />
      <Footer />
    </>
  );
}

export default MapLayout;
