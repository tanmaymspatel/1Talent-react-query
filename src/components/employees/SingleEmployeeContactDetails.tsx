import { Group, Tooltip } from '@mantine/core'
import { IconDeviceMobile, IconMail } from '@tabler/icons-react'
import React from 'react'

function SingleEmployeeContactDetails({ employee }: any) {
    return (
        <Group position="left">
            <Tooltip label={employee?.mobileNumber !== null ? employee?.mobileNumber : "Mobile Number is not available"}>
                <IconDeviceMobile />
            </Tooltip>
            <Tooltip label={employee?.emailId}>
                <IconMail />
            </Tooltip>
        </Group>
    )
}

export default SingleEmployeeContactDetails
