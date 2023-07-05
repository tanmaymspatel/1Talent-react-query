import { Center, Loader, Table, createStyles } from "@mantine/core";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer"

import { IEmployeeDetails } from "../../shared/model/employees.model";
import SingleEmployeeRow from "./SingleEmployeeRow";
import LoadingComponent from "../../shared/components/LoadingComponent";

const useStyle = createStyles((theme) => ({
    thead: {
        position: "sticky",
        top: 0,
        backgroundColor: theme.white
    },
    textCenter: {
        textAlign: "center"
    }
}))
/**
 * @returns data of the employees in table form
 */
function EmployeesTable({ dataProps }: any) {
    const { employeesData, hasNextPage, fetchNextPage, isFetching } = dataProps;
    /**
     * ref - ref to be added on the last element
     * inview - To check, if the reference element is in the view port or not
     */
    const { ref, inView } = useInView();
    const { classes } = useStyle();

    const rows = employeesData?.pages?.map((page: IEmployeeDetails[]) => (
        page.map((employee: IEmployeeDetails, index: number) => {
            if (index === 29) { // if the view reaches to the last element the ref will be added to that element
                return <SingleEmployeeRow ref={ref} key={employee.userId} employee={employee} />
            }
            return <SingleEmployeeRow key={employee.userId} employee={employee} />
        })
    ))
    /** fetching the data of the next page, if any */
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
            <tbody>{rows}
                <tr className={classes.textCenter}>
                    <td colSpan={5}>
                        {isFetching && <Loader />}
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}

export default EmployeesTable;
