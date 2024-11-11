import React from "react";
import { List, Typography } from "@mui/material";
import QuestionItem from "./QuestionItem"; // Import the QuestionItem component

const QuestionList = ({
  filteredQuestions,
  bookmarkedQuestions,
  handleBookmarkClick,
  handleExpandClick,
  expandedIndex,
}) => (
  <List>
    {filteredQuestions && filteredQuestions.length > 0 ? (
      filteredQuestions.map((row, index) => (
        <QuestionItem
          key={row.id}
          row={row}
          index={index}
          isBookmarked={bookmarkedQuestions.includes(row.id)}
          handleBookmarkClick={handleBookmarkClick}
          handleExpandClick={handleExpandClick}
          expandedIndex={expandedIndex}
        />
      ))
    ) : (
      <Typography>No questions found.</Typography>
    )}
  </List>
);

export default QuestionList;
