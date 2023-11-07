import { useMutation, useQuery } from "react-query";
import SetsRepository from "../../repositories/SetsRepository";

function useGetRequest() {
  return useQuery(["useGetRequest"], () => SetsRepository.getRequest());
}

export { useGetRequest };
