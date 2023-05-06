import { GoogleLogin } from "@react-oauth/google";
import { Box } from "@mui/material";

const SignGoogleTemp = () => {
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <GoogleLogin
        onSuccess={responseMessage}
        onError={errorMessage}
      />
    </Box>
  );
};

export default SignGoogleTemp;
