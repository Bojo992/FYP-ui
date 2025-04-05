import Dialog from "@mui/material/Dialog";
import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function AddRouteDialog({ handleClickClose, open }: { handleClickClose: () => void, open: boolean }) {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClickClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();

                            const formData = new FormData(event.currentTarget);
                            const data = {
                                routeId: formData.get('routeId'),
                                clusterId: formData.get('clusterId'),
                                path: formData.get('path')
                            };

                            console.log(JSON.stringify(data));

                            try {
                                const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/add-route', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(data),
                                });

                                if (!response.ok) {
                                    throw new Error('Failed to add direction');
                                }

                                console.log('Direction added!');
                                handleClickClose();
                            } catch (error) {
                                console.error('Error adding direction:', error);
                            }
                        },
                    },
                }}
            >
                <DialogTitle>Add Route</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="routeId"
                        name="routeId"
                        label="Route Id"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="clusterId"
                        name="clusterId"
                        label="Cluster Id (It has to exist)"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="path"
                        name="path"
                        label="Path to catch (example: /test/{**catch-all})"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}