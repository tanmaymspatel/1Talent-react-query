import { useState } from 'react';
import {
    AppShell,
    Navbar,
    useMantineTheme,
} from '@mantine/core';
import Sidebar from './Sidebar';
import Routing from './Routing';
import MainHeader from './MainHeader';
import StartupPopup from '../../shared/components/StartupPopup';
/**
 * @returns main application structure including header, sidebar and routing 
 */
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
            header={<MainHeader opened={opened} setOpened={setOpened} />}
        >
            <Routing />
            < StartupPopup />
        </AppShell>
    );
}

export default MainApp;