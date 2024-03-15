import React, { useState, useEffect, useRef } from "react";

const convertToPlainText = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc.body.textContent || "";
};

const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const outputRef = useRef(null);

  useEffect(() => {
    if (currentIndex < text?.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  useEffect(() => {
    if (outputRef.current) {
      const windowHeight = window.innerHeight;
      const marginBottom = 50; // Adjust this value according to your needs

      const targetPosition =
        outputRef.current.offsetTop +
        outputRef.current.offsetHeight -
        (windowHeight - marginBottom);

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }, [currentText]);

  const plainText = convertToPlainText(currentText);

  return (
    <span
      className="type-writer-wrapper"
      ref={outputRef}
      dangerouslySetInnerHTML={{ __html: plainText }}
    />
  );
};

export default Typewriter;
