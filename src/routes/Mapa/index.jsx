import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { API_BASE_URL } from "../../config";// Importando o IP do arquivo de configuração

const myHeaders = new Headers();
myHeaders.append("fiware-service", "smart");
myHeaders.append("fiware-servicepath", "/");
myHeaders.append("accept", "application/json");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

function LiveTracker() {
  const [position, setPosition] = useState([0, 0]);

  useEffect(() => {
    const fetchData = () => {
      // Fazendo fetch da latitude
      fetch(`${API_BASE_URL}/v2/entities/urn:ngsi-ld:next_gps/attrs/Latitude`, requestOptions)
        .then((response) => response.json())
        .then((dataLatitude) => {
          const latitude = dataLatitude.value;

          // Fazendo fetch da longitude
          fetch(`${API_BASE_URL}/v2/entities/urn:ngsi-ld:next_gps/attrs/Longitude`, requestOptions)
            .then((response) => response.json())
            .then((dataLongitude) => {
              const longitude = dataLongitude.value;
              setPosition([latitude, longitude]);
            })
            .catch((error) => console.error("Erro ao buscar longitude:", error));
        })
        .catch((error) => console.error("Erro ao buscar latitude:", error));
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Rastreador ao Vivo</h1>
      <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Posição Atual: {position[0]}, {position[1]}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LiveTracker;
