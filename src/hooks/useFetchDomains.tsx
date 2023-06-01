import { useQuery } from "@tanstack/react-query"
import employeeServices from "../shared/services/employeeServices"

function useFetchDomains() {
    const { getDomains } = employeeServices;
    return useQuery(['domains'], getDomains, {
        staleTime: 60000
    })
}

export default useFetchDomains;

