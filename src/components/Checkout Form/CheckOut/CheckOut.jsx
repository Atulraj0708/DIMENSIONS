import React,{useState,useEffect} from 'react'
import { Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button,CssBaseline} from '@material-ui/core'
import useStyles from './styles'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../library/Commerce';
import { Link ,useNavigate} from 'react-router-dom';

const steps=['Shipping Address','Payment Details'];

const CheckOut = ({cart,order,onCaptureCheckOut,error}) => {
  const classes=useStyles();
  const [activeStep,setActiveState]=useState(0);
  const [checkoutToken,setCheckoutToken]=useState(null)
  const [shippingData,setShippingData]=useState({})
  const [isFinished,setIsFinished]=useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
          setCheckoutToken(token);
        } catch {
           if (activeStep !== steps.length) navigate.pushState('/');
        }
      };

      generateToken();
    }
  }, [cart]);

  const nextStep=()=>setActiveState((prevActiveStep)=>prevActiveStep+1);
  const backStep=()=>setActiveState((prevActiveStep)=>prevActiveStep-1);

  const next=(data)=>{
    setShippingData(data);
    nextStep();
  }
  const timeout=()=>{
    setTimeout(()=>{
      setIsFinished(true);
    },3000)
  }
  const Form=()=>activeStep===0?<AddressForm checkoutToken={checkoutToken} next={next}/>:<PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckOut} timeout={timeout}/>

  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : isFinished ? (
    <>
    <div>
    <Typography variant="h5">Thank you for your purchase</Typography>
    <Divider className={classes.divider} />
  </div>
  <br />
  {/* <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button> */}
  </>
  ):(
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );
  }

    return (
    <>
    <CssBaseline/>
    <div className={classes.toolbar} />
    <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Typography variant='h4' align='center'>
              CheckOut
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((step)=>(
                  <Step key={step}>
                    <StepLabel>{step}</StepLabel>
                  </Step>
                ))
              }
            </Stepper>
            {activeStep===steps.length?<Confirmation/>: checkoutToken &&  <Form/>}
        </Paper>
    </main>
    </>
  )
}

export default CheckOut