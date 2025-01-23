import React from 'react';
import './Muscles.css';

import legCurl from './ExerciseImages/LegCurl.gif';
import seatedLegCurl from './ExerciseImages/SeatedLegCurl.gif';
import romanianDeadlift from './ExerciseImages/RomanianDeadlift.gif';
import goodMorning from './ExerciseImages/GoodMorning.gif';
import bodyweightHamstringCurl from './ExerciseImages/BodyweightHamstringCurl.gif';
import deadlift from './ExerciseImages/Deadlift.gif';
import barbellSquat from './ExerciseImages/BarbellSquat.gif';
import smithMachineSquat from './ExerciseImages/SmithMachineSquat.gif';
import legPress from './ExerciseImages/LegPress.gif';
import sumoSquat from './ExerciseImages/SumoSquat.gif';
import hackSquat from './ExerciseImages/HackSquat.gif';
import bulgarianSplitSquat from './ExerciseImages/BulgarianSplitSquat.gif';

import logo from '../Logo.png';

const HamstringExercises = () => {
  const exercises = [
    { name: 'Leg Curl', img: legCurl },
    { name: 'Seated Leg Curl', img: seatedLegCurl },
    { name: 'Romanian Deadlift', img: romanianDeadlift },
    { name: 'Good Morning', img: goodMorning },
    { name: 'Bodyweight Hamstring Curl', img: bodyweightHamstringCurl },
    { name: 'Deadlift', img: deadlift },
    { name: 'Barbell Squat', img: barbellSquat },
    { name: 'Smith Machine Squat', img: smithMachineSquat },
    { name: 'Leg Press', img: legPress },
    { name: 'Sumo Squat', img: sumoSquat },
    { name: 'Hack Squat', img: hackSquat },
    { name: 'Bulgarian Split Squat', img: bulgarianSplitSquat },
  ];

  return (
    <div className="exercises-page">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Hamstring Exercises</h1>
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

export default HamstringExercises;
