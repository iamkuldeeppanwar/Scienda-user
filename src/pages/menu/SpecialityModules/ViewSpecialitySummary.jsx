import React from 'react'
import { Link } from "react-router-dom"
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi2";

import { SUB_TOPICS } from './lib/TopicSummary';

const ViewSummaryContainer = ({ children, topic, containerHeader }) => {
    return (
        <div
            style={{
                borderLeft: '2px solid var(--primary-color)',
                position: 'relative',
                padding: '2rem 1.5rem',
            }}
        >
            <span
                style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '-9px',
                    cursor: 'pointer',
                }}
            ><HiMinusCircle style={{ color: 'var(--primary-color)' }} /></span>
            {containerHeader}
            {children}
        </div>
    )
}

const ViewSpecialitySummary = () => {
    return (
        <div className='p-4'>
            <ViewSummaryContainer
                containerHeader={<h6
                    style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '1rem',
                        color: 'var(--primary-color)',
                    }}
                >Engineering</h6>}
            >
                <ViewSummaryContainer
                    containerHeader={<h6
                        style={{
                            position: 'absolute',
                            top: '-12px',
                            left: '1rem'
                        }}
                    >Mechanical Engineering</h6>}
                >
                    {SUB_TOPICS.map(({ topic, subtopics }, index) => (
                        <div className='mb-4'>
                            <ViewSummaryContainer
                                key={index}
                                containerHeader={
                                    <div
                                        className='d-flex justify-content-between align-items-start'
                                        style={{
                                            position: 'absolute',
                                            top: '-10px',
                                            left: '1rem',
                                            width: 'calc(100% - 2.5rem)',
                                        }}
                                    >
                                        <h6>Topic {index + 1}: {topic}</h6>
                                        <Link to={`/menu/questions?topic=${topic}`} style={{ textDecoration: 'none'}}>
                                            <p
                                                style={{
                                                    borderRadius: '0.25rem',
                                                    color: 'white',
                                                    backgroundColor: '#6172F3',
                                                    padding: '0.2rem 0.375rem',
                                                    fontSize: '0.75rem'
                                                }}
                                            >No. Questions: 100</p>
                                        </Link>
                                    </div>
                                }
                            >
                                {subtopics.map((subtopic, index) => (<div>
                                    <hr className='w-100 my-0' />
                                    <div className='w-100 py-2 ps-3 pe-2 d-flex justify-content-between align-items-start'>
                                        <p>{subtopic}</p>
                                        <p
                                            style={{
                                                borderRadius: '0.25rem',
                                                color: '#9E9E9E',
                                                backgroundColor: '#F7F7F7',
                                                padding: '0.2rem 0.375rem',
                                                fontSize: '0.75rem',
                                                fontWeight: 600
                                            }}
                                        >No. Questions: 25</p>
                                    </div>
                                </div>))}
                            </ViewSummaryContainer>
                        </div>
                    ))}
                </ViewSummaryContainer>
            </ViewSummaryContainer>
        </div>
    )
}

export default ViewSpecialitySummary;