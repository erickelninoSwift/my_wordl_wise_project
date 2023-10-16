import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const useUrlPosition = () => {
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  const [cityLocation, setCityLocation] = useState([]);

  useEffect(() => {
    setCityLocation(() => [mapLat, mapLng]);
  }, [mapLat, mapLng]);

  return { cityLocation };
};
