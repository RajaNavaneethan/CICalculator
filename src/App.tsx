import React from 'react';
import logo from './logo.svg';
import cic from './compound-interest-calculator.jpg'
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
// import  from "";
import NumberFormat from 'react-number-format';
import HSBarChart from './HSBarChart'
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';

import './App.css';
const HSBar = require('react-horizontal-stacked-bar-chart');
const mystyles = {
  width: '100%',
  height:'100%'
} as React.CSSProperties;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      opacity: 0.9
    },
  }),
);
const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
    marginRight: '15px'
  },
  thumb: {
    height: 24,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);



function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [wealth,setwealth]= React.useState(829.99);
  const [invAmount,setInv] = React.useState(10000);
  const [annReturn,setRet] = React.useState(8);
  const [invperiod,setPeriod] = React.useState(3);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const compoundInterest = (p:number, t:number, r:number, n:number) => {
    const amount = p * (Math.pow((1 + (r / n)), (n * t)));
    const interest = amount - p;
    setwealth(interest);
    console.log(p,t,r,n);
    return interest;
 };
  const changePeriod = (val:any) => {
    setPeriod(val);
    compoundInterest(invAmount,invperiod,annReturn/100,12);
  };
  const changeReturn = (val:any) => {
    setRet(val);
    compoundInterest(invAmount,invperiod,annReturn/100,12);
  };
  const changeInv = (val:any) => {
    // console.log(val)
    setInv(val.value);
    compoundInterest(invAmount,invperiod,annReturn/100,12);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="App">
      <div className="bg"></div>

      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={classes.modal}
        container={() => rootRef.current}
      >
        <div className={classes.paper}>
          <h2 id="server-modal-title">{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}Compound Interest Calculator{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}</h2>
          <h3 >Expected Amount<br/><span>{(Number(invAmount)+Number(wealth.toFixed(2))).toFixed(2)}</span></h3>
          <div className="flex">
            <h4 className="label">Amount Invested <br/><span>{invAmount}</span></h4>
            <h4 className="label1">Wealth Gained<br/><span>{wealth.toFixed(2)}</span></h4>
          </div>
          <HSBarChart value1={invAmount} value2={wealth}/>    
          <h4 className="label">Investment Amount</h4>
          <div className="flex">
          <NumberFormat onValueChange={(val)=>changeInv(val)}thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'₹'} value={invAmount} style={{padding:'10px',fontSize:'25px'}} />
          </div>
          <h4 className="label">Expected Annual Returns</h4>
          <div className="flex">
            <PrettoSlider min={0} value={annReturn} step={0.5} max={50} onChange={(e,val)=>changeReturn(val)}valueLabelDisplay="auto" aria-labelledby="pretto slider" defaultValue={1} />
            <span>
            <TextField
              id="outlined-read-only-input"
              label=""
              defaultValue={annReturn}
              value={annReturn}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            </span>
          </div>
          <h4 className="label">Investment Period</h4>
          <div className="flex">
          <PrettoSlider min={3} value={invperiod} step={0.5} max={60} onChange={(e,val)=>changePeriod(val)} valueLabelDisplay="auto" aria-labelledby="pretto slider" defaultValue={1} />
            <span>
            <TextField
              id="outlined-read-only-input"
              label=""
              defaultValue={invperiod}
              value={invperiod}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
