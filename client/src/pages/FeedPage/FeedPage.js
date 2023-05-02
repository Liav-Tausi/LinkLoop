import { Container } from "@mui/material";
import Feed from "../../components/Feed/Feed";
import { useParams } from "react-router-dom";

const FeedPage = () => {
  return (
    <Container sx={{ display: "flex", justifyContent: "center", py: 2 }}>
      <Feed />
    </Container>
  );
};

export default FeedPage;
