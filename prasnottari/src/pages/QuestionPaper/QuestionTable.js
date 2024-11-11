import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CustomButton from "../../components/Button";

const QuestionTable = ({ filteredQuestionsPaper }) => {
  const handleDownload = (fileUrl, fileName) => {
    const fullUrl = `http://localhost:8000${fileUrl}`;
    console.log("Download:" + fullUrl);
    // Create an anchor element and simulate a download
    const link = document.createElement("a");
    link.href = fullUrl;
    link.setAttribute("download", fileName); // Set the downloaded filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the DOM
  };

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Download</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredQuestionsPaper && filteredQuestionsPaper.length > 0 ? (
            filteredQuestionsPaper.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.Q_paper}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.year}</TableCell>
                <TableCell>
                  <Tooltip title="Download" arrow>
                    <CustomButton
                      startIcon={<DownloadIcon />}
                      onClick={() =>
                        handleDownload(row.fileUrl, `${row.Q_paper}.pdf`)
                      }
                    > 
                      Download
                    </CustomButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No question papers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuestionTable;
