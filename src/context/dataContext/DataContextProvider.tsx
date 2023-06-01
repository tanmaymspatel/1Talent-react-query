import { useInfiniteQuery } from "@tanstack/react-query";
import { initialPayLoad } from "../../shared/data/data";
import employeeServices from "../../shared/services/employeeServices";
import { DataContext } from "./dataContext";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";

interface IDataProviderProps {
    children: React.ReactNode;
}

function DataContextProvider({ children }: IDataProviderProps) {
    const [search, setSearch] = useState<string>('')
    const [debounced] = useDebouncedValue(search, 500)
    const { fetchEmployees1 } = employeeServices;
    const { data: employeesData, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(["employees", debounced], ({ pageParam = 1 }) => fetchEmployees1(pageParam, debounced, initialPayLoad), {
        staleTime: 60000,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 30 ? allPages.length + 1 : undefined
        }
    });

    const dataCtx = {
        employeesData,
        isLoading,
        hasNextPage,
        fetchNextPage,
        search,
        setSearch
    }
    useEffect(() => {
        console.log(debounced);
    }, [debounced])
    return (
        <DataContext.Provider value={dataCtx}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider

