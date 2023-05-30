import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useLayoutEffect, useState } from 'react'

import employeeServices from "../../shared/services/employeeServices";
import EmployeesCard from "./EmployeesCard";
import EmployeesTable from "./EmployeesTable";
import utilityServices from "../../shared/services/utilityServices";

function EmployeesContent({ isGridView, view }: any) {

    const searchText = "";
    const containerRef = useRef<any>();
    const { findFirstElementInViewPort, scrollToElementAfterBackClick } = utilityServices;
    const { fetchEmployees1 } = employeeServices;
    const { data: employeesData, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(["employees"], ({ pageParam = 1 }) => fetchEmployees1(pageParam, searchText), {
        staleTime: 60000,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 30 ? allPages.length + 1 : undefined
        }
    });

    const mainContainerRef = document.getElementById("main")
    const mainContentYOffset: any = mainContainerRef?.getBoundingClientRect().y
    const isClicked = localStorage.getItem("isClicked") || "false";
    const clickedId = localStorage.getItem("clickedId") as string;

    /**
     * @name scrollTo
     * @description first element in the viewport with the reference to the container
     */
    const scrollTo = useMemo(() => {
        // Find all elements in container which will be checked if are in view or not
        const nodeElements = containerRef.current?.querySelectorAll("[data-item]");
        if (nodeElements) {
            return findFirstElementInViewPort(nodeElements, mainContentYOffset);
        }
        return undefined;
    }, [view]);

    let IdToBePreserved: string;
    // storing id of the first element to the local storage
    useEffect(() => {
        if (scrollTo) {
            if (view === "list") IdToBePreserved = scrollTo?.getAttribute("class")?.split(" ")[2]?.slice(5);
            if (view === "grid") IdToBePreserved = scrollTo?.getAttribute("class")?.slice(5);
        }
    }, [view])

    // scroll to element after changing the view
    useEffect(() => {
        if (scrollTo && IdToBePreserved) {
            document.querySelector(`.user-${IdToBePreserved}`)?.scrollIntoView();
        }
    }, [scrollTo, view]);

    // scroll preservation after hitting the back button
    useLayoutEffect(() => {
        scrollToElementAfterBackClick(isClicked, clickedId);
    }, [scrollToElementAfterBackClick])

    if (isLoading) return <h2>Loading...</h2>

    const dataProps = {
        employeesData,
        hasNextPage,
        fetchNextPage
    }

    return (
        <div ref={containerRef}>
            {
                isGridView
                    ? <EmployeesCard dataProps={dataProps} />
                    : <EmployeesTable dataProps={dataProps} />
            }
        </div>
    )
};

export default EmployeesContent;
