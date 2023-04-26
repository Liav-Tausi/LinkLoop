import { Box } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../../App/AppStates/AppReducer";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const SearchBarSmallIcon = (props) => {
  const { themeMode, accessToken } = useContext(AppContext);
  return (
    <Box
      onClick={props.handleSearchSmallIcon}
      sx={{
        display: "flex",
        justifyContent: "center",
        py: accessToken ? "5px" : "4px",
        px: accessToken ? "5.5px" : "4.5px",
        borderRadius: "50%",
        backgroundColor: themeMode.navInputColor,
        "&:hover": {
          backgroundColor: themeMode.navInputColorHover,
          cursor: "pointer",
        },
        "&:active": {
          transform: "scale(0.97)",
        },
      }}
    >
      <SearchRoundedIcon
        id={"SearchBar"}
        sx={{
          color: themeMode.textColor,
          fontSize: accessToken ? "29px" : "23px",
        }}
      />
    </Box>
  );
};

export default SearchBarSmallIcon;
