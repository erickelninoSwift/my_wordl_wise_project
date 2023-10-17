import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000/cities";
const CitiesProvider = ({ children }) => {
  const [allMyCities, setCities] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const getAllCities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(BASE_URL);
        const data = await response.json();
        setCities(data);
      } catch (err) {
        console.log("error found");
      } finally {
        setIsLoading(false);
      }
    };

    getAllCities();
  }, []);

  const getCurrentCity = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      setCurrentCity(() => {
        return data;
      });
    } catch (err) {
      console.log("error found");
    } finally {
      setIsLoading(false);
    }
  };

  const createCity = async (newCityData) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(newCityData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCities(() => {
        return [...allMyCities, data];
      });
    } catch (err) {
      console.log("error found while creating the city");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCity = async (id) => {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      setCities(() => {
        return allMyCities.filter((currentcity) => currentcity.id !== id);
      });
    } catch (err) {
      console.log("There was an error while trying to delete the city");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        allMyCities,
        isloading,
        currentCity,
        getCurrentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("The context was executed outside of the provider");
  return context;
};

export { CitiesProvider, useCities };
