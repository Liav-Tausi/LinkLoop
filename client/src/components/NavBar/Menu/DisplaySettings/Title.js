import { Box } from "@mui/material";
import { useContext } from "react";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../../App/AppStates/AppReducer";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Title = ({ handleMenuDisplaySettingsChange }) => {
  const { themeMode } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  return (
    <Box
      sx={{
        px: 1,
        pb: 2,
        display: "flex",
        justifyContent: "space-between",
        "@media (max-width: 600px)": {
          px: 0,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "@media (max-width: 600px)": {
            px: 0,
          },
        }}
      >
        <Box
          onClick={handleMenuDisplaySettingsChange}
          sx={{
            display: "flex",
            justifyContent: "center",
            p: "6px",
            borderRadius: "50%",
            backgroundColor: themeMode.navColor,
            "&:hover": {
              backgroundColor: themeMode.navInputColorHover,
              cursor: "pointer",
            },
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
        >
          <KeyboardBackspaceIcon
            sx={{
              color: themeMode.textColor,
              fontSize: "30px",
              "@media (max-width: 600px)": {
                fontSize: "20px",
              },
            }}
          />
        </Box>
        <Box
          sx={{
            whiteSpace: "nowrap",
            color: themeMode.textColor,
            fontSize: isSmallScreen ? "14px" : "20px",
            pl: isSmallScreen ? 0.32 : 2,
          }}
        >
          Display Settings
        </Box>
      </Box>
    </Box>
  );
};

export default Title;
