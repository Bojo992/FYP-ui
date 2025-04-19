'use client'

import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import DehazeIcon from '@mui/icons-material/Dehaze';
import AreaChartIcon from '@mui/icons-material/AreaChart';
import SettingsIcon from '@mui/icons-material/Settings';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useRouter} from "next/navigation";
import {resetConfig} from "@/app/Controllers/LoadBalancerConfigController";

export default function NavBar() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const router = useRouter();

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem key={"config"} disablePadding>
                    <ListItemButton onClick={() => router.push(`/`)}>
                        <ListItemIcon>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Config"}/>
                    </ListItemButton>
                </ListItem>
                <Divider/>
                <ListItem key={"metrics"} disablePadding>
                    <ListItemButton onClick={() => router.push(`/metrics`)}>
                        <ListItemIcon>
                            <AreaChartIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Metrics"}/>
                    </ListItemButton>
                </ListItem>
                <Divider/>
                <ListItem key={"reset"} disablePadding>
                    <ListItemButton onClick={() => { resetConfig().then(() => { window.location.reload(); router.push(`/`); }); } } >
                        <ListItemIcon>
                            <RotateLeftIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Reset Configuration"}/>
                    </ListItemButton>
                </ListItem>
                <Divider/>
            </List>
        </Box>
    );
    return (
        <div className="relative h-16 flex items-center bg-gray-400">
            <DehazeIcon onClick={toggleDrawer(true)} className="absolute left-4 cursor-pointer"/>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-semibold">
                Settings test
            </div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}