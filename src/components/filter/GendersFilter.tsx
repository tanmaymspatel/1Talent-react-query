import { Stack, Checkbox } from "@mantine/core";
import { useState, useEffect } from "react";
import useFetchGenders from "../../hooks/useFetchGenders";

function GendersFilter({ genderFields }: any) {
    const [gendersValue, setGendersValue] = useState<string[]>([]);
    const handleDesignationsChange = (id: string) => {
        const updatedValues = gendersValue.includes(id)
            ? gendersValue.filter((value) => value !== id)
            : [...gendersValue, id];
        setGendersValue(updatedValues);
    }
    useEffect(() => {
        console.log(gendersValue);
    }, [gendersValue])
    return (
        <Stack>
            {
                genderFields?.data.map((gender: any) => {
                    return <Checkbox
                        key={gender?.id}
                        value={gender?.id}
                        label={gender?.name}
                        checked={gendersValue.includes(gender?.id)}
                        onChange={() => handleDesignationsChange(gender?.id)}
                    />
                })
            }
        </Stack>
    )
}

export default GendersFilter
