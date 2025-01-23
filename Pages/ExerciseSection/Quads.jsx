import React from 'react';
import './Muscles.css';

import smithMachineSquat from './ExerciseImages/SmithMachineSquat.gif';
import barbellSquat from './ExerciseImages/BarbellSquat.gif';
import legPress from './ExerciseImages/LegPress.gif';
import legExtension from './ExerciseImages/LegExtension.gif';
import deadlift from './ExerciseImages/Deadlift.gif';
import sumoSquat from './ExerciseImages/SumoSquat.gif';
import bulgarianSplitSquat from './ExerciseImages/BulgarianSplitSquat.gif';
import hackSquat from './ExerciseImages/HackSquat.gif';
import bodyweightSquat from './ExerciseImages/BodyweightSquat.gif';
import beltSquat from './ExerciseImages/BeltSquat.gif';
import bodyweightSissySquat from './ExerciseImages/BodyweightSissySquat.gif';
import lunges from './ExerciseImages/Lunges.gif';

import logo from '../Logo.png';

const QuadsExercises = () => {
  const exercises = [
    { name: 'Smith Machine Squat', img: smithMachineSquat },
    { name: 'Barbell Squat', img: barbellSquat },
    { name: 'Leg Press', img: legPress },
    { name: 'Leg Extension', img: legExtension },
    { name: 'Deadlift', img: deadlift },
    { name: 'Sumo Squat', img: sumoSquat },
    { name: 'Bulgarian Split Squat', img: bulgarianSplitSquat },
    { name: 'Hack Squat', img: hackSquat },
    { name: 'Bodyweight Squat', img: bodyweightSquat },
    { name: 'Belt Squat', img: beltSquat },
    { name: 'Bodyweight Sissy Squat', img: bodyweightSissySquat },
    { name: 'Lunges', img: lunges },
  ];

  return (
    <div className="exercises-page">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Quads Exercises</h1>
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

export default QuadsExercises;
