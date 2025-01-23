import React from 'react';
import './Muscles.css';

import ropeClimb from './ExerciseImages/RopeClimb.gif';
import pushUpToeTouch from './ExerciseImages/PushUpToeTouch.gif';
import dips from './ExerciseImages/Dips.gif';
import cossackSquat from './ExerciseImages/CossackSquat.gif';
import catCow from './ExerciseImages/CatCow.gif';
import kneelingSpineRotation from './ExerciseImages/KneelingSpineRotation.gif';
import pistolSquat from './ExerciseImages/PistolSquat.gif';
import shoulderRotation from './ExerciseImages/ShoulderRotation.gif';

import logo from '../Logo.png';

const MobilityExercises = () => {
  const exercises = [
    { name: 'Rope Climb', img: ropeClimb },
    { name: 'Push-Up Toe Touch', img: pushUpToeTouch },
    { name: 'Dips', img: dips },
    { name: 'Cossack Squat', img: cossackSquat },
    { name: 'Cat-Cow', img: catCow },
    { name: 'Kneeling Spine Rotation', img: kneelingSpineRotation },
    { name: 'Pistol Squat', img: pistolSquat },
    { name: 'Shoulder Rotation', img: shoulderRotation },
  ];

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Mobility Exercises</h1>
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

export default MobilityExercises;
