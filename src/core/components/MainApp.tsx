import { useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    MediaQuery,
    Burger,
    useMantineTheme,
    Title,
} from '@mantine/core';
import Sidebar from './Sidebar';
import Routing from './Routing';

function MainApp() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            h={"100%"}
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                    height: "100%",
                },
                body: {
                    height: "100%"
                }
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 100, lg: 200 }}>
                    <Sidebar />
                </Navbar>
            }
            header={
                <Header height={{ base: 50, md: 70 }} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <Title order={3}>1Rivet</Title>
                    </div>
                </Header>
            }
        >
            <Routing />
        </AppShell>
    );
}

export default MainApp;