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
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
  Ref,
} from "../../../App/AppStates/AppReducer";
import SearchBarSmallIcon from "./SearchSmallIcon";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { searchQuery } from "../../../utils/funcs/mainFuncs";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { themeMode, searchBar } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [searchedData, setSearchedData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showSearchSmallIcon, setShowSearchSmallIcon] = useState(true);
  const ref = useContext(Ref);
  const under900 = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();

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
        const videos = response.data.videos.map((video) => ({
          type: "video",
          name: video.title,
          idName: video.video_id_name,
        }));
        const profiles = response.data.profiles.map((profile) => ({
          type: "user",
          name: `${profile.user.first_name} ${profile.user.last_name}`,
          username: profile.user.username,
          profilePic: profile.profile_picture,
        }));
        if (response) {
          if (videos && profiles) {
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

  const handleSubmit = (event, option) => {
    console.log(option);
    const foundObject = searchedData.find((obj) => obj.name === option);
    const username = foundObject ? foundObject.username : null;

    event.preventDefault();
    console.log(username);
    if (option) {
      if (username) {
        navigate(`/profile/${username}`);
      } else if (option.username) {
        navigate(`/profile/${option.username}`);
      } else if (option.idName) {
        navigate(`/feed/${option.idName}`);
      } else {
        dispatch({
          type: APP_ACTIONS.MESSAGE,
          payload: "ERROR! Does Not Exist",
        });
      }
    }
  };

  return (
    <Box
      ref={ref}
      id={"search-container"}
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: showSearchSmallIcon ? "start" : "center",
        alignItems: "center",
        fontWeight: "thin",
      }}
    >
      {!showSearchSmallIcon ? (
        <Autocomplete
          onChange={(event, value) => {
            handleSubmit(event, value);
          }}
          disablePortal
          id={"combo-box-demo"}
          options={searchedData}
          getOptionLabel={(option) => option.name || ""}
          renderOption={(props, option) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  gap: 2,
                }}
                {...props}
              >
                {option.type === "user" ? (
                  <Box
                    sx={{
                      width: 33,
                      height: 33,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {option.profilePic ? (
                      <img
                        src={option.profilePic}
                        alt={option.name}
                        style={{
                          width: "86%",
                          height: "86%",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <AccountCircleIcon
                        sx={{
                          width: "100%",
                          height: "100%",
                          color: themeMode.anonymousPicture,
                        }}
                      />
                    )}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: 33,
                      height: 33,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <PlayCircleOutlinedIcon
                      sx={{
                        width: "100%",
                        height: "100%",
                        color: themeMode.anonymousPicture,
                      }}
                    />
                  </Box>
                )}
                <Box sx={{ textAlign: "left" }}>{option.name}</Box>
              </Box>
            );
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
