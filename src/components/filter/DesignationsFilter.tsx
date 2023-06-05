import { Stack, Checkbox } from "@mantine/core";
import { useEffect, useState } from "react";

function DesignationsFilter({ designationFields, setLocalFilterFields }: any) {
    const [designationsValue, setDesignationsValue] = useState<string[]>([]);

    const handleDesignationsChange = (id: string) => {
        const updatedValues = designationsValue.includes(id)
            ? designationsValue.filter((value) => value !== id)
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
