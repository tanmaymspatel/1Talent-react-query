import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { Card, Grid, Stack, createStyles } from "@mantine/core";
import PersonalInfo from "./PersonalInfo";

import employeeServices from "../../shared/services/employeeServices";
import EmployeeDetailsHeader from "./EmployeeDetailsHeader";


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

function EmployeeDetails() {
    const { classes } = useStyle();
    const { getPersonalInfoById } = employeeServices;
    const { id } = useParams();
    const { data: personaInfo } = useQuery(['personal-info', id], () => getPersonalInfoById(id as string), {
        staleTime: 60000,
    })

    return (
        <Stack h={"100%"} spacing={0}>
            <header className={classes.header}>
                <EmployeeDetailsHeader employeeName={personaInfo?.name} />
            </header>
            <main id="main" className={classes.main}>
                <Grid>
                    <Grid.Col lg={9}>
                        <Card radius="md">
                            <PersonalInfo personaInfo={personaInfo} />
                        </Card>
                    </Grid.Col>
                    <Grid.Col lg={3}>
                        <Card radius="md">
                            Progress bar
                        </Card>
                    </Grid.Col>
                </Grid>
            </main>

        </Stack>
    )
}

export default EmployeeDetails;
