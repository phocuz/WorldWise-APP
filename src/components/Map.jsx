import  { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useCity } from '../context/CityContext';
import { useGeolocation } from '../hooks/useGeolocation';
import styles from './Map.module.css';

function Map() {
    const [searchParams] = useSearchParams();
    const { cities } = useCity();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    useEffect(() => {
        if (lat && lng) {
            setMapPosition([parseFloat(lat), parseFloat(lng)]);
        }
    }, [lat, lng]);

    useEffect(() => {
        if (geolocationPosition) {
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
        }
    }, [geolocationPosition]);

    return (
        <div className={styles.mapContainer}>
           { !geolocationPosition && <button type="position" onClick={getPosition}>
                {isLoadingPosition ? "Loading..." : "Use your position"}
            </button>}
            <MapContainer 
                center={mapPosition}
                zoom={13} 
                scrollWheelZoom={true} 
                className={styles.mapContainer}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            {city.cityName}
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({ position }) {
    const map = useMap();
    useEffect(() => {
        map.setView(position);
    }, [map, position]);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: (e) => {
            navigate(`/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
            console.log(e);
        }
    });
    return null;
}

export default Map;