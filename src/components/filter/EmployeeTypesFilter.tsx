import { Stack, Checkbox, Group, Menu, UnstyledButton, Text, createStyles } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { FilterFieldsContext } from "../../context/filterFieldsContext/filterFieldsContext";
import { IconChevronDown } from "@tabler/icons-react";
import utilityServices from "../../shared/services/utilityServices";

const useStyle = createStyles(() => ({
    dropdown: {
        maxHeight: "320px",
        overflow: "auto",
        padding: "1rem",
    },
}))

function EmployeeTypesFilter({ employeeTypesFields, setLocalFilterFields }: any) {
    const { employementState } = useContext<any>(FilterFieldsContext)
    const { employementValue, setEmployementValue } = employementState;
    const { classes } = useStyle();
    const { setFilterLabel } = utilityServices;


    const handleemployementTypeChange = (id: string) => {
        const updatedValues = employementValue.includes(id)
            ? employementValue.filter((value: any) => value !== id)
            : [...employementValue, id];
        setEmployementValue(updatedValues);
    }
    useEffect(() => {
        setLocalFilterFields((prev: any) => { return { ...prev, employmentTypeId: employementValue } })
    }, [employementValue])
    return (
        <Menu>
            <Menu.Target>
                <UnstyledButton p={"0.5rem"}>
                    <Group spacing={3}>
                        <Text>{setFilterLabel(employementValue, employeeTypesFields, "Employment Type")}</Text>
                        <IconChevronDown size="1.25rem" />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown className={classes.dropdown}>
                <Stack>
                    {
                        employeeTypesFields?.data.map((type: any) => {
                            return <Checkbox
                                key={type?.employmentTypeId}
                                value={type?.employmentTypeId}
                                label={type?.employmentType}
                                checked={employementValue.includes(type?.employmentTypeId)}
                                onChange={() => handleemployementTypeChange(type?.employmentTypeId)}
                            />
                        })
                    }

                </Stack>
            </Menu.Dropdown>
        </Menu>
    )
}

export default EmployeeTypesFilter
