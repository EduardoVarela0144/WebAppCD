// useGetSetById.js
import { useQuery } from "react-query";
import SetsRepository from "../../repositories/SetsRepository";

function useGetSetById(id){
    const shouldFetch = id !== undefined && id !== null;

    return useQuery(
        ["useGetSetById", id],
        () => (shouldFetch ? SetsRepository.getSetById(id) : null),
        {
            enabled: shouldFetch,
        }
    );
}

export { useGetSetById };

