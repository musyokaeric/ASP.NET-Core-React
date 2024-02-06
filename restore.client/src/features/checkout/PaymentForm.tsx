import { Typography, Grid, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import { CardNumberElement } from "@stripe/react-stripe-js";

export default function PaymentForm() {
    const { control } = useFormContext();

    return (
        <>
            <Typography variant='h6' gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <AppTextInput name='nameOnCard' label='Name on card' control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id='cardNumber'
                        label='Card number'
                        fullWidth
                        autoComplete='cc-number'
                        variant='standard'
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                            inputComponent: CardNumberElement,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id='expDate' label='Expiry date' fullWidth autoComplete='cc-exp' variant='standard' />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id='cvv' label='CVV' helperText='Last three digits on signature strip' fullWidth autoComplete='cc-csc' variant='standard' />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel control={<Checkbox color='secondary' name='saveCard' value='yes' />} label='Remember credit card details for next time' />
                </Grid>
            </Grid>
        </>
    );
}
