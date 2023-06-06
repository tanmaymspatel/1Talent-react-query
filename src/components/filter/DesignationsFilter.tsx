import { Stack, Checkbox } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { FilterFieldsContext } from "../../context/filterFieldsContext/filterFieldsContext";

function DesignationsFilter({ designationFields, setLocalFilterFields }: any) {

    const { designationState } = useContext<any>(FilterFieldsContext)
    const { designationsValue, setDesignationsValue } = designationState

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
    )
}

export default DesignationsFilter
