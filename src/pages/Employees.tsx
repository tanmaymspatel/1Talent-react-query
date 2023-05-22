import { useQuery } from "@tanstack/react-query";
import { Stack, createStyles } from "@mantine/core";

import EmployeesHeader from "../components/employees/EmployeesHeader";
import EmployeesContent from "../components/employees/EmployeesContent";
import employeeServices from '../shared/services/employeeServices';

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
    const { classes } = useStyle();
    const { fetchEmployees } = employeeServices
    const { data: employeesData } = useQuery(["employees"], fetchEmployees, {
        staleTime: 60000
    });

    console.log(employeesData);
    return (
        <Stack h={"100%"} spacing={0}>
            <header className={classes.header}>
                <EmployeesHeader />
            </header>
            <main className={classes.main}>
                <EmployeesContent />
            </main>
        </Stack>
    )
};

export default Employees;
