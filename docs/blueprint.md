# **App Name**: GeminiResumeAI

## Core Features:

- Resume Input: Accepts resume text via manual paste or .doc/.docx file upload.
- DOCX Parsing: Client-side parsing of .doc and .docx files to extract text for analysis.  Implements the prompt provided in the user request.
- AI-Powered Analysis: Analyzes resume text using Google Gemini API, providing a resume strength score, professional summary improvement suggestions, skills to add/improve, missing ATS keywords, and section-wise suggestions. It uses a tool that can conditionally inject new information into the summary if the current one is not compelling enough
- AI Output Display: Formats and displays the AI-generated resume feedback in a readable and actionable manner.
- Loading & Error Handling: Provides visual loading indicators during analysis and handles potential errors gracefully.
- Privacy Focus: Ensures no resume data is stored on the server, highlighting privacy-first design.

## Style Guidelines:

- Primary color: Deep purple (#673AB7) for a professional and trustworthy feel.
- Background color: Light grey (#F5F5F5), almost white, for a clean and modern look.
- Accent color: Teal (#009688) for interactive elements and highlights, complementing the primary color.
- Body and headline font: 'Inter' sans-serif, chosen for its modern and neutral appearance suitable for both headings and body text.
- Code font: 'Source Code Pro' for any code snippets displayed (though not expected to be common).
- Drag-and-drop file upload area with clear instructions; responsive layout for different screen sizes.
- Subtle loading animations and transitions to enhance the user experience.