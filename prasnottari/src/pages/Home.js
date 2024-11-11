import React, { useState } from "react";
import uploadImg from "../assets/images/Upload-amico.svg";
import filterImg from "../assets/images/Personal settings-rafiki.svg";
import randomeQuestionImg from "../assets/images/Innovation-pana.svg";
import bookamrImg from "../assets/images/Online wishes list-rafiki.svg";
import CustomButton from "../components/Button";
import AddQuestion from "./AddQuestion";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const Devider = () => (
    <Box
      sx={{
        height: 2,
        backgroundColor: "#a3b18a",
        width: "100%",
      }}
    />
  );

  const PostBlock = ({ reversedirection, children, imgsrc, title }) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 4,
        backgroundColor: "#fffff",
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        direction={reversedirection ? "row-reverse" : "row"}
      >
        <Grid item xs={12} md={6}>
          <Card sx={{ maxWidth: 345, mx: "auto" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2">{children}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={imgsrc}
              alt="Apply Filters"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Container disableGutters>
      <AddQuestion isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Welcome Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          textAlign: "center",
          padding: 4,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography variant="h1" color={"#344e41"}>
          Welcome to the World Of Questions!
        </Typography>
        <Typography variant="body1" paragraph>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Typography>
        <Box>
          <CustomButton
            children="Contribute"
            fill
            onClick={() => setIsOpen(true)}
          />
          &nbsp; &nbsp; &nbsp;
          <CustomButton children="Solve Questions" href="/question" />
        </Box>
      </Box>

      {/* Divider Line */}
      <Devider />

      {/* Feature 1 */}
      <PostBlock title={"Upload Questions"} imgsrc={uploadImg}>
        Easily contribute to the knowledge base by uploading questions from
        various subjects and standards.
      </PostBlock>

      {/* Divider Line */}
      <Devider />

      {/* Feature 2 */}
      <PostBlock reversedirection={true} imgsrc={filterImg} title={"Apply Filters"}>
        Our filtering system allows you to search questions by subject, grade,
        and other criteria. This makes it easy to narrow down to the specific
        questions you need
      </PostBlock>

      {/* Divider Line */}
      <Devider />

      {/* Feature 3 */}
      <PostBlock title={"Bookmark Questions"} imgsrc={bookamrImg}>
        With the bookmarking feature, you can save questions for quick access
        later. Whether you’re preparing for an exam or just need to revisit
        certain questions, your bookmarks will be right at your fingertips.
      </PostBlock>

      {/* Divider Line */}
      <Devider />

      {/* Feature 4 */}
      <PostBlock
        reversedirection={true}
        imgsrc={randomeQuestionImg}
        title={"Generate Question Papers"}
      >
        Select a subject and let the system generate a question paper with
        randomly chosen questions. Customize the number of questions and other
        parameters to fit your needs.
      </PostBlock>
    </Container>
  );
}

export default Home;
