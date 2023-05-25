import { useInfiniteQuery } from "@tanstack/react-query";
import employeeServices from "../../shared/services/employeeServices";
import EmployeesCard from "./EmployeesCard";
import EmployeesTable from "./EmployeesTable";

function EmployeesContent({ isGridView }: any) {

    const { fetchEmployees2 } = employeeServices;
    const { data: employeesData, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(["employees"], ({ pageParam = 1 }) => fetchEmployees2(pageParam), {
        staleTime: 60000,
        getNextPageParam: (lastPage, allPages) => {
            console.log({ lastPage, allPages });
            return lastPage.legth === 30 ? allPages.length + 1 : undefined
        }
    });
    // const { data: employeesData, isLoading } = useQuery(["employees"], fetchEmployees1, {
    //     staleTime: 60000
    // });
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
