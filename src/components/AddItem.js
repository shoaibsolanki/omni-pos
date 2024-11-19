import React, { useState } from "react";
import Select, { useStateManager } from "react-select";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { handleAddItemToStoreRequest } from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { FcDepartment } from "react-icons/fc";

const AddItem = () => {
  const dispatch = useDispatch();
  const [selectedOptionDiscount, setSelectedOptionDiscount] = useState(null);
  const [selectedOptionTax, setSelectedOptionTax] = useState(null);
  const [itemName, setItemName] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedHSNTax, setSelectedHSNTax] = useState(null);
  const [itemCode, setItemCode] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [ItemTax, setItemTax] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  // const [hsnCode, setHsnCode] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [storeId] = useState("store456");
  const [saasId] = useState("saas123");

  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];
  const optionsDiscount = [
    { value: "1.1", label: "1.1" },
    { value: "1.2", label: "1.2" },
    { value: "1.3", label: "1.3" },
  ];
  const optionsTax = [
    { value: "1.5", label: "1.5" },
    { value: "1.6", label: "1.6" },
    { value: "1.7", label: "1.7" },
  ];
  const optionsHSN = [
    { value: "HSN 1.5", label: "HSN 1.5" },
    { value: "HSN 1.6", label: "HSN 1.6" },
    { value: "HSN 1.7", label: "HSN 1.7" },
  ];

  const generateUUid = () => {
    const randomId = Math.floor(Math.random() * 1000000000000000);
    console.log("RANDOM ID", randomId);
    setItemCode(randomId);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    // console.log(selectedOptionDiscount.value);
    // console.log("TAX CODE", selectedOptionTax.value);
    // console.log("ITEM CODE", itemCode);
    // console.log("ITEM DESC", itemDesc);
    // console.log("ITEM PRICE", itemPrice);
    // console.log("TAX PERCENTAGE", taxPercentage);
    // console.log("STORE ID", storeId);
    // console.log("SAAS ID", saasId);
    // console.log("DISCOUNT", selectedOptionDiscount.value);

    dispatch(
      handleAddItemToStoreRequest({
        item_name: itemName,
        item_code: Number(itemCode),
        description: itemDesc,
        price: Number(itemPrice),
        discount: Number(selectedOptionDiscount.value),
        tax: Number(selectedOptionTax.value),
        tax_code: Number(taxPercentage),
        status: "active",
        saas_id: "saas123",
        store_id: storeId,
        promo_id: saasId,
        sku: "SKU123",
        department: department,
      })
    );
    setItemName("");
    setItemPrice("");
    setItemCode("");
    setItemDesc("");
    setItemDesc("");
    setDepartment("");
    setSelectedOptionDiscount(null);
    setSelectedHSNTax(null);
    setSelectedOptionTax(null);
  };

  return (
    <>
      <div style={{ width: "100vw" }}>
        <div style={{ maxWidth: "500px", margin: "auto" }}>
          {/* <section>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12"> */}
          <form className="form-box" onSubmit={handleAddItem}>
            <h2>Add Item </h2>

            <input
              type="text"
              className="form-control mt-4"
              id="customer-name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Item Name"
            />
            <input
              type="text"
              className="form-control mt-4"
              id="customer-name"
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
              placeholder="Item Code"
            />
            <button
              type="button"
              className="btn btn-primary btn-sm my-2"
              onClick={() => generateUUid()}
            >
              Generate item code
            </button>
            <textarea
              type="text"
              className="form-control"
              id="customer-name"
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
              placeholder="Item Description"
            />
            <input
              type="text"
              className="form-control my-4"
              id="customer-name"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              placeholder="Item Price"
            />

            <input
              type="text"
              className="form-control mt-4"
              id="customer-name"
              value={ItemTax}
              onChange={(e) => setItemTax(e.target.value)}
              placeholder="Tax Code"
            />
            <Select
              defaultValue={selectedOptionDiscount}
              onChange={setSelectedOptionDiscount}
              options={optionsDiscount}
              className="my-3"
              placeholder="Discount"
              isClearable={true}
              required
            />
            <Select
              defaultValue={selectedOptionTax}
              onChange={setSelectedOptionTax}
              options={optionsTax}
              className="my-3"
              required
              placeholder="Tax"
            />
            <Select
              defaultValue={selectedHSNTax}
              onChange={setSelectedHSNTax}
              options={optionsHSN}
              className="my-3"
              required
              placeholder="HSN Code"
            />

            <input
              type="text"
              className="form-control my-4"
              id="customer-name"
              value={taxPercentage}
              onChange={(e) => setTaxPercentage(e.target.value)}
              placeholder="TAX Percent"
            />
            <input
              type="text"
              className="form-control my-4"
              id="customer-name"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Department"
            />

            <button
              //  variant="secondary"
              style={{
                backgroundColor: "#20b9e3",
                outline: "none",
                border: "none",
                fontSize: "20px",
                padding: "10px 20px",
                borderRadius: "10px",
                color: "#fff",
              }}
            >
              Close
            </button>
          </form>
        </div>
      </div>
      {/* </div>
    </section> */}
    </>
  );
};

export default AddItem;
