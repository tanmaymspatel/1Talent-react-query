import { useQuery } from "@tanstack/react-query";
import employeeServices from "../shared/services/employeeServices";
/**
 * @description To get the designation fields 
 */
function useFetchDesignations() {
    const { getDesignations } = employeeServices;

    return useQuery(['designations'], getDesignations, {
        staleTime: 60000
    });
}

export default useFetchDesignations;
