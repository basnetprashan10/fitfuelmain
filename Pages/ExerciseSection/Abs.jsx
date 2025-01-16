import React from 'react';
import './Muscles.css';

import legRaise from './ExerciseImages/LegRaise.gif';
import assistedLegRaise from './ExerciseImages/AssistedLegRaise.gif';
import plank from './ExerciseImages/Plank.gif';
import kneelingCableCrunch from './ExerciseImages/KneelingCableCrunch.gif';
import machineAbsCrunch from './ExerciseImages/MachineAbsCrunch.gif';
import lyingLegRaise from './ExerciseImages/LyingLegRaise.gif';
import situp from './ExerciseImages/Situp.gif';
import heelTouch from './ExerciseImages/HeelTouch.gif';
import crunches from './ExerciseImages/Crunches.gif';
import alternatingRaises from './ExerciseImages/AlternatingRaises.gif';
import legPullin from './ExerciseImages/LegPullin.gif';
import dragonFlag from './ExerciseImages/DragonFlag.gif';

import logo from '../Logo.png';

const AbsExercises = () => {
  const exercises = [
    { name: 'Leg Raise', img: legRaise },
    { name: 'Assisted Leg Raise', img: assistedLegRaise },
    { name: 'Plank', img: plank },
    { name: 'Kneeling Cable Crunch', img: kneelingCableCrunch },
    { name: 'Machine Abs Crunch', img: machineAbsCrunch },
    { name: 'Lying Leg Raise', img: lyingLegRaise },
    { name: 'Sit-up', img: situp },
    { name: 'Heel Touch', img: heelTouch },
    { name: 'Crunches', img: crunches },
    { name: 'Alternating Raises', img: alternatingRaises },
    { name: 'Leg Pull-in', img: legPullin },
    { name: 'Dragon Flag', img: dragonFlag },
  ];

  return (
    <div className="exercises-page">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Abs Exercises</h1>
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

export default AbsExercises;
