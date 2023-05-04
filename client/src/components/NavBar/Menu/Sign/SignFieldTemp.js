import { InputAdornment, InputBase } from "@mui/material";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../../App/AppStates/AppReducer";

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
        whiteSpace: "pre-wrap",
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
