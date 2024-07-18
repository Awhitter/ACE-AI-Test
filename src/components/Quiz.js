import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const quizQuestions = [
  {
    question: "What is the primary mechanism of action for ACE Inhibitors?",
    options: [
      "Blocking calcium channels",
      "Inhibiting the conversion of Angiotensin I to Angiotensin II",
      "Stimulating beta receptors",
      "Increasing aldosterone production"
    ],
    correctAnswer: 1,
    explanation: "ACE Inhibitors work by blocking the enzyme that converts Angiotensin I to Angiotensin II, thereby reducing blood pressure and workload on the heart."
  },
  {
    question: "Which of the following is NOT a common side effect of ACE Inhibitors?",
    options: [
      "Dry cough",
      "Hyperkalemia",
      "Increased blood glucose",
      "Angioedema"
    ],
    correctAnswer: 2,
    explanation: "ACE Inhibitors do not typically cause increased blood glucose. In fact, they may have a slightly beneficial effect on glucose metabolism."
  },
  {
    question: "ACE Inhibitors are contraindicated in which trimester(s) of pregnancy?",
    options: [
      "First trimester only",
      "Second and third trimesters only",
      "All trimesters",
      "They are safe throughout pregnancy"
    ],
    correctAnswer: 2,
    explanation: "ACE Inhibitors are contraindicated in all trimesters of pregnancy due to the risk of fetal renal damage and other congenital abnormalities."
  },
  {
    question: "Which trial demonstrated the benefits of Ramipril in high-risk patients?",
    options: [
      "HOPE Trial",
      "SOLVD Trial",
      "ADVANCE Trial",
      "ALLHAT Trial"
    ],
    correctAnswer: 0,
    explanation: "The HOPE (Heart Outcomes Prevention Evaluation) trial showed that Ramipril reduced cardiovascular events in high-risk patients without left ventricular dysfunction."
  },
  {
    question: "What is the common suffix for all ACE Inhibitor drug names?",
    options: [
      "-olol",
      "-sartan",
      "-pril",
      "-pine"
    ],
    correctAnswer: 2,
    explanation: "All ACE Inhibitors end with the suffix '-pril', such as lisinopril, enalapril, and ramipril."
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerClick = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    setShowExplanation(true);
    if (selectedIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
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
            <p className="text-xl mb-4">You scored {score} out of {quizQuestions.length}</p>
            <button
              onClick={resetQuiz}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 flex items-center mx-auto"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Retake Quiz
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h2 className="text-xl font-bold mb-4">Question {currentQuestion + 1} of {quizQuestions.length}</h2>
            <p className="mb-4">{quizQuestions[currentQuestion].question}</p>
            <div className="space-y-2">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  className={`w-full p-2 text-left rounded transition-colors duration-200 flex items-center
                    ${selectedAnswer === null
                      ? 'bg-white border border-blue-300 hover:bg-blue-50'
                      : selectedAnswer === index
                        ? index === quizQuestions[currentQuestion].correctAnswer
                          ? 'bg-green-100 border border-green-500'
                          : 'bg-red-100 border border-red-500'
                        : index === quizQuestions[currentQuestion].correctAnswer
                          ? 'bg-green-100 border border-green-500'
                          : 'bg-white border border-blue-300'
                    }`}
                  disabled={selectedAnswer !== null}
                >
                  <span className="flex-grow">{option}</span>
                  {selectedAnswer !== null && index === quizQuestions[currentQuestion].correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                  )}
                  {selectedAnswer === index && index !== quizQuestions[currentQuestion].correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-500 ml-2" />
                  )}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-4 bg-blue-50 rounded-lg"
                >
                  <p className="text-blue-800">{quizQuestions[currentQuestion].explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
            {selectedAnswer !== null && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                onClick={handleNextQuestion}
              >
                {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
