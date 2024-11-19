import React, { useState, useEffect } from 'react'
import { 
  Typography, 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Box
} from '@mui/material'
import { styled } from '@mui/material/styles'
import DataService from "../../services/requestApi"
import FlipIcon from '@mui/icons-material/Flip';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
const products = {
    '123456': { name: 'T-Shirt', price: 19.99 },
    '789012': { name: 'Jeans', price: 49.99 },
    '345678': { name: 'Sneakers', price: 79.99 },
  }

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  }))
const Scanandbill = () => {

  const Cartitems = JSON.parse(localStorage.getItem('my-cart')) || []

    const [items, setItems] = useState(Cartitems)
    const [barcode, setBarcode] = useState('')
    const [currentTime, setCurrentTime] = useState(new Date())
    const { storeId,saasId } = JSON.parse(localStorage.getItem("User_data")) || {}
    useEffect(() => {
      const timer = setInterval(() => setCurrentTime(new Date()), 1000)
      return () => clearInterval(timer)
    }, [])
  
    const handleScan = (e) => {
      e.preventDefault()
      if (products[barcode]) {
        setItems([...items, { ...products[barcode], id: Date.now() }])
        setBarcode('')
      } else {
        alert('Product not found')
      }
    }
  
    const removeItem = (id) => {
      //remove item from cart by item_id from cart and update state by updating items array
      
        const updatedCartItems = items.filter(item => item.item_id!== id)
        localStorage.setItem('my-cart', JSON.stringify(updatedCartItems))
        setItems(updatedCartItems)
        setBarcode('')
      }

      // setItems(items.filter(item => item.id !== id))
    
  
    const subtotal = items.reduce((sum, item) => sum + item.price * item.product_qty, 0)
    const tax = subtotal * 0.1 // Assuming 10% tax
    const total = subtotal   // add tax if needed

    //api hit on scan item 
    const handleScanItem =async (e) => {
      e.preventDefault()
      try {
        const response = await DataService.Scanitembyid(storeId,saasId, barcode)
        console.log("Scanned item: ", response.data.data)
        //add item to cart in local storage my-cart if item already exists then update quantity else add new item
        const cartItems = JSON.parse(localStorage.getItem('my-cart')) || []
        const existingItem = cartItems.find(item => item.item_id === response.data.data[0].item_id)
        console.log("existing item: ", existingItem)
        if (existingItem) {
          existingItem.product_qty += 1
        } else {
          cartItems.push({...response.data.data[0], product_qty: 1 })
        }
        localStorage.setItem('my-cart', JSON.stringify(cartItems))
        setItems(cartItems)
        setBarcode('')
        
      } catch (error) {
        console.log("Error scanning item: ", error)
      }
    }


    //create function for increasing quantity of item in cart and decreasing quantity of item in cart 
    const handleIncreaseQuantity = (id) => {
      
      const updatedCartItems = items.map(item => item.item_id === id? {...item, product_qty: item.product_qty + 1 } : item)
      localStorage.setItem('my-cart', JSON.stringify(updatedCartItems))
      setItems(updatedCartItems)
    }
    const handleDecreaseQuantity = (id) => {
      //if product quantity is greater than 1 then decrease quantity else do nothing
      if(items.find(item => item.item_id === id).product_qty > 1){
        const updatedCartItems = items.map(item => item.item_id === id? {...item, product_qty: item.product_qty - 1 } : item)
        localStorage.setItem('my-cart', JSON.stringify(updatedCartItems))
        setItems(updatedCartItems)
      }
      // const updatedCartItems = items.map(item => item.item_id === id? {...item, product_qty: item.product_qty - 1 } : item)
      // localStorage.setItem('my-cart', JSON.stringify(updatedCartItems))
      // setItems(updatedCartItems)
    }


  return (
    <div>
         <Container maxWidth="lg">
     
      <StyledPaper elevation={3}>
        <form onSubmit={handleScanItem} style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Scan barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="contained" 
          >
            <FlipIcon className='mx-2'/> Scan
          </Button>
        </form>
        <TableContainer style={{height:'calc(100vh - 350px)' , overflowY:"auto"}} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="center">Qty</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.item_name}</TableCell>
                  <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton 
                        onClick={() => handleDecreaseQuantity(item.item_id)}
                        aria-label="decrease quantity"
                        size="small"
                      >
                      <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ mx: 1 }}>{item.product_qty}</Typography>
                      <IconButton 
                        onClick={() => handleIncreaseQuantity(item.item_id)}
                        aria-label="increase quantity"
                        size="small"
                        >
                        <AddIcon fontSize="small" />
                      </IconButton>
                        </Box>
                      </TableCell>
                  <TableCell align="right">₹{item.price?.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      onClick={() => removeItem(item.item_id)}
                      aria-label="remove item"
                    >
                      {'\u2715'}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mt: 3 }}>
          {/* <Typography variant="body1">Subtotal: ${subtotal.toFixed(2)}</Typography> */}
          {/* <Typography variant="body1">Tax (10%): ${tax.toFixed(2)}</Typography> */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', my: 1 }}>
            Total: ₹{total.toFixed(2)}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button variant="outlined">
              {'\u2715'} Cancel
            </Button>
            <Button variant="contained" color="primary">
             Complete Sale
            </Button>
          </Box>
        </Box>
      </StyledPaper>
    </Container>
    </div>
  )
}

export default Scanandbill