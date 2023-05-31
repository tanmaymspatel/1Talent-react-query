import { useInfiniteQuery } from "@tanstack/react-query";
import { initialPayLoad } from "../shared/data/data";
import employeeServices from "../shared/services/employeeServices";

function useFetchEmployeesData(searchText: string) {
    const { fetchEmployees1 } = employeeServices;
    return useInfiniteQuery(["employees"], ({ pageParam = 1 }) => fetchEmployees1(pageParam, searchText, initialPayLoad), {
        staleTime: 60000,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 30 ? allPages.length + 1 : undefined
        }
    });

}

export default useFetchEmployeesData
