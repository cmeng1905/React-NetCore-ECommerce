import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../hooks/hooks'
import { currencyTRY } from '../../utils/formatCurrency';

export default function Info() {
    const { cart } = useAppSelector(state => state.cart);
    const subTotal = cart?.cartItems.reduce((toplam, item) => toplam + (item.quantity * item.price), 0) ?? 0;
    return (
        <>
            <Typography variant='subtitle2' sx={{ color: "text.secondary" }}>Toplam</Typography>
            <Typography variant='h5' gutterBottom>
                {currencyTRY.format(subTotal)}
            </Typography>
            <List>
                {
                    cart?.cartItems.map(item => (
                        <ListItem key={item.productId} sx={{ py: 1, px: 0 }}>
                            <ListItemAvatar>
                                <Avatar variant="square" src={`http://localhost:5267/images/${item.imageUrl}`} />
                            </ListItemAvatar>
                            <ListItemText sx={{ mr: 2 }} primary={item.name} secondary={`${item.quantity} x ${currencyTRY.format(item.price)}`} />
                        </ListItem>
                    ))
                }
            </List>
        </>
    )
}
