import {
  Box,
  Stack,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import SignFieldTemp from "../../NavBar/Menu/Sign/SignFieldTemp";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
} from "../../../App/AppStates/AppReducer";
import { useContext, useState } from "react";
import SignSubmit from "../../NavBar/Menu/Sign/SignSubmit";
import countriesDataSmall from "../../../assets/data/countriesDataSmall.json";

const ProfilePatchField = () => {
  const { themeMode, chooseLocation } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleCountryClick = () => {
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

  const [signUpData, setSignUpData] = useState({
    fullName: "",
    headline: "",
    location: "",
    about: "",
  });

  const [errors, setErrors] = useState({
    fullNameError: false,
    headlineError: false,
    locationError: false,
    aboutError: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  console.log(chooseLocation);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          backgroundColor: themeMode.signUpBubbles,
          borderRadius: "26px",
          py: 2,
          px: 2,
          mx: 2,
          mb: 3,
        }}
      >
        <Stack
          sx={{
            gap: 3,
          }}
        >
          <Box>
            <Box
              sx={{ color: themeMode.textColor, ml: 2, my: 0.5, fontSize: 12 }}
            >
              How others will see you:
            </Box>
            <SignFieldTemp
              placeholder="Full Name"
              autocomplete={"text"}
              padding="8px"
              paddingL="18px"
              multiline={false}
              maxRows={1}
            />
          </Box>
          <Box>
            <Box
              sx={{ color: themeMode.textColor, ml: 2, my: 0.5, fontSize: 12 }}
            >
              Your professional headline:
            </Box>
            <SignFieldTemp
              placeholder="Headline"
              autocomplete={"text"}
              padding="8px"
              paddingL="18px"
              multiline={false}
              maxRows={1}
            />
          </Box>
          <Box>
            <Box
              sx={{ color: themeMode.textColor, ml: 2, my: 0.5, fontSize: 12 }}
            >
              Your location:
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <FormControl
                sx={{ m: 1, minWidth: 285 }}
                onClick={handleCountryClick}
              >
                <Select
                  id="country-select"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  MenuProps={{
                    sx: {
                      zIndex: 9999,
                      color: themeMode.textColor,
                      "& .MuiPaper-root.MuiMenu-paper": {
                        transitionDuration: "0s !important",
                      },
                    },
                  }}
                  onOpen={() => {
                    dispatch({ type: APP_ACTIONS.CHOOSE_LOCATION });
                  }}
                >
                  <InputLabel disableAnimation={true} shrink={false}>
                    Country
                  </InputLabel>
                  {Object.keys(countriesDataSmall).map((country) => (
                    <MenuItem
                      sx={{ zIndex: 9999 }}
                      key={country}
                      value={country}
                    >
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 285 }}>
                <Select
                  id="city-select"
                  value={selectedCity}
                  onChange={handleCityChange}
                  disabled={!selectedCountry}
                  MenuProps={{
                    sx: {
                      zIndex: 9999,
                      color: themeMode.textColor,
                      "& .MuiPaper-root.MuiMenu-paper": {
                        transitionDuration: "0s !important",
                      },
                    },
                  }}
                  onOpen={() => {
                    dispatch({ type: APP_ACTIONS.CHOOSE_LOCATION });
                  }}
                >
                  <InputLabel disableAnimation={true} shrink={false}>
                    City
                  </InputLabel>
                  {countriesDataSmall[selectedCountry] &&
                    countriesDataSmall[selectedCountry].map((city, index) => (
                      <MenuItem sx={{ zIndex: 9999 }} key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          backgroundColor: themeMode.signUpBubbles,
          borderRadius: "26px",
          py: 2,
          px: 2,
          mx: 2,
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{ color: themeMode.textColor, ml: 2, my: 0.5, fontSize: 12 }}
          >
            About:
          </Box>
          <SignFieldTemp
            placeholder=""
            autocomplete={"text"}
            padding="13px"
            paddingL="18px"
            multiline={true}
            maxRows={5}
          />
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          bottom: 22,
          left: "50%",
          right: "50%",
        }}
      >
        <SignSubmit />
      </Box>
    </form>
  );
};

export default ProfilePatchField;
