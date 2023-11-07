// useGetSetById.js
import { useQuery } from "react-query";
import SetsRepository from "../../repositories/SetsRepository";

function useGetSetByIdRequest(id){
    const shouldFetch = id !== undefined && id !== null;

    return useQuery(
        ["useGetSetByIdRequest", id],
        () => (shouldFetch ? SetsRepository.getSetById(id) : null),
        {
            enabled: shouldFetch,
        }
    );
}

export { useGetSetByIdRequest };

