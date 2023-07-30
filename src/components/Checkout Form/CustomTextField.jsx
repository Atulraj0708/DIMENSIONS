import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {Grid ,TextField} from '@material-ui/core';


function CustomTextField({ name, label }) {
  const { control } = useFormContext();


  return (
    <Grid item xs={12} sm={6}>
      <Controller
        render = {({ field})=> (
            <TextField
                fullWidth
                label={label}
                required
            />
        )}
        defaultValue=''
        name={name}
        control={control}
        label={label}
        fullWidth
        required
      />
    </Grid>
  );
}

export default CustomTextField;