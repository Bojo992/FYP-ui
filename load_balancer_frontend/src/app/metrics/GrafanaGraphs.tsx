'use client'

import React from "react";

export default function GrafanaEmbed() {
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true); // Only execute this on the client
    }, []);

    if (!isClient) {
        return null; // Return nothing during SSR
    }

    return (
        <div className={"grid grid-rows-2 gap-x-1 gap-y-3 p-3"}>
            <div className={"flex flex-row gap-x-1 gap-y-3 p-3 justify-around"}>
                <iframe
                    src="http://localhost:5000/d-solo/KdDACDp4z/asp-net-core?orgId=1&timezone=browser&var-job=MyASPNETApp&var-instance=host.docker.internal:7000&panelId=58&__feature.dashboardSceneSolo"
                    width="600" height="350" frameBorder="0"></iframe>
                <iframe
                    src="http://localhost:5000/d-solo/KdDACDp4z/asp-net-core?orgId=1&timezone=browser&var-job=MyASPNETApp&var-instance=host.docker.internal:7000&panelId=40&__feature.dashboardSceneSolo"
                    width="600" height="350" frameBorder="0"></iframe>
                <iframe
                    src="http://localhost:5000/d-solo/KdDACDp4z/asp-net-core?orgId=1&timezone=browser&var-job=MyASPNETApp&var-instance=host.docker.internal:7000&panelId=51&__feature.dashboardSceneSolo"
                    width="600" height="350" frameBorder="0"></iframe>
            </div>
            <div className={"flex flex-row gap-x-1 gap-y-3 p-3 justify-around"}>
                <iframe
                    src="http://localhost:5000/d-solo/KdDACDp4z/asp-net-core?orgId=1&timezone=browser&var-job=MyASPNETApp&var-instance=host.docker.internal:7000&panelId=49&__feature.dashboardSceneSolo"
                    width="600" height="350" frameBorder="0"></iframe>
                <iframe
                    src="http://localhost:5000/d-solo/KdDACDp4z/asp-net-core?orgId=1&timezone=browser&var-job=MyASPNETApp&var-instance=host.docker.internal:7000&panelId=55&__feature.dashboardSceneSolo"
                    width="600" height="350" frameBorder="0"></iframe>
            </div>
        </div>
    );
}
