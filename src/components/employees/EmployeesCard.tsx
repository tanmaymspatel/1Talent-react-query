import { Avatar, Badge, Button, Card, Group, Image, SimpleGrid, Stack, Text, Title, Tooltip, UnstyledButton, createStyles } from "@mantine/core"
import { IEmployeeDetails } from "../../shared/model/employees.model"
import { IconMail, IconPhone } from "@tabler/icons-react"
import SingleEmployeeCard from "./SingleEmployeeCard"

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
        '&:first-of-type': {
            borderRight: `1px solid ${theme.colors.gray[6]}`
        }
    }
}))

function EmployeesCard({ employeesData }: any) {

    const { classes } = useStyle()

    const cards = employeesData?.map((employee: IEmployeeDetails) => (
        <SingleEmployeeCard key={employee.userId} employee={employee} />
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
