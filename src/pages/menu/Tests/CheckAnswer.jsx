import React from 'react'
import CheckAnswerComponent from '../../../components/CheckAnswerComponent'

const ANSWER_RESULT = [
    { questionNo: 1, flagged: true, isCorrect: true },
    { questionNo: 2, flagged: false, isCorrect: true },
    { questionNo: 3, flagged: false, isCorrect: false },
    { questionNo: 4, flagged: false, isCorrect: true },
    { questionNo: 5, flagged: false, isCorrect: false },
    { questionNo: 6, flagged: true, isCorrect: true },
    { questionNo: 7, flagged: true, isCorrect: false },
    { questionNo: 8, flagged: false, isCorrect: true },
    { questionNo: 9, flagged: false, isCorrect: true },
    { questionNo: 10, flagged: false, isCorrect: false },
    { questionNo: 11, flagged: false, isCorrect: true },
    { questionNo: 12, flagged: true, isCorrect: false },
    { questionNo: 13, flagged: false, isCorrect: true },
    { questionNo: 14, flagged: false, isCorrect: true },
    { questionNo: 15, flagged: false, isCorrect: false },
    { questionNo: 16, flagged: false, isCorrect: true },
    { questionNo: 17, flagged: false, isCorrect: false },
    { questionNo: 18, flagged: false, isCorrect: true },
    { questionNo: 19, flagged: true, isCorrect: true },
    { questionNo: 20, flagged: false, isCorrect: false },
    { questionNo: 21, flagged: false, isCorrect: true },
    { questionNo: 22, flagged: false, isCorrect: false },
    { questionNo: 23, flagged: false, isCorrect: true },
    { questionNo: 24, flagged: true, isCorrect: false },
    { questionNo: 25, flagged: true, isCorrect: true },
    { questionNo: 26, flagged: false, isCorrect: true },
    { questionNo: 27, flagged: true, isCorrect: false },
    { questionNo: 28, flagged: false, isCorrect: true },
    { questionNo: 29, flagged: false, isCorrect: true },
    { questionNo: 30, flagged: false, isCorrect: true },
    { questionNo: 31, flagged: false, isCorrect: true },
    { questionNo: 32, flagged: false, isCorrect: true },
    { questionNo: 33, flagged: true, isCorrect: false },
    { questionNo: 34, flagged: false, isCorrect: false },
    { questionNo: 35, flagged: false, isCorrect: true },
    { questionNo: 36, flagged: false, isCorrect: false },
    { questionNo: 37, flagged: false, isCorrect: true },
    { questionNo: 38, flagged: true, isCorrect: false },
    { questionNo: 39, flagged: false, isCorrect: true },
    { questionNo: 40, flagged: false, isCorrect: true },
    { questionNo: 41, flagged: false, isCorrect: true },
    { questionNo: 42, flagged: false, isCorrect: true },
    { questionNo: 43, flagged: false, isCorrect: false },
    { questionNo: 44, flagged: false, isCorrect: false },
    { questionNo: 45, flagged: false, isCorrect: true },
    { questionNo: 46, flagged: false, isCorrect: false },
    { questionNo: 47, flagged: false, isCorrect: true },
    { questionNo: 48, flagged: false, isCorrect: false },
    { questionNo: 49, flagged: false, isCorrect: true },
    { questionNo: 50, flagged: true, isCorrect: false },
]

const CheckAnswer = () => {
    return (
        <CheckAnswerComponent ANSWER_RESULT={ANSWER_RESULT} />
    )
}

export default CheckAnswer