import { Group, Table, Tooltip, createStyles } from "@mantine/core";
import { IconDeviceMobile, IconMail } from "@tabler/icons-react";
import { IEmployeeDetails } from "../../shared/model/employees.model";
import SingleEmployeeRow from "./SingleEmployeeRow";

const useStyle = createStyles((theme) => ({
    thead: {
        position: "sticky",
        top: 0,
        backgroundColor: theme.white
    }
}))

function EmployeesTable({ employeesData }: any) {
    const { classes } = useStyle()

    const rows = employeesData?.map((employee: IEmployeeDetails) => (
        <SingleEmployeeRow key={employee.userId} employee={employee} />
    ))

    return (
        <Table striped highlightOnHover horizontalSpacing="md" verticalSpacing="md" fontSize="md">
            <thead className={classes.thead}>
                <tr>
                    <th>NAME</th>
                    <th>EMPLOYMENT TYPE</th>
                    <th>DESIGNATION</th>
                    <th>DOMAIN/SUB-DOMAIN</th>
                    <th>CONTACT</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    )
}

export default EmployeesTable;
