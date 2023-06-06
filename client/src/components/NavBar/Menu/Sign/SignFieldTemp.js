import { InputAdornment, InputBase } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../../../App/AppStates/AppReducer";

const SignFieldTemp = (props) => {
  const { themeMode } = useContext(AppContext);

  return (
    <InputBase
      readOnly={props.readOnly ? props.readOnly : false}
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
            : props.comments
            ? themeMode.signUpBubbles
            : themeMode.buttonBorder
        }`,
        backgroundColor: props.comments
          ? themeMode.signUpBubbles
          : themeMode.signUpField,
        borderRadius: props.comments ? "10px" : "25px",
        p: props.padding,
        pl: props.paddingL,
        "& input::placeholder": {
          color: themeMode.textColor,
          opacity: 1,
        },
        "&:hover": {
          backgroundColor: props.comments
            ? themeMode.navInputColor
            : themeMode.signUpFieldHover,
        },
        "& input[type='date']::-webkit-calendar-picker-indicator": {
          width: 23,
          height: 22,
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
      onClick={props.handleCopy}
      onChange={props.handleChange}
      inputProps={{ style: { color: themeMode.signUpFieldText } }}
      endAdornment={
        <InputAdornment position="end">{props.children}</InputAdornment>
      }
    />
  );
};

export default SignFieldTemp;
