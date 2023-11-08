import { useMutation } from "react-query";
import UsersRepository from "../../repositories/UsersRepository";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function useAddUser() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const addUserMutation = useMutation(UsersRepository.postUser);
  const postUser = async (user) => {
    try {
      const response = await addUserMutation.mutateAsync(user);
      console.log("Response: ", response.user);
      setAuth(response.user);
      navigate("/PinGame");
    } catch (error) {
      alert('El usuario ya existe');
      console.log("Error", error);
    }
  };

  return {
    postUser,
    isLoading: addUserMutation.isLoading,
    isError: addUserMutation.isError,
  };
}

export { useAddUser };
