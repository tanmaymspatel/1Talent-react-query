import { Group, Table, Tooltip, createStyles } from "@mantine/core";
import { IconDeviceMobile, IconMail } from "@tabler/icons-react";
import { IEmployeeDetails } from "../../shared/model/employees.model";

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
        <tr key={employee?.userId}>
            <td>{employee?.name}</td>
            <td>{employee?.employeeTypes?.employmentType ? employee?.employeeTypes?.employmentType : "N/A "}</td>
            <td>{employee?.designations?.name ? employee?.designations?.name : 'N/A'}</td>
            <td>
                <span>
                    {employee?.domainWithSubDomain && employee?.domainWithSubDomain?.name}
                </span>
                {employee?.domainWithSubDomain?.subDomain.name !== null && <span> (</span>}
                <span>
                    {employee?.domainWithSubDomain?.subDomain ? employee?.domainWithSubDomain?.subDomain?.name : ''}
                    {employee?.domainWithSubDomain?.subDomain.name !== null && <span>)</span>}
                </span>
                {employee?.domainWithSubDomain?.subDomain.name === null && employee?.domainWithSubDomain?.name === null && <span>N/A</span>}
            </td>
            <td>
                <Group position="left">
                    <Tooltip label={employee?.mobileNumber !== null ? employee?.mobileNumber : "Mobile Number is not available"}>
                        <IconDeviceMobile />
                    </Tooltip>
                    <Tooltip label={employee?.emailId}>
                        <IconMail />
                    </Tooltip>
                </Group>
            </td>
        </tr>
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
