import React from 'react';
import './Muscles.css';

import dumbellShrug from './ExerciseImages/DumbellShrug.gif';
import barbellShrug from './ExerciseImages/BarbellShrug.gif';
import dumbellLateralRaise from './ExerciseImages/DumbellLateralRaise.gif';
import cableLateralRaise from './ExerciseImages/CableLateralRaise.gif';
import rearDeltMachineFly from './ExerciseImages/RearDeltMachineFly.gif';
import ezBarUprightRow from './ExerciseImages/EZBarUprightRow.gif';
import facePullDown from './ExerciseImages/FacePullDown.gif';
import bentOverLateralRaise from './ExerciseImages/BentOverLateralRaise.gif';

import logo from '../Logo.png';

const TrapsExercises = () => {
  const exercises = [
    { name: 'Dumbell Shrug', img: dumbellShrug },
    { name: 'Barbell Shrug', img: barbellShrug },
    { name: 'Dumbell Lateral Raise', img: dumbellLateralRaise },
    { name: 'Cable Lateral Raise', img: cableLateralRaise },
    { name: 'Rear Delt Machine Fly', img: rearDeltMachineFly },
    { name: 'EZ Bar Upright Row', img: ezBarUprightRow },
    { name: 'Face Pulldown', img: facePullDown },
    { name: 'Bent Over Lateral Raise', img: bentOverLateralRaise },
  ];

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Traps Exercises</h1>
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

export default TrapsExercises;
