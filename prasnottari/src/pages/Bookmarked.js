import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Tooltip,
} from "@mui/material";

import { styled } from "@mui/system";
import {
  ExpandMore,
  ExpandLess,
  BookmarkBorder as BookmarkBorderIcon,
  Bookmark as BookmarkIcon,
} from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Styled components
const ListItemContainer = styled(Paper)({
  borderRadius: 20,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  marginBottom: 16,
  padding: 16,
  transition: "all 0.3s ease",
  cursor: "pointer", // Change cursor to pointer to indicate clickability
});

const ExpandableContent = styled(Collapse)({
  paddingTop: 16,
});

export default function Bookmarked() {
  const [questions, setQuestions] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { userId } = useContext(AuthContext);

  const handleExpandClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchFilteredQuestions = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/users/bookmark/${userId}`
        );

        if (!response.ok) {
          throw new Error("Error fetching filtered questions");
        }

        const data = await response.json();
        console.log(data);
        setQuestions(data.data || []); // Assuming API returns filtered questions in `data`
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchFilteredQuestions();
  }, []);

  return (
    <List>
      {questions && questions.length > 0 ? (
        questions.map((row, index) => (
          <ListItemContainer key={row.id}>
            <ListItem
              onClick={() => handleExpandClick(index)}
              style={{ display: "flex", alignItems: "center" }}
            >
              <ListItemText
                primary={`Question: ${row.question}`}
                secondary={`Subject: ${row.subject} | Marks: ${row.marks}`}
              />
              <IconButton onClick={() => handleExpandClick(index)}>
                {expandedIndex === index ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItem>
            <ExpandableContent in={expandedIndex === index}>
              <Typography variant="body1" gutterBottom>
                Answer: {row.answer}
              </Typography>
            </ExpandableContent>
          </ListItemContainer>
        ))
      ) : (
        <Typography>No questions found.</Typography>
      )}
    </List>
  );
}
