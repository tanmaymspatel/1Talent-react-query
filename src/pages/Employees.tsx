import { Stack, createStyles } from "@mantine/core";
import { useEffect, useState } from "react";

import EmployeesHeader from "../components/employees/EmployeesHeader";
import EmployeesContent from "../components/employees/EmployeesContent";

const useStyle = createStyles(() => ({
    header: {
        flex: "0 0 65px",
        maxHeight: "65px",
    },
    main: {
        flexGrow: 1,
        overflowY: "auto",
        overflowX: "hidden",
    }
}))
/**
 * @returns Employee page with toggle view functionality
 */
function Employees() {

    const currentView = localStorage.getItem('currentView') as string || 'grid';
    const { classes } = useStyle();
    const [view, setView] = useState<string>(currentView);
    const isGridView = view === 'grid';

    useEffect(() => {
        localStorage.setItem("currentView", view)
    }, [view]);

    return (
        <Stack h={"100%"} spacing={0}>
            <header className={classes.header}>
                <EmployeesHeader setView={setView} view={view} />
            </header>
            <main id="main" className={classes.main}>
                <EmployeesContent isGridView={isGridView} view={view} />
            </main>
        </Stack>
    )
};

export default Employees;
