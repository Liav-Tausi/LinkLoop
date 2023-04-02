import { useMediaQuery } from "@mui/material";
import { createContext, useEffect, useReducer, useRef } from "react";
import DARK_THEME from "../../assets/themes/DarkTheme";
import LIGHT_THEME from "../../assets/themes/LightTheme";
import { detectColorScheme, isLoggedIn } from "../../utils/funcs";

export const INITIAL_APP_STATE = {
  accessToken: isLoggedIn("").PromiseResult,
  message: null,
  themeMode: detectColorScheme() === "dark" ? DARK_THEME : LIGHT_THEME,
  forceThemeMode: 3,
  appLoaded: false,
  menuOpen: false,
  signUpOpen: false,
  signInOpen: false,
};

export const APP_ACTIONS = {
  APP_LOADED: "appLoaded",
  ACCESS_TOKEN: "accessToken",
  MESSAGE: "message",
  THEME_MODE: "themeMode",
  FORCE_THEME_MODE: "forceThemeMode",
  MENU_OPEN_CLOSE: "openClose",
  SIGN_UP_OPEN: "signUpOpen",
  SIGN_IN_OPEN: "signInOpen",
};

export const AppReducer = (states, action) => {
  switch (action.type) {
    case APP_ACTIONS.ACCESS_TOKEN: {
      return {
        ...states,
        accessToken: action.payload,
      };
    }
    case APP_ACTIONS.MESSAGE: {
      return {
        ...states,
        message: action.payload,
      };
    }
    case APP_ACTIONS.MENU_OPEN_CLOSE: {
      return {
        ...states,
        menuOpen: !states.menuOpen,
      };
    }
    case APP_ACTIONS.SIGN_UP_OPEN: {
      return {
        ...states,
        signUpOpen: !states.signUpOpen,
        signInOpen: false,
      };
    }
    case APP_ACTIONS.SIGN_IN_OPEN: {
      return {
        ...states,
        signInOpen: !states.signInOpen,
        signUpOpen: false,
      };
    }
    case APP_ACTIONS.THEME_MODE: {
      return {
        ...states,
        themeMode: action.payload,
      };
    }
    case APP_ACTIONS.FORCE_THEME_MODE: {
      return {
        ...states,
        forceThemeMode: action.payload,
      };
    }
    case APP_ACTIONS.APP_LOADED: {
      return {
        ...states,
        appLoaded: !states.appLoaded,
      };
    }

    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};

export const AppContext = createContext(INITIAL_APP_STATE);

export const AppDispatchContext = createContext(null);

export const IsSmallScreenContext = createContext(null);

export const Ref = createContext(null);

export const AppProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(AppReducer, INITIAL_APP_STATE);
  const isSmallScreen = useMediaQuery("(max-width:599px)");
  const ref = useRef(null);

  return (
    <Ref.Provider value={ref}>
      <IsSmallScreenContext.Provider value={isSmallScreen}>
        <AppContext.Provider value={appState}>
          <AppDispatchContext.Provider value={dispatch}>
            {children}
          </AppDispatchContext.Provider>
        </AppContext.Provider>
      </IsSmallScreenContext.Provider>
    </Ref.Provider>
  );
};
