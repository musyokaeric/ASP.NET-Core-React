import { Typography, Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js";
import { StripeInput } from "./StripeInput";

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
                        variant='outlined'
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            inputComponent: StripeInput,
                            inputProps: {
                                component: CardNumberElement,
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id='expDate'
                        label='Expiry date'
                        fullWidth
                        autoComplete='cc-exp'
                        variant='outlined'
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            inputComponent: StripeInput,
                            inputProps: {
                                component: CardExpiryElement,
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id='cvv'
                        label='CVV'
                        helperText='Last three digits on signature strip'
                        fullWidth
                        autoComplete='cc-csc'
                        variant='outlined'
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            inputComponent: StripeInput,
                            inputProps: {
                                component: CardCvcElement,
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
}
