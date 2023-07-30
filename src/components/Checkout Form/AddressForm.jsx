import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import CustomTextField from './CustomTextField';
import { commerce } from '../library/Commerce';


const AddressForm = ({checkoutToken,next}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const methods=useForm();

    const fetchShippingCountries = async (checkoutTokenId) => {
        const response = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(response.countries);
      };

      const fetchSubdivisions = async (countryCode) => {
        const response = await commerce.services.localeListSubdivisions(countryCode);
        console.log(response.subdivisions)
        setShippingSubdivisions(response.subdivisions);
      };

      const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
        setShippingOptions(options);
        setShippingOption(options[0].id);
      };


      useEffect(()=>{
        fetchShippingCountries(checkoutToken.id)
      },[])
      useEffect(()=>{
        if(shippingCountry) fetchSubdivisions(shippingCountry)
      },[shippingCountry])

      useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
      }, [shippingSubdivision]);

     
      
  return (
    <>
        <Typography variant="h6" gutterBottom>Shipping address</Typography>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data)=>next({...data,shippingCountry,shippingSubdivision,shippingOption}))}>
                <Grid container spacing={3}>
                    <CustomTextField render  name='firstName' label='First Name' />
                    <CustomTextField  name='lastName' label='Last Name'/>
                    <CustomTextField  name='address1' label='Adress Line 1'/>
                    <CustomTextField  name='email' label='Email'/>
                    <CustomTextField  name='city' label='City'/>
                    <CustomTextField  name='zip' label='Zip/Postal Code'/>
                    <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Country</InputLabel>
               <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select> 
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
                </Grid>
                <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
            </form>
        </FormProvider>
    </>
  )
}

export default AddressForm