import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import UsersRepository from "../../repositories/UsersRepository";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config";

function useLogin() {
  const { setAuth } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const postLoginMutation = useMutation(UsersRepository.login);
  const postLogin = async (user) => {
    try {
      const response = await postLoginMutation.mutateAsync(user);
      setAuth(response);
      if (response.rol.name !== ROLES.Admin) {
        navigate("/PinGame");
      } else if (response.rol.name === ROLES.Admin) {
        navigate("/DashBoard");
      }
    } catch (error) {
      console.log(error?.response.data?.message)
      setError(error?.response.data?.message);
      return false;
    }
  };

  return {
    postLogin,
    error,
    isLoading: postLoginMutation.isLoading,
  };
}

export { useLogin };
