import { useQuery } from "@tanstack/react-query"
import employeeServices from "../shared/services/employeeServices"
/**
 * @description To get the domain and sub-domain fields
 */
function useFetchDomains() {
    const { getDomains } = employeeServices;

    return useQuery(['domains'], getDomains, {
        staleTime: 60000
    })
}

export default useFetchDomains;

