import React from 'react';
import './Muscles.css';

import cycling from './ExerciseImages/Cycling.gif';
import walking from './ExerciseImages/Walking.gif';
import running from './ExerciseImages/Running.gif';
import jumpRope from './ExerciseImages/JumpRope.gif';
import inclineTreadmill from './ExerciseImages/InclineTreadmill.gif';
import stairClimberMachine from './ExerciseImages/StairClimberMachine.gif';
import jumpingJack from './ExerciseImages/JumpingJack.gif';
import battleRope from './ExerciseImages/BattleRope.gif';

import logo from '../Logo.png';

const CardioExercises = () => {
  const exercises = [
    { name: 'Cycling', img: cycling },
    { name: 'Walking', img: walking },
    { name: 'Running', img: running },
    { name: 'Jump Rope', img: jumpRope },
    { name: 'Incline Treadmill', img: inclineTreadmill },
    { name: 'Stair Climber Machine', img: stairClimberMachine },
    { name: 'Jumping Jack', img: jumpingJack },
    { name: 'Battle Rope', img: battleRope },
  ];

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Cardio Exercises</h1>
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

export default CardioExercises;
