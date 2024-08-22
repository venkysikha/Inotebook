
// About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About iNotebook</h1>
      <br/>
      <p>
        Welcome to iNotebook, your personal digital notebook designed to help you effortlessly save and organize small notes.
        Whether you're jotting down ideas, keeping track of to-dos, or storing important snippets of information, iNotebook
        provides a user-friendly platform to ensure your thoughts are never lost.
      </p>
      <h2>Key Features:</h2>
      <br/>
      <ul>
        <li><strong>Simple and Intuitive:</strong> Our app is designed to be straightforward and easy to use, so you can focus on capturing your notes without any distractions.</li>
        <li><strong>Secure:</strong> Your notes are securely stored, ensuring that your data remains private and accessible only to you.</li>
        <li><strong>Accessible Anywhere:</strong> Access your notes anytime, from any device, ensuring you always have your important information at your fingertips.</li>
      </ul>
      <p>We hope iNotebook becomes your go-to tool for all your note-taking needs. Thank you for choosing us!</p>
    </div>
  );
};

export default About;

