import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PinGame from "../pages/PinGame";
import DayNotes from "../pages/DayNotes";
import Register from "../pages/Register";
import StudyGuide from "../pages/StudyGuide";
import Loading from "../pages/Loading";
import GameOver from "../pages/GameOver";
import CustomDeck from "../pages/Dashboard/Requests/CustomDeck";
import ShowCustomDeck from "../pages/ShowCustomDeck";
import SelectDeck from "../pages/SelectDeck";
import Scores from "../pages/Scores";
import AddUsers from "../pages/AddUsers";
import MySessions from "../pages/MySessions";
import Game from "../pages/Game";
import Dashboard from "../pages/Dashboard/Dashboard";
import Users from "../pages/Dashboard/Users/Users";
import Questions from "../pages/Dashboard/Questions/Questions";
import Requests from "../pages/Dashboard/Requests/Requests";
import RequestDetails from "../pages/Dashboard/Requests/RequestDetails";
import InvitePlayers from "../pages/InvitePlayers";
import GameStartOwner from "../pages/GameStartOwner";
import GameResultsOwner from "../pages/GameResultsOwner";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/NotFound";
import NotPermissions from "../pages/NotPermissions";
import GameQuestions from "../pages/GameQuestions";
import GameNotStart from "../pages/GameNotStart";

export default function PageRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<PrivateRoute Component={Login} />} />
          <Route path="/Register" element={<PrivateRoute Component={Register}  />} />
          <Route path="/PinGame" element={<PrivateRoute Component={PinGame} />} />
          <Route path="/DayNotes" element={<PrivateRoute Component={DayNotes} />} />
          <Route path="/StudyGuide" element={<PrivateRoute Component={StudyGuide} />} />
          <Route path="/Loading" element={<PrivateRoute Component={Loading} />} />
          <Route path="/GameOver" element={<PrivateRoute Component={GameOver} />} />
          <Route path="/CustomDeck" element={<PrivateRoute Component={CustomDeck} />} />
          <Route path="/SelectDeck" element={<PrivateRoute Component={SelectDeck} />} />
          <Route path="/Scores" element={<PrivateRoute Component={Scores} />} />
          <Route path="/ShowCustomDeck" element={<PrivateRoute Component={ShowCustomDeck} />} />
          <Route path="/AddUsers" element={<PrivateRoute Component={AddUsers} />} />
          <Route path="/MySessions" element={<PrivateRoute Component={MySessions} />} />
          <Route path="/Game" element={<PrivateRoute Component={Game} />} />
          <Route path="/Dashboard" element={<PrivateRoute Component={Dashboard} />} />
          <Route path="/Dashboard/Users" element={<PrivateRoute Component={Users} />} />
          <Route path="/Dashboard/Questions" element={<PrivateRoute Component={Questions} />} />
          <Route path="/Dashboard/Requests" element={<PrivateRoute Component={Requests} />} />
          <Route path="/GameNotStart" element={<PrivateRoute Component={GameNotStart} />} />
          <Route path="/GameQuestions" element={<PrivateRoute Component={GameQuestions} />} />
          <Route path="/Dashboard/Requests/:id" element={<PrivateRoute Component={RequestDetails}/> } />
          <Route path="/InvitePlayers" element={<PrivateRoute Component={InvitePlayers} /> } />
          <Route path="/GameOwner" element={<GameStartOwner />} />
          <Route path="/GameResultsOwner" element={<GameResultsOwner />} />
          <Route path="/404" element={<NotFound/>} />
          <Route path="*" element={<Navigate replace to="/404" />} />
          <Route path="/403" element={<NotPermissions/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}
