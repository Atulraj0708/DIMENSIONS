import React from 'react'
import {Grid} from '@material-ui/core'
import Product from './Product/Product'
import useStyles from './styles'

const Products = ({prds,onAddToCart}) => {
    const classes=useStyles();
    if (!prds.length) return <p>Loading...</p>;
  return (
    <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Grid container justifyContent='center' spacing={4}>
            {
                prds.map((prd)=>(
                    <Grid item key={prd.id} xs={12} sm={6} md={4} lg={3}>
                        <Product prd={prd} onAddToCart={onAddToCart}/>
                    </Grid>
                ))
            }
        </Grid>
    </main>
  )
}

export default Products