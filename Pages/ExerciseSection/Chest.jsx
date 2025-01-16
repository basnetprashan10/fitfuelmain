import React from 'react';
import './Muscles.css';

import benchPress from './ExerciseImages/BenchPress.gif';
import inclineBenchPress from './ExerciseImages/InclineBenchPress.gif';
import cableFly from './ExerciseImages/CableFly.gif';
import inclineSmithPress from './ExerciseImages/InclineSmithPress.gif';
import pushUps from './ExerciseImages/PushUps.gif';
import dips from './ExerciseImages/Dips.gif';
import dumbellFly from './ExerciseImages/DumbellFly.gif';
import flatDumbellPress from './ExerciseImages/FlatDumbellPress.gif';
import inclineDumbellPress from './ExerciseImages/InclineDumbellPress.gif';
import pecDeck from './ExerciseImages/PecDeck.gif';
import machinePress from './ExerciseImages/MachinePress.gif';
import kneelingPushUps from './ExerciseImages/KneelingPushUps.gif';


import logo from '../Logo.png';

const ChestExercises = () => {
  const exercises = [
    { name: 'Bench Press', img: benchPress },
    { name: 'Incline Bench Press', img: inclineBenchPress },
    { name: 'Cable Fly', img: cableFly },
    { name: 'Incline Smith Press', img: inclineSmithPress },
    { name: 'Push-Up', img: pushUps },
    { name: 'Dips', img: dips },
    { name: 'Dumbell Fly', img: dumbellFly },
    { name: 'Flat Dumbell Press', img: flatDumbellPress },
    { name: 'Incline Dumbell Press', img: inclineDumbellPress },
    { name: 'Pec Deck', img: pecDeck },
    { name: 'Machine Press', img: machinePress },
    { name: 'Kneeling Push Ups', img: kneelingPushUps },
  ];

  return (
    <div className="exercises-page">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Chest Exercises</h1>
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

export default ChestExercises;
