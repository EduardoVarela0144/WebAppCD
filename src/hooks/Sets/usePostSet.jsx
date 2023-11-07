import { useMutation, useQuery } from "react-query";
import SetsRepository from "../../repositories/SetsRepository";

function usePostSet(){

    const postSetMutation = useMutation(SetsRepository.postSet);
    const postSet = async (set) => {
        try{
            await postSetMutation.mutateAsync(set);
        }catch(error){
            console.log("Error", error);
        }
    }
    return {postSet, isLoading: postSetMutation.isLoading, isError: postSetMutation.isError};
}

export { usePostSet}