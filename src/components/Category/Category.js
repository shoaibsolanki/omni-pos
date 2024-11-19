import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handelGetCategoryRequest,
  handleAllDataByCategoryRequest,
  handleCategoriesRequest,
  handeleCategoriesHomeRequest,
  Resetpage,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { Badge, Button, Stack, Card, Image } from "react-bootstrap";
import Product from "../Product";
import DataByCategory from "../DataByCategory/DataByCategory";
import { AiOutlineMail, AiOutlineSearch } from "react-icons/ai";
import { FcSalesPerformance, FcSpeaker } from "react-icons/fc";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_Url } from "../../URL";
import { ArrowLeftOutlined, ArrowRightOutlined, Style } from "@material-ui/icons";
import "./Category.css"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const Category = ({
  setSearchValue,
  data,
  cartData,
  setSearchedData,
  setData,
  setCartData,
  setUpdatecart,
  updatecart,
  searchValue,
  handleVoiceCommand,
}) => {
  const {
    createdAt,
    password,
    registerId,
    status,
    saasId,
    storeId,
    storeName,
    userId,
    userName,
    userType,
  } = localStorage.getItem("User_data")
      ? JSON.parse(localStorage.getItem("User_data"))
      : {};

  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${BASE_Url}/category/get-list/${saasId}/${storeId}`)
      .then((res) => {
        console.log("RES CATEGORY", res);
        setCategory(res.data.data);
      });
  }, []);

  return (
   
    <Swiper
    className="d-flex justify-content-center"
      // install Swiper modules
      modules={[Navigation, A11y]}
      spaceBetween={70}
      slidesPerView={category.length < 3 ?category.length:3}
      navigation
      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      <div>
      <div>

        <div>
          <div className="d-flex justify-content-center gap-5 m-auto">
      {category.map((ele) => {     
            return (<SwiperSlide>  <Link style={{ textDecoration: "none", color: "black" }} to={`/DataByCategory/${ele.category_name}`}>
              <Card className="CatgorycardForPhone" onClick={()=>{dispatch(Resetpage(1));}} style={{
                  border:"0px"
                  }}>


                    <div className="m-2 d-flex catimage j-center object-contain snipcss-VkhHe" style={{ textAlign: "center", justifyContent: "center", display: "flex" }}>
                      <Image
                        src={ele.image_path}
                        // className="cardCategory"
                        roundedCircle
                        style={{
                          width: "50px",
                          height: "50px",
                          margin: "3px",
                          padding: "1px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.)",
                          border: "1px solid #913434"
                        }}
                      />
                     

                    </div>
                    <div className="cardCategory d-flex justify-content-center">
                    </div>
                    <h4 style={{fontSize:ele.category_name?.length>=20?"18px":"18px",
                     fontFamily: "Roboto",
                     fontStyle: "normal",
                     fontWeight: "700",
                     lineHeight: "normal",
                    textDecoration: "none", textAlign: "center" }}>{ele.category_name}</h4>
                  </Card>
                </Link>
    </SwiperSlide>
      );
    })}
    </div>
        </div>
      </div>
      </div>
    </Swiper>
  );
};

export default Category;
