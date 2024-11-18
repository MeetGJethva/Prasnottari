# **Exam Preparation Platform - Web Application**

An interactive web platform designed to enhance students' study efficiency and effectiveness by providing a repository of exam-related materials, including questions, question papers, and a paper generation tool. This application offers features like search, sort, upload, and customized paper creation to help students efficiently prepare for their exams.

## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation Guide](#installation-guide)
- [Usage Instructions](#usage-instructions)
- [Contributing](#contributing)
- [License](#license)

## **Project Overview**

The Exam Preparation Platform is designed to provide a centralized location for students to access and contribute to a vast collection of study materials. Whether you're preparing for a university exam or a competitive test, this platform allows you to:

- Search for exam papers, questions, and topics.
- Sort and filter results based on predefined criteria.
- Upload and share your own questions and question papers (with admin verification).
- Create customized question papers using the built-in paper generation tool.

The platform aims to improve the study process by making relevant exam materials easily accessible, while also empowering students to contribute back to the community.

## **Features**

- **User Registration & Login**: Secure sign-up and login system, ensuring personalized access to all features.
  - *Registration*: Register with username, email, contact, and password.
  - *Login*: Access the platform with username and password.
  
- **Search Functionality**: Easily search for questions, topics, subjects, or years using specific keywords.
  - *Search Keywords*: Enter a keyword to find matching exam materials.
  
- **Sort & Filter**: Sort the search results in ascending/descending order or filter based on various criteria such as subject, topic, or year.
  
- **Question and Paper Upload**: Users can upload their own questions or question papers (subject to admin verification).
  - *Upload Questions*: Add questions with topic, subject, marks, and answer.
  - *Upload Question Papers*: Upload PDFs of question papers with details like subject, year, etc.

- **Paper Generation Tool**: Students can create customized question papers based on selected topics or subjects, improving their targeted study sessions.

## **Technologies Used**

- **Frontend**: React.js, React Router, Material UI (for UI components), Axios (for HTTP requests)
- **Backend**: Node.js, Express.js (API development)
- **Database**: MongoDB (for storing user data, questions, papers, and other metadata)

## **Installation Guide**

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.x or higher)
- npm or yarn
- MongoDB (or a MongoDB Atlas account for cloud database hosting)

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MeetGJethva/Prasnottari.git
2. **Navigate to the project directory**:

   ```bash
   cd exam-preparation-platform
