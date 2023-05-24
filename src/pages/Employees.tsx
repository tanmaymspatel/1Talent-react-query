import { Stack, createStyles } from "@mantine/core";
import { useState } from "react";

import EmployeesHeader from "../components/employees/EmployeesHeader";
import EmployeesContent from "../components/employees/EmployeesContent";

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
    const [view, setView] = useState<string>(currentView)
    const isGridView = view === 'grid';

    return (
        <Stack h={"100%"} spacing={0}>
            <header className={classes.header}>
                <EmployeesHeader isGridView={isGridView} setView={setView} />
            </header>
            <main className={classes.main}>
                <EmployeesContent isGridView={isGridView} />
            </main>
        </Stack>
    )
};

export default Employees;
