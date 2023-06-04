import { Box, Select, FormControl, MenuItem, InputLabel } from "@mui/material";
import countriesDataSmall from "../../../assets/data/countriesDataSmall.json";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import { useContext, useEffect, useState } from "react";

const ProfilePatchLocation = (props) => {
  const { themeMode } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    if (props.location) {
      const country = props.location.split(" ")[0];
      const citySplit = props.location.split(" ").slice(1);
      const city = citySplit.join(" ");
      setSelectedCountry(country);
      setSelectedCity(city);
    }
  }, [props.location]);

  useEffect(() => {
    props.handleLocationChange(selectedCountry, selectedCity);
  }, [selectedCountry, selectedCity]);

  const handleLocationClick = () => {
    dispatch({
      type: APP_ACTIONS.CHOOSE_LOCATION,
    });
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <Box>
      <Box sx={{ color: themeMode.textColor, ml: 2, my: 0.5, fontSize: 12 }}>
        Your location:
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FormControl
          sx={{
            m: 1,
            flex: 1,
            backgroundColor: themeMode.signUpField,
            borderRadius: "25px",
            marginLeft: 0,
          }}
          onClick={handleLocationClick}
        >
          <InputLabel
            sx={{
              color: themeMode.textColor,
              "&.MuiInputLabel-shrink": {
                color:
                  themeMode.theme === "dark"
                    ? themeMode.textColor
                    : themeMode.appTheme,
              },
            }}
          >
            Country
          </InputLabel>
          <Select
            id="country-select"
            value={selectedCountry}
            onChange={handleCountryChange}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              color: themeMode.textColor,
              placeholder: "Country",
            }}
            MenuProps={{
              sx: {
                zIndex: 9999,
                "& .MuiPaper-root.MuiMenu-paper": {
                  transitionDuration: "0s !important",
                  backgroundColor: themeMode.feed,
                  color: themeMode.textColor,
                },
              },
            }}
            onOpen={() => {
              dispatch({ type: APP_ACTIONS.CHOOSE_LOCATION });
            }}
            required={true}
          >
            {Object.keys(countriesDataSmall).map((country) => (
              <MenuItem
                disableRipple={true}
                sx={{ zIndex: 9999 }}
                key={country}
                value={country}
              >
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            m: 1,
            flex: 1,
            backgroundColor: themeMode.signUpField,
            borderRadius: "25px",
            marginRight: 0,
          }}
          onClick={handleLocationClick}
        >
          <InputLabel
            sx={{
              color: themeMode.textColor,
              "&.MuiInputLabel-shrink": {
                color:
                  themeMode.theme === "dark"
                    ? themeMode.textColor
                    : themeMode.appTheme,
              },
            }}
          >
            City
          </InputLabel>
          <Select
            id="city-select"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedCountry}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              color: themeMode.textColor,
            }}
            MenuProps={{
              sx: {
                zIndex: 9999,
                color: themeMode.textColor,
                "& .MuiPaper-root.MuiMenu-paper": {
                  transitionDuration: "0s !important",
                  backgroundColor: themeMode.feed,
                  color: themeMode.textColor,
                },
              },
            }}
            onOpen={() => {
              dispatch({ type: APP_ACTIONS.CHOOSE_LOCATION });
            }}
            required={true}
          >
            {countriesDataSmall[selectedCountry] &&
              countriesDataSmall[selectedCountry].map((city, index) => (
                <MenuItem
                  disableRipple={true}
                  sx={{ zIndex: 9999 }}
                  key={index}
                  value={city}
                >
                  {city}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ProfilePatchLocation;
