import { useMutation, useQuery } from "react-query";
import SetsRepository from "../../repositories/SetsRepository";

function useGetSets() {
  return useQuery(["useGetSets"], () => SetsRepository.getSets());
}

export { useGetSets };
