import React from "react";
import {
  Paper,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Typography,
  Collapse,
} from "@mui/material";
import { ExpandMore, ExpandLess, BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon } from "@mui/icons-material";
import { styled } from "@mui/system";

// Styled component for list item container
const ListItemContainer = styled(Paper)({
  borderRadius: 20,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  marginBottom: 16,
  padding: 16,
  transition: "all 0.3s ease",
  cursor: "pointer",
});

const ExpandableContent = styled(Collapse)({
  paddingTop: 16,
});

const QuestionItem = ({
  row,
  index,
  isBookmarked,
  handleBookmarkClick,
  handleExpandClick,
  expandedIndex,
}) => (
  <ListItemContainer>
    <ListItem
      onClick={() => handleExpandClick(index)}
      style={{ display: "flex", alignItems: "center" }}
    >
      <ListItemText
        primary={`Question: ${row.question}`}
        secondary={`Subject: ${row.subject} | Marks: ${row.marks}`}
      />
      <Tooltip title="Bookmark">
        <IconButton
          edge="end"
          onClick={(e) => {
            e.stopPropagation(); // Prevent collapse toggle when clicking bookmark
            handleBookmarkClick(row.id);
          }}
        >
          {isBookmarked ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
        </IconButton>
      </Tooltip>
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
);

export default QuestionItem;
