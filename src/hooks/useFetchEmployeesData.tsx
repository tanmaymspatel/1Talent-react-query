import { useInfiniteQuery } from "@tanstack/react-query";
import employeeServices from "../shared/services/employeeServices";

function useFetchEmployeesData(debounced: string, requestPayload: any) {
    const { fetchEmployees1 } = employeeServices;
    return useInfiniteQuery(["employees", debounced, requestPayload], ({ pageParam = 1 }) => fetchEmployees1(pageParam, debounced, requestPayload), {
        staleTime: 60000,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 30 ? allPages.length + 1 : undefined
        }
    });


}

export default useFetchEmployeesData
