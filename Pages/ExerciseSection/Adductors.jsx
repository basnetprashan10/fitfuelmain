import React from 'react';
import './Muscles.css';

import cableAdduction from './ExerciseImages/CableAdduction.gif';
import adductionMachine from './ExerciseImages/AdductionMachine.gif';
import sumoSquat from './ExerciseImages/SumoSquat.gif';
import sumoDeadlift from './ExerciseImages/SumoDeadlift.gif';
import lateralLunge from './ExerciseImages/LateralLunge.gif';
import adductorStretch from './ExerciseImages/AdductorStretch.gif';
import legPress from './ExerciseImages/LegPress.gif';
import barbellSquat from './ExerciseImages/BarbellSquat.gif';

import logo from '../Logo.png';

const AdductorExercises = () => {
  const exercises = [
    { name: 'Cable Adduction', img: cableAdduction },
    { name: 'Adduction Machine', img: adductionMachine },
    { name: 'Sumo Squat', img: sumoSquat },
    { name: 'Sumo Deadlift', img: sumoDeadlift },
    { name: 'Lateral Lunge', img: lateralLunge },
    { name: 'Adductor Stretch', img: adductorStretch },
    { name: 'Leg Press', img: legPress },
    { name: 'Barbell Squat', img: barbellSquat },
  ];

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Adductor Exercises</h1>
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

export default AdductorExercises;
