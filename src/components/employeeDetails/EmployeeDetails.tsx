import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import employeeServices from "../../shared/services/employeeServices";
import PersonalInfo from "./PersonalInfo";
import { Card, Grid, SimpleGrid, Stack, createStyles } from "@mantine/core";
import EmployeesContent from "../employees/EmployeesContent";
import EmployeesHeader from "../employees/EmployeesHeader";
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
    const { id } = useParams();
    // const { data: maritalInfo } = useQuery(['marital-info', id], () => getMaritalInfoInfoById(id as string), {
    //     staleTime: 60000
    // })
    // const { data: educationInfo } = useQuery(['education-info', id], () => getEducationInfoInfoById(id as string), {
    //     staleTime: 60000
    // })

    return (
        <Stack h={"100%"} spacing={0}>
            <header className={classes.header}>
                <EmployeeDetailsHeader />
            </header>
            <main id="main" className={classes.main}>
                <Grid>
                    <Grid.Col lg={9}>
                        <Card radius="md">
                            <PersonalInfo id={id} />
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

export default EmployeeDetails
