import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Filters from "./Filters";
import QuestionTable from "./QuestionTable";
import GeneratePaperModal from "./GeneratePaperModal";
import useFetchData from "../../hooks/useFetchData";

export default function QuestionPaper() {
  const [open, setOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredQuestionsPaper, setFilteredQuestionsPaper] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Fetch distinct years, subjects, and question papers
  const { data: years = [] } = useFetchData(
    "http://127.0.0.1:8000/api/questionpaper/years"
  );

  const { data: subjects = [] } = useFetchData(
    "http://127.0.0.1:8000/api/questionpaper/subjects"
  );

  const { data: questionPapers = [] } = useFetchData(
    "http://127.0.0.1:8000/api/questionpaper"
  );

  // Fetch distinct subjects for randamization
  const {
    data: Rsubjects,
    error: RsubjectsError,
    loading: RsubjectsLoading,
  } = useFetchData("http://127.0.0.1:8000/api/questions/subjects");

  // Fetch distinct standards for randamization
  const {
    data: standards,
    error: standardsError,
    loading: standardsLoading,
  } = useFetchData("http://127.0.0.1:8000/api/questions/standards");

  useEffect(() => {
    const fetchFilteredQuestionsPaper = async () => {
      const body = {};
      if (selectedYear) body.year = parseInt(selectedYear, 10); // Use the selected standard
      if (selectedSubject) body.subject = selectedSubject; // Use the selected subject

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/questionpaper/filter",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching filtered questions");
        }

        const data = await response.json();
        console.log(data.data);
        setFilteredQuestionsPaper(data.data || []); // Assuming API returns filtered questions in data
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Call the function to fetch filtered questions if either standard or subject is selected
    if (selectedYear || selectedSubject) {
      fetchFilteredQuestionsPaper();
    } else {
      setFilteredQuestionsPaper(questionPapers); // If no filters, show all questions
    }
  }, [selectedYear, selectedSubject, questionPapers]);

  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{ color: "#3a5a40" }}
      >
        Question Papers
      </Typography>

      <Filters
        years={years}
        subjects={subjects}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        handleOpen={handleOpen}
      />

      <GeneratePaperModal
        open={open}
        handleClose={handleClose}
        years={years}
        subjects={Rsubjects}
        selectedSubject={selectedSubject}
        standards ={standards}
      />
      <QuestionTable filteredQuestionsPaper={filteredQuestionsPaper} />
    </Container>
  );
}
