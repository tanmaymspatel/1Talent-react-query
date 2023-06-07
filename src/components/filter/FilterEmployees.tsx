import { Button, Divider, Group, Menu, Text, UnstyledButton, createStyles } from "@mantine/core"
import { IconChevronDown } from "@tabler/icons-react"

import EmployeeTypesFilter from "./EmployeeTypesFilter";
import DesignationsFilter from "./DesignationsFilter";
import GendersFilter from "./GendersFilter";
import DomainsFilter from "./DomainsFilter";
import { useContext, useEffect } from "react";
import { requestPayloadContext } from "../../context/requstPayloadContext/requestPayloadContext";
import { FilterFieldsContext } from "../../context/filterFieldsContext/filterFieldsContext";

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

function FilterEmployees({ setIsFilterBarOpen, filterFields, isFilterFieldsEmpty, localFilterFields, setLocalFilterFields }: any) {
    const { classes } = useStyle();
    const { domainFields, employeeTypesFields, designationFields, genderFields } = filterFields;
    // const { localState } = useContext<any>(FilterFieldsContext)
    // const { localFilterFields, setLocalFilterFields } = localState;
    const { setRequestPayLoad } = useContext<any>(requestPayloadContext)
    const setRequestPayLoadOnApply = () => {
        setRequestPayLoad((prev: any) => { return { ...prev, filter: localFilterFields } })
        // setLocalFilterFields(localFilterFields)
        setIsFilterBarOpen(false)
    }

    useEffect(() => {
        console.log(localFilterFields);
    }, [localFilterFields])

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
