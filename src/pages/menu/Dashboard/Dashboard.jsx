
import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ModuleLayout from '../../../layout/ModuleLayout'
import { ArrowLeft, ArrowRight, CalendarIcon, ThreeDotsIcon } from './components/dashboard-icons';
import Pie from './components/Pie';
import './Dashboard.css';
import Calendar from './components/Calendar';

const MODULE_REPORTS = [
    { id: 1, name: 'Machine Learning', completed: 76, total: 100 },
    { id: 2, name: 'Mechatronics', completed: 65, total: 100 },
    { id: 3, name: 'Aerodynamics', completed: 56, total: 100 },
]

const TopicCard = ({ topicName, completedTopics, totalTopics }) => {
    const percentage = (completedTopics / totalTopics) * 100;
    const text = completedTopics + "/" + totalTopics;
    return (
        <div
            className='d-flex justify-content-center align-items-center'
            style={{
                boxShadow: '0px 4px 24px 2px #8098F91A',
                border: '0.5px solid #8098F9',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.5rem'
            }}
        >
            <h6 className='text-12 m-0 p-0 w-50'>{topicName}</h6>
            <Pie percentage={percentage} colour="var(--secondary-color)" radius={25}>
                {text}
            </Pie>
        </div>
    )
}

const Dashboard = () => {
    const [selectedTopicCategory, setSelectedTopicCategory] = useState('ongoing');
    const [showCalendar, setShowCalendar] = useState(false)

    return (
        <ModuleLayout>
            <h3 className='text-color-secondary text-22 font-semibold'>Your Dashboard</h3>

            <div className='w-100 d-flex justify-content-between gap-4 mt-3' style={{ marginBottom: '4.5rem'}}>
                <div
                    className='w-60 rounded-xl p-4 bg-white'
                    style={{
                        boxShadow: '0px 4px 12px 0px #8B8B8B1F'
                    }}
                >
                    <div className='d-flex gap-3 mb-3' style={{ marginLeft: '1.9rem' }}>
                        <h5
                            onClick={() => setSelectedTopicCategory('ongoing')}
                            className={`text-16 cursor-pointer ${selectedTopicCategory === 'ongoing' ? 'font-semibold text-color-highlighted' : 'font-light  text-color-unhighlighted'}`}
                        >Ongoing Topics</h5>
                        <h5
                            onClick={() => setSelectedTopicCategory('completed')}
                            className={`text-16 cursor-pointer ${selectedTopicCategory === 'completed' ? 'font-semibold text-color-highlighted' : 'font-light text-color-unhighlighted'}`}
                        >Completed Topics</h5>
                    </div>
                    {selectedTopicCategory === 'ongoing' &&
                        <div className='d-flex justify-content-between align-items-center gap-3'>
                            <ArrowLeft />
                            <TopicCard topicName={"Robotics & It’s Application"} completedTopics={2} totalTopics={20} />
                            <TopicCard topicName={"Robotics & It’s Application"} completedTopics={2} totalTopics={20} />
                            <TopicCard topicName={"Mechatronics & It’s use"} completedTopics={5} totalTopics={12} />
                            <ArrowRight />
                        </div>
                    }
                    {selectedTopicCategory === 'completed' &&
                        <div className='d-flex justify-content-between align-items-center gap-3'>
                            <ArrowLeft />
                            <TopicCard topicName={"Robotics & It’s Application"} completedTopics={20} totalTopics={20} />
                            <TopicCard topicName={"Robotics & It’s Application"} completedTopics={20} totalTopics={20} />
                            <TopicCard topicName={"Mechatronics & It’s use"} completedTopics={12} totalTopics={12} />
                            <ArrowRight />
                        </div>
                    }
                </div>
                <div
                    className='w-40 rounded-xl p-4 bg-white'
                    style={{
                        boxShadow: '0px 4px 12px 0px #8B8B8B1F'
                    }}
                >
                    <div className='d-flex justify-content-between'>
                        <h5 className='text-16 text-color-highlighted'>Upcoming Events</h5>
                        <ThreeDotsIcon />
                    </div>
                    <div className='d-flex justify-content-between rounded py-2 px-3 mt-3'
                        style={{
                            border: '0.5px solid #6DB5DE',
                            color: '#555555'
                        }}
                    >
                        <p className='m-0 p-0'>Your Timeline</p>
                        <div className='position-relative'>
                            <div className='position-absolute'
                                style={{
                                    right: '2rem',
                                    bottom: '-400%',
                                    visibility: !showCalendar && 'hidden'
                                }}
                            >
                                <Calendar />
                            </div>
                            <div className='cursor-pointer' onClick={() => setShowCalendar(p => !p)}><CalendarIcon /></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='my-5'>
                <Row>
                    <Col sm={12} md={6} lg={4} className='my-2'>
                        <div
                            className='bg-white rounded-xl p-3'
                            style={{
                                border: '0.95px solid #E6E6E6',
                                boxShadow: '0px 0.95px 1.89px 0px #1018280F',
                                minHeight: '10.5rem'
                            }}
                        >
                            <div className='d-flex justify-content-between align-items-center'>
                                <h6 className='text-14 text-color-secondary font-bold'>Module Reports</h6>
                                <span className='text-12 text-color-primary font-bold d-flex justify-content-end align-items-center gap-1 cursor-pointer'>View All
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.5 9L7.5 6L4.5 3" stroke="#00008B" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </div>

                            {MODULE_REPORTS.map((module) => <div
                                className='d-flex justify-content-between align-items-center my-2'
                            >
                                <span className='text-12 font-medium text-decoration-underline' style={{ color: '#6E6E6E' }}>{module.name}</span>
                                <span className='text-12 text-color-secondary rounded-full px-3 py-1' style={{ backgroundColor: '#EEF4FF' }}>{module.completed}/{module.total}</span>
                            </div>)}
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={4} className='my-2'>
                        <div
                            className='bg-white rounded-xl p-3'
                            style={{
                                border: '0.95px solid #E6E6E6',
                                boxShadow: '0px 0.95px 1.89px 0px #1018280F',
                                minHeight: '10.5rem'
                            }}
                        >
                            <div className='d-flex justify-content-between align-items-center'>
                                <h6 className='text-14 text-color-secondary font-bold'>Your Membership Plan</h6>
                                <ThreeDotsIcon />
                            </div>

                            <div className='d-flex justify-content-between align-items-center mt-3 mb-3'>
                                <span className='text-12 font-medium rounded-full py-1 px-2' style={{ color: '#15B79E', backgroundColor: '#F0FDF9' }}>Active Plan</span><span>
                                </span>
                                <span
                                    className='font-bold text-color-secondary'
                                    style={{
                                        fontSize: '28px'
                                    }}
                                >£ 25/Month</span>
                            </div>

                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='m-0 ms-3 text-12 font-medium d-flex gap-3'>Expires on: 
                                    <span className='text-12' style={{ color: '#AA3E01' }}>20 Dec 2023</span></p>
                                <button
                                    className='text-14 font-medium text-white bg-color-primary rounded px-3 py-1'
                                >Renew Plan</button>
                            </div>

                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={4} className='my-2'>
                        <div
                            className='bg-white rounded-xl p-3'
                            style={{
                                border: '0.95px solid #E6E6E6',
                                boxShadow: '0px 0.95px 1.89px 0px #1018280F',
                                minHeight: '10.5rem'
                            }}
                        >
                            <div className='d-flex justify-content-between align-items-center'>
                                <h6 className='text-14 text-color-secondary font-bold'>Issue Tracking / Ticket System</h6>
                            </div>

                            <div className='text-12 mt-3 mb-3' style={{ color: '#505051' }}>
                                View and track your raised complaints/tickets here for quick updates and resolution.
                            </div>

                            <div className='d-flex justify-content-end align-items-center'>
                                <button
                                    className='text-14 font-medium text-white bg-color-primary rounded px-4 py-1'
                                >View</button>
                            </div>

                        </div>
                    </Col>
                </Row>
            </div>

            <div className='d-flex justify-content-between align-items-center'>
                <h6 className='text-16 font-semibold'>Mechanical Engineering Tests</h6>
                <span className='text-16 font-medium text-color-primary cursor-pointer'>
                    View All
                    <svg className='mb-1 ms-1' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="#00008B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
            </div>

        </ModuleLayout>
    )
}

export default Dashboard