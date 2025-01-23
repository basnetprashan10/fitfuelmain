import React from 'react';
import './Muscles.css';

import romanianDeadlift from './ExerciseImages/RomanianDeadlift.gif';
import barbellHipThrust from './ExerciseImages/BarbellHipThrust.gif';
import bulgarianSplitSquat from './ExerciseImages/BulgarianSplitSquat.gif';
import goodMorning from './ExerciseImages/GoodMorning.gif';
import smithMachineSquat from './ExerciseImages/SmithMachineSquat.gif';
import barbellSquat from './ExerciseImages/BarbellSquat.gif';
import deadlift from './ExerciseImages/Deadlift.gif';
import sumoSquat from './ExerciseImages/SumoSquat.gif';

import logo from '../Logo.png';

const GlutesExercises = () => {
  const exercises = [
    { name: 'Romanian Deadlift', img: romanianDeadlift },
    { name: 'Barbell Hip Thrust', img: barbellHipThrust },
    { name: 'Bulgarian Split Squat', img: bulgarianSplitSquat },
    { name: 'Good Morning', img: goodMorning },
    { name: 'Smith Machine Squat', img: smithMachineSquat },
    { name: 'Barbell Squat', img: barbellSquat },
    { name: 'Deadlift', img: deadlift },
    { name: 'Sumo Squat', img: sumoSquat },
  ];

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Glutes Exercises</h1>
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

export default GlutesExercises;
