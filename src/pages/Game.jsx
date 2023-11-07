import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGetGameById } from "../hooks/Games/useGetGameById";
import { AuthContext } from "../context/AuthContext";
import UsersList from "./UsersList";
import Loading from "./Loading";
import { ROLES } from "../config";
import { useNavigate } from "react-router-dom";
import { useGetGameByIdMutation } from "../hooks/Games/useGetGameByIdMutation";

export default function Game() {
  const { Auth } = useContext(AuthContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("id");
  const navigate = useNavigate();
  const { getGame, isError } = useGetGameByIdMutation();

  useEffect(() => {
    if(code){
    getGame(code);
    }
    else{
      navigate("/404");
    }
  }, [code]);

  useEffect(() => {
    if (isError) {
      navigate("/404");
    }
  }, [isError]);

  const { data } = useGetGameById(code);

  return Auth.rol.name === ROLES.User ? (
    <Loading pinGame={code} />
  ) : (
    <UsersList pinGame={code} data={data} />
  );
}
