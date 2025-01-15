import React from 'react';
import { Route, Routes } from 'react-router-dom';

import UserLogin from './Pages/UserLogin';
import UserSignup from './Pages/UserSignup';
import AdminDashboard from './Pages/AdminDashboard';
import UserDashboard from './Pages/UserDashboard';
import ExerciseDashboard from './Pages/ExerciseSection/ExerciseDashboard';

import Chest from './Pages/ExerciseSection/Chest';
import Back from './Pages/ExerciseSection/Back';
import Shoulders from './Pages/ExerciseSection/Shoulders';
import Biceps from './Pages/ExerciseSection/Biceps';
import Triceps from './Pages/ExerciseSection/Triceps';
import Quads from './Pages/ExerciseSection/Quads';
import Adductors from './Pages/ExerciseSection/Adductors';
import Abs from './Pages/ExerciseSection/Abs';
import Hamstring from './Pages/ExerciseSection/Hamstring';
import Glutes from './Pages/ExerciseSection/Glutes';
import Calves from './Pages/ExerciseSection/Calves';
import Forearm from './Pages/ExerciseSection/Forearm';
import Traps from './Pages/ExerciseSection/Traps';
import Cardio from './Pages/ExerciseSection/Cardio';
import Mobility from './Pages/ExerciseSection/Mobility';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/UserSignup" element={<UserSignup />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/ExerciseSection/ExerciseDashboard" element={<ExerciseDashboard />} />

        {/* Routes for all 12 exercise sections */}
        <Route path="/chest" element={<Chest />} />
        <Route path="/back" element={<Back />} />
        <Route path="/shoulders" element={<Shoulders />} />
        <Route path="/biceps" element={<Biceps />} />
        <Route path="/triceps" element={<Triceps />} />
        <Route path="/quads" element={<Quads />} />
        <Route path="/adductors" element={<Adductors />} />
        <Route path="/abs" element={<Abs />} />
        <Route path="/hamstring" element={<Hamstring />} />
        <Route path="/glutes" element={<Glutes />} />
        <Route path="/calves" element={<Calves />} />
        <Route path="/forearm" element={<Forearm />} />
        <Route path="/traps" element={<Traps />} />
        <Route path="/cardio" element={<Cardio />} />
        <Route path="/mobility" element={<Mobility />} />
      </Routes>
    </div>
  );
};

export default App;
