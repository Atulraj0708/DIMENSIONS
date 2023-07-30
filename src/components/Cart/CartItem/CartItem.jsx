import React from 'react'
import useStyles from './styles'
import {Card,Typography,Button,CardActions,CardContent,CardMedia } from '@material-ui/core';
const CartItem = ({item,onRemoveCart,onUpdateCart}) => {
    const classes=useStyles();
  return (
    <Card>
        <CardMedia image={item.image.url} alt={item.name} className={classes.media}/>
        <CardContent className={classes.cardContent}>
            <Typography variant='h4'>{item.name}</Typography>
            <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
            <div className={classes.buttons}>
                <Button type="button" size="small" onClick={()=>onUpdateCart(item.id,item.quantity-1)}>-</Button>
                <Typography>{item.quantity}</Typography>
                <Button type="button" size="small" onClick={()=>onUpdateCart(item.id,item.quantity+1)}>+</Button>
            </div>
            <Button variant="contained" type="button" color="secondary" onClick={()=>onRemoveCart(item.id)}>Remove</Button>
        </CardActions>
    </Card>
  )
}

export default CartItem