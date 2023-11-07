import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import UsersRepository from "../../repositories/UsersRepository";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

function useLoginWithLinkedIn() {
  const { setAuth } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 
  const postLoginMutation = useMutation(UsersRepository.loginWithLinkedIn);
  const postLogin = async (email) => {
    try {
      const response = await postLoginMutation.mutateAsync(email);
      setAuth(response.user);
     
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
    isError : postLoginMutation.isError
  };
}

export {  useLoginWithLinkedIn };
