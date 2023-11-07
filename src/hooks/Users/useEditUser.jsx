import { useMutation } from "react-query";
import UsersRepository from "../../repositories/UsersRepository";

function useEditUser() {
  const putUserMutation = useMutation(UsersRepository.putUserById);

  const editUser = async (user) => {
    try {
      await putUserMutation.mutateAsync(user);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return { editUser, isLoading: putUserMutation.isLoading };
}

export { useEditUser };
