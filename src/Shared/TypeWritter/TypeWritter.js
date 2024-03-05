import React, { useState, useEffect } from "react";

const convertToPlainText = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc.body.textContent || "";
};

const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  const plainText = convertToPlainText(currentText);

  return <span dangerouslySetInnerHTML={{ __html: plainText }} />;
};

export default Typewriter;
