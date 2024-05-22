
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

import { TestSubmitCheckIcon } from './test-icons';

const CheckTestScoreModal = ({ checkScoreModalShow, closeCheckScoreModal, testID }) => {
    return (
        <Modal
            show={checkScoreModalShow}
            onHide={closeCheckScoreModal}
            centered
        >
            <div className='p-5'>
                <div className='text-center'>
                    <TestSubmitCheckIcon />
                </div>
                <p className='text-24 font-semibold text-center' style={{ color: '#111927' }}>
                    You have successfully submitted the Exam
                </p>
                <Link to={`/menu/tests/check-answers/${testID}`} className='text-center d-block'>
                    <button
                        className='bg-color-primary py-2 px-3 text-white text-16 font-semibold rounded-lg'
                        style={{
                            border: '1px solid var(--primary-color)',
                            boxShadow: '0px 1px 2px 0px #1018280D',
                            width: '263px',
                            height: '56px'
                        }}
                    >
                        Check Score
                    </button>
                </Link>
            </div>
        </Modal>
    )
}

export default CheckTestScoreModal