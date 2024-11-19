import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles'
import { BASE_Url } from '../../../../URL';
import {
    Label,
  } from "reactstrap";

function UploadQr({show, setShow}) {
    const [imageSelected, setImageSelected] = useState('');

    const handleImageChange = (e) => {
      setImageSelected(e.target.files[0])
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
  
      const SaveImage=()=>{
        const { storeId } = JSON.parse(localStorage.getItem("User_data"));
        try {
          if(imageSelected){
            const formData = new FormData();
            formData.append("file", imageSelected);
            fetch(`${BASE_Url}/store-master/save-image/${storeId}`, {
              method: "POST",
              // headers: {
              //   "Content-Type": "application/json",
              // },
              body: formData,
            })
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
            
            setImageSelected("");
            setShow(false)
          }
        } catch (error) {
          
        }
       }
  return (
    
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Retailer QrCode</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Label style={{fontFamily: 'Merriweather'}}>
          Plz Upload Your UPI QrCode Scanner <span className="text-red"> * </span>
        </Label>
    <Button
          className="mb-2"
          component="label"
          variant="contained"
          style={{ width: "-webkit-fill-available" }}
        >
        Upload QR
          <VisuallyHiddenInput
            type="file"
            onChange={handleImageChange}
          />
        </Button>
    </Modal.Body>
    <Modal.Footer>
      <button className='btn btn-secondary' variant="secondary" onClick={handleClose}>
        Close
      </button>
      <button className='btn btn-primary' variant="primary" onClick={()=>SaveImage()}>
        Save QR
      </button>
    </Modal.Footer>
  </Modal>
  )
}

export default UploadQr