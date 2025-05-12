import { useState } from "react";

const useApiCall = (initialLoading = false) => {
    const [ loading, setLoading ] = useState(initialLoading);
    const [ error, setError ] = useState<string | null>(null)

    const callApi = async (apiFunction: () => Promise<void>) => {
        setLoading(true);
        setError(null);
        try{
            await apiFunction()
        } catch(err){
            setError((err as Error).message || 'Something went wrong');
            throw err;
        } finally{
            setLoading(false)
        }
    };
    return { callApi, loading, error };
};

export default useApiCall;