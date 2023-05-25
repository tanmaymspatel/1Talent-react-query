import { Table, createStyles } from "@mantine/core";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer"

import { IEmployeeDetails } from "../../shared/model/employees.model";
import SingleEmployeeRow from "./SingleEmployeeRow";

const useStyle = createStyles((theme) => ({
    thead: {
        position: "sticky",
        top: 0,
        backgroundColor: theme.white
    }
}))

function EmployeesTable({ dataProps }: any) {
    const { employeesData, hasNextPage, fetchNextPage } = dataProps;
    const { ref, inView } = useInView();
    const { classes } = useStyle()

    const rows = employeesData?.pages?.map((page: IEmployeeDetails[]) => (
        page.map((employee: IEmployeeDetails, index: number) => {
            if (index === 29) {
                return <SingleEmployeeRow ref={ref} key={employee.userId} employee={employee} />
            }
            return <SingleEmployeeRow key={employee.userId} employee={employee} />
        })
    ))

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

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
