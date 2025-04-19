import * as React from "react";
import {MockConfig} from "@/app/mock/mockData";
import {fetchConfig} from "@/app/Controllers/LoadBalancerConfigController";

export default function useConfig() {
    const [lb_config, setLbConfig] = React.useState<IConfig>(MockConfig);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
    const loadConfig = async () => {
      try {
        const config = await fetchConfig();
        setLbConfig(config);
      } catch (error) {
        console.error("Error loading config:", error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  return { lb_config, setLbConfig, loading, setLoading };
};