import { Avatar, Badge, Button, Card, Group, Image, SimpleGrid, Stack, Text, Title, Tooltip, UnstyledButton, createStyles } from "@mantine/core"
import { IEmployeeDetails } from "../../shared/model/employees.model"
import { IconMail, IconPhone } from "@tabler/icons-react"

const useStyle = createStyles((theme) => ({
    card: {
        overflow: 'inherit'
    },
    avatar: {
        position: "absolute",
        marginTop: "-50px"
    },
    actionBtns: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.5rem 0",
        // '&:hover': {
        //     boxShadow: "0 0 2px 12px black"
        // },
        '&:first-of-type': {
            borderRight: `1px solid ${theme.colors.gray[6]}`
        }
    }
}))

function EmployeesCard({ employeesData }: any) {

    const { classes } = useStyle()

    const cards = employeesData?.map((employee: IEmployeeDetails) => (
        <Card key={employee.userId} shadow="sm" padding="lg" radius="md" withBorder className={classes.card}>
            <Avatar
                className={classes.avatar}
                src={"https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"}
                size={60}
                radius={"50%"}
            />
            <Group position="right">
                <Badge color="pink" variant="light">
                    {employee?.employeeTypes.employmentType ? employee?.employeeTypes.employmentType : "N/A"}
                </Badge>
            </Group>

            <Stack spacing={0}>
                <Text>{employee?.userCode ? employee?.userCode : "N/A"}</Text>
                <Title order={3}>{employee?.name}</Title>
                <Group spacing={"5px"}>
                    <Text>{employee?.designations.name}</Text>
                    {employee?.designations.name && <Text>|</Text>}
                    <Text>{employee.domainWithSubDomain.name !== null ? <><span> {employee.domainWithSubDomain.name}</span> <span>{(employee.domainWithSubDomain.subDomain.name)}</span></> : `N/A`}</Text>
                </Group>
            </Stack>
            <Card.Section withBorder inheritPadding mt={"md"}>
                <Group spacing={0}>
                    <UnstyledButton className={classes.actionBtns} w={"50%"}>
                        <Tooltip label={employee.mobileNumber ? employee.mobileNumber : "Mobile number is not available"}>
                            <Group spacing={"5px"}>
                                <IconPhone size={"1rem"}></IconPhone>
                                <Text>Phone</Text>
                            </Group>
                        </Tooltip>
                    </UnstyledButton>
                    <UnstyledButton className={classes.actionBtns} w={"50%"}>
                        <Tooltip label={employee.emailId}>
                            <Group spacing={"5px"}>
                                <IconMail size={"1rem"}></IconMail>
                                <Text>Email</Text>
                            </Group>
                        </Tooltip>
                    </UnstyledButton>
                </Group>
            </Card.Section>
        </Card>
    ))
    return (
        <SimpleGrid
            style={{ marginTop: "2rem" }}
            cols={3}
            spacing="lg"
            verticalSpacing={60}
            breakpoints={[
                { maxWidth: '62rem', cols: 3, spacing: 'md' },
                { maxWidth: '48rem', cols: 2, spacing: 'sm' },
                { maxWidth: '36rem', cols: 1, spacing: 'sm' },
            ]}
        >
            {cards}
        </SimpleGrid>
    )
}

export default EmployeesCard
