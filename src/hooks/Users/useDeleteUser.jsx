import { useMutation } from "react-query";
import UsersRepository from "../../repositories/UsersRepository";

function useDeleteUser() {
  const mutation = useMutation(["useDeleteUser"],(id) => UsersRepository.deleteUser(id));

  const deleteUser = (id) => {
    mutation.mutate(id);
  };

  return { deleteUser, isLoading: mutation.isLoading };
}

export { useDeleteUser };
  