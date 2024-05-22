import React from 'react';
import Stack from 'react-bootstrap/Stack';

import { DateCalendarIcon, ClockIcon, TakeNotesIcon, ArrowLeftOutlinedIcon24, ArrowRightOutlinedIcon24 } from './icons/take-test-icons';
import { ArrowRightIcon, ExplanationIcon, FlagIcon, RightAnswerCheckIcon, WrongAnswerCrossIcon } from './icons/check-answers-icons';

const CheckAnswerComponent = ({ ANSWER_RESULT, hideDateTimeAlloted }) => {
    return (
        <div className='bg-white position-relative'>
            <div
                className='position-fixed d-flex justify-content-center align-items-center'
                style={{
                    border: '1px solid #F7F7F7',
                    boxShadow: '0px 2px 12px 0px #D2D6DB3D',
                    height: '42px',
                    bottom: '1rem',
                    right: '1rem',
                    zIndex: 1000
                }}
            >
                <div
                    className='h-100 px-2 d-flex align-items-center rounded-start bg-white cursor-pointer'
                // onClick={props.goToPrevQuestion}
                ><ArrowLeftOutlinedIcon24 /></div>
                <div className='h-100 px-2 d-flex align-items-center gap-1 bg-white text-14 font-light'
                    style={{
                        borderLeft: '1px solid #E5E7EB',
                        borderRight: '1px solid #E5E7EB',
                        minWidth: '4rem'
                    }}
                >
                    <span className='font-medium'>1</span>
                    <span>/</span>
                    <span>50</span>
                </div>
                <div
                    className='h-100 px-2 d-flex align-items-center rounded-end bg-white cursor-pointer'
                // onClick={props.goToNextQuestion}
                ><ArrowRightOutlinedIcon24 /></div>
            </div>
            <div className='d-flex justify-content-between py-2 px-4'
                style={{
                    backgroundColor: '#C3D3FF33'
                }}
            >
                <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                    <h5 className='text-14 font-semibold'>Control Engineering Test:</h5>
                    <button
                        className='rounded text-16 font-medium bg-white'
                        style={{
                            border: '1px solid #4AFF3A',
                            boxShadow: '0px 12px 42px 0px #12DD001A',
                            height: '2rem',
                            width: '10.5rem',
                            color: '#14FF00'
                        }}
                    >Review Mode On</button>
                </div>
                <div className='d-flex flex-wrap gap-4'>
                    <div className='bg-white py-2 px-3 rounded d-flex flex-column justify-content-between'
                        style={{
                            borderLeft: '5px solid #A4BCFD',
                            height: '6rem',
                            width: '10.5rem'
                        }}
                    >
                        <p className='my-0 text-14 font-semibold'>Overall Confidence Level:</p>
                        <p className='my-0 text-14 font-bold' style={{ color: '#12DD00' }}>66%</p>
                    </div>
                    {!hideDateTimeAlloted &&
                    <div className='bg-white py-3 px-3 rounded d-flex flex-column justify-content-between'
                    style={{
                        borderLeft: '5px solid #A4BCFD',
                        height: '6rem',
                    }}
                    >
                        <div className='d-flex gap-2 align-items-center'>
                            <span><DateCalendarIcon /></span>
                            <span className='text-14 font-semibold'>Date:</span>
                            <span className='text-12 font-medium text-color-primary'>6 Feb 2024, 03:24 PM</span>
                        </div>
                        <div className='d-flex gap-2 align-items-center'>
                            <span><ClockIcon /></span>
                            <span className='text-14 font-semibold'>Time Allotted: </span>
                            <span className='text-12 font-medium text-color-primary'>01:30:00</span>
                        </div>
                    </div>
                    }
                    <div className='bg-white py-3 px-3 rounded d-flex flex-column justify-content-between'
                        style={{
                            borderLeft: '5px solid #A4BCFD',
                            height: '6rem',
                            width: '13.5rem'
                        }}
                    >
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='text-14 font-semibold'>Wrong Answers:</span>
                            <span className='text-14 font-bold' style={{ color: '#FF1616' }}>20</span>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='text-14 font-semibold'>Attempted Questions:</span>
                            <span className='text-14 font-bold text-color-secondary'>50</span>
                        </div>
                    </div>
                    <div className='bg-white py-3 px-3 rounded d-flex flex-column justify-content-between'
                        style={{
                            borderLeft: '5px solid #A4BCFD',
                            height: '6rem',
                            width: '11rem'
                        }}
                    >
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='text-14 font-semibold'>Your Score:</span>
                            <div className='text-16'>
                                <span className='font-bold' style={{ color: '#00B132' }}>30</span>
                                <span className='font-semibold' style={{ color: '#4E4E4E' }}>/50</span>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='text-14 font-semibold'>Percentage:</span>
                            <span className='text-16 font-bold' style={{ color: '#00B132' }}>60%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='my-3 py-2 px-4 d-flex gap-3 flex-wrap'
                style={{
                    backgroundColor: '#F3F4F6'
                }}
            >
                {ANSWER_RESULT.map((ans, idx) => {
                    if (ans.flagged) {
                        return <div key={idx}
                            className='d-flex flex-column justify-content-center align-items-center text-white'
                            style={{
                                width: '1.95rem',
                                height: '42px',
                                backgroundColor: ans.isCorrect ? '#0C9400' : '#FF1616',
                                borderRadius: '4.46px'
                            }}
                        >
                            <FlagIcon />
                            <span>{ans.questionNo}</span>
                        </div>
                    }
                    return <div key={idx}
                        className='d-flex flex-column justify-content-center align-items-center text-white'
                        style={{
                            width: '1.95rem',
                            height: '42px',
                            backgroundColor: ans.isCorrect ? '#0C9400' : '#FF1616',
                            borderRadius: '4.46px'
                        }}
                    >
                        {ans.questionNo}
                    </div>
                })}
            </div>

            <hr className='my-0 mx-4' style={{ border: '1px solid #B4B4B4' }} />

            <div className='px-4 py-2'>
                <h5 className='text-18 font-bold text-color-navy'>Question No 1</h5>
                <p className='text-16 font-semibold'>
                    Select Best answer from below , Iusually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time. It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.It usually displays this message when you close an unsaved page when you do it  ?
                </p>

                <div className='d-flex gap-4'>
                    <div className='flex-1'>
                        <div className='rounded-xl text-center py-1' style={{ border: '1px solid #D2D6DB' }}>
                            <img src="/images/check-answer-1.png" alt="check-answer-1" />
                        </div>

                        <div className='my-2'>
                            <div className='d-flex gap-2 align-items-end'>
                                <span><ExplanationIcon /></span>
                                <h6 className='my-0 text-16 font-semibold text-color-navy'>Explanation:</h6>
                            </div>
                            <p className='my-2 text-14 font-medium'>The correct answer is : <span style={{ backgroundColor: '#12DD001F', color: '#008D28' }} className='text-16 font-semibold p-1 rounded'>A</span> </p>

                            <p className='text-16 font-normal' style={{ color: '#292929' }}>
                                It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time. It usually displays this message when you close an unsaved page when you do sually displays this message when you close an unsaved page when you do it on purpose. it's getting frustrated to see this every t
                            </p>
                        </div>

                        <div className='d-flex gap-3'>
                            <div className='flex-1'>
                                <h5 className='text-16 font-semibold text-color-navy'>Reference Links:</h5>
                                <ul>
                                    <li className='my-2'><a className='text-color-secondary' href="Https.//resvpimages.com">Https.//resvpimages.com</a></li>
                                    <li><a className='text-color-secondary' href="Https.//godeucate.com">Https.//godeucate.com</a></li>
                                </ul>
                            </div>
                            <div className='flex-1'>
                                <h5 className='text-16 font-semibold text-color-navy'>Images:</h5>
                                <div className='d-flex gap-3'>
                                    <img src="/images/check-answer-2.png" alt="check-answer-2" />
                                    <img src="/images/check-answer-3.png" alt="check-answer-3" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex-1'>
                        <Stack gap={2}>
                            <div className='d-flex gap-2 pb-2' style={{ backgroundColor: '#02D33D14' }}>
                                <span><RightAnswerCheckIcon /></span>
                                <span
                                    className='text-16 font-bold'
                                    style={{
                                        minWidth: 'max-content',
                                        color: '#00BA00'
                                    }}
                                >{"A ]"}</span>
                                <p className='my-0 text-16 font-medium' style={{ color: '#00BA00' }}>
                                    An unsaved page when you do it on purpose, and it's getting an unsaved page when you do it on purpose, and it's getting an unsaved page when you do it on purpose, and it's getting
                                </p>
                            </div>
                            <div className='d-flex gap-2 pb-2'>
                                <span><WrongAnswerCrossIcon /></span>
                                <span
                                    className='text-16 font-bold text-color-primary'
                                    style={{
                                        minWidth: 'max-content'
                                    }}
                                >{"B ]"}</span>
                                <p className='my-0 text-16 font-normal' style={{ color: '#1F2A37' }}>
                                    An unsaved page when you do it on purpose, and it's getting an unsaved page when you do it on purpose, and it's getting an unsaved page when you do it on purpose, and it's getting
                                </p>
                            </div>
                            <div className='d-flex gap-2 pb-2'>
                                <span className='invisible'><RightAnswerCheckIcon /></span>
                                <span
                                    className='text-16 font-bold text-color-primary'
                                    style={{
                                        minWidth: 'max-content',
                                    }}
                                >{"C ]"}</span>
                                <p className='my-0 text-16 font-normal' style={{ color: '#1F2A37' }}>
                                    An unsaved page when you do it on purpose, and it's getting an unsaved page when you do it on purpose, and it's getting an unsaved page when you do it on purpose, and it's getting
                                </p>
                            </div>
                            <div className='d-flex gap-2 pb-2'>
                                <span className='invisible'><RightAnswerCheckIcon /></span>
                                <span
                                    className='text-16 font-bold text-color-primary'
                                    style={{
                                        minWidth: 'max-content',
                                    }}
                                >{"D ]"}</span>
                                <p className='my-0 text-16 font-normal' style={{ color: '#1F2A37' }}>
                                    An unsaved page when you do it on purpose, and it's getting an unsaved page when you do it on purpose, and it's getting an unsaved page when you do it on purpose, and it's getting
                                </p>
                            </div>
                        </Stack>
                        <hr />
                        <div className='bg-white px-3 py-2' style={{ border: '1px solid #F5F5F5' }}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div
                                    className='rounded-xl px-2 py-1'
                                    style={{
                                        boxShadow: '0px 2px 12px 0px #D1D1D10A',
                                        backgroundColor: '#D6D6D63D'
                                    }}
                                >
                                    <span><TakeNotesIcon /></span>
                                    <span className='ms-2 text-10 font-medium'>Notes</span>
                                </div>
                                <div>
                                    <span className='text-14 font-semibold text-color-primary'>View All</span>
                                    <span><ArrowRightIcon /></span>
                                </div>
                            </div>
                            <hr />
                            <ul className='text-12 font-normal' style={{ color: '#292929' }}>
                                <li>Usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.</li>
                                <li>Usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.</li>
                                <li>Usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.</li>
                                <li>Usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CheckAnswerComponent