import React from 'react';
import './Muscles.css';

import dumbellCurl from './ExerciseImages/DumbellCurl.gif';
import barbellCurl from './ExerciseImages/BarbellCurl.gif';
import concentrationCurl from './ExerciseImages/ConcentrationCurl.gif';
import ezBarPeacherCurl from './ExerciseImages/EZBarPeacherCurl.gif';
import dumbellPeacherCurl from './ExerciseImages/DumbellPeacherCurl.gif';
import hammerCurl from './ExerciseImages/HammerCurl.gif';
import inclineDumbellCurl from './ExerciseImages/InclineDumbellCurl.gif';
import stretchedCableCurl from './ExerciseImages/StretchedCableCurl.gif';
import overheadCableCurl from './ExerciseImages/OverheadCableCurl.gif';
import ropeHammerCurl from './ExerciseImages/RopeHammerCurl.gif';
import chinUp from './ExerciseImages/ChinUp.gif';
import spiderCurl from './ExerciseImages/SpiderCurl.gif';

import logo from '../Logo.png';

const BicepsExercises = () => {
  const exercises = [
    { name: 'Dumbell Curl', img: dumbellCurl },
    { name: 'Barbell Curl', img: barbellCurl },
    { name: 'Concentration Curl', img: concentrationCurl },
    { name: 'EZ Bar Peacher Curl', img: ezBarPeacherCurl },
    { name: 'Dumbell Peacher Curl', img: dumbellPeacherCurl },
    { name: 'Hammer Curl', img: hammerCurl },
    { name: 'Incline Dumbell Curl', img: inclineDumbellCurl },
    { name: 'Stretched Cable Curl', img: stretchedCableCurl },
    { name: 'Overhead Cable Curl', img: overheadCableCurl },
    { name: 'Rope Hammer Curl', img: ropeHammerCurl },
    { name: 'Chin Up', img: chinUp },
    { name: 'Spider Curl', img: spiderCurl },
  ];

  return (
    <div className="exercises-page">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Biceps Exercises</h1>
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

export default BicepsExercises;
