import React from 'react';
import './Muscles.css';

import barbellShoulderPress from './ExerciseImages/BarbellShoulderPress.gif';
import dumbellShoulderPress from './ExerciseImages/DumbellShoulderPress.gif';
import dumbellLateralRaise from './ExerciseImages/DumbellLateralRaise.gif';
import cableLateralRaise from './ExerciseImages/CableLateralRaise.gif';
import smithShoulderPress from './ExerciseImages/SmithShoulderPress.gif';
import machineShoulderPress from './ExerciseImages/MachineShoulderPress.gif';
import cableFrontRaise from './ExerciseImages/CableFrontRaise.gif';
import facePullDown from './ExerciseImages/FacePullDown.gif';
import rearDeltMachineFly from './ExerciseImages/RearDeltMachineFly.gif';
import bentOverLateralRaise from './ExerciseImages/BentOverLateralRaise.gif';
import ezBarUprightRow from './ExerciseImages/EZBarUprightRow.gif';
import crossCableRearDelt from './ExerciseImages/CrossCableRearDelt.gif';

import logo from '../Logo.png';

const ShoulderExercises = () => {
  const exercises = [
    { name: 'Barbell Shoulder Press', img: barbellShoulderPress },
    { name: 'Dumbell Shoulder Press', img: dumbellShoulderPress },
    { name: 'Dumbell Lateral Raise', img: dumbellLateralRaise },
    { name: 'Cable Lateral Raise', img: cableLateralRaise },
    { name: 'Smith Shoulder Press', img: smithShoulderPress },
    { name: 'Machine Shoulder Press', img: machineShoulderPress },
    { name: 'Cable Front Raise', img: cableFrontRaise },
    { name: 'Face PullDown', img: facePullDown },
    { name: 'Rear Delt Machine Fly', img: rearDeltMachineFly },
    { name: 'Bent Over Lateral Raise', img: bentOverLateralRaise },
    { name: 'EZ Bar Upright Row', img: ezBarUprightRow },
    { name: 'Cross Cable Rear Delt', img: crossCableRearDelt },
  ];

  return (
    <div className="exercises-page">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Shoulder Exercises</h1>
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

export default ShoulderExercises;
