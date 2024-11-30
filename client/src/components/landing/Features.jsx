import React, { useState } from 'react';
import style from '../../styles/landing/features.module.css';
import { EditNoteOutlined,AssignmentTurnedInOutlined,Splitscreen,PlaylistAddOutlined,EditOutlined, VerifiedUserOutlined, PriorityHighOutlined, AutoAwesomeOutlined } from '@mui/icons-material';
import { Element } from 'react-scroll';
const features = [
    {
        title: "Task Creation",
        description: "Develop a form to allow users to create new tasks. Tasks should have a title, description, and due date also add tasks to the respective priority lists.",
        icon :  <PlaylistAddOutlined sx={{ fontSize: '3rem',color : 'var(--primary)' }} />
    },
    {
        title: "Task List Management",
        description: "Display a list of all tasks with the help of pagination and Ajax, showing the title, due date, and status (e.g., 'pending', 'completed').",
        icon :  <AssignmentTurnedInOutlined sx={{ fontSize: '3rem',color : 'var(--primary)' }} />
    },
    {
        title: "Task Details View",
        description: "Implement a page to view the details of a specific task, including its description and due date.",
        icon :  <Splitscreen sx={{ fontSize: '3rem',color : 'var(--primary)' }} />
    },
    {
        title: "Edit & Delete Tasks",
        description: "Allow users to edit the details of an existing task, including updating the title, description, and due date. Provide an option to delete a task with a confirmation dialogue before deletion.",
        icon :  <EditOutlined sx={{ fontSize: '3rem',color : 'var(--primary)' }} />
    },
    {
        title: "Status Updates",
        description: "Allow users to mark tasks as completed or change their status effortlessly.",
        icon : <PlaylistAddOutlined sx={{ fontSize: '3rem',color : 'var(--primary)' }} />
    },
    {
        title: "User Authentication",
        description: "Implement a basic user authentication system to ensure that only authorized users can create, view, edit, and delete tasks.",
        icon :  <VerifiedUserOutlined sx={{ fontSize: '3rem',color : 'var(--primary)' }} />
    },
    {
        title: "Priority Management",
        description: "Move tasks between priority lists for better organization.",
        icon :  <PriorityHighOutlined sx={{ fontSize: '3rem',color : 'var(--primary)' }} />
    },
    {
        title: "Visual Representation",
        description: "Organize tasks by priority for better focus. Implement color-coded priority lists for quick identification.",
        icon :  <AutoAwesomeOutlined sx={{ fontSize: '3rem',color : 'var(--primary)' }} />
    }
];

const Features = () => {
    const [expandedFeatureIndex, setExpandedFeatureIndex] = useState(null); 
    const handleMoreClick = (index) => {
     
        setExpandedFeatureIndex(expandedFeatureIndex === index ? null : index);
    };

    return (
        <Element name='features'>
            <h3 className={`${style.heading}`}>Features</h3>
            <p className={`${style.title}`}>Why Choose Our Task Management System?</p>

            <div className={`${style.superContainer}`}>
                <div className={`${style.container}`}>
                    {features.map((feature, index) => (
                        <div key={index} className={`${style.featureBox}`}>
                            <div className={`${style.iconBox}`}>
                               {feature.icon}
                            </div>
                            <div className={`${style.content}`}>
                                <p className={`${style.featureTitle}`}>{feature.title}</p>
                                <p className={`${style.featureSubtitle}`}>
                                    {expandedFeatureIndex === index
                                        ? feature.description
                                        : `${feature.description.slice(0, 50)}...`}

                                    <button
                                        onClick={() => handleMoreClick(index)}
                                        className={style.moreButton}
                                    >
                                        {expandedFeatureIndex === index ? 'Show Less' : 'More'}
                                    </button>
                                </p>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Element>
    );
}

export default Features;