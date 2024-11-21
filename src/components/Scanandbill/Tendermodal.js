'use client'

import React, { useEffect, useRef, useState } from 'react'
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
import ReceiptModal from './ReceiptModal'
import { useReactToPrint } from "react-to-print";
import { useDispatch, useSelector } from 'react-redux'
import { handleAccruvalRequest, handleClearLinkLoyaltyDetail, handleClearSearchCustomerData } from '../../redux/actions-reducers/ComponentProps/ComponentPropsManagement'
import moment from 'moment'
 const Tendermodal=({total,Cartitems,setItems})=> {
    const userData = JSON.parse(localStorage.getItem("User_data"));
    const [showRecepit, setShowRecepit] = useState(false)
     const [selectedTenders, setSelectedTenders] = useState({})
     const [totalAmount, setTotalAmount] = useState(0)
     const [isLoading, setIsLoading] = useState(false)
     const dispatch = useDispatch();
     const { link_loyalty_detail } = useSelector(
      (e) => e.ComponentPropsManagement
    );
    const { search_customer_data } = useSelector(
      (e) => e.ComponentPropsManagement
    );
     const Diubalance = total - totalAmount
     const [open, setOpen] = useState(false)
     const [invoiceno, setInvoiceno] = useState("")
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

  const handlecloseReceipt = () => {
    //clrear cart and reset total and clear selectedTenders
    setShowRecepit(false)
    setSelectedTenders({})
    setTotalAmount(0)
    //clear cart from local storage
    localStorage.removeItem("my-cart")
    setItems([])
    dispatch(handleClearLinkLoyaltyDetail())
    dispatch(handleClearSearchCustomerData())
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

  const cartDataAcc = (cartData) => {
    if (cartData?.length > 0) {
      let arr = [];
      cartData.map((item) => {
        console.log("ITEM", item);

        arr.push({
          product_name: item.category,
          product_quantity: item.productQty,
          product_amount: item.price,
          product_non_sale_amount: item.discount == 0 ? item.price : "",
          product_sale_amount:
            item.discount > 0 ? item.price - item.discount : "",
          product_discount_amount: Number(
            item.discount > 0 ? item.discount : 0
          ),
          qr_sale_flag: true,
        });
      });
      return arr;
      // setSendValues(obj)
    }
    return [];
  };


  const HandelSaveTranSaction = async () => {
    setIsLoading(true)
    try {
        const ReqData = {
            registerId: userData && userData.registerId,
            storeId: userData && userData.storeId,
            saasId: userData && userData.saasId,
            tenderId: "TENDER1",
            tender: selectedTenders,
            cartItems: Cartitems,
            customerName:search_customer_data && search_customer_data?.name,
            customerNumber: search_customer_data &&search_customer_data?.mobile_number,
            loyalty_id:link_loyalty_detail && link_loyalty_detail?.loyalty_id,
          }

        const response = await DataService.HandelSaveTransaction(ReqData);
        if(response.data.status){

          setIsLoading(false)
          handleClose()
          setInvoiceno(response.data?.data?.transaction_id)
          setShowRecepit(true)
          if(link_loyalty_detail && Object.keys(link_loyalty_detail).length > 0){
            console.log("Loyaliy check", link_loyalty_detail );
            console.log("loyalty_id", link_loyalty_detail)
            const Tenderarray = Object.keys(selectedTenders).map(key => ({
              tender_name: key,
              tender_value: selectedTenders[key]
          }));
            dispatch(
              handleAccruvalRequest({
                link_loyalty_detail,
                client_id: userData && userData.saasId,
                source_channel: "POS",
                register_id: userData && userData.registerId,
                total_invoice_amount: Number(response.data?.data?.total_amount),
                store_id: Number(userData && userData.storeId),
                business_date: moment(new Date()).format("YYYY-MM-DD"),
                invoice_no:response.data?.data?.transaction_id,
                source_app: "POS",
                concept_code: Number(1),
                source_function: "POST",
                country: link_loyalty_detail.country?.toUpperCase(),
                reference_number:response.data?.data?.transaction_id,
                territory_code: "INR",
                remarks: "GOOD",
                product: cartDataAcc(Cartitems),
                transaction_type: "PURCHASE",
                program_name: "campaign name",
                base_currency: link_loyalty_detail.base_currency,
                tender: Tenderarray,
              })
            );
          }
        }else{
          setIsLoading(false)
          setShowAlert({
            show: true,
            message: response.data.message,
            icon:"error"
          })
          setTimeout(() => {
            setShowAlert({
              show: false,
              message: "",
              icon:"" 
            })
          }, 2000);
        }
       

       
    } catch (error) {
      setIsLoading(false)

        console.log("Error: ", error)
    }
  }

  const header = {
    container: {
      fontFamily: "Courier New, monospace",
      fontSize: "small",
    },
    text: {
      fontFamily: "Courier New, monospace",
      fontSize: "small",
    },
  };


  return (
    <div>
      <Button variant="contained" color='primary'  onClick={handleClickOpen}>
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
          { "Choose Payment Methods"}
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
          <Button disabled={isLoading} onClick={HandelSaveTranSaction} variant="contained" color="primary">
            Generate Bill
          </Button>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
          <Typography variant="h6">
            Total: ₹{totalAmount?.toFixed(2)}
          </Typography>
          <Typography variant="h6">
           Invoice  Total: ₹{total?.toFixed(2)}
          </Typography>
        </DialogActions>
      </Dialog>

      {/* Printe Modal or Dialog Starting  */}
      <Dialog open={showRecepit}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md">
       <DialogContent>
       <div>
      {/* Content to print */}
      <ReceiptModal customer={search_customer_data} handlecloseReceipt={handlecloseReceipt} products={Cartitems}  invoiceNo={invoiceno} optionTick={optionArray} selected={selectedTenders}  />
    </div>
        
        </DialogContent>
      
      </Dialog>

    </div>
  )
}
export default Tendermodal