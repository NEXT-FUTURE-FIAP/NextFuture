import {createRoot} from 'react-dom/client';
import {APIProvider, Map} from '@vis.gl/react-google-maps';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Graficos = () => {

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#eaeaea' }}>
      <APIProvider apiKey={apiKey}>
        <Map
          style={{ width: '100%', height: '100%' }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling="greedy"
          disableDefaultUI={true}
        />
      </APIProvider>
    </div>
  );
};

export default Graficos;

//   const [map, setMap] = useState(null);
//   const [marker, setMarker] = useState(null);

  
//   useEffect(() => {
//     if (!window.google) {
//       const googleMapsScript = document.createElement('script');
//       googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=beta&libraries=places`;
//       googleMapsScript.async = true;
//       googleMapsScript.defer = true;
//       googleMapsScript.onload = () => initializeMap(0, 0);
//       document.body.appendChild(googleMapsScript);
  
//       return () => {
//         document.body.removeChild(googleMapsScript);
//       };
//     } else {
//       initializeMap(0, 0);
//     }
//   }, []);

//   const initializeMap = (lat, lng) => {
//     const initialPosition = { lat, lng };
//     const googleMap = new window.google.maps.Map(document.getElementById('map'), {
//       center: initialPosition,
//       zoom: 15,
//     });

//     const carMarker = new AdvancedMarkerElement({
//       position: initialPosition,
//       map: googleMap,
//       title: 'Carro em movimento',
//       draggable: false,
//     });
    
//     setMap(googleMap);
//     setMarker(carMarker);
//   };

//   const updateCarPosition = (lat, lng) => {
//     const newPosition = { lat, lng };

//     if (!map) {
//       initializeMap(lat, lng);
//     } else {
//       marker.setPosition(newPosition);
//       map.setCenter(newPosition);
//     }
//   };

//   const fetchLatitude = async () => {
//     try {
//       const response = await fetch('http://3.142.53.99:1026/v2/entities/urn:ngsi-ld:next_gps/attrs/Latitude', {
//         method: 'GET',
//         headers: {
//           'fiware-service': 'smart',
//           'fiware-servicepath': '/',
//           accept: 'application/json',
//         },
//       });
//       const data = await response.json();
//       return data.value;
//     } catch (error) {
//       console.error('Erro ao buscar a latitude:', error);
//       return null;
//     }
//   };

//   const fetchLongitude = async () => {
//     try {
//       const response = await fetch('http://3.142.53.99:1026/v2/entities/urn:ngsi-ld:next_gps/attrs/Longitude', {
//         method: 'GET',
//         headers: {
//           'fiware-service': 'smart',
//           'fiware-servicepath': '/',
//           accept: 'application/json',
//         },
//       });
//       const data = await response.json();
//       return data.value;
//     } catch (error) {
//       console.error('Erro ao buscar a longitude:', error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const intervalId = setInterval(async () => {
//       const lat = await fetchLatitude();
//       const lng = await fetchLongitude();
//       if (lat !== null && lng !== null) {
//         updateCarPosition(lat, lng);
//       }
//     }, 2000);

//     return () => clearInterval(intervalId);
//   }, [map, marker]);

//   return <div id="map" style={{ height: '100vh', width: '100%' }} />;