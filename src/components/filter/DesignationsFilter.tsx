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
 * @returns functionality to filter data by designations
 */
function DesignationsFilter({ designationFields }: any) {

    /** State for storing the checked designation fields in the context */
    const { state, dispatch } = useContext<any>(FilterFieldsContext);
    const { designations } = state;
    console.log({ state });

    const { classes } = useStyle();
    const { setFilterLabel } = utilityServices;
    /**
     * @name handleDesignationsChange
     * @description To store the checked values 
     * @param id id of the checked element
     */
    const handleDesignationsChange = (id: string) => {
        const updatedValues = designations.includes(id)
            ? designations.filter((value: any) => value !== id)
            : [...designations, id];
        dispatch({ type: "UPDATE_DESIGNATION_FIELD", payload: updatedValues })
    }

    return (
        <Menu>
            <Menu.Target>
                <UnstyledButton p={"0.5rem"}>
                    <Group spacing={3}>
                        <Text>{setFilterLabel(designations, designationFields, "Designations")}</Text>
                        <IconChevronDown size="1.25rem" />
                    </Group>
                </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown className={classes.dropdown}>
                <Stack>
                    {
                        designationFields?.data.map((designation: any) => {
                            return <Checkbox
                                key={designation?.id}
                                value={designation?.id}
                                label={designation?.name}
                                checked={designations?.includes(designation?.id)}
                                onChange={() => handleDesignationsChange(designation?.id)}
                            />
                        })
                    }
                </Stack>
            </Menu.Dropdown>
        </Menu>
    )
}

export default DesignationsFilter;
