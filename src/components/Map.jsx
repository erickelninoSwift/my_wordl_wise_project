import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useCities } from "../context/CitiesContext";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";

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
import { map } from "leaflet";

export const Map = () => {
  const { allMyCities } = useCities();
  const [MapPosition, setMapPosition] = useState([40, 0]);
  const [otherLocation, setOtherlocation] = useState([]);
  const { mapLat, mapLng, cityLocation } = useUrlPosition();

  const {
    isLoading: isLoadingPosition,
    jackpot,
    getErickPosition,
  } = useGeolocation();

  useEffect(() => {
    if (cityLocation[0] !== null) {
      setMapPosition(() => [
        parseFloat(cityLocation[0]),
        parseFloat(cityLocation[1]),
      ]);
    }
  }, [cityLocation[0], cityLocation[1]]);

  useEffect(() => {
    if (jackpot[0] !== undefined) {
      setOtherlocation([parseFloat(jackpot[0]), parseFloat(jackpot[1])]);
    }
  }, [jackpot]);

  return (
    <div className={styles.mapContainer}>
      <Button1 type={"position"} onClick={getErickPosition}>
        {isLoadingPosition ? "Loading..." : "Use your Position"}
      </Button1>

      <MapContainer
        className={styles.map}
        center={MapPosition[0] !== undefined ? MapPosition : jackpot}
        zoom={6}
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

        <GetCenterMap
          position={
            (MapPosition[0] > 0
              ? MapPosition
              : cityLocation[0] !== null &&
                cityLocation[1] !== null &&
                cityLocation) || [jackpot[0] || 40, jackpot[1] || 0]
          }
        />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

const GetCenterMap = ({ position }) => {
  const map = useMap();
  if (position) {
    map.setView(position);
  }
  return null;
};

const DetectClick = () => {
  const navigation = useNavigate();
  useMapEvent({
    click: (e) => {
      const { lat, lng } = e.latlng;

      return navigation(`form?lat=${lat}&lng=${lng}`);
    },
  });
};
