import moment from "moment";
import React, { useEffect } from "react";
import { PrintProvider, Print } from "react-easy-print";

function ReceiptModal({totalDiscount,customer,products,optionTick, payment_mode,invoiceNo ,selected}) {
  // Static data to replace Redux store data

  const enrichedArray = optionTick.filter(option => selected.hasOwnProperty(option.value))
  .map(option => ({
    ...option,
    selectedAmount: selected[option.value],
  }));
  useEffect(() => {
  console.log("optionTick",enrichedArray)
  }, [optionTick])
  
  const { storeName,userId,userName } = JSON.parse(localStorage.getItem("User_data"));
  
  console.log(products)
  const totalamount = products.reduce((sum, item) => 
    sum + (Number(item.price) * Number(item.product_qty)), 0);
  const totalitemDis = products.reduce(
    (sum, item) => sum + item.discount * item.product_qty,
    0
  );
  const TotalGross = parseInt(totalamount) + parseInt(totalitemDis);
  const totalProductQty = products.reduce(
    (total, item) => total + parseInt(item.product_qty),
    0
  );
  const {
    saasId,
    haderLine1,
    haderLine2,
    haderLine3,
    haderLine4,
    futterLine1,
    futterLine2,
    futterLine3,
    futterLine4,
    futterLine5,
    futterLine6,
    futterLine7,
    futterLine8,
    futterLine9,
    futterLine10,
  } = JSON.parse(localStorage.getItem("Store_data"));
  

  const styles = {
    fontFamily: "Verdana",
    fontSize: "medium",
    fontWeight: "bold",
  };

  const customLineStyle = {
    border: "1px solid black",
    margin: "8px 0",
  };
  const table = {
    border: "1px solid black",
    margin: "8px 0",
  };
  const receiptContent = (
    <div style={styles}>
      <p
        style={{ fontSize: "1.6rem" }}
        className="d-flex  justify-content-around fw-bold"
      >
        {storeName}
      </p>
      <p
        style={{ fontSize: "1.4rem" }}
        className="d-flex  justify-content-around fw-bold"
      >
        {haderLine1}
      </p>
      <p
        style={{ fontSize: "1.25rem" }}
        className="d-flex  justify-content-around fw-bold"
      >
        {" "}
        {haderLine2}
      </p>
      <p
        style={{ fontSize: "1.25rem" }}
        className="d-flex  justify-content-around fw-bold"
      >
        {haderLine3}
      </p>
      <p
        style={{ fontSize: "1.25rem" }}
        className="d-flex  justify-content-around fw-bold"
      >
        {haderLine4}
      </p>

      {/* <div className="container mt-3" style={{ fontSize: "1.2rem" }}>
        {customer?.name && (
          <div className="col">
            <div className="col  fw-bold">
              <p className="fw-bold">Customer Name: {customer?.name}</p>
            </div>
            <div className="col  fw-bold">
              <p className="fw-bold">
                Customer Mobile Number: {customer?.mobile_number}
              </p>
            </div>
          </div>
        )}

      </div> */}
      {customer?.mobile_number && (
        <>
        <div className="fw-bold mt-5" style={customLineStyle}></div>
        <div className="d-flex justify-content-between fw-bold text-nowrap">
          {/* <p> Name: {customer?.name}</p> */}
          <p> Mobile Number: {customer?.mobile_number}</p>

        </div>
        </>
      )}
      <div className="fw-bold mt-2" style={customLineStyle}></div>
      <div className="d-flex justify-content-center fw-bold text-nowrap">
          <p>Date: {moment(Date.now()).format("DD/MM/YYYY,h:mm")}</p>
          {/* <p>{orderType}: {tableNo}</p> */}

        </div>
        <div className={`d-flex justify-content-${saasId !=="12" ?"between":"center" } fw-bold text-nowrap`}>
      <p>Cashier: {userName}</p>
      <p  className="d-flex justify-center">Bill No:{invoiceNo}</p>

        </div>
      <div className="fw-bold mt-2" style={customLineStyle}></div>

      <table className="w-100  mx-md-auto" style={{ fontSize: "1.2rem" }}>
        <thead>
          <tr className="border-dark" style={{ borderBottomWidth: "2px" }}>
            <th>Item</th>
            <th className="px-3">Qty</th>
            <th className="px-3">Rate</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((el) => {
              return (
                <>
                  {" "}
                  {el.product_qty > 0 && (
                    <>
                      <tr className="fw-bold">
                        <td style={{ fontSize: "1rem" }}>{el?.item_name}</td>
                        <td
                          className="text-center"
                          style={{ fontSize: "1rem" }}
                        >
                          {el.product_qty}
                        </td>
                        <td style={{ fontSize: "1rem" }}>{el.price}</td>
                        <td style={{ fontSize: "1rem" }}>
                          {el.price * el.product_qty}
                        </td>
                      </tr>
                      {/* <tr className="fw-bold">
                        <td
                          colSpan={el.discount === 0 ? "4" : "2"}
                          className="m-0"
                          style={{ fontSize: "1rem" }}
                        >
                          {el.item_name.slice(0, 25)}
                        </td>
                        {el.discount > 0 && (
                          <>
                            <td>
                              Disc {el?.Discountper && el.Discountper}
                              {el?.Discountper && "%"}
                            </td>
                            <td>{el.discount * el.productQty}</td>{" "}
                          </>
                        )}
                      </tr> */}
                    </>
                  )}
                </>
              );
            })}
        </tbody>
      </table>

      <div className="fw-bold" style={customLineStyle}></div>

      <div className="container" style={{ fontSize: "1.25rem" }}>
        <div className="d-flex justify-content-between fw-bold text-nowrap">
          <p>Qty</p>
          <p>{totalProductQty}</p>
   
          <p>Gross</p>
     
          <p>{totalamount}</p>

        </div>
        {totalDiscount && <div className="d-flex justify-content-between fw-bold text-nowrap">
          <p></p>
          <p></p>
          <p>Discount</p>
          <p>{totalDiscount}</p>
        </div>}
      </div>
      <div className="fw-bold mt-2" style={customLineStyle}></div>
      <div className="container mb-1 mt-1" style={{ fontSize: "1.2rem" }}>
        <p style={{ fontSize: "1.2rem" }}>Settlement</p>
        {enrichedArray &&
          enrichedArray.map((item) => {
            return (
              <div className="row fw-bold" key={item.option}>
                {/* {item.option === "Cash" ? ( */}
                  <div className="col text-nowrap">
                    <p>
                      {item.name}
                    </p>
                  </div>
                {/* ) : ( */}
                  <div className="col text-nowrap">
                    <p>{item.option}</p>
                  </div>
                {/* )} */}
                <div className="col">
                  <p className="float-end">  {item.selectedAmount}</p>
                </div>
              </div>
            );
          })}
      </div>
      
      {/* {orderType=="Online" &&
         <div className="container" style={{ fontSize: "1.25rem" }}>
      <div className="d-flex justify-content-between fw-bold text-nowrap">
          <p>Payment Method</p>
          <p>{payment_mode}</p>
        </div>
        </div>} */}

      <div className="fw-bold" style={customLineStyle}></div>

      {/* <div className="container" style={{ fontSize: "1.2rem" }}>
        <div className="col">
          {ChangeDue && (
            <div className="col p-2 fw-bold d-flex justify-content-between">
              <h5 className="fw-bold">Change Due: </h5>
              <h5 className="fw-bold">{ChangeDue} </h5>
            </div>
          )}
          {CutomerAmount && (
            <div className="col p-2 fw-bold d-flex justify-content-between">
              <h5 className="fw-bold">Customer Cash IQD: </h5>
              <h5 className="fw-bold">{CutomerAmount} </h5>
            </div>
          )}
          {UsdAmount?.value && (
            <div className="col p-2 fw-bold d-flex justify-content-between">
              <h5 className="fw-bold">Customer Cash USD: </h5>
              <h5 className="fw-bold">{UsdAmount.value} </h5>
            </div>
          )}
        </div>
      </div>

      <div className="container" style={{ fontSize: "1.1rem" }}>
        <div className="row">
          <p
            className="text-nowrap text-center"
            style={{
              fontSize: "0.9rem",
            }}
          >
            Date: {moment(Date.now()).format("DD/MM/YYYY,h:mm:ss a")} (
            {userName})
          </p>
          <div className="d-flex justify-content-center">
          </div>
        </div>
      </div> */}

      {/* <div className="fw-bold" style={customLineStyle}></div> */}

      <div className="container py-2 fw-bold" style={{ fontSize: "1.1rem" }}>
        <div className="row">
          <p
            style={{ fontSize: "1rem" }}
            className="d-flex  justify-content-center fw-bold m-0"
          >
            {futterLine1}{" "}
          </p>
          <p
            style={{ fontSize: "1rem" }}
            className="d-flex  justify-content-center fw-bold m-0"
          >
            {" "}
            {futterLine2}
          </p>
          <p
            style={{ fontSize: "1rem" }}
            className="d-flex  justify-content-center fw-bold m-0"
          >
            {futterLine3}
          </p>
          <p
            style={{ fontSize: "1rem" }}
            className="d-flex  justify-content-center fw-bold m-0"
          >
            {" "}
            {futterLine4}{" "}
          </p>
          <p
            style={{ fontSize: "1rem" }}
            className="d-flex  justify-content-center fw-bold m-0"
          >
            {futterLine5}
          </p>
          <p
            style={{ fontSize: "1rem" }}
            className="d-flex  justify-content-center fw-bold m-0"
          >
            {" "}
            {futterLine6}
          </p>
          <p
            style={{ fontSize: "1rem" }}
            className="d-flex  justify-content-center fw-bold m-0"
          >
            {" "}
            {futterLine7}
          </p>
          <p
            style={{ fontSize: "1rem" }}
            className="d-flex  justify-content-center fw-bold m-0"
          >
            {" "}
            {futterLine8}
          </p>
          <p
            style={{ fontSize: "1rem" }}
            className="d-flex  justify-content-center fw-bold m-0"
          >
            {" "}
            {futterLine9}
          </p>
          <p
            style={{ fontSize: "1rem" }}
            className="d-flex  justify-content-center fw-bold m-0"
          >
            {" "}
            {futterLine10}
          </p>
        </div>
      </div>
      {/* <hr className="mb-5" style={{ color: "black" }} /> */}

      {/* {newCredit?.creditNote_id && (
        <div>
          <div
            className="container "
            style={{ fontSize: "1.25rem", marginTop: "5rem" }}
          >
            <p
              style={{ fontSize: "1.6rem" }}
              className="d-flex  justify-content-around fw-bold"
            >
              {storeName}
            </p>
            <p
              style={{ fontSize: "1.4rem" }}
              className="d-flex  justify-content-around fw-bold"
            >
              {haderLine1}
            </p>
            <p
              style={{ fontSize: "1.25rem" }}
              className="d-flex  justify-content-around fw-bold"
            >
              {haderLine2}
            </p>
            <p
              style={{ fontSize: "1.25rem" }}
              className="d-flex  justify-content-around fw-bold"
            >
              {haderLine3}
            </p>
            <p
              style={{ fontSize: "1.25rem" }}
              className="d-flex  justify-content-around fw-bold"
            >
              {haderLine4}
            </p>
            <p
              style={{ fontSize: "1.25rem" }}
              className="d-flex  justify-content-around fw-bold"
            >
              REISSUED CREDIT NOTE
            </p>
            <div className="row  fw-bold">
              <div className="col">
                <div className="d-flex justify-content-center">
                
                </div>
              </div>

              <div className="fw-bold">********************************</div>
            </div>
            <div className="d-flex justify-content-between">
              <p>Amount</p>
              <span>{newCredit.credit_note_amount}</span>
            </div>
          </div>
          <div className="container" style={{ fontSize: "1.2rem" }}>
            <div className="col">
              <div className="col p-2 fw-bold">
                <p className="fw-bold">Authorised by : </p>
                <p className="fw-bold">Accounts : </p>
              </div>
            </div>
          </div>

          <div className="container" style={{ fontSize: "1.2rem" }}>
            <div className="col">
              <div className="col p-2 fw-bold">
                <p className="fw-bold">Not valid after 180 Days</p>

                <p className="fw-bold">
                  Valid upto: {moment(newCredit.EXP_DATE).format("DD/MM/YYYY")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );

  return (
    <PrintProvider>
      <Print>
        <div style={styles}>{receiptContent}</div>
      </Print>
    </PrintProvider>
  );
}

export default ReceiptModal;
