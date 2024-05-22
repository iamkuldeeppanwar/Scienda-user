import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import TakeTestComponent from "../../../components/TakeTestComponent";
import RechargeTestSubmitModal from "./components/RechargeTestSubmitModal";
import { ALL_QUESTIONS } from "./lib/RechargeTakeTest";

export default function RechargeTakeTest() {
    const { testID } = useParams();
    const [questions, setQuestions] = useState(ALL_QUESTIONS);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];

    const goToPrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(p => p - 1);
        }
    }

    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(p => p + 1);
        }
    }

    const goToLastQuestion = () => {
        setCurrentQuestionIndex(questions.length - 1);
    }

    const onUncheckedOptionClick = (optionNumber) => {
        const updatedQuestions = questions.map((question, idx) => {
            if (currentQuestionIndex !== idx) {
                return question;
            }
            const updatedQuestion = question;
            updatedQuestion.selectedOption = optionNumber;
            return updatedQuestion;
        })
        setQuestions(updatedQuestions);
    }

    const toggleQuestionFlag = () => {
        const updatedQuestions = questions.map((question, idx) => {
            if (currentQuestionIndex !== idx) {
                return question;
            }
            const updatedQuestion = question;
            updatedQuestion.questionFlagged = !updatedQuestion.questionFlagged
            return updatedQuestion;
        })
        setQuestions(updatedQuestions); 
    }

    const randomFill = () => {
        const updatedQuestions = questions.map((question, idx) => {
            const updatedQuestion = question; 
            updatedQuestion.selectedOption = Math.floor(Math.random()*4);
            updatedQuestion.questionFlagged = Math.random() < 0.5;
            return updatedQuestion;
        })
        setQuestions(updatedQuestions);
        setCurrentQuestionIndex(questions.length - 1);
    }

    const getMissingQuestionsCount = useCallback(() => questions.filter((question) => question.selectedOption === -1).length, [])

    const missingQuestions =  getMissingQuestionsCount();
    const attemptedQuestions = questions.length - missingQuestions;


    const SubmitButton = () => {
        const [testSubmitModalShow, setTestSubmitModalShow] = useState(false);
    
        const openTestSubmitModal = () => setTestSubmitModalShow(true);
        const closeTestSubmitModal = () => setTestSubmitModalShow(false);
    
        return (
            <>
                <button
                    className='bg-color-primary text-16 text-white font-medium rounded-lg py-2 px-4 border-0'
                    onClick={openTestSubmitModal}
                >
                    Submit
                </button>
                <RechargeTestSubmitModal
                    testSubmitModalShow={testSubmitModalShow}
                    questionsLength={questions.length}
                    missingQuestions={missingQuestions}
                    attemptedQuestions={attemptedQuestions}
                    
                    closeTestSubmitModal={closeTestSubmitModal}
                />
            </>
        )
    }

    return <TakeTestComponent 
        questionsLength={questions.length}
        currentQuestionIndex={currentQuestionIndex}

        currentQuestion={currentQuestion}
        missingQuestions={missingQuestions}
        attemptedQuestions={attemptedQuestions}

        goToPrevQuestion={goToPrevQuestion}
        goToNextQuestion={goToNextQuestion}
        onUncheckedOptionClick={onUncheckedOptionClick}
        toggleQuestionFlag={toggleQuestionFlag}
        
        SubmitButton={SubmitButton}
        
        randomFill={randomFill}
        goToLastQuestion={goToLastQuestion}
    />
}