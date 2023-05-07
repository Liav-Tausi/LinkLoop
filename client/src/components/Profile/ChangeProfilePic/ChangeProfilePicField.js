import { Box } from "@mui/material";
import Loading from "../../../utils/Comps/Loading";
import ScrollBar from "../../../utils/Comps/ScrollBar";
import { useState } from "react";

const ChangeProfilePicField = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(false);

  return (
    <>
      {loading && <Loading />}
      <ScrollBar maxHeight={"465px"}>
        {file === "" ? (
          <Button
            variant="contained"
            component="label"
            sx={{
              borderRadius: "13px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 3,
              flex: 1,
              color: themeMode.textColor,
              backgroundColor: themeMode.signUpFieldHover,
              "&:hover": {
                backgroundColor: themeMode.signUpField,
              },
            }}
          >
            <PlayCircleIcon sx={{ color: themeMode.textColor, fontSize: 65 }} />
            <Box sx={{ textAlign: "center" }}>Upload a Video</Box>
            <input
              hidden
              type="file"
              onChange={handleChange}
              accept="video/*"
              required
            />
          </Button>
        ) : (
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                border:
                  "7px solid" +
                  (errors.fileError
                    ? themeMode.appTheme
                    : themeMode.signUpFieldHover),
                borderRadius: "5px",
              }}
            >
              <img
                src={imgUrl}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                controls
                required
              />
              <Box
                onClick={handleDeleteFile}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  position: "absolute",
                  top: 5,
                  right: 5,
                  zIndex: 9999,
                  px: 0.7,
                  py: 0.7,
                  backgroundColor: themeMode.navInputColor,
                  "&:hover": {
                    backgroundColor: themeMode.navInputColorHover,
                    cursor: "pointer",
                  },
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                }}
              >
                <CloseRoundedIcon
                  sx={{
                    transform: "scale(1.2)",
                    color: themeMode.textColor,
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}
      </ScrollBar>
    </>
  );
};

export default ChangeProfilePicField;
