import { useQuery } from "react-query";
import UsersRepository from "../../repositories/UsersRepository";
function useGetRolByName(rol) {
  return useQuery(["useGetRolByBame"], () => UsersRepository.getRoleByName(rol));
}
export { useGetRolByName };
