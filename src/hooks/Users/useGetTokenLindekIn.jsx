import { useState } from "react";
import UsersRepository from "../../repositories/UsersRepository";
import { useMutation } from "react-query";

function useGetToken() {

  const [ user, setUser ] = useState();

  const tokenMutation = useMutation(UsersRepository.getToken);
  const token = async (params) => {
    try {
      const response = await tokenMutation.mutateAsync(params);
      setUser(response);    
    } catch (error) {
      return false;
    }
  };

  return {
    token,
    isLoading: tokenMutation.isLoading,
    isError : tokenMutation.isError,
    user: user
  };
}

export {  useGetToken };
