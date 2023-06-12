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
function DesignationsFilter({ designationFields, setLocalFilterFields }: any) {

    /** State for storing the checked designation fields in the context */
    const { designationState } = useContext<any>(FilterFieldsContext);
    const { designationsValue, setDesignationsValue } = designationState;
    const { classes } = useStyle();
    const { setFilterLabel } = utilityServices;
    /**
     * @name handleDesignationsChange
     * @description To store the checked values 
     * @param id id of the checked element
     */
    const handleDesignationsChange = (id: string) => {
        const updatedValues = designationsValue.includes(id)
            ? designationsValue.filter((value: any) => value !== id)
            : [...designationsValue, id];
        setDesignationsValue(updatedValues);
    }
    /** Set the local filter fields if there is any change in the checked values of the designations */
    useEffect(() => {
        setLocalFilterFields((prev: any) => { return { ...prev, designations: designationsValue } })
    }, [designationsValue])

    return (
        <Menu>
            <Menu.Target>
                <UnstyledButton p={"0.5rem"}>
                    <Group spacing={3}>
                        <Text>{setFilterLabel(designationsValue, designationFields, "Designations")}</Text>
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
                                checked={designationsValue.includes(designation?.id)}
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
