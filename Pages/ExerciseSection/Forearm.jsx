import React from 'react';
import './Muscles.css';

import wristRoller from './ExerciseImages/WristRoller.gif';
import dumbellWristCurl from './ExerciseImages/DumbellWristCurl.gif';
import barbellReverseCurl from './ExerciseImages/BarbellReverseCurl.gif';
import handGripper from './ExerciseImages/HandGripper.gif';
import dumbellReverseCurl from './ExerciseImages/DumbellReverseCurl.gif';
import peacherHammerCurl from './ExerciseImages/PeacherHammerCurl.gif';
import barbellBackWristCurl from './ExerciseImages/BarbellBackWristCurl.gif';
import barbellWristCurl from './ExerciseImages/BarbellWristCurl.gif';

import logo from '../Logo.png';

const ForearmExercises = () => {
  const exercises = [
    { name: 'Wrist Roller', img: wristRoller },
    { name: 'Dumbell Wrist Curl', img: dumbellWristCurl },
    { name: 'Barbell Reverse Curl', img: barbellReverseCurl },
    { name: 'Hand Gripper', img: handGripper },
    { name: 'Dumbell Reverse Curl', img: dumbellReverseCurl },
    { name: 'Peacher Hammer Curl', img: peacherHammerCurl },
    { name: 'Barbell Back Wrist Curl', img: barbellBackWristCurl },
    { name: 'Barbell Wrist Curl', img: barbellWristCurl },
  ];

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Forearm Exercises</h1>
      </header>
      <div className="exercises-page">
        <div className="categories-container">
          {exercises.map((exercise, index) => (
            <div className="category-box" key={index}>
              <img src={exercise.img} alt={exercise.name} className="category-image" />
              <p className="category-name">{exercise.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ForearmExercises;
