import React from 'react';
import './Muscles.css';

import jmPress from './ExerciseImages/JMPress.gif';
import tricepsPushdown from './ExerciseImages/TricepsPushdown.gif';
import dips from './ExerciseImages/Dips.gif';
import ropeTricepsExtension from './ExerciseImages/RopeTricepsExtension.gif';
import diamondPushup from './ExerciseImages/DiamondPushup.gif';
import dumbellTricepExtension from './ExerciseImages/DumbellTricepExtension.gif';
import benchDips from './ExerciseImages/BenchDips.gif';
import ropePushdown from './ExerciseImages/RopePushdown.gif';
import closeGripBenchPress from './ExerciseImages/CloseGripBenchPress.gif';
import skullCrusher from './ExerciseImages/SkullCrusher.gif';
import oneArmCablePushdown from './ExerciseImages/OneArmCablePushdown.gif';
import bodyweightSkullCrusher from './ExerciseImages/BodyweightSkullCrusher.gif';

import logo from '../Logo.png';

const TricepsExercises = () => {
  const exercises = [
    { name: 'JM Press', img: jmPress },
    { name: 'Triceps Pushdown', img: tricepsPushdown },
    { name: 'Dips', img: dips },
    { name: 'Rope Triceps Extension', img: ropeTricepsExtension },
    { name: 'Diamond Pushup', img: diamondPushup },
    { name: 'Dumbell Tricep Extension', img: dumbellTricepExtension },
    { name: 'Bench Dips', img: benchDips },
    { name: 'Rope Pushdown', img: ropePushdown },
    { name: 'Close Grip Bench Press', img: closeGripBenchPress },
    { name: 'Skull Crusher', img: skullCrusher },
    { name: 'One Arm Cable Pushdown', img: oneArmCablePushdown },
    { name: 'Bodyweight Skull Crusher', img: bodyweightSkullCrusher },
  ];

  return (
    <div className="exercises-page">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Triceps Exercises</h1>
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

export default TricepsExercises;
