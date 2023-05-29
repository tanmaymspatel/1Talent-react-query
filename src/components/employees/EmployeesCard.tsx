import { useEffect } from "react";
import { SimpleGrid } from "@mantine/core"
import { useInView } from "react-intersection-observer";

import { IEmployeeDetails } from "../../shared/model/employees.model"
import SingleEmployeeCard from "./SingleEmployeeCard"

function EmployeesCard({ dataProps }: any) {

    const { employeesData, hasNextPage, fetchNextPage } = dataProps;
    const { ref, inView } = useInView();

    const cards = employeesData?.pages?.map((page: IEmployeeDetails[]) => (
        page?.map((employee: IEmployeeDetails, index: number) => {
            if (index === 29) {
                return <SingleEmployeeCard ref={ref} key={employee.userId} employee={employee} />
            }
            return <SingleEmployeeCard key={employee.userId} employee={employee} />
        })
    ))

    useEffect(() => {

        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

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
