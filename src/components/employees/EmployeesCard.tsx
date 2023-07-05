import { useEffect } from "react";
import { Center, Loader, SimpleGrid } from "@mantine/core"
import { useInView } from "react-intersection-observer";

import { IEmployeeDetails } from "../../shared/model/employees.model"
import SingleEmployeeCard from "./SingleEmployeeCard"
import LoadingComponent from "../../shared/components/LoadingComponent";
/**
 * @returns data of the employees in card form 
 */
function EmployeesCard({ dataProps }: any) {

    const { employeesData, hasNextPage, fetchNextPage, isFetching } = dataProps;
    /**
     * ref - ref to be added on the last element
     * inview - To check, if the reference element is in the view port or not
     */
    const { ref, inView } = useInView();

    const cards = employeesData?.pages?.map((page: IEmployeeDetails[]) => (
        page?.map((employee: IEmployeeDetails, index: number) => {
            if (index === 29) { // if the view reaches to the last element the ref will be added to that element
                return <SingleEmployeeCard ref={ref} key={employee.userId} employee={employee} />
            }
            return <SingleEmployeeCard key={employee.userId} employee={employee} />
        })
    ))
    /** fetching the data of the next page, if any */
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    return (
        <>
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
            <Center style={{ textAlign: "center" }}>
                {isFetching && <Loader />}
            </Center>
        </>
    )
}

export default EmployeesCard;
