import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

import ModuleLayout from '../../../layout/ModuleLayout'
import CustomDropdown from './components/custom-dropdown';
import SearchableDropdown from '../../../components/SearchableDropdown';

const RechargeModalTest = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className='text-center'>
                <button className='text-24 font-semibold text-white border-0 bg-color-primary rounded-lg'
                    style={{ width: '428px', height: '72px' }}
                    onClick={() => setModalShow(true)}
                >
                    Recharge Now
                </button>
            </div>

            <Modal
                centered
                size='lg'
                onHide={() => setModalShow(false)}
                show={modalShow}
            >
                <div className='p-4'>
                    <h4 className='text-center text-24 font-semibold text-color-secondary'>Mechanical Engineering</h4>
                    <h5 className='text-center my-4 text-24 font-medium' style={{ color: '#4D4D4D'}}>Select Topic & Subtopic from below</h5>
                    <hr />
                    <div className='w-90 mx-auto'>
                        <span className='text-14 font-medium d-block my-2'>Search & Select Topic:</span>
                        <CustomDropdown
                            pl="0.5rem"
                            pr="0.5rem"
                            py="0.5rem"
                            shadow="0 0 1rem #E0EAFF"
                            options={[{ value: "1", title: "Control Engineering [CE]" }]}
                        />
                    </div>
                    <div className='w-90 mx-auto my-3'>
                        <span className='text-14 font-medium d-block my-2'>Search & Select Subtopic:</span>
                        <SearchableDropdown
                            label="name"
                            id="id"
                        />
                    </div>

                    <div className='d-flex justify-content-center align-items-center gap-4 mt-5'>
                        <button 
                            className='rounded border-color-primary bg-white text-color-primary text-16 font-semibold' 
                            style={{ width: '174px', height: '48px' }} 
                            onClick={() => setModalShow(false)}
                        >Cancel</button>
                        <button 
                            className='rounded border-0 bg-color-primary text-white text-16 font-semibold'
                            style={{ width: '174px', height: '48px' }} 
                            onClick={() => navigate(`take-test/recharge-1`)}    
                        >Start Recharge</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

const Recharge = () => {
    return (
        <ModuleLayout>
            <div className='px-4 pt-5 pb-4 d-flex justify-content-center'>
                <img className='w-90' src="/images/recharge-hero.png" alt="recharge-hero.png" srcset="" />
            </div>

            <h5 className='w-65 mx-auto text-center text-28 font-medium'>"Feeling stuck? Let's reboot your brain with a practice exam jumpstart! Get ready to conquer and recharge!"</h5>

            <div className='d-flex flex-column align-items-start w-55 mx-auto px-3 mb-4' style={{}}>
                <p style={{ color: '#664747' }} className='text-center text-22 font-normal mt-3'>"Unlock your potential with an exam jumpstart! Say goodbye to feeling stuck and hello to Knowledge recharge!"</p>

                <div className='d-flex flex-column align-items-center'>
                    <div className='ps-4' style={{ color: '#664747' }}>
                        <h5 className='me-3 d-block text-22'>What will you get:</h5>
                        <ul className='text-22'>
                            <li>Solve 20 Random Questions & Answer It.</li>
                            <li>Unlimited Attempts</li>
                            <li>Solve 20 Questions & Answer.</li>
                            <li>Improve Your Confidence.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <RechargeModalTest />
        </ModuleLayout>
    )
}

export default Recharge