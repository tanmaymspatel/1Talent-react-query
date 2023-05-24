import { useQuery } from "@tanstack/react-query";
import { Stack, createStyles } from "@mantine/core";

import EmployeesHeader from "../components/employees/EmployeesHeader";
import EmployeesContent from "../components/employees/EmployeesContent";
import employeeServices from '../shared/services/employeeServices';
import { useState } from "react";

const useStyle = createStyles(() => ({
    header: {
        flex: "0 0 50px",
        maxHeight: "50px",
    },
    main: {
        flexGrow: 1,
        overflowY: "auto",
        overflowX: "hidden",
    }
}))

function Employees() {
    const currentView = localStorage.getItem('currentView') as string || 'grid';
    const { classes } = useStyle();
    const { fetchEmployees2 } = employeeServices;
    const [view, setView] = useState<string>(currentView)
    const isGridView = view === 'grid';
    const { data: employeesData, isLoading } = useQuery(["employees"], fetchEmployees2, {
        staleTime: 60000
    });
    // const { data: employeesData, isLoading } = useQuery(["employees"], fetchEmployees1, {
    //     staleTime: 60000
    // });
    const dataLength = employeesData && employeesData.length;

    if (isLoading) return <h2>Loading...</h2>

    console.log(employeesData);


    return (
        <Stack h={"100%"} spacing={0}>
            <header className={classes.header}>
                <EmployeesHeader dataLength={dataLength} isGridView={isGridView} setView={setView} />
            </header>
            <main className={classes.main}>
                <EmployeesContent employeesData={employeesData} isGridView={isGridView} />
            </main>
        </Stack>
    )
};

export default Employees;
