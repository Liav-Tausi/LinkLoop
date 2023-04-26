import {
  Box,
  Autocomplete,
  InputBase,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App/AppStates/AppReducer";
import SearchBarSmallIcon from "./SearchSmallIcon";

const data = ["The Shawshank Redemption", "The Godfather", "The Dark Knight"];

const SearchBar = () => {
  const { themeMode, searchBar } = useContext(AppContext);
  const [showSearchSmallIcon, setShowSearchSmallIcon] = useState(false);
  const [flag, setFlag] = useState(false);
  const under900 = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    setShowSearchSmallIcon(under900);
    if (!under900) {
      setFlag(false);
    }
  }, [under900, flag]);

  const handleSearchSmallIcon = () => {
    setShowSearchSmallIcon(false);
    setFlag(true);
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: showSearchSmallIcon || flag ? "start" : "center",
        alignItems: "center",
      }}
    >
      {!showSearchSmallIcon ? (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={data}
          sx={{
            flex: 1,
            maxWidth: "552.8px",
            my: "6px",
            px: 5,
          }}
          MenuProps={{
            style: {
              marginTop: 50,
            },
          }}
          PaperComponent={({ children }) => (
            <Paper
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
                {...params.InputProps}
                {...rest}
                autoComplete="on"
                placeholder="Search"
                sx={{
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
                }}
              />
            );
          }}
        />
      ) : (
        <SearchBarSmallIcon handleSearchSmallIcon={handleSearchSmallIcon} />
      )}
    </Box>
  );
};

export default SearchBar;
