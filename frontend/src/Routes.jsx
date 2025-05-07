import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./Pages/homepage/homepage";
import UserLogin from "./Pages/userauthentication/UserLogin";
import UserSignup from "./Pages/userauthentication/UserSignup";
import UserProfile from "./Pages/userpage/UserProfile/UserProfile";
import ViewFoodLog from "./Pages/userpage/foodLog/ViewFoodLog";

import AdminDashboard from "./Pages/adminpage/AdminDashboard";
import SellerDashboard from "./Pages/sellerpage/SellerDashboard";
import ManageUsers from "./Pages/adminpage/manageuser/manageuser";
import EditUser from "./Pages/adminpage/edituser/AddEditUser";
import ManageProducts from "./Pages/productpage/manageproduct/manageproduct";
import ManageExerciseCategories from "./Pages/ExerciseSection/manageExercise/manageCategory";
import ManageExercises from "./Pages/ExerciseSection/manageExercise/manageExercise";
import AddEditCategory from "./Pages/ExerciseSection/manageExercise/addeditExerciseCat/AddEditCategory";
import AddEditExercise from "./Pages/ExerciseSection/manageExercise/AddEditExercise/AddEditExercise";
import AddProduct from "./Pages/productpage/addproduct/AddProduct";
import EditProduct from "./Pages/productpage/editproduct/EditProduct";
import ViewCart from "./Pages/userpage/viewcart/viewcart";
import ManageOrders from "./Pages/productpage/ManageOrders/ManageOrders";
import HireRequest from "./Pages/userpage/hiretrainerRequest/HireRequest";

import UserDashboard from "./Pages/userpage/userdashboard/UserDashboard";
import ExerciseDashboard from "./Pages/ExerciseSection/ExercisesPage/ExerciseDashboard";

import BMRCalculator from "./Pages/userpage/bmrcalculator/BMRCalculator";
import BrowseProducts from "./Pages/userpage/browseproduct/browseproducts";
import TrainerProfile from "./Pages/userpage/hiretrainer/TrainerProfile";
import AimPage from "./Pages/userpage/aim/AimPage";
import KitchenPage from "./Pages/userpage/Kitchen/KitchenPage";

import ExerciseDetail from "./Pages/ExerciseSection/ExercisesPage/ExerciseDetail";

import NotFound from "./Pages/404/NotFound";

import Success from "./components/esewamessage/Success";
import Failure from "./components/esewamessage/Failure";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/UserSignup" element={<UserSignup />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/FoodsNutrition" element={<ViewFoodLog />} />

        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Manageusers" element={<ManageUsers />} />
        <Route path="/edituser/:username" element={<EditUser />} />
        <Route path="/viewcart" element={<ViewCart />} />
        <Route path="/manageorders" element={<ManageOrders />} />
        <Route path="/hirerequest" element={<HireRequest />} />

        <Route path="/sellerdashboard" element={<SellerDashboard />} />

        <Route path="/manageproducts" element={<ManageProducts />} />
        <Route
          path="/manageExerciseCategory"
          element={<ManageExerciseCategories />}
        />
        <Route path="/manageExercise" element={<ManageExercises />} />
        <Route
          path="/addeditexercisecategory/:id?"
          element={<AddEditCategory />}
        />
        <Route path="/addeditexercise/:id?" element={<AddEditExercise />} />

        <Route path="/addproducts" element={<AddProduct />} />
        <Route path="/editproduct/:name" element={<EditProduct />} />

        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/BMRCalculator" element={<BMRCalculator />} />
        <Route path="buy-essential" element={<BrowseProducts />} />
        <Route path="/hire-trainer" element={<TrainerProfile />} />
        <Route path="/aim" element={<AimPage />} />
        <Route path="/kitchen" element={<KitchenPage />} />
        <Route
          path="/ExerciseSection/ExerciseDashboard"
          element={<ExerciseDashboard />}
        />
        {/* Dynamic route for exercise categories */}
        <Route path="/exercises/:category" element={<ExerciseDetail />} />

        {/* Catch-all route for any invalid URLs */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
