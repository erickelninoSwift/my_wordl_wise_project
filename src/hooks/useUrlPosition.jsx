import { useSearchParams } from "react-router-dom";
import { useState } from "react";
export const useUrlPosition = () => {
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLong = searchParams.get("lng");
  return [mapLat, mapLong];
};
