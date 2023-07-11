import { Stack, Checkbox, Group, Menu, UnstyledButton, Text, createStyles } from "@mantine/core";
import { useContext, useEffect } from "react";
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
/**
 * @returns A dropdown for filtering data by employment type
 */
function EmployeeTypesFilter({ employeeTypesFields, setLocalFilterFields }: any) {
    /** Loacl employmet type state for storing checked types */
    const { state, dispatch } = useContext<any>(FilterFieldsContext);
    const { employmentTypeId } = state;
    const { classes } = useStyle();
    const { setFilterLabel } = utilityServices;
    /**
     * @name handleEmployementTypeChange
     * @description storing the checked fields in the array
     * @param id id of the checked type
     */
    const handleEmployementTypeChange = (id: string) => {
        const updatedValues = employmentTypeId.includes(id)
            ? employmentTypeId.filter((value: any) => value !== id)
            : [...employmentTypeId, id];
        dispatch({ type: "UPDATE_EMPLOYEE_TYPES_FIELD", payload: updatedValues })
    }

    return (
        <Menu>
            <Menu.Target>
                <UnstyledButton p={"0.5rem"}>
                    <Group spacing={3}>
                        <Text>{setFilterLabel(employmentTypeId, employeeTypesFields, "Employment Type")}</Text>
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
                                checked={employmentTypeId.includes(type?.employmentTypeId)}
                                onChange={() => handleEmployementTypeChange(type?.employmentTypeId)}
                            />
                        })
                    }
                </Stack>
            </Menu.Dropdown>
        </Menu>
    )
}

export default EmployeeTypesFilter;
