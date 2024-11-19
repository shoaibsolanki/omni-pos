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
    const [items, setItems] = useState([])
    const [barcode, setBarcode] = useState('')
    const [currentTime, setCurrentTime] = useState(new Date())
    const {storeId,saasId} = localStorage.getItem('Store_data') || {}
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
      setItems(items.filter(item => item.id !== id))
    }
  
    const subtotal = items.reduce((sum, item) => sum + item.price, 0)
    const tax = subtotal * 0.1 // Assuming 10% tax
    const total = subtotal + tax

    //api hit on scan item 
    const handleScanItem =async (itemId) => {
      try {
        const response = await DataService.Scanitembyid(storeId,saasId, itemId)
        console.log("Scanned item: ", response.data.data)
      } catch (error) {
        console.log("Error scanning item: ", error)
      }
    }


  return (
    <div>
         <Container maxWidth="lg">
     
      <StyledPaper elevation={3}>
        <form onSubmit={handleScan} style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
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
            {'\u2315'} Scan
          </Button>
        </form>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      onClick={() => removeItem(item.id)}
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
          <Typography variant="body1">Subtotal: ${subtotal.toFixed(2)}</Typography>
          <Typography variant="body1">Tax (10%): ${tax.toFixed(2)}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', my: 1 }}>
            Total: ${total.toFixed(2)}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button variant="outlined">
              {'\u2715'} Cancel
            </Button>
            <Button variant="contained" color="primary">
              {'\u1F6D2'} Complete Sale
            </Button>
          </Box>
        </Box>
      </StyledPaper>
    </Container>
    </div>
  )
}

export default Scanandbill