import Dialog from "@mui/material/Dialog";
import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function RemoveRouteDialog({handleClose, open, routeName}: {
    handleClose: () => void,
    open: boolean,
    routeName: string
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

                        const data = {
                            clusterId: routeName
                        };

                        console.log(JSON.stringify(data));

                        try {
                            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/remove-route', {
                                method: 'DELETE',
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
            <DialogTitle>Remove Route {routeName}</DialogTitle>
            <DialogContent>
               Are you sure you want to remove this route?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Accept</Button>
            </DialogActions>
        </Dialog>
    );
}