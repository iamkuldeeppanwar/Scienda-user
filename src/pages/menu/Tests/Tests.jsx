import React, { useState } from 'react'

import ModuleLayout from '../../../layout/ModuleLayout'
import { TimerIcon, CalendarIcon, QuestionsIcon } from './components/test-icons'
import TestStartModal from './components/TestStartModal';

const TestCard = ({ testId, testName, timeAlloted, completedOn, noOfQuestions, info, btnText, onBtnClick }) => {
    const [testStartModalShow, setTestStartModalShow] = useState(false);

    const openTestStartModal = () => setTestStartModalShow(true); 
    const closeTestStartModal = () => setTestStartModalShow(false);

    return (
        <div
            className='bg-white rounded-xl p-3 px-2'
            style={{
                border: '1px solid #8F8F8F17',
                boxShadow: '0px 12px 12px 0px #00000005',
                maxWidth: '15.5rem',
                width: '100%',
                minHeight: '12rem'
            }}
        >
            <h6 className='text-center text-14 font-medium'>{testName}</h6>
            <div className='d-flex flex-column gap-2 mt-4 mb-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex justify-content-between align-items-center gap-1 text-12 font-semibold'><TimerIcon /> Time Allotted:</div>
                    <div className='text-12 font-light'>{timeAlloted}</div>
                </div>
                {completedOn &&
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='d-flex justify-content-between align-items-center gap-1 text-12 font-semibold'><CalendarIcon /> Completed On:</div>
                        <div className='text-12 font-light'>{completedOn}</div>
                    </div>
                }
                {noOfQuestions &&
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='d-flex justify-content-between align-items-center gap-1 text-12 font-semibold'><QuestionsIcon /> No. of Questions:</div>
                        <div className='text-12 font-light'>{noOfQuestions}</div>
                    </div>
                }
            </div>
            {info && <p style={{ color: '#475467' }} className='text-center text-12 font-normal'>{info}</p>}
            <div className='w-100 d-flex justify-content-center'>
                <button
                    onClick={openTestStartModal}
                    className='bg-white mx-auto text-center font-medium text-12 text-color-primary rounded py-1'
                    style={{
                        border: '1px solid #00008B',
                        boxShadow: '0px 4px 4px 0px #ACD4FF0A',
                        width: '8.5rem'
                    }}
                >
                    {btnText}
                </button>
                <TestStartModal
                    testStartModalShow={testStartModalShow}
                    closeTestStartModal={closeTestStartModal}
                    testId={testId}
                    testName={testName}
                    timeAlloted={timeAlloted}
                    noOfQuestions={noOfQuestions}
                />
            </div>
        </div>
    )
}

const Tests = () => {
    

    return (
        <ModuleLayout className='ps-4'>
            <div>
                <h4 className='text-22 font-semibold'>Exams</h4>
                <div className='d-flex gap-3'>
                    {[...Array(5)].map((num, idx) => <TestCard
                        key={idx}
                        testId={idx}
                        testName='Test name should come here'
                        timeAlloted='1 hr 20 min'
                        noOfQuestions='120 Questions'
                        info='Test your knowledge with this MCQ.'
                        btnText='Take Exam'
                    />)}
                </div>
            </div>
            <div className='my-3'>
                <h4 className='text-22 font-semibold'>Quiz</h4>
                <div className='d-flex gap-3'>
                    {[...Array(5)].map((num, idx) => <TestCard
                        key={idx}
                        testId={idx}
                        testName='Test name should come here'
                        timeAlloted='1 hr 20 min'
                        noOfQuestions='120 Questions'
                        info='Test your knowledge with this MCQ.'
                        btnText='Take Exam'
                    />)}
                </div>
            </div>
            <div className='my-3'>
                <h4 className='text-22 font-semibold'>Review Completed Exam-Scoreboard</h4>
                <div className='d-flex gap-3'>
                    {[...Array(5)].map((num, idx) => <TestCard
                        key={idx}
                        testId={idx}
                        testName={`Exam name ${idx+1}`}
                        timeAlloted='1 hr 20 min'
                        completedOn='22 Jan 2024, 2:00 PM'
                        noOfQuestions='120 Questions'
                        btnText='View Score'
                    />)}
                </div>
            </div>
        </ModuleLayout>
    )
}

export default Tests