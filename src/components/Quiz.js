import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RefreshCw, Award, ArrowRight } from 'lucide-react';

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
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showExplanation) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleAnswerClick(null);
    }
  }, [timeLeft, quizStarted, showExplanation, handleAnswerClick]);

  const handleAnswerClick = useCallback((selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    setShowExplanation(true);
    if (selectedIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  }, [currentQuestion]);

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
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
    setTimeLeft(30);
    setQuizStarted(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-800">ACE Inhibitors Quiz</h2>
      <AnimatePresence mode="wait">
        {!quizStarted ? (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className="text-lg sm:text-xl mb-4 sm:mb-6">Test your knowledge about ACE Inhibitors!</p>
            <button
              onClick={startQuiz}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 text-base sm:text-lg font-semibold shadow-lg"
            >
              Start Quiz
            </button>
          </motion.div>
        ) : showScore ? (
          <motion.div
            key="score"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <Award className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-yellow-500" />
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Quiz Completed!</h2>
            <p className="text-lg sm:text-xl mb-4 sm:mb-6">You scored {score} out of {quizQuestions.length}</p>
            <button
              onClick={resetQuiz}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center mx-auto text-base sm:text-lg font-semibold shadow-lg"
            >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Retake Quiz
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-2xl shadow-inner"
          >
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-blue-800">Question {currentQuestion + 1} of {quizQuestions.length}</h3>
              <div className="text-base sm:text-lg font-semibold text-blue-600">Time left: {timeLeft}s</div>
            </div>
            <p className="mb-4 sm:mb-6 text-base sm:text-lg">{quizQuestions[currentQuestion].question}</p>
            <div className="space-y-2 sm:space-y-3">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  className={`w-full p-2 sm:p-3 text-left rounded-lg transition-colors duration-200 flex items-center
                    ${selectedAnswer === null
                      ? 'bg-white hover:bg-blue-50 shadow-md'
                      : selectedAnswer === index
                        ? index === quizQuestions[currentQuestion].correctAnswer
                          ? 'bg-green-100 border-2 border-green-500'
                          : 'bg-red-100 border-2 border-red-500'
                        : index === quizQuestions[currentQuestion].correctAnswer
                          ? 'bg-green-100 border-2 border-green-500'
                          : 'bg-white'
                    }`}
                  disabled={selectedAnswer !== null}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex-grow text-base sm:text-lg">{option}</span>
                  {selectedAnswer !== null && index === quizQuestions[currentQuestion].correctAnswer && (
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 ml-2" />
                  )}
                  {selectedAnswer === index && index !== quizQuestions[currentQuestion].correctAnswer && (
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 ml-2" />
                  )}
                </motion.button>
              ))}
            </div>
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-100 rounded-lg border-l-4 border-blue-500"
                >
                  <p className="text-blue-800 text-base sm:text-lg">{quizQuestions[currentQuestion].explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
            {selectedAnswer !== null && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center mx-auto text-base sm:text-lg font-semibold shadow-lg"
                onClick={handleNextQuestion}
              >
                {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
