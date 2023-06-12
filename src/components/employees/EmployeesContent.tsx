import { useEffect, useMemo, useRef, useLayoutEffect, useContext } from 'react'

import EmployeesCard from "./EmployeesCard";
import EmployeesTable from "./EmployeesTable";
import utilityServices from "../../shared/services/utilityServices";
import useFetchEmployeesData from '../../hooks/useFetchEmployeesData';
import LoadingComponent from '../../shared/components/LoadingComponent';
import { requestPayloadContext } from '../../context/requstPayloadContext/requestPayloadContext';
import { SearchContext } from '../../context/searchContext/searchContext';

interface IEmployeeContentProps {
    isGridView: boolean,
    view: string
}
/**
 * @returns employees data in form of table or cards according to view
 */
function EmployeesContent({ isGridView, view }: IEmployeeContentProps) {

    /** Reference of container in which the data is to be mapped */
    const containerRef = useRef<any>();
    const { findFirstElementInViewPort, scrollToElementAfterBackClick } = utilityServices;
    /** payload request body for the post call */
    const { requestPayload } = useContext<any>(requestPayloadContext);
    /** value of the search string */
    const { debounced } = useContext<any>(SearchContext)
    const { data: employeesData, isLoading, hasNextPage, fetchNextPage } = useFetchEmployeesData(debounced, requestPayload);
    const mainContainerRef = document.getElementById("main");
    /** Y position of the div with id main from the top of the viewport */
    const mainContentYOffset = mainContainerRef?.getBoundingClientRect().y as number;
    const isClicked = localStorage.getItem("isClicked") || "false";
    const clickedId = localStorage.getItem("clickedId") as string;
    /**
     * @name scrollToElement
     * @description first element in the viewport with the reference to the container
     */
    const scrollToElement = useMemo(() => {
        /** Find all elements in container which will be checked if are in view or not */
        const nodeElements = containerRef.current?.querySelectorAll("[data-item]");
        if (nodeElements) {
            return findFirstElementInViewPort(nodeElements, mainContentYOffset);
        }
        return undefined;
    }, [view]);
    /** Value of the id which is to be preserved in case of view changing */
    let IdToBePreserved: string;
    /** Storing id of the first element in view after the div with main id to the local storage */
    useEffect(() => {
        if (scrollToElement) {
            if (view === "list") IdToBePreserved = scrollToElement?.getAttribute("class")?.split(" ")[2]?.slice(5);
            if (view === "grid") IdToBePreserved = scrollToElement?.getAttribute("class")?.slice(5);
        }
    }, [view])
    /**  Scroll to element after changing the view */
    useEffect(() => {
        if (scrollToElement && IdToBePreserved) {
            document.querySelector(`.user-${IdToBePreserved}`)?.scrollIntoView();
        }
    }, [scrollToElement, view]);
    /** Scroll preservation after hitting the back button */
    useLayoutEffect(() => {
        scrollToElementAfterBackClick(isClicked, clickedId);
    }, [scrollToElementAfterBackClick])

    if (isLoading) return <LoadingComponent />

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
