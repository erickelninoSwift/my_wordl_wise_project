import { useEffect, useState } from "react";

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);
  const [erickLocation, setErickLocation] = useState({});
  const [jackpot, setJackpot] = useState([]);

  function getErickPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setErickLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  useEffect(() => {
    setJackpot(() => [erickLocation.lat, erickLocation.lng]);
  }, [erickLocation.lat, erickLocation.lng]);

  return { isLoading, jackpot, error, getErickPosition };
}
