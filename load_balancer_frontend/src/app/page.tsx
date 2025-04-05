'use client'

import * as React from 'react';
import NavBar from "@/app/component/NavBar";
import {fetchConfig} from "@/app/Controllers/LoadBalancerConfigController";
import {MockConfig} from "@/app/mock/mockData";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Clusters from "@/app/configPage/Clusters";
import Routes from "@/app/configPage/Routes";
import LBConfigProps from "@/app/util/LBConfigProps";

//ToDo - add auto update to the config on change
export default function Home() {
    const [lb_config, setLbConfig] = React.useState<IConfig>(MockConfig);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const loadConfig = async () => {
            try {
                const config: IConfig = await fetchConfig();
                console.log(config);
                setLbConfig(config);
            } catch (error) {
                console.error("Error loading config:", error);
            } finally {
                setLoading(false);
            }
        };

        loadConfig();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex flex-col">
                <NavBar />
                <div className="flex-1 flex items-center justify-center">
                    <Stack spacing={2} direction="column" alignItems="center">
                        <CircularProgress size="5rem" />
                    </Stack>
                </div>
            </div>
        );
    }

    return (
        <div className={"grid grid-cols-1 gap-y-6"}>
            <NavBar/>
            <div className={"p-5"}>
                <Clusters lb_config={new LBConfigProps(lb_config!)}/>
                <Routes lb_config={new LBConfigProps(lb_config!)}/>
            </div>
        </div>
    );
}