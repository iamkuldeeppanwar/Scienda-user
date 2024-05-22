import React from 'react'
import { Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const TopicDetail = () => {
    return (
        <>
            <div className='p-5 pt-4'>
                <h4 className='px-3 text-16 font-medium text-color-secondary'>Mechanical Engineering</h4>
                <hr className='my-4' />
                <Stack direction='horizontal' gap={2} className='align-items-start' >
                    <div>
                        <img src="/images/topic-detail.png" alt="topic-detail" />
                    </div>
                    <div className='flex-1'>
                        <h3 className='text-color-primary'>Energy efficiency in HVAC systems.</h3>
                        <hr style={{ border: '2.37px solid #0000001F' }} />
                        <Stack direction='horizontal' gap={3}>
                            <div className='text-16 font-semibold px-3 py-2 rounded' style={{
                                background: '#FEF7C3',
                                boxShadow: '0px 28.39px 56.78px 0px #DBEAF10A',
                                maxWidth: 'max-content'
                            }}>Mechanical Engineering</div>
                            <div className='text-16 font-semibold px-3 py-2 rounded' style={{
                                background: '#EEF4FF',
                                boxShadow: '0px 28.39px 56.78px 0px #DBEAF10A',
                                maxWidth: 'max-content'
                            }}>Subtopics: 12</div>
                            <div className='text-16 font-semibold px-3 py-2 rounded' style={{
                                background: '#F1F1F1',
                                boxShadow: '0px 28.39px 56.78px 0px #DBEAF10A',
                                maxWidth: 'max-content'
                            }}>Total No. of Questions: 324</div>
                        </Stack>
                        <Stack direction='horizontal' gap={3} className='align-items-start mt-3'>
                            <div className='text-16 font-semibold' style={{ color: '#131B24' }}>References:</div>
                            <Stack>
                                <a href="https.//resvpimages.com" className='text-14 font-normal text-color-secondary'>Https.//resvpimages.com</a>
                                <a href="https.//godeucate.com" className='text-14 font-normal text-color-secondary'>Https.//godeucate.com</a>
                            </Stack>
                        </Stack>

                    </div>
                </Stack>

                <p className='my-3' style={{ color: '#292929' }}>
                    It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time. It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every.It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time. It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every.
                </p>

                <div className='p-4 bg-white rounded' style={{
                    boxShadow: '0px 4px 32px 0px #0000000A'
                }}>
                    <h4 className='text-center text-20 font-bold'>Subtopics List</h4>

                    <div className='d-flex justify-content-between'>
                        <p className='m-0 text-14 font-normal'>
                            <span className='font-semibold'>Subtopic 1: </span>
                            Fluid Mechanics & Its Application  purpose, and it's getting an unsaved page
                        </p>
                        <div className='bg-color-light text-12 font-semibold px-2 py-1 rounded' style={{
                            color: '#101828'
                        }}>
                            No. Questions: 25
                        </div>
                    </div>
                    <hr style={{ border: '1px solid #CCCCCC' }} />
                    <div className='d-flex justify-content-between'>
                        <p className='m-0 text-14 font-normal'>
                            <span className='font-semibold'>Subtopic 1: </span>
                            Fluid Mechanics & Its Application  purpose, and it's getting an unsaved page
                        </p>
                        <div className='bg-color-light text-12 font-semibold px-2 py-1 rounded' style={{
                            color: '#101828'
                        }}>
                            No. Questions: 25
                        </div>
                    </div>
                    <hr style={{ border: '1px solid #CCCCCC' }} />
                    <div className='d-flex justify-content-between'>
                        <p className='m-0 text-14 font-normal'>
                            <span className='font-semibold'>Subtopic 1: </span>
                            Fluid Mechanics & Its Application  purpose, and it's getting an unsaved page
                        </p>
                        <div className='bg-color-light text-12 font-semibold px-2 py-1 rounded' style={{
                            color: '#101828'
                        }}>
                            No. Questions: 25
                        </div>
                    </div>
                    <hr style={{ border: '1px solid #CCCCCC' }} />
                    <div className='d-flex justify-content-between'>
                        <p className='m-0 text-14 font-normal'>
                            <span className='font-semibold'>Subtopic 1: </span>
                            Fluid Mechanics & Its Application  purpose, and it's getting an unsaved page
                        </p>
                        <div className='bg-color-light text-12 font-semibold px-2 py-1 rounded' style={{
                            color: '#101828'
                        }}>
                            No. Questions: 25
                        </div>
                    </div>
                    <hr style={{ border: '1px solid #CCCCCC' }} />
                </div>
            </div>
            <div className='position-fixed bottom-0 w-100 py-4 d-flex justify-content-center' style={{
                backgroundColor: '#F3F4F6'
            }}>
                <Link to='take-test' className='text-decoration-none'>
                    <button className='d-block border-0 text-20 font-semibold rounded-lg text-white bg-color-primary'
                        style={{
                            width: '273px',
                            height: '42px',
                            boxShadow: '0px 4px 4px 0px #0000000A',
                            marginRight: '15rem'
                        }}
                    >Take Test</button>
                </Link>
            </div>
        </>
    )
}

export default TopicDetail