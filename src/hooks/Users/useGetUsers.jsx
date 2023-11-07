import { useQuery } from "react-query";
import UsersRepository from "../../repositories/UsersRepository";

function useGetUsers(page,search) {
  return useQuery(["useGetUsers"], () => UsersRepository.getUsers(page,search));
}
export { useGetUsers };
