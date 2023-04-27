import {
  Box,
  Autocomplete,
  InputBase,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import {
  AppContext,
  IsSmallScreenContext,
  Ref,
} from "../../../App/AppStates/AppReducer";
import SearchBarSmallIcon from "./SearchSmallIcon";

const data = ["The Shawshank Redemption", "The Godfather", "The Dark Knight"];

const SearchBar = () => {
  const { themeMode, searchBar } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
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

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: showSearchSmallIcon ? "start" : "center",
        alignItems: "center",
      }}
    >
      {!showSearchSmallIcon ? (
        <Autocomplete
          ref={ref}
          disablePortal
          id={"combo-box-demo"}
          options={data}
          sx={{
            flex: 1,
            maxWidth: "552.8px",
            my: "6px",
            pl: isSmallScreen ? 1.5 : 5,
            pr: isSmallScreen ? 1.5 : 5,
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
        <Box sx={{ pl: isSmallScreen ? 2 : 0 }}>
          <SearchBarSmallIcon handleSearchSmallIcon={handleSearchSmallIcon} />
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
