
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import CheckRechargeTestScoreModal from './CheckRechargeTestScoreModal';


const CheckRechargeTestScoreButton = ({ children }) => {
    const { testID } = useParams();
    const [checkScoreModalShow, setCheckScoreModalShow] = React.useState(false);

    const openCheckScoreModal = () => setCheckScoreModalShow(true);
    const closeCheckScoreModal = () => setCheckScoreModalShow(false);

    return (
        <>
            <div className='cursor-pointer' onClick={openCheckScoreModal}>
                {children}
            </div>
            <CheckRechargeTestScoreModal
                checkScoreModalShow={checkScoreModalShow}
                closeCheckScoreModal={closeCheckScoreModal}
                testID={testID}
            />
        </>
    )
}

function RechargeTestSubmitModal({
    testSubmitModalShow,
    closeTestSubmitModal,
    questionsLength,
    missingQuestions,
    attemptedQuestions
}) {
    return (
        <Modal
            show={testSubmitModalShow}
            onHide={closeTestSubmitModal}
            aria-labelledby="help-modal"
            centered
            className='help-modal'
            // size='lg'
        >
            <div className='p-5'>
                <h4 className='px-4 py-2 text-22 font-semibold text-center'>
                    Are you sure you want to submit this exam, it cannot be reverted..!
                </h4>

                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <p className='text-14 font-semibold' style={{ color: '#384250' }}>
                        Missing Questions: <span className='ms-2 d-inline-block text-color-secondary'>{missingQuestions}</span>
                    </p>
                    <p className='text-14 font-semibold' style={{ color: '#384250' }}>
                        Answered Questions: <span className='ms-2 d-inline-block text-color-secondary'>{attemptedQuestions}</span>
                    </p>
                    <p className='text-14 font-semibold' style={{ color: '#384250' }}>
                        Total No. Of Questions: <span className='ms-2 d-inline-block text-color-secondary'>{questionsLength} Questions</span>
                    </p>
                </div>

                <div className='mt-3 d-flex justify-content-center align-items-center gap-2'>
                    {questionsLength > attemptedQuestions &&
                        <button
                            className='text-white bg-color-primary text-16 font-semibold py-3 px-4 rounded-lg border-0'
                            style={{
                                width: '18.3125rem',
                                height: '56px',
                                boxShadow: '0px 1px 2px 0px #1018280D'
                            }}
                            onClick={closeTestSubmitModal}
                        >
                            Go back & Add Response
                        </button>
                    }
                    {questionsLength === attemptedQuestions &&
                        <button
                            className='bg-white text-16 text-color-primary font-medium rounded-lg'
                            style={{
                                width: '10.5rem',
                                height: '56px',
                                border: '1px solid var(--primary-color)'
                            }}
                        >
                            Go back
                        </button>
                    }
                    {questionsLength === attemptedQuestions &&
                        <CheckRechargeTestScoreButton>
                            <button
                                className='text-white bg-color-primary text-16 font-semibold py-3 px-4 rounded-lg border-0'
                                style={{
                                    width: '10.5rem',
                                    height: '56px',
                                    boxShadow: '0px 1px 2px 0px #1018280D'
                                }}
                            >
                                Submit Now
                            </button>
                        </CheckRechargeTestScoreButton>
                    }
                </div>
            </div>
        </Modal>
    )
}

export default RechargeTestSubmitModal