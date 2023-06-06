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
            <Menu>
                <Menu.Target>
                    <UnstyledButton p={"0.5rem"}>
                        <Group spacing={3}>
                            <Text>Employement Type</Text>
                            <IconChevronDown size="1.25rem" />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown className={classes.dropdown}>
                    <EmployeeTypesFilter employeeTypesFields={employeeTypesFields} setLocalFilterFields={setLocalFilterFields} />
                </Menu.Dropdown>
            </Menu>
            <Menu>
                <Menu.Target>
                    <UnstyledButton p={"0.5rem"}>
                        <Group spacing={3}>
                            <Text>Domains</Text>
                            <IconChevronDown size="1.25rem" />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown className={classes.dropdown}>
                    <DomainsFilter domainFields={domainFields} setLocalFilterFields={setLocalFilterFields} />
                </Menu.Dropdown>
            </Menu>
            <Menu>
                <Menu.Target>
                    <UnstyledButton p={"0.5rem"}>
                        <Group spacing={3}>
                            <Text>Designations</Text>
                            <IconChevronDown size="1.25rem" />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown className={classes.dropdown}>
                    <DesignationsFilter designationFields={designationFields} setLocalFilterFields={setLocalFilterFields} />
                </Menu.Dropdown>
            </Menu>
            <Menu>
                <Menu.Target>
                    <UnstyledButton p={"0.5rem"}>
                        <Group spacing={3}>
                            <Text>Gender</Text>
                            <IconChevronDown size="1.25rem" />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown className={classes.dropdown}>
                    <GendersFilter genderFields={genderFields} setLocalFilterFields={setLocalFilterFields} />
                </Menu.Dropdown>
            </Menu>
            <Divider orientation="vertical" />
            <Group spacing={6} p={"0.5rem"}>
                <Button size="xs" disabled={isFilterFieldsEmpty} onClick={setRequestPayLoadOnApply}>Apply</Button>
                <Button size="xs" variant="outline" onClick={() => setIsFilterBarOpen(false)}>Close</Button>
            </Group>
        </Group >
    )
}

export default FilterEmployees
