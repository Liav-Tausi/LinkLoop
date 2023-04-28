import {
  Box,
  Autocomplete,
  InputBase,
  Paper,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  AppContext,
  IsSmallScreenContext,
  Ref,
} from "../../../App/AppStates/AppReducer";
import SearchBarSmallIcon from "./SearchSmallIcon";
import { searchQuery } from "../../../utils/funcs/mainFuncs";

const SearchBar = () => {
  const { themeMode, searchBar } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [searchedData, setSearchedData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showSearchSmallIcon, setShowSearchSmallIcon] = useState(true);
  const ref = useContext(Ref);
  const under900 = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    setShowSearchSmallIcon(searchBar);
  }, [searchBar]);

  useEffect(() => {
    setShowSearchSmallIcon(under900);
    if (!under900) {
      setShowSearchSmallIcon(false);
    }
  }, [under900]);

  const handleSearchSmallIcon = () => {
    setShowSearchSmallIcon(false);
  };

  useEffect(() => {
    const search = async () => {
      try {
        const response = await searchQuery(searchValue);
        console.log(response);
        const videos = response.data.videos.map((video) => ({
          type: "video",
          value: video.title,
          title: video.title,
        }));
        const profiles = response.data.profiles.map((profile) => ({
          type: "user",
          value: `${profile.user.first_name} ${profile.user.last_name}`,
        }));
        if (response) {
          if (videos && profiles) {
            console.log(videos.concat(profiles));
            setSearchedData(videos.concat(profiles));
          } else if (videos && !profiles) {
            setSearchedData(videos);
          } else if (profiles && !videos) {
            setSearchedData(profiles);
          } else {
            setSearchedData([]);
          }
        }
      } catch {}
    };
    search();
  }, [searchValue]);

  return (
    <Box
      ref={ref}
      id={"search-container"}
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: showSearchSmallIcon ? "start" : "center",
        alignItems: "center",
      }}
    >
      {!showSearchSmallIcon ? (
        <Autocomplete
          disablePortal
          id={"combo-box-demo"}
          options={searchedData}
          getOptionLabel={(option) => {
            return option.type === "video"
              ? "Video: " + option.value
              : "user: " + option.value;
          }}
          freeSolo
          disableClearable
          isOptionEqualToValue={(value, data) => value === data.value}
          sx={{
            flex: 1,
            maxWidth: "552.8px",
            my: "6px",
            pl: isSmallScreen ? 1.5 : 5,
            pr: isSmallScreen ? 1.5 : 5,
            ".MuiAutocomplete-clearIndicator": {
              color: themeMode.textColor,
            },
            ".MuiAutocomplete-popupIndicator": {
              mr: 1,
              color: themeMode.textColor,
            },
          }}
          PaperComponent={({ children }) => (
            <Paper
              id={"search-paper-container"}
              elevation={0}
              sx={{
                mt: 1,
                borderRadius: "10px",
                fontWeight: "thin",
              }}
            >
              {children}
            </Paper>
          )}
          renderInput={(params) => {
            const { InputLabelProps, InputProps, ...rest } = params;
            return (
              <InputBase
                id={"search-input-container"}
                {...params.InputProps}
                {...rest}
                autoComplete="on"
                placeholder="Search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                sx={{
                  opacity: 1,
                  backgroundColor: themeMode.searchBar,
                  border: "solid 1px " + themeMode.searchBarBorder,
                  color: themeMode.textColor,
                  fontSize: "15px",
                  borderRadius: "25px",
                  height: "42px",
                  size: "small",
                  px: "18px",
                  "&:hover": {
                    backgroundColor: themeMode.searchBarHover,
                  },
                  "::placeholder": {
                    color: themeMode.textColor,
                  },
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <SearchBarSmallIcon inSearch={true} />
                  </InputAdornment>
                }
              />
            );
          }}
        />
      ) : (
        <Box sx={{ pl: isSmallScreen ? 2 : 0 }}>
          <SearchBarSmallIcon func={handleSearchSmallIcon} />
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
