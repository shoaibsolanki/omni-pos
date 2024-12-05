import React, { useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Barcode from 'react-barcode';

function GetItemBarcodeModal(props) {
    const componentRef = useRef(null);
    const { item, show} = props;

    const handleCustomPrint = () => {
        const printContent = componentRef.current.innerHTML;
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        printWindow.document.open();
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Print</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    .border {
                        border: 1px solid black;
                        margin: 5px;
                        padding: 5px;
                    }
                </style>
            </head>
            <body onload="window.print(); window.close();">
                ${printContent}
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if ((e.key === 'p' || e.key === 'P') && show) {
                e.preventDefault();
                handleCustomPrint();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [show]);

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                <div ref={componentRef}>
                    {item.map((row, index) => (
                        <Row key={index} className="border">
                            <Col>
                                <p>Description: {row.description}</p>
                                <p>MRP: {row.actual_price}</p>
                                <p>Offer Price: {row.price}</p>
                                <Barcode value={row.barcode} width={1.4} height={20} />
                            </Col>
                        </Row>
                    ))}
                </div>
                <div className="d-flex justify-content-end">
                    <button
                        style={{ backgroundColor: 'rgb(46, 69, 175)' }}
                        className="btn mt-10 p-2 text-white"
                        onClick={handleCustomPrint}
                    >
                        PRINT ( P )
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default GetItemBarcodeModal;
