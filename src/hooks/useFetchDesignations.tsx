import { useQuery } from "@tanstack/react-query";
import employeeServices from "../shared/services/employeeServices";

function useFetchDesignations() {
    const { getDesignations } = employeeServices
    return useQuery(['designations'], getDesignations, {
        staleTime: 60000
    })
}

export default useFetchDesignations;
