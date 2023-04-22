import { InputAdornment, InputBase } from "@mui/material";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../../App/AppStates/AppReducer";

const calendarIconUri = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 22H5c-1.11 0-2-.9-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2v6h-2v-2H5v10h7v2zm10.13-5.01.71-.71c.39-.39.39-1.02 0-1.41l-.71-.71a.9959.9959 0 0 0-1.41 0l-.71.71 2.12 2.12zm-.71.71-5.3 5.3H14v-2.12l5.3-5.3 2.12 2.12z"/></svg>`;

const SignFieldTemp = (props) => {
  const { themeMode } = useContext(AppContext);

  useEffect(() => {
    console.log("SignFieldTemp refresh");
  }, []);

  return (
    <InputBase
      fullWidth={true}
      required={true}
      type={props.type}
      position={"fixed"}
      placeholder={props.placeholder}
      autoComplete={props.autocomplete}
      multiline={props.multiline}
      maxRows={props.maxRows}
      sx={{
        border: `solid 1px ${
          props.sign && props.error
            ? themeMode.appTheme
            : themeMode.buttonBorder
        }`,
        backgroundColor: themeMode.signUpField,
        borderRadius: "25px",
        p: props.padding,
        pl: props.paddingL,
        "& input::placeholder": {
          color: themeMode.textColor,
          opacity: 1,
        },
        "&:hover": {
          backgroundColor: themeMode.signUpFieldHover,
        },
        "& input[type='date']::-webkit-calendar-picker-indicator": {
          width: 22,
          height: 21,
          cursor: "pointer",
        },
        ".MuiInputBase-inputMultiline": {
          "&::placeholder": {
            color: themeMode.textColor,
            opacity: 1,
          },
          "&::-webkit-scrollbar": {
            borderRadius: "3px",
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            borderRadius: "3px",
            background: themeMode.feed,
          },
          "&::-webkit-scrollbar-thumb": {
            background: themeMode.signUpBubbles,
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            cursor: "pointer",
            background: themeMode.appTheme,
          },
        },
      }}
      value={props.sign}
      onChange={props.handleChange}
      inputProps={{ style: { color: themeMode.signUpFieldText } }}
      endAdornment={
        <InputAdornment position="end">{props.children}</InputAdornment>
      }
    />
  );
};

export default SignFieldTemp;
