import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import TakeTestComponent from "../../../components/TakeTestComponent";
import TakeTestSubmitModal from "./components/TakeTestSubmitModal";
import CheckTestScoreModal from "./components/CheckTestScoreModal";
import { useDispatch, useSelector } from "react-redux";
import { getTest } from "./apis/TestAPIs";
import { setTest } from "../../../features/TestSlice";
import { toast } from "react-toastify";
import { getError } from "../../../Utils/error";

export default function TakeTest() {
  const { testID } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { test } = useSelector((state) => state.tests);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion =
    questions.length > 0 && questions[currentQuestionIndex];
  const [getMissingQuestionsCount, setMissingQuestionsCount] = useState(0);
  const [getAttemptQuestionsCount, setAttemptQuestionsCount] = useState(0);

  useEffect(() => {
    getSingleTest();
  }, []);

  useEffect(() => {
    if (test?.questions_reference) {
      setQuestions(test?.questions_reference);
    }
    if (localStorage.getItem(testID)) {
      setQuestions(JSON.parse(localStorage.getItem(testID)));
    }
  }, [test]);

  const getSingleTest = async () => {
    try {
      const response = await getTest(testID, token);
      dispatch(setTest(response));
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((p) => p - 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((p) => p + 1);
    }
  };

  const goToLastQuestion = () => {
    setCurrentQuestionIndex(questions.length - 1);
  };

  const onUncheckedOptionClick = (optionNumber) => {
    const updatedQuestions = questions.map((question, idx) => {
      if (currentQuestionIndex !== idx) {
        return question;
      }
      const updatedQuestion = {
        ...question,
        selectedOption: optionNumber,
      };
      return updatedQuestion;
    });
    setQuestions(updatedQuestions);
    localStorage.setItem(testID, JSON.stringify(updatedQuestions));
  };

  const toggleQuestionFlag = () => {
    const updatedQuestions = questions.map((question, idx) => {
      if (currentQuestionIndex !== idx) {
        return question;
      }
      const updatedQuestion = {
        ...question,
      };
      updatedQuestion.questionFlagged = !updatedQuestion.questionFlagged;
      return updatedQuestion;
    });
    setQuestions(updatedQuestions);
    localStorage.setItem(testID, JSON.stringify(updatedQuestions));
  };

  const confidenceLevel = (level) => {
    const updatedQuestions = questions.map((question, idx) => {
      if (currentQuestionIndex !== idx) {
        return question;
      }
      const updatedQuestion = {
        ...question,
      };

      updatedQuestion.confidence = level;
      return updatedQuestion;
    });
    setQuestions(updatedQuestions);
    localStorage.setItem(testID, JSON.stringify(updatedQuestions));
  };

  useEffect(() => {
    const count = questions.filter((question) => {
      if (question.hasOwnProperty("selectedOption")) {
        return true;
      } else {
        return false;
      }
    }).length;
    setMissingQuestionsCount(questions.length - count);
    setAttemptQuestionsCount(count);
  }, [questions]);

  // const randomFill = () => {
  //   const updatedQuestions = questions.map((question, idx) => {
  //     const updatedQuestion = question;
  //     updatedQuestion.selectedOption = Math.floor(Math.random() * 4);
  //     updatedQuestion.questionFlagged = Math.random() < 0.5;
  //     return updatedQuestion;
  //   });
  //   setQuestions(updatedQuestions);
  //   setCurrentQuestionIndex(questions.length - 1);
  // };

  const SubmitButton = () => {
    const [testSubmitModalShow, setTestSubmitModalShow] = useState(false);

    const openTestSubmitModal = () => setTestSubmitModalShow(true);
    const closeTestSubmitModal = () => setTestSubmitModalShow(false);

    const { testID } = useParams();
    const [checkScoreModalShow, setCheckScoreModalShow] = React.useState(false);

    const openCheckScoreModal = () => setCheckScoreModalShow(true);
    const closeCheckScoreModal = () => setCheckScoreModalShow(false);

    const CheckTestScoreButton = ({ children }) => {
      return (
        <div className="cursor-pointer" onClick={openCheckScoreModal}>
          {children}
        </div>
      );
    };

    return (
      <>
        <button
          className="bg-color-primary text-16 text-white font-medium rounded-lg py-2 px-4 border-0"
          onClick={openTestSubmitModal}
        >
          Submit
        </button>
        <TakeTestSubmitModal
          testID={testID}
          questions={questions}
          questionsLength={questions.length}
          missingQuestions={getMissingQuestionsCount}
          attemptedQuestions={getAttemptQuestionsCount}
          testSubmitModalShow={testSubmitModalShow}
          closeTestSubmitModal={closeTestSubmitModal}
          CheckTestScoreButton={CheckTestScoreButton}
        />

        <CheckTestScoreModal
          checkScoreModalShow={checkScoreModalShow}
          closeCheckScoreModal={closeCheckScoreModal}
          testID={testID}
        />
      </>
    );
  };

  return (
    <TakeTestComponent
      testID={testID}
      questions={questions}
      setQuestions={setQuestions}
      questionsLength={
        test?.questions_reference && test.questions_reference.length
      }
      dateAndtime={test?.questions_reference && test.createdAt}
      subDomain={
        test?.questions_reference && test?.subdomain_reference?.sub_domain_name
      }
      timeAlloted={test?.questions_reference && test?.duration_in_mins}
      currentQuestionIndex={currentQuestionIndex}
      currentQuestion={currentQuestion}
      missingQuestions={getMissingQuestionsCount}
      attemptedQuestions={getAttemptQuestionsCount}
      goToPrevQuestion={goToPrevQuestion}
      goToNextQuestion={goToNextQuestion}
      onUncheckedOptionClick={onUncheckedOptionClick}
      toggleQuestionFlag={toggleQuestionFlag}
      confidenceMeter={confidenceLevel}
      SubmitButton={SubmitButton}
      // randomFill={randomFill}
      goToLastQuestion={goToLastQuestion}
    />
  );
}
