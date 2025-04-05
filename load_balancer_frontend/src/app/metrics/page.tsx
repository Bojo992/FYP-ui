'use client'

import dynamic from "next/dynamic"; // Import dynamic from Next.js
import NavBar from "@/app/component/NavBar";

// Dynamically import the GrafanaEmbed component without SSR
const GrafanaEmbed = dynamic(() => import("@/app/metrics/GrafanaGraphs"), { ssr: false });

export default function MainMetrics() {
    return (
        <div className="bg-[#181b1f] h-screen">
            <NavBar />
            <GrafanaEmbed />
        </div>
    );
}

// function GrafanaEmbed() {
//     const [isClient, setIsClient] = React.useState(false);
//
//     React.useEffect(() => {
//         setIsClient(true); // Only execute this on the client
//     }, []);
//
//     if (!isClient) {
//         return null; // Return nothing during SSR
//     }
//
//     return (
//         <iframe
//             src="http://localhost:3000/d-solo/KdDACDp4z/asp-net-core?orgId=1&from=1743431635603&to=1743431935603&timezone=browser&var-job=MyASPNETApp&var-instance=host.docker.internal:7000&panelId=58&__feature.dashboardSceneSolo"
//             width="450" height="200" frameBorder="0" className={"p-5"}></iframe>
//     );
// }