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

function DesignationsFilter({ designationFields, setLocalFilterFields }: any) {

    const { designationState } = useContext<any>(FilterFieldsContext)
    const { designationsValue, setDesignationsValue } = designationState;
    const { classes } = useStyle();
    const { setFilterLabel } = utilityServices;

    const handleDesignationsChange = (id: string) => {
        const updatedValues = designationsValue.includes(id)
            ? designationsValue.filter((value: any) => value !== id)
            : [...designationsValue, id];
        setDesignationsValue(updatedValues);
    }
    useEffect(() => {
        // console.log(designationsValue);
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

export default DesignationsFilter
