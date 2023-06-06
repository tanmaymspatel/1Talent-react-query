import { Stack, Checkbox } from "@mantine/core";
import { useState, useEffect, useContext } from "react";
import useFetchGenders from "../../hooks/useFetchGenders";
import { FilterFieldsContext } from "../../context/filterFieldsContext/filterFieldsContext";

function GendersFilter({ genderFields, setLocalFilterFields }: any) {
    const { genderState } = useContext<any>(FilterFieldsContext)
    const { gendersValue, setGendersValue } = genderState
    const handleDesignationsChange = (id: string) => {
        const updatedValues = gendersValue.includes(id)
            ? gendersValue.filter((value: any) => value !== id)
            : [...gendersValue, id];
        setGendersValue(updatedValues);
    }
    useEffect(() => {
        console.log(gendersValue);
        setLocalFilterFields((prev: any) => { return { ...prev, genders: gendersValue } })
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
