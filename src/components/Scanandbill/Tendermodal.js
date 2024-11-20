'use client'

import React, { useEffect, useState } from 'react'
import { IoCashOutline } from 'react-icons/io5'
import { SiPaytm, SiPhonepe, SiContactlesspayment } from 'react-icons/si'
import { FaGooglePay } from 'react-icons/fa'
import { BsCreditCardFill } from 'react-icons/bs'
import { FcSalesPerformance } from 'react-icons/fc'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Alert } from '@mui/material'
import DataService from '../../services/requestApi'
 const Tendermodal=({total,Cartitems})=> {
    const userData = JSON.parse(localStorage.getItem("User_data"));
     const [selectedTenders, setSelectedTenders] = useState({})
     const [totalAmount, setTotalAmount] = useState(0)
     const Diubalance = total - totalAmount
     const [open, setOpen] = useState(false)
     const [showalert, setShowAlert] = useState({
        show: false,
        message: "",
        icon:"",
     })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const optionArray = [
    {
      id: 1,
      name: "Cash",
      icon: <IoCashOutline size={25} />,
      value: "cash",
      isActive: true,
    },
    {
      id: 2,
      name: "Paytm",
      icon: <SiPaytm size={25} />,
      value: "paytm",
      isActive: true,
    },
    {
      id: 3,
      name: "Google Pay",
      icon: <FaGooglePay size={25} />,
      value: "googlepay",
      isActive: true,
    },
    {
      id: 4,
      name: "Phone Pay",
      icon: <SiPhonepe size={25} />,
      value: "phonepay",
      isActive: true,
    },
    {
      id: 5,
      name: "UPI",
      icon: <SiContactlesspayment size={25} />,
      value: "upi",
      isActive: true,
    },
    {
      id: 6,
      name: "Card",
      icon: <BsCreditCardFill size={25} />,
      value: "card",
      isActive: true,
    },
    {
      id: 7,
      name: "Credit Sale",
      icon: <FcSalesPerformance size={25} />,
      value: "credit_sale",
      isActive: true,
    },
    {
      id: 8,
      name: "Loyalty",
      icon: "1000", // Assuming link_loyalty_detail.balance_amount is 1000 for this example
      value: "loyalty",
      isActive: false,
      cardValue: 1000, // Assuming link_loyalty_detail.balance_amount is 1000 for this example
    },
  ]

  const handleTenderSelection = (value) => {
    
    setSelectedTenders(prev => {
      const newSelected = { ...prev };
      
      // Check if the key exists in the object, not its value
      if (value in newSelected) {
        delete newSelected[value]; // Remove the tender if it exists
      } else {
        if(Diubalance <= 0) {
            setShowAlert({
                show: true,
                message: "Insufficient Balance",
                icon:"error"
            })
            setTimeout(() => {
                setShowAlert({
                    show: false,
                    message: "",
                    icon:"" 
                })
            }, 2000);
            return newSelected
    }
        newSelected[value] = Diubalance; // Add the tender with a default value
      }
  
      return newSelected;
    });
  };
  
  

  const handleAmountChange = (value, amount) => {
    if(amount >total){
        return
    }
    setSelectedTenders(prev => ({
      ...prev,
      [value]: parseFloat(amount) || 0
    }))
  }

  useEffect(() => {
  console.log("selectedTenders: ", selectedTenders)
  calculateTotal()
  }, [selectedTenders])
  

  const calculateTotal = () => {
    const Selectedamount = Object.values(selectedTenders).reduce((sum, amount) => sum + amount, 0)
    setTotalAmount(Selectedamount)
  }

  //Handel save transcation for generate recipte 

  const HandelSaveTranSaction = async () => {
    try {
        const ReqData = {
            registerId: userData && userData.registerId,
            storeId: userData && userData.storeId,
            saasId: userData && userData.saasId,
            tenderId: "TENDER1",
            tender: selectedTenders,
            cartItems: Cartitems,
            customerName:"",
            customerNumber:"",
            loyalty_id:"",
          }

        const response = await DataService.HandelSaveTransaction(ReqData);
        console.log("Generate Sale Invoice", response.data);
       
    } catch (error) {
        console.log("Error: ", error)
    }
  }



  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Complete Sale
      </Button>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Choose Payment Methods"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Select multiple payment methods and enter amounts for each.
          </DialogContentText>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {optionArray.filter((el)=> el.isActive == true).map((option) => (
              <Grid item xs={6} sm={4} md={3} key={option.id}>
                <Button
                  variant={selectedTenders[option.value] !== undefined ? "contained" : "outlined"}
                  fullWidth
                  onClick={() => option.isActive && handleTenderSelection(option.value)}
                //   disabled={option.isActive}
                  sx={{ height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {typeof option.icon === 'string' ? option.icon : option.icon}
                    <Typography variant="caption">{option.name}</Typography>
                    {option.cardValue && (
                      <Typography variant="caption">Balance: {option.cardValue}</Typography>
                    )}
                  </Box>
                </Button>
              </Grid>
            ))}
          </Grid>
         {showalert.show && <Alert className='my-2' severity={showalert?.icon}>{showalert?.message}</Alert>}

          <Box sx={{ mt: 4 }}>
            {Object.entries(selectedTenders).map(([value, amount]) => (
              <Box key={value} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" sx={{ width: '100px', mr: 2 }}>
                  {optionArray.find(o => o.value === value)?.name}
                </Typography>
                <TextField
                  type="number"
                  value={amount || ''}
                  onChange={(e) => handleAmountChange(value, e.target.value)}
                  placeholder="Enter amount"
                  fullWidth
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 3 }}>
          <Button onClick={HandelSaveTranSaction} variant="contained" color="primary">
            Generate Bill
          </Button>
          <Typography variant="h6">
            Total: ₹{totalAmount?.toFixed(2)}
          </Typography>
          <Typography variant="h6">
           Invoice  Total: ₹{total?.toFixed(2)}
          </Typography>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default Tendermodal