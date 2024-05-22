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
    { questionNo: 20, flagged: false, isCorrect: false }
]


const RechargeCheckAnswer = () => {
    return (
        <CheckAnswerComponent ANSWER_RESULT={ANSWER_RESULT} hideDateTimeAlloted />
    )
}

export default RechargeCheckAnswer;