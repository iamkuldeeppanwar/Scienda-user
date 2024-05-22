import React from 'react'

import { LeftArrowFilledIcon, RightArrowFilledIcon, ThreeDotsIcon, ViewEyeIcon } from './components/reports-icons'
import ModuleLayout from '../../../layout/ModuleLayout'
import Stack from 'react-bootstrap/Stack'

const Reports = () => {
    return (
        <ModuleLayout>
            <h2 className='font-semibold text-32'>Your Reports</h2>

            <div className='bg-white p-3 d-flex justify-content-between my-3 rounded-xl'
                style={{
                    border: '1px solid #BABABA1F',
                    boxShadow: '0px 4px 12px 2px #4D4D4D0A'
                }}
            >
                <div className='w-45 ps-2 pe-4 border-end border-2'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h4 className='text-20 font-semibold text-color-secondary'>Specialty Modules</h4>
                        <span><ThreeDotsIcon /></span>
                    </div>
                    <div className='d-flex justify-content-between align-items-center my-3 gap-5'>
                        <div className='d-flex justify-content-between align-items-center flex-grow-1'>
                            <p className='m-0 text-16 font-light flex-grow-1'>Enrolled Modules</p>
                            <span className='text-16 font-bold text-color-secondary text-decoration-underline'>12</span>
                        </div>
                        <div className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center my-3 gap-5'>
                        <div className='d-flex justify-content-between align-items-center flex-grow-1'>
                            <p className='m-0 text-16 font-light flex-grow-1'>Completed Modules</p>
                            <span className='text-16 font-bold text-color-secondary text-decoration-underline'>12</span>
                        </div>
                        <div className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center my-3 gap-5'>
                        <div className='d-flex justify-content-between align-items-center flex-grow-1'>
                            <p className='m-0 text-16 font-light flex-grow-1'>Topics Covered</p>
                            <span className='text-16 font-bold text-color-secondary text-decoration-underline'>12</span>
                        </div>
                        <div className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center my-3 gap-5'>
                        <div className='d-flex justify-content-between align-items-center flex-grow-1'>
                            <p className='m-0 text-16 font-light flex-grow-1'>Best Performance Modules</p>
                            <span className='text-16 font-bold text-color-secondary text-decoration-underline'>12</span>
                        </div>
                        <div className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></div>
                    </div>
                </div>
                <div className='ps-3 flex-grow-1'>
                    <h4 className='text-20 font-semibold text-color-secondary'>Ongoing Specialty Modules</h4>
                    <div className='d-flex justify-content-between align-items-center my-2 text-14 font-medium'>
                        <p className='m-0'>Speciality Module 1: <span className='font-semibold text-color-secondary'>Robotics</span></p>
                        <span><ThreeDotsIcon /></span>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <span className="cursor-pointer"><LeftArrowFilledIcon /></span>
                        <div
                            className='font-normal text-12 p-2 rounded-lg'
                            style={{
                                height: '7.5rem',
                                width: '9.25rem',
                                border: '0.9px solid #CDCDCD3D',
                                boxShadow: '0px 3.59px 10.77px 0px #BEBEBE0A',
                                color: '#595959',
                            }}
                        >
                            Topic Wise
                        </div>
                        <div
                            className='font-normal text-12 p-2 rounded-lg'
                            style={{
                                height: '7.5rem',
                                width: '9.25rem',
                                border: '0.9px solid #CDCDCD3D',
                                boxShadow: '0px 3.59px 10.77px 0px #BEBEBE0A',
                                color: '#595959',
                            }}
                        >
                            Topic Wise Time Spent
                        </div>
                        <div
                            className='font-normal text-12 p-2 rounded-lg'
                            style={{
                                height: '7.5rem',
                                width: '9.25rem',
                                border: '0.9px solid #CDCDCD3D',
                                boxShadow: '0px 3.59px 10.77px 0px #BEBEBE0A',
                                color: '#595959',
                            }}
                        >
                            Performance wise Topics
                        </div>
                        <span className="cursor-pointer"><RightArrowFilledIcon /></span>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-center align-items-center gap-2'>
                        <span className="cursor-pointer"><LeftArrowFilledIcon /></span>
                        <span className="cursor-pointer"><RightArrowFilledIcon /></span>
                    </div>
                </div>
            </div>

            <div className='w-65 bg-white p-3 py-4 rounded-xl'
                style={{
                    border: '1px solid #BABABA1F',
                    boxShadow: '0px 4px 12px 2px #4D4D4D0A'
                }}
            >
                <h4 className='text-20 font-semibold text-color-secondary'>Most Challenging Specialty</h4>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-column row-gap-3 pe-3 py-3 flex-grow-1 border-end'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='text-16 font-light' style={{ color: '#424242' }}>Robotics</span>
                            <span className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></span>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='text-16 font-light' style={{ color: '#424242' }}>Science & Tech</span>
                            <span className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></span>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='text-16 font-light' style={{ color: '#424242' }}>Mathematics</span>
                            <span className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></span>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='text-16 font-light' style={{ color: '#424242' }}>Banking</span>
                            <span className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></span>
                        </div>
                    </div>
                    <div className='d-flex flex-column row-gap-3 px-3 py-3 flex-grow-1'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='text-16 font-light' style={{ color: '#424242' }}>Robotics</span>
                            <span className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></span>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='text-16 font-light' style={{ color: '#424242' }}>Science & Tech</span>
                            <span className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></span>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='text-16 font-light' style={{ color: '#424242' }}>Mathematics</span>
                            <span className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></span>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='text-16 font-light' style={{ color: '#424242' }}>Banking</span>
                            <span className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-100 bg-white p-3 py-4 rounded-xl my-4'
                style={{
                    border: '1px solid #BABABA1F',
                    boxShadow: '0px 4px 12px 2px #4D4D4D0A'
                }}
            >
                <h4 className='text-20 font-semibold text-color-secondary'>Confidence VS Performance</h4>
                <div className='d-flex justify-content-around align-items-center mt-4'>
                    <Stack gap={3} direction="horizontal">
                        <Stack gap={2} direction="horizontal" className='text-14 font-normal' style={{ color: '#475467'}}>
                            <span className='d-block rounded' style={{ height: '8px', width: '8px', backgroundColor: '#7F56D9'}}></span>
                            Robotics
                        </Stack>
                        <Stack gap={2} direction="horizontal" className='text-14 font-normal' style={{ color: '#475467'}}>
                            <span className='d-block rounded' style={{ height: '8px', width: '8px', backgroundColor: '#B692F6'}}></span>
                            Maths
                        </Stack>
                        <Stack gap={2} direction="horizontal" className='text-14 font-normal' style={{ color: '#475467'}}>
                            <span className='d-block rounded' style={{ height: '8px', width: '8px', backgroundColor: '#53389E'}}></span>
                            Coding
                        </Stack>
                    </Stack>
                    <Stack gap={3} direction="horizontal">
                        <Stack gap={2} direction="horizontal" className='text-14 font-normal' style={{ color: '#475467'}}>
                            <span className='d-block rounded' style={{ height: '8px', width: '8px', backgroundColor: '#7F56D9'}}></span>
                            Series 1
                        </Stack>
                        <Stack gap={2} direction="horizontal" className='text-14 font-normal' style={{ color: '#475467'}}>
                            <span className='d-block rounded' style={{ height: '8px', width: '8px', backgroundColor: '#B692F6'}}></span>
                            Series 2
                        </Stack>
                        <Stack gap={2} direction="horizontal" className='text-14 font-normal' style={{ color: '#475467'}}>
                            <span className='d-block rounded' style={{ height: '8px', width: '8px', backgroundColor: '#53389E'}}></span>
                            Series 3
                        </Stack>
                    </Stack>
                </div>
                {/* <hr className='w-90 mx-auto' /> */}
            </div>
        </ModuleLayout>
    )
}

export default Reports