import { useInfiniteQuery } from "@tanstack/react-query";
import employeeServices from "../shared/services/employeeServices";
/**
 * @description To get the employees data
 * @param debounced the search text value for the params
 * @param requestPayload request body payload for the post call
 * @returns 
 */
function useFetchEmployeesData(debounced: string, requestPayload: any) {
    const { fetchEmployees } = employeeServices;

    return useInfiniteQuery(["employees", debounced, requestPayload], ({ pageParam = 1 }) => fetchEmployees(pageParam, debounced, requestPayload), {
        staleTime: 60000,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 30 ? allPages.length + 1 : undefined
        }
    });
}

export default useFetchEmployeesData;
