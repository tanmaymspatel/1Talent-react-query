import React from 'react';
import { Card, Avatar, Group, Badge, Stack, Title, UnstyledButton, Tooltip, Text, createStyles } from "@mantine/core"
import { IconPhone, IconMail } from "@tabler/icons-react"
import { useNavigate } from 'react-router-dom';

const useStyle = createStyles((theme) => ({
    card: {
        overflow: 'inherit'
    },
    avatar: {
        position: "absolute",
        marginTop: "-50px"
    },
    actionBtns: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.5rem 0",
        '&:first-of-type': {
            borderRight: `1px solid ${theme.colors.gray[6]}`
        }
    }
}))
/**
 * @returns a single card having respective employee details
 */
const SingleEmployeeCard = React.forwardRef(({ employee }: any, ref: any) => {

    const { classes, cx } = useStyle();
    const navigate = useNavigate();
    // const imageUrl = DOMPurify.sanitizeURL(`data:image/png;base64,${employee?.profileImage}`);
    /**
     * @name onClickHandler
     * @description navigate to perticular user details page, stores data of isClicked and clickedId to the localstorage
     */
    const onClickHandler = () => {
        navigate(`${employee?.userId}/profile`);
        localStorage.setItem("isClicked", "true");
        localStorage.setItem("clickedId", employee?.userId);
    }
    /** details of domain and sub-domain */
    const getEmployeeDomainAndSubDomain = employee.domainWithSubDomain.name !== null
        ? <>
            <span> {employee.domainWithSubDomain.name}</span>
            {employee.domainWithSubDomain.subDomain.name && <span>({employee.domainWithSubDomain.subDomain.name})</span>}
        </>
        : `N/A`

    const body = (
        <>
            <Avatar
                className={classes.avatar}
                src={employee?.profileImage}
                size={60}
                radius={"50%"}
            />
            <Group position="right">
                <Badge color="pink" variant="light">
                    {employee?.employeeTypes.employmentType ? employee?.employeeTypes.employmentType : "N/A"}
                </Badge>
            </Group>

            <Stack spacing={0}>
                <Text>{employee?.userCode ? employee?.userCode : "N/A"}</Text>
                <Title order={3} style={{ cursor: "pointer" }} onClick={() => onClickHandler()}>{employee?.name}</Title>
                <Group spacing={"5px"}>
                    <Text>{employee?.designations.name}</Text>
                    {employee?.designations.name && <Text>|</Text>}
                    <Text>{getEmployeeDomainAndSubDomain}</Text>
                </Group>
            </Stack>
            <Card.Section withBorder inheritPadding mt={"md"}>
                <Group spacing={0}>
                    <UnstyledButton className={classes.actionBtns} w={"50%"}>
                        <Tooltip label={employee.mobileNumber ? employee.mobileNumber : "Mobile number is not available"}>
                            <Group spacing={"5px"}>
                                <IconPhone size={"1rem"}></IconPhone>
                                <Text>Phone</Text>
                            </Group>
                        </Tooltip>
                    </UnstyledButton>
                    <UnstyledButton className={classes.actionBtns} w={"50%"}>
                        <Tooltip label={employee.emailId}>
                            <Group spacing={"5px"}>
                                <IconMail size={"1rem"}></IconMail>
                                <Text>Email</Text>
                            </Group>
                        </Tooltip>
                    </UnstyledButton>
                </Group>
            </Card.Section>
        </>
    )
    /** if ref is there (last element is the list) then attach the ref to the element */
    const content = ref
        ? <Card ref={ref} shadow="sm" padding="lg" radius="md" withBorder className={cx(`user-${employee?.userId}`, classes.card)} data-item="true">{body}</Card>
        : <Card shadow="sm" padding="lg" radius="md" withBorder className={cx(`user-${employee?.userId}`, classes.card)} data-item="true">{body}</Card>

    return content;
})

export default SingleEmployeeCard;
