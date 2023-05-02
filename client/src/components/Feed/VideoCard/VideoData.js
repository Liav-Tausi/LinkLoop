// import { Box, Grid, IconButton, Stack } from "@mui/material";
// import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
// import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
// import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
// import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
// import { useContext, useEffect, useState } from "react";
// import {
//   APP_ACTIONS,
//   AppContext,
//   AppDispatchContext,
// } from "../../../App/AppStates/AppReducer";
// import { videoLike } from "../../../utils/funcs/mainFuncs";
// import SignIn from "../../NavBar/Menu/Sign/SignIn/SignIn";

// const VideoData = (props) => {
//   const { themeMode, accessToken, signInOpen } = useContext(AppContext);
//   const dispatch = useContext(AppDispatchContext);
//   const [likeState, setLikeState] = useState(false);

//   useEffect(() => {
//     if (props.liked) {
//       setLikeState(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (!accessToken) {
//       setLikeState(false);
//     }
//   }, [accessToken]);


//   const handleLike = async () => {
//     if (accessToken) {
//       if (!likeState) {
//         setLikeState(true);
//         await videoLike(props.videoId, accessToken, false);
//       } else if (likeState) {
//         setLikeState(false);
//         await videoLike(props.videoId, accessToken, true);
//       } else {
//         return false
//       }
//     } else {
//       dispatch({
//         type: APP_ACTIONS.SIGN_IN_OPEN,
//       });
//       if (!signInOpen && accessToken) {
//         handleLike()
//       }
//     }
//   };


//   return (
//     <>
//       {signInOpen && <SignIn />}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           position: "relative",
//         }}
//       >
//         <Box
//           id={props.videoNumber}
//           sx={{
//             position: "relative",
//             width: "350px",
//             height: "600px",
//             "@media (max-width: 600px)": {
//               width: "345px",
//               height: "650px",
//             },
//           }}
//         ></Box>
//         <Box
//           sx={{
//             position: "absolute",
//             bottom: 20,
//             right: 20,
//             px: 2,
//             py: 1,
//             backgroundColor: "transparent",
//             fontWeight: "thin",
//             color: "white",
//             textShadow: "0px 1px 11px #000",
//           }}
//         >
//           <Grid container direction="column" sx={{ gap: 2 }}>
//             <Box sx={{ fontSize: 17 }}>{props.title}</Box>
//             <Box sx={{ fontSize: 14 }}>{props.description}</Box>
//           </Grid>
//         </Box>
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             right: 0,
//             px: 2,
//             py: 1,
//             backgroundColor: "transparent",
//             fontWeight: "thin",
//             color: "white",
//             textShadow: "0px 1px 11px #000",
//           }}
//         >
//           {props.date.split("T")[0]}
//         </Box>
//         <Box
//           sx={{
//             position: "absolute",
//             bottom: 45,
//             left: 10,
//             textShadow: "0px 1px 11px #000",
//           }}
//         >
//           <Stack gap={4} color={"white"}>
//             <FavoriteRoundedIcon
//               onClick={handleLike}
//               sx={{
//                 color: likeState ? themeMode.appTheme : "white",
//                 transform: "scale(1.1)",
//                 "&:hover": {
//                   transform: "scale(1.05)",
//                   cursor: "pointer",
//                 },
//                 "&:active": {
//                   transform: "scale(1)",
//                 },
//               }}
//             />
//             <ChatBubbleRoundedIcon
//               sx={{
//                 transform: "scale(0.95)",
//                 "&:hover": {
//                   transform: "scale(0.93)",
//                   cursor: "pointer",
//                 },
//                 "&:active": {
//                   transform: "scale(0.9)",
//                 },
//               }}
//             />
//             <ReplyOutlinedIcon
//               sx={{
//                 transform: "scale(1.3)",
//                 "&:hover": {
//                   transform: "scale(1.25)",
//                   cursor: "pointer",
//                 },
//                 "&:active": {
//                   transform: "scale(1.2)",
//                 },
//               }}
//             />
//             <ArrowBackIosRoundedIcon
//               sx={{
//                 marginTop: 2,
//                 color: themeMode.appTheme,
//                 transform: "scale(1.8)",
//                 "&:hover": {
//                   transform: "scale(1.6)",
//                   cursor: "pointer",
//                 },
//                 "&:active": {
//                   transform: "scale(1.35)",
//                 },
//               }}
//             />
//           </Stack>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default VideoData;
