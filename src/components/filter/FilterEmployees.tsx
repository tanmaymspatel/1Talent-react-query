import { Button, Divider, Group, createStyles } from "@mantine/core"

import EmployeeTypesFilter from "./EmployeeTypesFilter";
import DesignationsFilter from "./DesignationsFilter";
import GendersFilter from "./GendersFilter";
import DomainsFilter from "./DomainsFilter";
import { useContext, useEffect } from "react";
import { requestPayloadContext } from "../../context/requstPayloadContext/requestPayloadContext";

const useStyle = createStyles((theme) => ({
    wrapper: {
        border: `1px solid ${theme.colors.gray[3]}`,
        borderRadius: "4px"
    },
    padding: {
        padding: "0.5rem"
    },
    dropdown: {
        maxHeight: "320px",
        overflow: "auto",
        padding: "1rem"
    }
}))
/**
 * @returns A filter bar for filtering the list
 */
function FilterEmployees({ setIsFilterBarOpen, filterFields, isFilterFieldsEmpty, localFilterFields, setLocalFilterFields }: any) {
    const { classes } = useStyle();
    const { domainFields, employeeTypesFields, designationFields, genderFields } = filterFields;
    /** Method to set the filter obbject for the post call request body */
    const { setRequestPayLoad } = useContext<any>(requestPayloadContext);
    /**
     * @name setRequestPayLoadOnApply
     * @description To set the local checked filter fields to the request body which is to be used in post call
     */
    const setRequestPayLoadOnApply = () => {
        setRequestPayLoad((prev: any) => { return { ...prev, filter: localFilterFields } })
        setIsFilterBarOpen(false)
    }

    return (
        <Group spacing={"xs"} className={classes.wrapper}>
            <EmployeeTypesFilter
                employeeTypesFields={employeeTypesFields}
                setLocalFilterFields={setLocalFilterFields} />
            <DomainsFilter
                domainFields={domainFields}
                setLocalFilterFields={setLocalFilterFields} />
            <DesignationsFilter
                designationFields={designationFields}
                setLocalFilterFields={setLocalFilterFields}
            />
            <GendersFilter
                genderFields={genderFields}
                setLocalFilterFields={setLocalFilterFields} />
            <Divider orientation="vertical" />
            <Group spacing={6} p={"0.5rem"}>
                <Button size="xs" disabled={isFilterFieldsEmpty} onClick={setRequestPayLoadOnApply}>Apply</Button>
                <Button size="xs" variant="outline" onClick={() => setIsFilterBarOpen(false)}>Close</Button>
            </Group>
        </Group >
    )
}

export default FilterEmployees;
