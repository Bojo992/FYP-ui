import Dialog from "@mui/material/Dialog";
import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function ChangeRouteDialog({handleClose, open, selectedRoute}: {
    handleClose: () => void,
    open: boolean,
    selectedRoute: { routeName: string; routeMatchPath: string, routeCluster: string }
}) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();

                        const formData = new FormData(event.currentTarget);
                        const data = {
                            routeName: selectedRoute.routeName,
                            routeMatch: formData.get('routePath'),
                            clusterId: formData.get('clusterName'),
                        };

                        console.log(JSON.stringify(data));

                        try {
                            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/update-route', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(data),
                            });

                            if (!response.ok) {
                                throw new Error('Failed to add direction');
                            }

                            // Optionally show success message here
                            console.log('Direction added!');
                            handleClose();
                        } catch (error) {
                            console.error('Error adding direction:', error);
                        }
                    },
                },
            }}
        >
            <DialogTitle>Change {selectedRoute.routeName}</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    margin="dense"
                    id="routePath"
                    name="routePath"
                    label="Route Path"
                    defaultValue={selectedRoute.routeMatchPath}
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    id="clusterName"
                    name="clusterName"
                    label="Cluster Name"
                    defaultValue={selectedRoute.routeCluster}
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
}