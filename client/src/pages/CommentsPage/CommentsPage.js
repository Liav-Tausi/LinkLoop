import { Container } from "@mui/material";
import Comments from "../../components/Feed/Comments/Comments";

const CommentsPage = () => {
  return (
    <Container sx={{ display: "flex", justifyContent: "center", py: 2 }}>
      <Comments />
    </Container>
  );
};

export default CommentsPage;
