import { useQuery } from "@tanstack/react-query";
import employeeServices from "../shared/services/employeeServices"
/**
 * @description To get all the gender data
 */
function useFetchGenders() {
    const { getGenders } = employeeServices;
    return useQuery(['genders'], getGenders, {
        staleTime: 60000
    })
}

export default useFetchGenders;
