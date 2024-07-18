import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quizQuestions = [
  {
    question: "What is the primary mechanism of action for ACE Inhibitors?",
    options: [
      "Blocking calcium channels",
      "Inhibiting the conversion of Angiotensin I to Angiotensin II",
      "Stimulating beta receptors",
      "Increasing aldosterone production"
    ],
    correctAnswer: 1
  },
  {
    question: "Which of the following is NOT a common side effect of ACE Inhibitors?",
    options: [
      "Dry cough",
      "Hyperkalemia",
      "Increased blood glucose",
      "Angioedema"
    ],
    correctAnswer: 2
  },
  {
    question: "ACE Inhibitors are contraindicated in which trimester(s) of pregnancy?",
    options: [
      "First trimester only",
      "Second and third trimesters only",
      "All trimesters",
      "They are safe throughout pregnancy"
    ],
    correctAnswer: 2
  },
  {
    question: "Which trial demonstrated the benefits of Ramipril in high-risk patients?",
    options: [
      "HOPE Trial",
      "SOLVD Trial",
      "ADVANCE Trial",
      "ALLHAT Trial"
    ],
    correctAnswer: 0
  },
  {
    question: "What is the common suffix for all ACE Inhibitor drug names?",
    options: [
      "-olol",
      "-sartan",
      "-pril",
      "-pine"
    ],
    correctAnswer: 2
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {showScore ? (
          <motion.div
            key="score"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-xl">You scored {score} out of {quizQuestions.length}</p>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h2 className="text-xl font-bold mb-4">Question {currentQuestion + 1}</h2>
            <p className="mb-4">{quizQuestions[currentQuestion].question}</p>
            <div className="space-y-2">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  className="w-full p-2 text-left bg-white border border-blue-300 rounded hover:bg-blue-50 transition-colors duration-200"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
