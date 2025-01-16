import React from 'react';
import './ExerciseDashboard.css';

import chest from './chest.png';
import back from './back.png';
import shoulders from './shoulders.png';
import biceps from './biceps.png';
import triceps from './triceps.png';
import quads from './quads.png';
import adductors from './adductors.png';
import abs from './abs.png';
import hamstring from './hamstring.png';
import glutes from './glutes.png';
import calves from './calves.png';
import forearm from './forearm.png';
import traps from './traps.jpg';
import cardio from './cardio.png';
import mobility from './mobility.jpg';

import logo from '../Logo.png';

const Exercises = () => {
  const categories = [
    { name: 'Chest', img: chest, route: '/chest' },
    { name: 'Back', img: back, route: '/back' },
    { name: 'Shoulders', img: shoulders, route: '/shoulders' },
    { name: 'Biceps', img: biceps, route: '/biceps' },
    { name: 'Triceps', img: triceps, route: '/triceps' },
    { name: 'Quads', img: quads, route: '/quads' },
    { name: 'Adductors', img: adductors, route: '/adductors' },
    { name: 'Abs', img: abs, route: '/abs' },
    { name: 'Hamstring', img: hamstring, route: '/hamstring' },
    { name: 'Glutes', img: glutes, route: '/glutes' },
    { name: 'Calves', img: calves, route: '/calves' },
    { name: 'Forearm', img: forearm, route: '/forearm' },
    { name: 'Traps', img: traps, route: '/traps' },
    { name: 'Cardio', img: cardio, route: '/cardio' },
    { name: 'Mobility', img: mobility, route: '/mobility' },
  ];

  const handleBoxClick = (route) => {
    window.location.href = route;
  };

  return (
    <div className="exercise-dashboard-body">
      <header className="exercise-dashboard-header">
        <div className="exercise-dashboard-logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h1 className="exercise-dashboard-heading">Exercises by Categories</h1>
      </header>
      <div className="exercise-dashboard-categories-container">
        {categories.map((category, index) => (
          <div
            className="exercise-dashboard-category-box"
            key={index}
            onClick={() => handleBoxClick(category.route)}
          >
            <img src={category.img} alt={category.name} className="exercise-dashboard-category-image" />
            <p className="exercise-dashboard-category-name">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
