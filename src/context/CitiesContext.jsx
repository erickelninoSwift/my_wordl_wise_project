import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const currentState = {
  allMyCities: [],
  isloading: false,
  currentCity: {},
  error: "",
};

const reducer = (currentState, action) => {
  if (action.type === "loading") {
    return { ...currentState, isLoading: true };
  }
  if (action.type === "LOAD_CITIES") {
    return { ...currentState, isloading: false, allMyCities: action.payload };
  }
  if (action.type === "CITIES_CREATED") {
    return {
      ...currentState,
      allMyCities: [...currentState.allMyCities, action.payload],
      isLoading: false,
      currentCity: action.payload,
    };
  }

  if (action.type === "CURRENT_CITY") {
    return { ...currentState, currentCity: action.payload, isLoading: false };
  }

  if (action.type === "DELETE") {
    return {
      ...currentState,
      allMyCities: currentState.allMyCities.filter(
        (currentcity) => currentcity.id !== action.payload
      ),
      isLoading: false,
      currentCity: {},
    };
  }

  if (action.type === "rejected") {
    return { ...currentState, error: action.payload, isLoading: false };
  }
};
const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000/cities";
const CitiesProvider = ({ children }) => {
  //   const [allMyCities, setCities] = useState([]);
  //   const [isloading, setIsLoading] = useState(false);
  //   const [currentCity, setCurrentCity] = useState({});
  const [{ allMyCities, isloading, currentCity, error }, dispatch] = useReducer(
    reducer,
    currentState
  );

  useEffect(() => {
    const getAllCities = async () => {
      try {
        dispatch({ type: "loading" });
        const response = await fetch(BASE_URL);
        const data = await response.json();
        dispatch({ type: "LOAD_CITIES", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err.message, isloading: false });
      }
    };

    getAllCities();
  }, []);

  const getCurrentCity = async (id) => {
    if (id === currentCity.id) return;
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      dispatch({ type: "CURRENT_CITY", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  };

  const createCity = async (newCityData) => {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(newCityData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch({ type: "CITIES_CREATED", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "Error found while creating the city",
      });
    }
  };

  const deleteCity = async (id) => {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "DELETE", payload: id });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "Error was found while deleting a city",
      });
    }
  };

  const value = useMemo(() => {
    return {
      allMyCities,
      isloading,
      currentCity,
      getCurrentCity,
      createCity,
      deleteCity,
      error,
      dispatch,
    };
  }, [allMyCities]);

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("The context was executed outside of the provider");
  return context;
};

export { CitiesProvider, useCities };
