import React from 'react'
import {Card,CardMedia,CardContent,CardActions,Typography,IconButton} from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import useStyles from './styles'

const Product = ({prd,onAddToCart}) => {

    const classes=useStyles();
    const handleAddToCart = () => onAddToCart(prd.id, 1);
    
  return (
    <Card className={classes.root}>
        <CardMedia className={classes.media} image={prd.image.url} title={prd.name}/>
        <CardContent>
            <div className={classes.cardContent}>
                <Typography variant='h5' gutterBottom> 
                    {prd.name}
                </Typography>
                <Typography variant='h5'>
                    {prd.price.formatted_with_symbol}
                </Typography>
            </div>
            <Typography dangerouslySetInnerHTML={{__html:prd.description}} variant='body2' color='textSecondary'/>
        </CardContent>
        <CardActions disableSpacing className={classes.CardActions}>
            <IconButton aria-label='Add to Cart' onClick={handleAddToCart}>
                <AddShoppingCart/>
            </IconButton>
        </CardActions>
    </Card>
  )
}

export default Product