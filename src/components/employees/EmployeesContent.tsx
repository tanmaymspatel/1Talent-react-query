import { useInfiniteQuery } from "@tanstack/react-query";
import employeeServices from "../../shared/services/employeeServices";
import EmployeesCard from "./EmployeesCard";
import EmployeesTable from "./EmployeesTable";

function EmployeesContent({ isGridView }: any) {

    const searchText = "";
    const { fetchEmployees1 } = employeeServices;
    const { data: employeesData, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(["employees"], ({ pageParam = 1 }) => fetchEmployees1(pageParam, searchText), {
        staleTime: 60000,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 30 ? allPages.length + 1 : undefined
        }
    });

    if (isLoading) return <h2>Loading...</h2>

    const dataProps = {
        employeesData,
        hasNextPage,
        fetchNextPage
    }

    return (
        <>
            {
                isGridView
                    ? <EmployeesCard dataProps={dataProps} />
                    : <EmployeesTable dataProps={dataProps} />
            }
        </>
    )
};

export default EmployeesContent;
