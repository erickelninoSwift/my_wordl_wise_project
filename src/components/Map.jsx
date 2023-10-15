import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useCities } from "../context/CitiesContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeolocation";
import { Button1 } from "./Button1";
export const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [MapPosition, setMapPosition] = useState([40, 0]);

  const mapLat = searchParams.get("lat");
  const mapLong = searchParams.get("lng");

  const { allMyCities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  useEffect(() => {
    if (mapLat && mapLong) {
      setMapPosition([mapLat, mapLong]);
    }
  }, [mapLat, mapLong]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button1 type={"position"} onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your Position"}
        </Button1>
      )}
      <MapContainer
        className={styles.map}
        center={MapPosition}
        zoom={12}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {allMyCities.map((city) => {
          const { id, position, emoji, cityName } = city;
          return (
            <Marker key={id} position={[position.lat, position.lng]}>
              <Popup>
                <span>{emoji}</span>
                <span>{cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <GetCenterMap position={MapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

const DetectClick = () => {
  const navigation = useNavigate();
  useMapEvent({
    click: (e) => {
      const { lat, lng } = e.latlng;
      console.log(lat);
      console.log(lng);
      return navigation(`form?lat=${lat}&lng=${lng}`);
    },
  });
};

const GetCenterMap = ({ position }) => {
  const map = useMap();
  map.setView(position, 12);
  return null;
};
