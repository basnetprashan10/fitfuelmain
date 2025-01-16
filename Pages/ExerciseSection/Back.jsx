import React from 'react';
import './Muscles.css';

import latPulldown from './ExerciseImages/LatPulldown.gif';
import pullUp from './ExerciseImages/PullUp.gif';
import machineRow from './ExerciseImages/MachineRow.gif';
import barbellRow from './ExerciseImages/BarbellRow.gif';
import cableRow from './ExerciseImages/CableRow.gif';
import oneArmLatPulldown from './ExerciseImages/OneArmLatPulldown.gif';
import latExtension from './ExerciseImages/LatExtension.gif';
import facePullDown from './ExerciseImages/FacePullDown.gif';
import dumbellRow from './ExerciseImages/DumbellRow.gif';
import muscleUp from './ExerciseImages/MuscleUp.gif';
import deadlift from './ExerciseImages/Deadlift.gif';
import closeGripChinup from './ExerciseImages/CloseGripChinup.gif';

import logo from '../Logo.png';

const BackExercises = () => {
  const exercises = [
    { name: 'Lat Pulldown', img: latPulldown },
    { name: 'Pull Up', img: pullUp },
    { name: 'Machine Row', img: machineRow },
    { name: 'Barbell Row', img: barbellRow },
    { name: 'Cable Row', img: cableRow },
    { name: 'One Arm Lat Pulldown', img: oneArmLatPulldown },
    { name: 'Lat Extension', img: latExtension },
    { name: 'Face Pull Down', img: facePullDown },
    { name: 'Dumbell Row', img: dumbellRow },
    { name: 'Muscle Up', img: muscleUp },
    { name: 'Deadlift', img: deadlift },
    { name: 'Close Grip Chinup', img: closeGripChinup },
  ];

  return (
    <div className="exercises-page">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Back Exercises</h1>
      </header>
      <div className="categories-container">
        {exercises.map((exercise, index) => (
          <div className="category-box" key={index}>
            <img src={exercise.img} alt={exercise.name} className="category-image" />
            <p className="category-name">{exercise.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackExercises;
