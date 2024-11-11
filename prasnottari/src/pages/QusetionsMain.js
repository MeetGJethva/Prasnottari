import React, { useEffect, useState, useContext } from "react";
import { Container, Typography } from "@mui/material";
import useFetchData from "../hooks/useFetchData";
import { AuthContext } from "../context/AuthContext";
import FilterComponent from "../components/FilterComponent";
import QuestionList from "../components/QuestionList";

export default function QuestionsMain() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const { userId } = useContext(AuthContext);

  const { data: standards } = useFetchData("http://127.0.0.1:8000/api/questions/standards");
  const { data: subjects } = useFetchData("http://127.0.0.1:8000/api/questions/subjects");
  const { data: questions = [] } = useFetchData("http://127.0.0.1:8000/api/questions");

  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    const fetchFilteredQuestions = async () => {
      const body = {};
      if (selectedStandard) body.standard = parseInt(selectedStandard, 10);
      if (selectedSubject) body.subject = selectedSubject;

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/questions/filter",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        const data = await response.json();
        setFilteredQuestions(data.data || []);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchBookmarkedQuestions = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/bookmark/${userId}`);
        const data = await response.json();
        if (response.ok && data.questionIds) {
          setBookmarkedQuestions(data.questionIds);
        }
      } catch (error) {
        console.error("Error fetching bookmarked questions:", error);
      }
    };

    fetchBookmarkedQuestions();
    if (selectedStandard || selectedSubject) {
      fetchFilteredQuestions();
    } else {
      setFilteredQuestions(questions);
    }
  }, [selectedStandard, selectedSubject, questions, userId]);

  const handleExpandClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleBookmarkClick = async (id) => {
    if (!userId) {
      alert("Please login to bookmark questions.");
      return;
    }

    const isBookmarked = bookmarkedQuestions.includes(id);

    setBookmarkedQuestions((prev) =>
      isBookmarked ? prev.filter((bookmarkId) => bookmarkId !== id) : [...prev, id]
    );

    const endpoint = isBookmarked
      ? "http://127.0.0.1:8000/api/users/removebookmark"
      : "http://127.0.0.1:8000/api/users/bookmark";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, userId }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to update bookmark");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ color: "#3a5a40" }}>
        Question
      </Typography>

      <FilterComponent
        selectedStandard={selectedStandard}
        selectedSubject={selectedSubject}
        handleStandardChange={(e) => setSelectedStandard(e.target.value)}
        handleSubjectChange={(e) => setSelectedSubject(e.target.value)}
        standards={standards}
        subjects={subjects}
      />

      <QuestionList
        filteredQuestions={filteredQuestions}
        bookmarkedQuestions={bookmarkedQuestions}
        handleBookmarkClick={handleBookmarkClick}
        handleExpandClick={handleExpandClick}
        expandedIndex={expandedIndex}
      />
    </Container>
  );
}
