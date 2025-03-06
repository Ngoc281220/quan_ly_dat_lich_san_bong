import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// https://react-leaflet.js.org/docs/example-tooltips/
const DaNangCoords = [16.0544, 108.2022]; // Tọa độ của Đà Nẵng

function MapComponent() {
  return (
    <MapContainer
      center={DaNangCoords}
      zoom={13}
      style={{ height: "1000px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={DaNangCoords}>
        <Popup>Đà Nẵng, Việt Nam</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;
