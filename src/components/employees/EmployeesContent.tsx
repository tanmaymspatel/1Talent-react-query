import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useLayoutEffect, useState } from 'react'

import employeeServices from "../../shared/services/employeeServices";
import EmployeesCard from "./EmployeesCard";
import EmployeesTable from "./EmployeesTable";
import utilityServices from "../../shared/services/utilityServices";

function EmployeesContent({ isGridView, currentView }: any) {

    const searchText = "";
    const containerRef = useRef<any>();
    const { findFirstElementInViewPort } = utilityServices;
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
    const clickedId = (localStorage.getItem("clickedId") as string);
    console.log(isClicked, clickedId);


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
    }, [currentView]);

    useEffect(() => {
        let preservedId;
        // if (currentView === "list") preservedId = (scrollTo?.getAttribute("id").slice(4));
        if (currentView === "grid") preservedId = (scrollTo?.getAttribute("id").slice(5));
        const newObj = { preservedId, "prevView": currentView }
        localStorage.setItem("currentState", JSON.stringify(newObj))
    }, [currentView, scrollTo])

    useLayoutEffect(() => {
        const prevState = JSON.parse(localStorage.getItem("currentState") as string);
        const { preservedId, prevView } = prevState;
        if (scrollTo) {
            if (prevView === "list") document.getElementById(`card-${preservedId}`)?.scrollIntoView()
            // if (prevView === "grid") document.getElementById(`row-${preservedId}`)?.scrollIntoView()
            console.log(prevState, "after");

            // Scroll to element with should be in view after rendering
            // document.querySelector(`[data-id="${dataId}"]`)?.scrollIntoView();
            window.scrollBy(0, -mainContentYOffset)
        }
    }, [scrollTo, currentView]);

    const scrollToElementAfterBackClick = () => {

        const currentView = localStorage.getItem("currentView") as string
        if (isClicked === "true") {
            if (currentView === "list") {
                document.getElementById(`row-${clickedId}`)?.scrollIntoView();
            }
            if (currentView === "grid") {
                document.getElementById(`card-${clickedId}`)?.scrollIntoView();
            }
        }
    }
    useLayoutEffect(() => {
        scrollToElementAfterBackClick()
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
