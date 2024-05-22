import React from 'react'
import Modal from 'react-bootstrap/Modal';

import { InfoIcon, QuestionsIcon, TimerIcon } from './test-icons';
import { Link } from 'react-router-dom';

const TestStartModal = (props) => {
    return (
        <Modal
            show={props.testStartModalShow}
            onHide={props.closeTestStartModal}
            aria-labelledby="help-modal"
            centered
            className='help-modal'
        >
            <div className='p-4'>
                <div className='d-flex justify-content-start align-items-center gap-2'>
                    <span><InfoIcon /></span>
                    <p className='text-20 font-normal m-0'><span className='font-medium'>Note:</span> Practice exams can only be taken once</p>
                </div>
                <hr />
                <h4 className='text-center font-medium' style={{ color: '#4D4D4D' }}>{props.testName}</h4>

                <div className='w-60 mx-auto d-flex justify-content-start align-items-center gap-2 mt-4 mb-2'>
                    <span className='mb-1'><TimerIcon /></span>
                    <p className='m-0 p-0 text-16 font-semibold'>Time Allotted: <span className='font-light'>{props.timeAlloted}</span></p>
                </div>
                <div className='w-60 mx-auto d-flex justify-content-start align-items-center gap-2'>
                    <span className='mb-1'><QuestionsIcon /></span>
                    <p className='m-0 p-0 text-16 font-semibold'>No. of Questions: <span className='font-light'>{props.noOfQuestions}</span></p>
                </div>

                <div className='d-flex justify-content-center align-items-center gap-3 mt-5'>
                    <button
                        className='bg-white text-color-primary text-16 font-semibold rounded'
                        style={{
                            width: '174px',
                            height: '3rem',
                            border: '1px solid var(--primary-color)'
                        }}
                        onClick={props.closeTestStartModal}
                    >Go back</button>
                    <Link to={`/menu/tests/take-test/${props.testId}`}>
                        <button
                            className='bg-color-primary text-white rounded'
                            style={{
                                width: '174px',
                                height: '3rem',
                                border: '1px solid var(--primary-color)'
                            }}
                        >
                            Take Exam
                        </button>
                    </Link>
                </div>
            </div>
        </Modal>
    )
}

export default TestStartModal