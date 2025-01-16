import React from 'react';
import './Muscles.css';

import legPressCalfRaise from './ExerciseImages/LegPressCalfRaise.gif';
import seatedCalfRaise from './ExerciseImages/SeatedCalfRaise.gif';
import singleLegCalfRaise from './ExerciseImages/SingleLegCalfRaise.gif';
import donkeyCalfRaise from './ExerciseImages/DonkeyCalfRaise.gif';
import barbellCalfRaise from './ExerciseImages/BarbellCalfRaise.gif';
import bodyweightCalfRaise from './ExerciseImages/BodyweightCalfRaise.gif';
import dumbellCalfRaise from './ExerciseImages/DumbellCalfRaise.gif';
import hackSquatCalfRaise from './ExerciseImages/HackSquatCalfRaise.gif';

import logo from '../Logo.png';

const CalvesExercises = () => {
  const exercises = [
    { name: 'Leg Press Calf Raise', img: legPressCalfRaise },
    { name: 'Seated Calf Raise', img: seatedCalfRaise },
    { name: 'Single Leg Calf Raise', img: singleLegCalfRaise },
    { name: 'Donkey Calf Raise', img: donkeyCalfRaise },
    { name: 'Barbell Calf Raise', img: barbellCalfRaise },
    { name: 'Bodyweight Calf Raise', img: bodyweightCalfRaise },
    { name: 'Dumbell Calf Raise', img: dumbellCalfRaise },
    { name: 'Hack Squat Calf Raise', img: hackSquatCalfRaise },
  ];

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Calves Exercises</h1>
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

export default CalvesExercises;
