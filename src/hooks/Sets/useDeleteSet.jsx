import { useMutation, useQuery } from "react-query";
import SetsRepository from "../../repositories/SetsRepository";

function useDeleteSet(id){
    const mutation =  useMutation(["useDeleteSet"], (id) => SetsRepository.deleteSet(id));

    const deleteSet = (id) => {
        mutation.mutate(id);
        window.location.reload();
    };

    return{deleteSet, isLoading: mutation.isLoading}
}

export { useDeleteSet };