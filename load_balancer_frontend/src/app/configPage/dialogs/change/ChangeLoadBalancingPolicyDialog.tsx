import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {fetchConfig} from "@/app/Controllers/LoadBalancerConfigController";
import LBConfigProps from "@/app/util/LBConfigProps";

export default function ChangeLoadBalancingPolicyDialog({handleClose, open, selectedCluster, configProps}: {
    handleClose: () => void,
    open: boolean,
    selectedCluster: {
        clusterName: string,
        clusterLoadBalancingPolicy: string
    },
    configProps: LBConfigProps
}) {
    const [selectedValue, setSelectedValue] = React.useState<string>(selectedCluster.clusterLoadBalancingPolicy);
    console.log(selectedCluster, "bojo");

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();

                        const data = {
                            clusterId: selectedCluster.clusterName,
                            loadBalancingPolicy: selectedValue,
                        };

                        try {
                            await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/update-cluster-load-balancing-policy', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(data),
                            }).then(async (response) => {
                                console.log(selectedValue, "bojo", "On submit");
                                if (!response.ok) {
                                    throw new Error(JSON.stringify(response.body));
                                }

                                let config = await fetchConfig() as IConfig;

                                console.log(JSON.stringify(response.body), config, "bojo");

                                configProps.setConfig(config);
                            });

                            console.log('Direction added!');
                            handleClose();
                        } catch (error) {
                            console.error('Error adding direction:', error);
                        }
                    },
                },
            }}
        >
            <DialogTitle>Add Cluster</DialogTitle>
            <DialogContent>
                <Box sx={{minWidth: 120}}>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Load Balancing Policy
                        </InputLabel>
                        <NativeSelect
                            value={selectedValue}
                            onChange={(e) => {setSelectedValue(e.target.value); console.log(e.target.value, "bojo", "onChange");}}
                            inputProps={{
                                name: 'Load Balancing Policy',
                                id: 'loadBalancingPolicy',
                            }}
                        >
                            <option value={"RoundRobin"}>Round Robin</option>
                            <option value={"Random"}>Random</option>
                            <option value={"IPHashing"}>IP Hashing</option>
                            <option value={"DynamicLoadBalancing"}>Dynamic Load Balancing</option>
                        </NativeSelect>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
}