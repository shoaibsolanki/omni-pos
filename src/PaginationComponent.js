import React, { useState } from "react";
import { Container, Col, Card, Row, Button, Pagination } from "react-bootstrap";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { BASE_Url } from "./URL";
import "./style.css";
import {
  handlecartCount,
  nextPage,
  prevPage,
} from "./redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useLocation } from "react-router-dom";
import Product from "./components/Product";
// import { Pagination } from "reactstrap";
const renderData = (filterdetails,setSearchValue,setData,setUpdatecart,updatecart) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { page_number, total_count_page } = useSelector(
    (e) => e.ComponentPropsManagement
  );
 console.log("this catogary data🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️",filterdetails)

  //this is unUsed Code 
  // const addToCart = (item) => {

  //   const cart = JSON.parse(localStorage.getItem("my-cart")) || [];
  //   console.log(item, cart)
  //   const existingItem = cart.find(
  //     (cartItem) => cartItem.item_id === item.item_id
  //   );
  //   console.log(cart, item)
  //   if (existingItem) {
  //     console.log('if consdition')
  //     existingItem.productQty += 1;
  //   } else {
  //     console.log('else consdition')
  //     // window.location.reload();
  //     toast.success("Item Added");
  //     const newItem = { ...item, productQty: 1 };
  //     cart.push(newItem);

  //   }

  //   localStorage.setItem("my-cart", JSON.stringify(cart));

  //   dispatch(handlecartCount(cart.length));

  //   // setUpdatecart(!updatecart);
  //   // setSearchValue("");
  // };
  return (
    <div>
      <Product
      setSearchValue={setSearchValue}
      data={filterdetails}
      setData={setData}
      setUpdatecart={setUpdatecart}
      updatecart={updatecart}
      />
      {/* <div className="d-flex align-items-center justify-content-center mt-2 ">
        <Container>
          <Row xs={2} sm={4} md={4}>
            {filterdetails?.map((ele) => {
              return (
                <Col className="mt-5">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Card
                      style={{
                        borderRadius: "10px",
                        width: "12rem",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}

                    >
                      <Card.Img
                        className="cardCategory"
                        src={
                          `${BASE_Url}/item/get-image/${ele && ele.item_id}`
                        }
                      ></Card.Img>
                      <div>
                        <div className="text-center">
                          <Card.Body>
                            <h5>{ele.description}</h5>
                            <h6>₹ {ele.price}</h6> 
                            <Button
                            style={{width: "75%",
                              fontSize: "10px",
                              display: "block"}}
                              variant="warning"
                              onClick={() => addToCart(ele)}
                            >
                              Add to cart
                            </Button>
                          </Card.Body>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <br />
      <br /> */}
    </div>
  );
};

const PaginationComponent = ({ data ,setSearchValue,setData,setUpdatecart,updatecart}) => {
  const { page_number, total_count_page, up_next, down_prev } = useSelector(
    (e) => e.ComponentPropsManagement
  );
  console.log("this prev 😁😁😁😁😁😁",down_prev)
  console.log("this up_next 😁😁😁😁😁😁",up_next)
  const dispatch = useDispatch();
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(12);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(1);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };
   
  const pages = [];
  for (let i = 1; i <= Math.ceil(data?.length / itemsPerPage); i++) {
    pages.push(i);
    // console.log("this is pages🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️",pages)
  }
  // console.log("these are page numbers", pages);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  console.log("this current data 🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️",currentItems)
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  return (
    <>
      {renderData(currentItems,setSearchValue,setData,setUpdatecart,updatecart)}
      {currentItems &&
      <Pagination className="d-flex justify-content-center mb-5">
        {down_prev !== null ? <Pagination.Prev onClick={() => dispatch(prevPage(pages))} /> : null}
        <Pagination.Ellipsis />
        <Pagination.Item active style={{background:"#ffc107"}} >{page_number}</Pagination.Item>
        <Pagination.Ellipsis />
        {up_next !== null ? <Pagination.Next onClick={() => dispatch(nextPage())} /> : null}
      </Pagination>}
    </>
  );
};

export default PaginationComponent;
