import { put, takeEvery, all, retry } from "redux-saga/effects";
import { BASE_Url, Email_Url, host, LOYALTY_BASE_URL } from "../URL";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const {
  createdAt,
  password,
  registerId,
  status,
  saasId,
  storeId,
  storeName,
  userId,
  userType,
  userName,
} = localStorage.getItem("User_data")
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};
    // const {
     
    //   page_number,
      
    // } = useSelector((e) => e.ComponentPropsManagement);
// console.log("LOYALTY DATA", data.loyalty_id);
// console.log("storeId", storeId, saasId, userId, userName);

function* handleLoginRequest(e) {
  const response = yield fetch(`${BASE_Url}/auth/user-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      console.log("LOGIN DATA", jsonData);
      // toast.success("Login Successfully");
      console.log("this user data",jsonData.data)
      console.log("this user data",jsonData.data.user_data)
      console.log("this user data",jsonData.data.customer_data)
      // if (jsonData.data?.user_data.userType !=="GUEST") {
      //   toast.success("Login Successfully");
      // }
      localStorage.setItem("Token", JSON.stringify(jsonData.data.jwt_response));
      localStorage.setItem(
        "Store_data",
        JSON.stringify(jsonData.data.store_data)
      );
      if(jsonData.data.user_data){
        localStorage.setItem(
          "User_data",
          JSON.stringify(jsonData.data.user_data)
        );
      }else{
        jsonData.data.customer_data["userName"]=jsonData.data.customer_data.name
        jsonData.data.customer_data["userType"]=jsonData.data.customer_data.customerType
        jsonData.data.customer_data["storeId"]=jsonData.data.customer_data.storeId
        jsonData.data.customer_data["saasId"]=jsonData.data.customer_data.saasId
        jsonData.data.customer_data["userId"]=jsonData.data.customer_data.id
        jsonData.data.customer_data["storeName"]=jsonData.data.store_name
        localStorage.setItem(
          "User_data",
          JSON.stringify(jsonData.data.customer_data)
        );
      }
      localStorage.setItem(
        "Customer_data",
        JSON.stringify(jsonData.data.customer_data)
      );
      localStorage.setItem(
        "Address_data",
        JSON.stringify(jsonData.data.address_data)
      );
      // window.location.href("/");
      yield put({
        type: "ComponentPropsManagement/handleLoginResponse",
        data: jsonData.data.user_data,
      });
    } else {
      toast.error("Please enter correct username and password");
      yield put({
        type: "ComponentPropsManagement/handleLoginResponse",
        data: {},
      });
    }
  }
}
// REGISTER USER
function* handleRegisterRequest(e) {
  const response = yield fetch(`${BASE_Url}/user-master/customer-sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("REGISTER JSON", jsonData);

  if (jsonData) {
    if (jsonData.status === true) {
      toast.success("Register User Successfully");
      // localStorage.setItem(
      //   "login_data",
      //   JSON.stringify(jsonData.data.user_data)
      // );
      // localStorage.setItem("Token", JSON.stringify(jsonData.data.jwt_response));
      // window.location.href("/");
      // yield put({
      //   type: "ComponentPropsManagement/handleLoginResponse",
      //   data: jsonData.data.user_data,
      // });
    } else {
      if(jsonData.message == "User already register!"){
        Swal.fire({
          icon: 'error',
          title:'User Already Exist',
        })
        yield put({
          type: "ComponentPropsManagement/handleLoginResponse",
          data: {},
        });
      }
      // toast.error("Please enter correct username and password");
      // toast.error(jsonData.message);
      // yield put({
      //   type: "ComponentPropsManagement/handleLoginResponse",
      //   data: {},
      // });
    }
  }
}

//get Bahikhata
function* handleBahikhataPartyDropdownRequest(e) {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const response = yield fetch(
    `${BASE_Url}/supplier/get-party-name/${saasId}/${storeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ effective_from, end_date, tax_desc, hsn_code }),
    }
  );
  const jsonData = yield response.json();
  console.log("JSONDATA BAHIKHATA", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      const arr = [];
      jsonData.data.map((item) => {
        arr.push({ label: item, value: item });
      });
      yield put({
        type: "ComponentPropsManagement/handleBahikhataPartyDropdownResponse",
        data: arr,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handleBahikhataPartyDropdownResponse",
      data: [],
    });
  }
}
//get Category Data
function* handelGetCategoryRequest(e) {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const response = yield fetch(
    `${BASE_Url}/category/get-list/${saasId}/${storeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const jsonData = yield response.json();
  console.log("CATEGORY DROPDOWN", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      const arr = [];
      jsonData.data.map((item) => {
        arr.push({ label: item.category_name, value: item.category_name });
      });
      yield put({
        type: "ComponentPropsManagement/handelGetCategoryResponse",
        data: arr,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handelGetCategoryResponse",
      data: [],
    });
  }
}
//get Category HOME
function* handeleCategoriesHomeRequest(e) {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const response = yield fetch(
    `${BASE_Url}/category/get-list/${saasId}/${storeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const jsonData = yield response.json();
  console.log("CATEGORY DROPDOWN", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      yield put({
        type: "ComponentPropsManagement/handeleCategoriesHomeResponse",
        data: jsonData.data,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handeleCategoriesHomeResponse",
      data: [],
    });
  }
}

//..............create Bahikhata............................
function* handleBahikhataCreateRequest(e) {
  console.log("handleBahikhataCreateRequest", e);
  try {
    const response = yield fetch(`${host}bahikhata/create-bahikhata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleBahikhataCreateResponse",
          data: jsonData.data,
        });
        return;
      } else {
        yield put({
          type: "ComponentPropsManagement/handleBahikhataCreateResponse",
          data: null,
        });
        toast.error(jsonData.message);
      }
    } else {
      // toast.error("Something went wrong");
    }
  } catch (err) {
    // toast.error(err.message);
  }
}

function* handleSearchedDataRequest(e) {

  const { storeId, saasId,userType } = JSON.parse(localStorage.getItem("User_data"));
  const { searchValue,setSearchValue } = e.payload;
  console.log("SEARCH VALUE", e);
  const response = yield fetch(
    // `${BASE_Url}/search/get-result/Store1/AAAA/${searchValue}`,
    `${BASE_Url}/search/get-result/${storeId}/${saasId}/${searchValue}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();

  console.log("JSONDATA SEARCH", jsonData);
  if (jsonData.status === true) {
    if (jsonData.data && jsonData.data?.length > 0) {
      // console.log("INSIDE", jsonData);
      const tempSearchArr = jsonData.data;
      tempSearchArr.map((el) => {
        el["productQty"] = 1;
        el["sku"] = "SKU";
        el["department"] = "Dept2";
        // el["discount"] = false;
      });
      // console.log("tempSearchArr", tempSearchArr);
      yield put({
        type: "ComponentPropsManagement/handleSearchedDataResponse",
        data: tempSearchArr,
      });
    }
  } else if (jsonData.status === false && jsonData.data == null) {
    // toast.error("NO ITEM FOUND, would you like to add this Item to Store.??");
    if (userType ==="CUSTOMER") {
      confirmAlert({title:"No Item Found",
      message:"please search another product",
      buttons: [
        {
          label: "Ok",
          onClick: () => {
            // window.location.replace("/home");
            setSearchValue("")
          },
        },
      ],
    })
    }else{
      confirmAlert({
        title: "NO ITEM FOUND",
        message: "Would you like to add this Item to Store.??",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              window.location.replace("/add-item");
            },
          },
          {
            label: "No",
            onClick: () => {
              setSearchValue("")
              // window.location.replace("/home");
            },
          },
        ],
      });
   
    }
 
    yield put({
      type: "ComponentPropsManagement/handleSearchedDataResponse",
      // data: tempSearchArr,
    });
  }
}

function* handleSearchedDataRequest1(e) {
  // const navigate = useNavigate();
  try {
    const { storeId, saasId, } = JSON.parse(localStorage.getItem("User_data"));
    const { searchValue } = e.payload;
    const response = yield fetch(
      `${BASE_Url}/search/get-result/${storeId}/${saasId}/${searchValue}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jsonData = yield response.json();
    console.log("SEARCH VALUE", jsonData);
    if (jsonData) {
      if (jsonData.status === true) {
        yield put({
          type: "ComponentPropsManagement/handleSearchedDataResponse1",
          data: { list: jsonData.data, totalCount: 0 },
        });
        return;
      }
      // toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleSearchedDataResponse1",
        data: null,
      });
    } else {
      // toast.error("Something went wrong server side");
    }
  } catch (err) {
    console.log(err);
  }
}

// HANDLE ADD ITEM SEARCH
function* handleAddItemSearchRequest(e) {
  // const navigate = useNavigate();
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const { searchValue } = e.payload;
  // console.log("SEARCH VALUE", e);
  const response = yield fetch(
    // `${BASE_Url}/search/get-result/Store1/AAAA/${searchValue}`,
    `${BASE_Url}/${storeId}/${saasId}/${searchValue}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();

  console.log("JSONDATA ADD ITEM SEARCH", jsonData);

  if (jsonData) {
    if (jsonData) {
      if (jsonData.data) {
        // ------

        jsonData.data.map((el) => {
          el["productQty"] = 1;
          el["sku"] = "SKU";
          // el["department"] = "Dept2";
          el["bill_qty"] = 0;
          // userType === "CUSTOMER" ? (el["name"] = el.item_name) : "";
          // userType === "CUSTOMER" ? (el["order_qty"] = el.productQty) : "";
          // userType === "CUSTOMER" ? (el["order_price"] = el.price) : "";

          // el["new_edit_price"] = 0;
          // el["discount"] = false;
        });

        // ------
        yield put({
          type: "ComponentPropsManagement/handleAddItemSearchResponse",
          data: jsonData.data,
        });
      } else {
        // toast.error(jsonData.message);
      }
    } else {
      yield put({
        type: "ComponentPropsManagement/handleAddItemSearchResponse",
        data: [],
      });
    }
  } else {
    // toast.error(jsonData.message);
  }
}

// handle handle Party Name Data
function* handlePartyNameDataRequest(e) {
  // const { searchValue } = e.payload;
  console.log("PARTY NAME DATA E", e);
  const response = yield fetch(
    // `${BASE_Url}/search/get-result/Store1/AAAA/${searchValue}`,
    `${BASE_Url}/supplier/search`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();
  console.log("JSONDATA SEARCH PARTY NAME__", jsonData);
  if (jsonData.status === true) {
    if (jsonData) {
      if (jsonData && jsonData.data) {
        yield put({
          type: "ComponentPropsManagement/handlePartyNameDataResponse",
          data: jsonData.data,
        });
      }
    } else {
      yield put({
        type: "ComponentPropsManagement/handlePartyNameDataResponse",
        data: {},
      });
    }
  } else if (jsonData) {
  }
}

// Add / Create Supplier
function* handleCreateSupplierRequest(e) {
  // const { searchValue } = e.payload;
  console.log("PARTY NAME DATA E", e);
  const response = yield fetch(
    // `${BASE_Url}/search/get-result/Store1/AAAA/${searchValue}`,
    `${BASE_Url}/supplier/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();
  // console.log("JSONDATA SEARCH PARTY NAME__", jsonData);
  if (jsonData.status === true) {
    if (jsonData) {
      if (jsonData && jsonData.data) {
        toast.success(jsonData.message);
        // jsonData.message;
        // yield put({
        //   type: "ComponentPropsManagement/handlePartyNameDataResponse",
        //   data: jsonData.data,
        // });
      }
    } else {
      toast.error(jsonData.message);
      // yield put({
      //   type: "ComponentPropsManagement/handlePartyNameDataResponse",
      //   data: {},
      // });
    }
  } else if (jsonData) {
    toast.error(jsonData.message);
  }
}
function* handleRecommendedDataRequest(e) {
  console.log("this is paylode", e.payload);

  const page_number = !e.payload ? 1:e.payload
  const { storeId, saasId, userName } = JSON.parse(
    localStorage.getItem("User_data")
  );
  const checkCustomer = userName.includes("C");
  console.log("SAGA CHECK CUSTOMER", checkCustomer);
  const response = yield fetch(
    `${BASE_Url}/search/recommended-item/${storeId}/${saasId}/${page_number}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      // body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();
  console.log("JSONDATA RECOMMENDED", jsonData.next);
  if (jsonData) {
    if (jsonData.data && jsonData.data?.length > 0) {
      // console.log("INSIDE", jsonData);
      const tempSearchArr = jsonData.data;
      tempSearchArr.map((el) => {
        el["productQty"] = 1;
        el["sku"] = "SKU";
        // el["department"] = "Dept2";
        el["bill_qty"] = 0;
        el["product_qty"] = el.productQty;
        // userType === "CUSTOMER" ? (el["name"] = el.item_name) : "";
      });
      // console.log("tempSearchArr", tempSearchArr);
      yield put({
        type: "ComponentPropsManagement/handleRecommendedDataResponse",
        data: tempSearchArr,
      });
        yield put({
          type: "ComponentPropsManagement/upcommig",
          payload: jsonData.next == Math.ceil(jsonData.count/12)+1? null :jsonData.next,
      })
      yield put({
        type: "ComponentPropsManagement/previous",
        payload: jsonData.prev,
      });
      yield put({
        type: "ComponentPropsManagement/totalPageCount",
        payload: jsonData.count,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handleRecommendedDataResponse",
      data: [],
    });
  }
}

function* handleQRImageRequest(e) {
  const response = yield fetch(
    `${BASE_Url}/transaction/payment/phonepay/EE/AA`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response;

  console.log("FILE", jsonData.url);
  if (jsonData && jsonData.url) {
    yield put({
      type: "ComponentPropsManagement/handleQRImageResponse",
      data: jsonData.url,
    });
  } else {
    yield put({
      type: "ComponentPropsManagement/handleQRImageResponse",
      data: "",
    });
  }
}
function* handleUpdateAddressforUserRequest(e) {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const { id } = JSON.parse(localStorage.getItem("Customer_data"));
  console.log("ID", id);
  const response = yield fetch(`${BASE_Url}/customer/create-address/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response;

  console.log("^6263286", jsonData);
  // if (jsonData && jsonData.url) {
  //   yield put({
  //     type: "ComponentPropsManagement/handleQRImageResponse",
  //     data: jsonData.url,
  //   });
  // } else {
  //   yield put({
  //     type: "ComponentPropsManagement/handleQRImageResponse",
  //     data: "",
  //   });
  // }
}
// GET STORE NAME
function* handleStoreNameRequest(e) {
  const { saasId, storeId } = e.payload;
  console.log("saga", saasId);
  console.log("saga", storeId);
  const response = yield fetch(
    `${BASE_Url}/user-master/get-retailer-store-name/${saasId}/${storeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const jsonData = yield response;
  console.log("STORE JSONDATA", jsonData);
  // if (jsonData) {
  //   yield put({
  //     type: "ComponentPropsManagement/handleStoreNameResponse",
  //     data: jsonData,
  //   });
  // } else {
  //   yield put({
  //     type: "ComponentPropsManagement/handleStoreNameResponse",
  //     data: "",
  //   });
  // }
}

function* handleRegisterUserRequest(e) {
  console.log("E PAYLOAD REGISTER", e.payload);
  const response = yield fetch(`${BASE_Url}/customer/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("REGISTER JSONDATA", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      toast.success(jsonData.message);
      // alert(jsonData.message);
      // const cartData = jsonData.data;
      // yield put({
      //   type: "ComponentPropsManagement/handleRegisterUserResponse",
      //   data: jsonData.data,
      // });
    } else {
      // toast.error(jsonData.message);
    }
  } else {
    // toast.error(jsonData.message);
    // yield put({
    //   type: "ComponentPropsManagement/handleRegisterUserResponse",
    //   data: {},
    // });
  }
}
function* handleEmailNotificationResponse(e) {
  console.log("E EMAIL NOTIFICATION", e.payload);
  const response = yield fetch(`${Email_Url}email/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("Email Notify JSONDATA", jsonData);
  if (jsonData) {
    // if (jsonData && jsonData.data) {
    toast.success(jsonData.message);
    // alert(jsonData.message);
    // const cartData = jsonData.data;
    // yield put({
    //   type: "ComponentPropsManagement/handleRegisterUserResponse",
    //   data: jsonData.data,
    // });
    // } else {
    //   toast.error(jsonData.message);
    // }
  } else {
    toast.error(jsonData.message);
    // yield put({
    //   type: "ComponentPropsManagement/handleRegisterUserResponse",
    //   data: {},
    // });
  }
}
// SMS
function* handelSMSRequest(e) {
  const { storeId, saasId, userName } = JSON.parse(
    localStorage.getItem("User_data")
  );
  const { pdf, number } = e.payload;
  console.log("PDF & NUMBER", pdf, number);
  const response = yield fetch(`${host}sms/mobile/${saasId}/${number}/${pdf}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonData = yield response.json();
  console.log("JSONDATA", jsonData);
  if (jsonData) {
    // if (jsonData && jsonData.data) {
    toast.success(jsonData.message);
    // alert(jsonData.message);
    // const cartData = jsonData.data;
    // yield put({
    //   type: "ComponentPropsManagement/handleRegisterUserResponse",
    //   data: jsonData.data,
    // });
    // } else {
    //   toast.error(jsonData.message);
    // }
  } else {
    // toast.error(jsonData.message);
    // yield put({
    //   type: "ComponentPropsManagement/handleRegisterUserResponse",
    //   data: {},
    // });
  }
}
// WhatsApp
function* handlewhatsAppRequest(e) {
  // console.log("E WAPP", e.payload);
  const response = yield fetch(`${BASE_Url}/whatsapk/send/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("WHATSAPP JSONDATA", jsonData);
  if (jsonData) {
    // if (jsonData && jsonData.data) {
    toast.success(jsonData.message);
    // alert(jsonData.message);
    // const cartData = jsonData.data;
    // yield put({
    //   type: "ComponentPropsManagement/handleRegisterUserResponse",
    //   data: jsonData.data,
    // });
    // } else {
    //   toast.error(jsonData.message);
    // }
  } else {
    // toast.error(jsonData.message);
    // yield put({
    //   type: "ComponentPropsManagement/handleRegisterUserResponse",
    //   data: {},
    // });
  }
}
// ADD Purchase
function* handleAddPurchaseRequest(e) {
  console.log("E PAYLOAD ADDPURCHASE", e.payload);
  const response = yield fetch(`${BASE_Url}/purchase/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("ADD PURCHASE REQUEST", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      toast.success(jsonData.message);
      // alert(jsonData.message);
      // const cartData = jsonData.data;
      // yield put({
      //   type: "ComponentPropsManagement/handleRegisterUserResponse",
      //   data: jsonData.data,
      // });
    } else {
      // toast.error(jsonData.message);
    }
  } else {
    // toast.error(jsonData.message);
    // yield put({
    //   type: "ComponentPropsManagement/handleRegisterUserResponse",
    //   data: {},
    // });
  }
}
function* handleAddItemToStoreRequest(e) {
  const response = yield fetch(`${BASE_Url}/item/add-item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData && jsonData.data && jsonData.status ==true) {
      console.log("Item Added JSONDATA", jsonData);
      // toast.success(jsonData.message);
      // alert(jsonData.message);
      // const cartData = jsonData.data;
      toast.success("this get item",jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleAddItemToStoreResponse",
        data: jsonData.data,
      });
    } else {
      // toast.error(jsonData.message);
    }
  } else {
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleAddItemToStoreResponse",
      data: "",
    });
  }
}

function* handleUpdateItemToStoreRequest(e) {
  const response = yield fetch(`${BASE_Url}/item/update-item/${e.payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e.payload.data),
  });
  const jsonData = yield response.json();
  console.log("REGISTER JSONDATA", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      // toast.success(jsonData.message);
      // alert(jsonData.message);
      // const cartData = jsonData.data;
      toast.success(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleAddItemToStoreResponse",
        data: jsonData.data.item_id,
      });
    } else {
      // toast.error(jsonData.message);
    }
  } else {
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleAddItemToStoreResponse",
      data: "",
    });
  }
}

// SAVE TRANSACTION
function* handleSaveTransactionRequest(e) {
  const response = yield fetch(`${BASE_Url}/transaction/save-transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("SAVE TRANSACTION DATA", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      const cartData = jsonData.data;
      yield put({
        type: "ComponentPropsManagement/handleSavaTransactionResponse",
        data: jsonData.data,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handleSavaTransactionResponse",
      data: {},
    });
  }
}
// Create Row in Tax Master
function* handleCreateRowTaxMasterRequest(e) {
  // const { searchValue } = e.payload;
  console.log("E TAX MASTER", e);
  const { id, effective_from, end_date, tax_desc, hsn_code } = e.payload;
  // console.log("STORE ID", storeId);
  const response = yield fetch(`${BASE_Url}/tax/create/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ effective_from, end_date, tax_desc, hsn_code }),
  });
  const jsonData = yield response.json();
  console.log("E TAX MASTER JSONDATA", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      toast.success(jsonData.message);

      // const cartData = jsonData.data;
      // yield put({
      //   type: "ComponentPropsManagement/handleSavaTransactionResponse",
      //   data: jsonData.data,
      // });
    }
  } else {
    // toast.error(jsonData.message);
    // yield put({
    //   type: "ComponentPropsManagement/handleSavaTransactionResponse",
    //   data: {},
    // });
  }
}
// GET HSN CODES
function* handleHSNCODERequest() {
  // const { searchValue } = e.payload;
  // console.log("E TAX MASTER", e);
  // const { id, effective_from, end_date, tax_desc, hsn_code } = e.payload;
  // console.log("STORE ID", storeId);
  const response = yield fetch(`${BASE_Url}/tax/get-hsn-codes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ effective_from, end_date, tax_desc, hsn_code }),
  });
  const jsonData = yield response.json();
  console.log("HSN CODES", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      yield put({
        type: "ComponentPropsManagement/handlehandleHSNCODEResponse",
        data: jsonData.data,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handlehandleHSNCODEResponse",
      data: [],
    });
  }
}

// Handle ADD Party
function* handleAddPartyRequest(e) {
  // const { searchValue } = e.payload;
  console.log("E ADD PARTY", e);
  // const { storeId } = e.payload;
  // console.log("STORE ID", storeId);
  const response = yield fetch(
    `${BASE_Url}/supplier/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();
  console.log("ADD PARTY DATA", jsonData);
  if (jsonData) {
    if (jsonData.status === true) {
      toast.success(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleAddPartyResponse",
        data: jsonData,
      });
    } else {
      // toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleAddPartyResponse",
        data: {},
      });
    }
  } else {
    // toast.error(jsonData.message);
  }
}
// Digital Promotion detail
function* handelCreateDigitalPromotionRequest(e) {
  // const { searchValue } = e.payload;
  // console.log("DIGITAL PROMOTION DETAIL", e);
  // const { storeId } = e.payload;
  // console.log("STORE ID", storeId);
  const response = yield fetch(
    `${host}digital-promotion/create-digital-promotion-details`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();
  console.log("", jsonData);
  // if (jsonData) {
  //   if (jsonData.status === true) {
  //     toast.success(jsonData.message);
  //     yield put({
  //       type: "ComponentPropsManagement/handelCreateDigitalPromotionResponse",
  //       data: jsonData,
  //     });
  //   } else {
  //     toast.error(jsonData.message);
  //     yield put({
  //       type: "ComponentPropsManagement/handelCreateDigitalPromotionResponse",
  //       data: {},
  //     });
  //   }
  // } else {
  //   toast.error(jsonData.message);
  // }
}
// PROMOTION ASSETS
function* handelPromotionAssetsRequest(e) {
  const response = yield fetch(
    `${host}digital-promotion/create-digital-promotion-master`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();
  console.log("", jsonData);
  // if (jsonData) {
  //   if (jsonData.status === true) {
  //     toast.success(jsonData.message);
  //     yield put({
  //       type: "ComponentPropsManagement/handelCreateDigitalPromotionResponse",
  //       data: jsonData,
  //     });
  //   } else {
  //     toast.error(jsonData.message);
  //     yield put({
  //       type: "ComponentPropsManagement/handelCreateDigitalPromotionResponse",
  //       data: {},
  //     });
  //   }
  // } else {
  //   toast.error(jsonData.message);
  // }
}
// Add Purchase => inventory-master/inventory
function* handleInventoryMasterRequest(e) {
  // const { searchValue } = e.payload;
  // console.log("E ADD PARTY", e);
  // const { storeId } = e.payload;
  // console.log("STORE ID", storeId);
  const response = yield fetch(`${BASE_Url}/inventory-master/inventory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("inventory-master/inventory", jsonData);

  // if (jsonData) {
  //   if (jsonData.status === true) {
  //     toast.success(jsonData.message);
  //     yield put({
  //       type: "ComponentPropsManagement/handleAddPartyResponse",
  //       data: jsonData,
  //     });
  //   } else {
  //     toast.error(jsonData.message);
  //     yield put({
  //       type: "ComponentPropsManagement/handleAddPartyResponse",
  //       data: {},
  //     });
  //   }
  // } else {
  //   toast.error(jsonData.message);
  // }
}
// Handle Tax Rates
function* handleTaxRatesRequest() {
  const response = yield fetch(`${BASE_Url}/tax/get-taxes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonData = yield response.json();
  // console.log("TAX RATE JSONDATA", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      const tempSearchArr = jsonData.data;
      const arr = [];
      tempSearchArr.map((el) => {
        arr.push({ label: el.taxCode + "@" + el.taxRate, ...el });
      });
      // console.log("tempSearchArr", arr);
      yield put({
        type: "ComponentPropsManagement/handleTaxRatesResponse",
        data: arr,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handleTaxRatesResponse",
      data: "",
    });
  }
}
// Handle Debit note
function* handleXYZRequest() {
  const response = yield fetch(
    `${BASE_Url}/Debit/view-debitnote/${saasId}/2023-07-27`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const jsonData = yield response.json();
  console.log("DEBITNOTE JSONSDATA", jsonData);
  // console.log("TAX RATE JSONDATA", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      yield put({
        type: "ComponentPropsManagement/handleXYZResponse",
        data: jsonData.data,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handleXYZResponse",
      data: [],
    });
  }
}

function* handleDeleteCartItemRequest(e) {
  // const { searchValue } = e.payload;
  // console.log("E VALUE", e.payload);
  const { storeId } = e.payload;
  // console.log("STORE ID", storeId);
  const response = yield fetch(
    `${BASE_Url}/price-check/deleteproduct/11342/753/31`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();

  if (jsonData && jsonData.data) {
    yield put({
      type: "ComponentPropsManagement/handleAddCartDataResponse",
      data: jsonData.data.products,
    });
  } else {
    yield put({
      type: "ComponentPropsManagement/handleAddCartDataResponse",
      data: [],
    });
  }
}

function* handleUploadPicRequest(e) {
  const { formData, save_product_id } = e.payload;

  console.log("FORM DATA IMAGE", formData);
  const response = yield fetch(
    `${BASE_Url}/item/save-image/${save_product_id.item_id}`,
    {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: formData,
    }
  );
  const jsonData = yield response.json();
  console.log("JSONDATA UPLOAD PIC", jsonData);
  if (jsonData && jsonData.data) {
    toast.success(jsonData.message);
    //   yield put({
    //     type: "ComponentPropsManagement/handleAddCartDataResponse",
    //     data: jsonData.data.products,
    //   });
    // } else {
    //   yield put({
    //     type: "ComponentPropsManagement/handleAddCartDataResponse",
    //     data: [],
    //   });
  }
}

function* handleUploadItemRequest(e) {
  try {
    const { csvFile } = e.payload;

    const formData = new FormData();

    formData.append("file", csvFile);
    formData.append("saas-id", saasId);

    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${token}`)

    const response = yield fetch(`${host}dashboard/upload-items`, {
      method: "POST",
      // headers: myHeaders,
      body: formData,
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleUploadItemResponse",
          data: jsonData,
        });
        return;
      }
      // toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleUploadItemResponse",
        data: null,
      });
    } else {
      // toast.error("Something went wrong server side");
    }
  } catch (err) {
    // toast.error(`${err.message} - dashboard/upload-items`);
  }
}

function* handleUploadInventoryRequest(e) {
  try {
    const { csvFile } = e.payload;
    const formData = new FormData();

    formData.append("file", csvFile);
    formData.append("saas-id", saasId);

    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${token}`)

    const response = yield fetch(`${host}dashboard/upload-inventory`, {
      method: "POST",
      // headers: myHeaders,
      body: formData,
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleUploadInventoryResponse",
          data: jsonData,
        });
        return;
      }
      // toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleUploadInventoryResponse",
        data: null,
      });
    } else {
      // toast.error("Something went wrong server side");
    }
  } catch (err) {
    // toast.error(`${err.message} - dashboard/upload-inventory`);
  }
}

function* handleSalesOverviewRequest(e) {
  // console.log("e.", e.payload)
  // const formData = new FormData();
  // formData.append('file', e.payload.file);
  // formData.append('name', e.payload.name);
  // formData.append('description', e.payload.description);
  // formData.append('created-by', e.payload['created-by']);
  // formData.append('is-popular', e.payload['is-popular']);
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${token}`)
  try {
    const response = yield fetch(
      `${host}inventory-master/inventory-dashboard/${saasId}/${storeId}`,
      {
        method: "GET",
        // headers: myHeaders,
        // body: e.payload
      }
    );
    const jsonData = yield response.json();
    // console.log("jsonData", jsonData)
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleSalesOverviewResponse",
          data: jsonData,
        });
        return;
      }
      // toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleSalesOverviewResponse",
        data: null,
      });
    } else {
      // toast.error("Something went wrong server side");
    }
  } catch (err) {
    // toast.error(`${err.message} - inventory-master/inventory-dashboard`);
  }
}

function* handleLastWeekSalesRequest(e) {
  // console.log("e.", e.payload)
  // const formData = new FormData();
  // formData.append('file', e.payload.file);
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${token}`)
  try {
    const response = yield fetch(`${host}dashboard/last-week-sales/${saasId}`, {
      method: "GET",
      // headers: myHeaders,
      // body: e.payload
    });

    const jsonData = yield response.json();
    // console.log("jsonData", jsonData)
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleLastWeekSalesResponse",
          data: jsonData,
        });
        return;
      }
      // toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleLastWeekSalesResponse",
        data: null,
      });
    } else {
      // toast.error("Something went wrong server side");
    }
  } catch (err) {
    // toast.error(`${err.message} - dashboard/last-week-sales`);
  }
}

function* handleLastMonthSalesRequest(e) {
  // console.log("e.", e.payload)
  // const formData = new FormData();
  // formData.append('file', e.payload.file);
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${token}`)
  try {
    const response = yield fetch(
      `${host}dashboard/last-month-sales/${saasId}`,
      {
        method: "GET",
        // headers: myHeaders,
        // body: e.payload
      }
    );

    const jsonData = yield response.json();
    // console.log("jsonData", jsonData)
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleLastMonthSalesResponse",
          data: jsonData,
        });
        return;
      }
      // toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleLastMonthSalesResponse",
        data: null,
      });
    } else {
      // toast.error("Something went wrong server side");
    }
  } catch (err) {
    // toast.error(`${err.message} - dashboard/last-month-sales`);
  }
}

function* handleTodaySalesRequest(e) {
  const date = new Date();
  // const formData = new FormData();
  // formData.append('today_sales', "2023-06-19");
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${token}`)
  try {
    const response = yield fetch(
      `${host}dashboard/today-sales/${saasId}/${moment(date).format(
        "Y-MM-DD"
      )}`,
      {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        // },

        // body: JSON.stringify({
        //   today_sales: moment(date).format("Y-MM-DD"),
        // }),
        // body: formData
        // body: e.payload
      }
    );
    const jsonData = yield response.json();
    // console.log("jsonData", jsonData)
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleTodaySalesResponse",
          data: jsonData,
        });
        return;
      }
      // toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleTodaySalesResponse",
        data: null,
      });
    } else {
      // toast.error("Something went wrong server side");
    }
  } catch (err) {
    // toast.error(`${err.message} - dashboard/today-sales`);
  }
}

function* handleNumberOfCustomerRequest(e) {
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${ token }`)
  const { storeId, saasId, userName } = JSON.parse(
    localStorage.getItem("User_data")
  );
  try {
    const response = yield fetch(
      `${host}inventory-master/total-customer/${saasId}/${storeId}`,
      {
        method: "GET",
        // headers: myHeaders,
      }
    );
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        yield put({
          type: "ComponentPropsManagement/handleNumberOfCustomerResponse",
          data: jsonData,
        });
        return;
      }
      // toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleNumberOfCustomerResponse",
        data: null,
      });
    } else {
      // toast.error("Something went wrong server side");
    }
  } catch (err) {
    // toast.error(`${err.message} - inventory-master/total-customer`);
  }
}

function* handleLowStockItemsRequest(e) {
  const { storeId, saasId, userName } = JSON.parse(
    localStorage.getItem("User_data")
  );
  const response = yield fetch(
    `${host}inventory-master/inventory-less-closing-quantity/${saasId}/${storeId}`,
    {
      method: "GET",
    }
  );
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleLowStockItemsResponse",
        data: jsonData,
      });
      return;
    }
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleLowStockItemsResponse",
      data: null,
    });
  } else {
    // toast.error("Something went wrong server side");
  }
}
// Customer List for Marketing
function* handelCustomerListRequest(e) {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const response = yield fetch(
    `${host}digital-promotion/get-customer-list/${saasId}/${storeId}`,
    {
      method: "GET",
    }
  );
  const jsonData = yield response.json();
  // console.log("Customer List for Marketing", jsonData);
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handelCustomerListResponse",
        data: jsonData.data,
      });
      return;
    }
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handelCustomerListResponse",
      data: [],
    });
  } else {
    // toast.error("Something went wrong server side");
  }
}

function* handleLowStockItemListRequest(e) {
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${ token }`)
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const response = yield fetch(`${host}inventory-master/low-stock-item/${saasId}/${storeId}`, {
    method: "GET",
    // headers: myHeaders,
  });
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleLowStockItemListResponse",
        data: jsonData.data,
      });
      return;
    }
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleLowStockItemListResponse",
      data: null,
    });
  } else {
    // toast.error("Something went wrong server side");
  }
}

function* handleQuantityInHandRequest(e) {
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${ token }`)
  const response = yield fetch(
    `${host}inventory-master/closing-stock/${saasId}/${storeId}`,
    {
      method: "GET",
      // headers: myHeaders,
    }
  );
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleQuantityInHandResponse",
        data: jsonData,
      });
      return;
    }
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleQuantityInHandResponse",
      data: null,
    });
  } else {
    // toast.error("Something went wrong server side");
  }
}

function* handleNoOfItemRequest(e) {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${ token }`)
  const response = yield fetch(
    `${host}inventory-master/no-of-items/${saasId}/${storeId}`,
    {
      method: "GET",
      // headers: myHeaders,
    }
  );
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleNoOfItemResponse",
        data: jsonData,
      });
      return;
    }
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleNoOfItemResponse",
      data: null,
    });
  } else {
    // toast.error("Something went wrong server side");
  }
}

function* handleLastFourteenDaysSalesRequest(e) {
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${ token }`)
  const response = yield fetch(
    `${host}dashboard/last-fourteen-days-sales/${saasId}`,
    {
      method: "GET",
      // headers: myHeaders,
    }
  );
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleLastFourteenDaysSalesResponse",
        data: jsonData,
      });
      return;
    }
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleLastFourteenDaysSalesResponse",
      data: null,
    });
  } else {
    // toast.error("Something went wrong server side");
  }
}

function* handleLastSixtyDaysSalesRequest(e) {
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${ token }`)
  const response = yield fetch(
    `${host}dashboard/last-sixty-days-sales/${saasId}`,
    {
      method: "GET",
      // headers: myHeaders,
    }
  );
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleLastSixtyDaysSalesResponse",
        data: jsonData,
      });
      return;
    }
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleLastSixtyDaysSalesResponse",
      data: null,
    });
  } else {
    // toast.error("Something went wrong server side");
  }
}
// ADD CATEGORY
function* handelAddcategoryRequest(e) {
  const response = yield fetch(`${host}category/store/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      toast.success(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleLastSixtyDaysSalesResponse",
        data: jsonData,
      });
    }
    // yield put({
    //   type: "ComponentPropsManagement/handleLastSixtyDaysSalesResponse",
    //   data: null,
    // });
  } else {
    // toast.error("Something went wrong server side");
  }
}

function* handleYesterdaySalesRequest(e) {
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${ token }`)
  const response = yield fetch(`${host}dashboard/yesterday-sales/${saasId}`, {
    method: "GET",
    // headers: myHeaders,
  });
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleYesterdaySalesResponse",
        data: jsonData,
      });
      return;
    }
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleYesterdaySalesResponse",
      data: null,
    });
  } else {
    // toast.error("Something went wrong server side");
  }
}

// Debit note

function* handleDebitNoteMisListRequest() {
  const response = yield fetch(
    `${BASE_Url}/Debit/view-debitnote/8/2023-07-27 `,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const jsonData = yield response.json();
  console.log("DEBIT NOTE", jsonData);
  if (jsonData) {
    // if (jsonData && jsonData.data) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleDebitNoteMisListResponse",
        // data: jsonData,
        data: { list: jsonData.data, totalCount: jsonData.count },
      });
    }
    // toast.error(jsonData.message);
  } else {
    yield put({
      type: "ComponentPropsManagement/handleDebitNoteMisListResponse",
      data: "",
    });
  }
}

// Challan

function* handleChallanMisListRequest() {
  const response = yield fetch(
    `${BASE_Url}/Debit/view-debitchalan/8/2023-07-27 `,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const jsonData = yield response.json();
  console.log("Challan in saga", jsonData);
  if (jsonData) {
    // if (jsonData && jsonData.data) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleChallanMisListResponse",
        // data: jsonData,
        data: { list: jsonData.data, totalCount: jsonData.count },
      });
    }
    // toast.error(jsonData.message);
  } else {
    yield put({
      type: "ComponentPropsManagement/handleChallanMisListResponse",
      data: "",
    });
  }
}

// DaySale

function* handleDaySaleMisListRequest() {
  const response = yield fetch(
    `${BASE_Url}/dashboard/get-invoices-detatils/8/2023-07-01/2023-07-30 `,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const jsonData = yield response.json();
  console.log("DaySale in saga", jsonData);
  if (jsonData) {
    // if (jsonData && jsonData.data) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleDaySaleMisListResponse",
        // data: jsonData,
        data: { list: jsonData.data, totalCount: jsonData.count },
      });
    }
    // toast.error(jsonData.message);
  } else {
    yield put({
      type: "ComponentPropsManagement/handleDaySaleMisListResponse",
      data: "",
    });
  }
}

// Purchase

function* handlePurchaseMisListRequest() {
  const response = yield fetch(
    `${BASE_Url}/purchase/purchase-view/3/30001/2023-06-21`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const jsonData = yield response.json();
  console.log("Purchase in saga", jsonData);
  if (jsonData) {
    // if (jsonData && jsonData.data) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handlePurchaseMisListResponse",
        // data: jsonData,
        data: { list: jsonData.data, totalCount: jsonData.count },
      });
    }
    // toast.error(jsonData.message);
  } else {
    yield put({
      type: "ComponentPropsManagement/handlePurchaseMisListResponse",
      data: "",
    });
  }
}

// Baikhata

function* handleBaikhataMisListRequest() {
  const response = yield fetch(
    `${BASE_Url}/bahikhata/view-bahikhata-details/8/2022-05-25`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const jsonData = yield response.json();
  console.log("Baikhata in saga", jsonData);
  if (jsonData) {
    // if (jsonData && jsonData.data) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleBaikhataMisListResponse",
        // data: jsonData,
        data: { list: jsonData.data, totalCount: jsonData.count },
      });
    }
    // toast.error(jsonData.message);
  } else {
    yield put({
      type: "ComponentPropsManagement/handleBaikhataMisListResponse",
      data: "",
    });
  }
}

// Expenses

function* handleExpensesMisListRequest() {
  const response = yield fetch(
    `${BASE_Url}/expense/view-expenses/8/2023-07-23`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const jsonData = yield response.json();
  console.log("Expenses in saga", jsonData);
  if (jsonData) {
    // if (jsonData && jsonData.data) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleExpensesMisListResponse",
        // data: jsonData,
        data: { list: jsonData.data, totalCount: jsonData.count },
      });
    }
    // toast.error(jsonData.message);
  } else {
    yield put({
      type: "ComponentPropsManagement/handleExpensesMisListResponse",
      data: "",
    });
  }
}

// Ledger

function* handleLedgerMisListRequest() {
  // const response = yield fetch(`http://3.111.70.84:8088/test/api/v1/ledger/getledgerfromto/2023-07-27/2023-07-30/8/80001`, {
  const response = yield fetch(
    `${BASE_Url}/ledger/getledgerfromto/2023-07-27/2023-07-30/${saasId}/${storeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const jsonData = yield response.json();
  console.log("Ledger in saga", jsonData);
  if (jsonData) {
    // if (jsonData && jsonData.data) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleLedgerMisListResponse",
        // data: jsonData,
        data: { list: jsonData.data, totalCount: jsonData.count },
      });
    }
    // toast.error(jsonData.message);
  } else {
    yield put({
      type: "ComponentPropsManagement/handleLedgerMisListResponse",
      data: "",
    });
  }
}

function* handleGstTypeDropdownRequest(e) {
  // var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Authorization", `Bearer ${ token }`)
  const response = yield fetch(`${host}tax/get-taxes`, {
    method: "GET",
    // headers: myHeaders,
    // body: e.payload,
    // redirect: 'follow'
  });
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      const arr = [];
      jsonData.data.map((item) => {
        arr.push({
          ...item,
          label: `${item.taxCode}@${item.taxRate}%`,
          value: item.taxRate,
        });
      });
      // toast.success(jsonData.message)
      yield put({
        type: "ComponentPropsManagement/handleGstTypeDropdownResponse",
        data: arr,
      });
      return;
    }
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleGstTypeDropdownResponse",
      data: null,
    });
  } else {
    // toast.error("Something went wrong server side");
  }
}

function* handleGetHsnCodeDropdownRequest(e) {
  const response = yield fetch(`${host}tax/get-hsn-codes`, {
    method: "GET",
  });
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      const arr = [];
      jsonData.data.map((item) => {
        arr.push({ ...item, label: `${item.hsn_name}`, value: item.hsn_code });
      });
      // toast.success(jsonData.message)
      yield put({
        type: "ComponentPropsManagement/handleGetHsnCodeDropdownResponse",
        data: arr,
      });
      return;
    }
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleGetHsnCodeDropdownResponse",
      data: null,
    });
  } else {
    // toast.error("Something went wrong server side");
  }
}

function* handleSalesDashboardChartRequest(e) {
  try {
    const response = yield fetch(`${host}dashboard/last-six-month/${saasId}`, {
      method: "GET",
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleSalesDashboardChartResponse",
          data: jsonData.data,
        });
        return;
      }
      // toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleSalesDashboardChartResponse",
        data: null,
      });
    } else {
      // toast.error("Something went wrong server side");
    }
  } catch (err) {
    // toast.error(err.message);
  }
}

function* handleSalesReportRequest(e) {
  console.log("ksjbdkjw", e);
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const response = yield fetch(
    `${BASE_Url}/tax/get-sales-report/${e.payload}/${storeId}/${saasId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ effective_from, end_date, tax_desc, hsn_code }),
    }
  );
  const jsonData = yield response.json();
  console.log("handleSalesReportRequest JSONDATA", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      yield put({
        type: "ComponentPropsManagement/handleSalesReportResponse",
        data: jsonData.data,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handleSalesReportResponse",
      data: [],
    });
  }
}

function* handleGstReportRequest(e) {
  try {
    const response = yield fetch(`${host}tax/get-hsn-list`, {
      method: "GET",
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleGstReportResponse",
          data: jsonData.tax_list,
        });
        return;
      }
      // toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleGstReportResponse",
        data: null,
      });
    } else {
      // toast.error("Something went wrong server side");
    }
  } catch (err) {
    // toast.error(err.message);
  }
}

function* handleGstReportItemRequest(e) {
  try {
    const response = yield fetch(`${host}tax/get-hsn-item-list`, {
      method: "GET",
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleGstReportItemResponse",
          data: jsonData.tax_item_list,
        });
        return;
      }
      // toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleGstReportItemResponse",
        data: null,
      });
    } else {
      // toast.error("Something went wrong server side");
    }
  } catch (err) {
    // toast.error(err.message);
  }
}

function* handleItemMasterListRequest(e) {
  try {
    const { currentPage } = e.payload;
    const response = yield fetch(
      `${BASE_Url}/item/get-item-list/${saasId}/${storeId}/${currentPage}`,
      {
        method: "GET",
      }
    );
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleItemMasterListResponse",
          data: { list: jsonData.data, totalCount: jsonData.count },
        });
        return;
      }
      // toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleItemMasterListResponse",
        data: null,
      });
    } else {
      // toast.error("Something went wrong server side");
    }
  } catch (err) {
    // toast.error(err.message);
  }
}

function* handleTenderReportRequest(e) {
  try {
    const { date } = e.payload;
    const response = yield fetch(`${host}reconciliation/get-total-amount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        saas_id: saasId,
        store_id: storeId,
        business_date: moment(date).format("Y-MM-DD"),
      }),
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleTenderReportResponse",
          data: jsonData.data,
        });
        return;
      }
      // toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleTenderReportResponse",
        data: null,
      });
    } else {
      // toast.error("Something went wrong server side");
    }
  } catch (err) {
    // toast.error(err.message);
  }
}

function* handleUpdateMoqRequest(e) {
  try {
    const response = yield fetch(`${host}moq/create-moq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleUpdateMoqResponse",
          data: jsonData.data,
        });
        return;
      }
      // toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleUpdateMoqResponse",
        data: null,
      });
    } else {
      // toast.error("Something went wrong server side");
    }
  } catch (err) {
    // toast.error(err.message);
  }
}

function* handleUpdatePriceRequest(e) {
  try {
    const response = yield fetch(`${host}item-price/add-item-price`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleUpdatePriceResponse",
          data: jsonData.data,
        });
        return;
      }
      // toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleUpdatePriceResponse",
        data: null,
      });
    } else {
      // toast.error("Something went wrong server side");
    }
  } catch (err) {
    // toast.error(err.message);
  }
}
// Create Row in Tax Master
function* handleCreateTaxMasterRequest(e) {
  try {
    const response = yield fetch(`${BASE_Url}/tax/create/${saasId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json();
    console.log("E TAX MASTER JSONDATA", jsonData);
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleCreateTaxMasterResponse",
          data: jsonData.data,
        });
      } else {
        // toast.error(jsonData.message);
      }
    } else {
      // toast.error("Something went wrong");
    }
  } catch (err) {
    // toast.error(err.message);
  }
}
//  Saas Master.......... handleCreateSaasMasterRequest

function* handleCreateSaasMasterRequest(e) {
  try {
    const response = yield fetch(`${BASE_Url}/saas-master/add-saas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json();
    console.log("E TAX MASTER JSONDATA", jsonData);
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleCreateSaasMasterResponse",
          data: jsonData.data,
        });
      } else {
        // toast.error(jsonData.message);
      }
    } else {
      // toast.error("Something went wrong");
    }
  } catch (err) {
    // toast.error(err.message);
  }
}

function* handleExpenseCategoryDropdownRequest(e) {
  try {
    const response = yield fetch(`${host}expense/get-all-category-name`, {
      method: "GET",
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        if (jsonData.data && jsonData.data.length > 0) {
          const arr = [];
          jsonData.data.map((item) => {
            arr.push({ label: item, value: item });
          });
          yield put({
            type: "ComponentPropsManagement/handleExpenseCategoryDropdownResponse",
            data: arr,
          });
          return;
        }
        yield put({
          type: "ComponentPropsManagement/handleExpenseCategoryDropdownResponse",
          data: [],
        });
      } else {
        // toast.error(jsonData.message);
      }
    } else {
      // toast.error("Something went wrong");
    }
  } catch (err) {
    // toast.error(err.message);
  }
}

function* handleExpenseCreateRequest(e) {
  try {
    const response = yield fetch(`${host}expense/create-expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleExpenseCreateResponse",
          data: jsonData.data,
        });
        return;
      } else {
        yield put({
          type: "ComponentPropsManagement/handleExpenseCreateResponse",
          data: null,
        });
        // toast.error(jsonData.message);
      }
    } else {
      // toast.error("Something went wrong");
    }
  } catch (err) {
    // toast.error(err.message);
  }
}
// --------------

function* pendingOrderCartDataRequest(e) {
  const { order_id } = e.payload;
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const response = yield fetch(
    `${host}order/view-order-detail-web/${storeId}/${saasId}/${order_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const jsonData = yield response.json();
  console.log("JSONDATA ORDER ARR", jsonData);
  if (jsonData.status === true) {
    yield put({
      type: "ComponentPropsManagement/pendingOrderCartDataResponse",
      data: jsonData.data,
    });
  } else {
    yield put({
      type: "ComponentPropsManagement/handleTaxRatesResponse",
      data: "",
    });
  }
}

//

function* handleViewOrderPendingRequest(e) {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  try {
    const date = new Date();
    const response = yield fetch(
      // `${host}order/view-order/${moment(date).format("Y-MM-DD")}/${saasId}`,
      `${host}order/view-order/${saasId}/${storeId}`,
      {
        // const response = yield fetch(`${host}order/view-order/2023-07-13/saas123`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(e.payload),
      }
    );
    const jsonData = yield response.json();
    console.log("ALL LIST ORDERS", jsonData);
    if (jsonData) {
      if (jsonData.status === true) {
        yield put({
          type: "ComponentPropsManagement/handleViewOrderPendingResponse",
          data: jsonData.data,
        });
        return;
      } else {
        yield put({
          type: "ComponentPropsManagement/handleViewOrderPendingResponse",
          data: null,
        });
        // toast.error(jsonData.message);
      }
    } else {
      // toast.error("Something went wrong");
    }
  } catch (err) {
    // toast.error(err.message);
  }
}

// --------------

// Member Enrollment
function* handleMemberEnrollmentRequest(e) {
  console.log("E PAYLOAD ENROLLMENT", e.payload);

  const response = yield fetch(`${LOYALTY_BASE_URL}/loyalty/customer`, {
    // const response = yield fetch(`${BASE_Url}/loyalty/customer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("JSONDATA MEMBER ENRL", jsonData);
  if (jsonData) {
    if (jsonData.status === true) {
      toast.success(jsonData.message);
      // yield put({
      //   type: "ComponentPropsManagement/handleYesterdaySalesResponse",
      //   data: jsonData,
      // });
      // return;
    }
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleYesterdaySalesResponse",
      data: null,
    });
  } else {
    // toast.error("Something went wrong server side");
  }
}

// Accruval Loyalty
function* handleAccruvalRequest(e) {
  // const loyalty_data = JSON.parse(localStorage.getItem("Loyalty_data"));
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  console.log("ACC E", e);
  try {
    console.log("E PAYLOAD ACCURAVAL", e.payload);
    //here edit payload remove link_loyalty_detail and store in new variable
    const newPayload = {...e.payload, link_loyalty_detail: e.payload.link_loyalty_detail.loyalty_id };
    console.log("NEW PAYLOAD ACCURAVAL", newPayload);
    if(e?.payload?.link_loyalty_detail?.loyalty_id){
      const response = yield fetch(
        `${LOYALTY_BASE_URL}/loyalty/issue/${saasId}/${newPayload.link_loyalty_detail}`,
        {
          // const response = yield fetch(`${BASE_Url}/loyalty/customer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPayload),
        }
      );
      // Here i want call handleRedeemPointRequest function to redeem points.
      //if payload.tender have tender_name loyalty then call handleRedeemPointRequest function.
      if(e.payload.tender?.length && e.payload.tender.some(t=>t.tender_name === 'loyalty')){
        yield put({
          type: "ComponentPropsManagement/handleRedeemPointRequest",
          payload: {
            link_loyalty_detail: {
              loyalty_id: e.payload.link_loyalty_detail.loyalty_id,
            },
            saas_id: saasId,
            store_id: storeId,
            redeem_amount: e.payload.tender.find(t=>t.tender_name === 'loyalty').tender_value,
            bussiness_date: moment(new Date()).format("YYYY-MM-DD"),
            invoice_number:e.payload.invoice_no,
            remarks: "",
          },
        });
      }
      // yield put({
      //   type: "ComponentPropsManagement/handleRedeemPointRequest",
      //   payload: {
      //     link_loyalty_detail: {
      //       loyalty_id: e.payload.link_loyalty_detail.loyalty_id,
      //     },
      //     saas_id: saasId,
      //     store_id: storeId,
      //     bussiness_date: moment(new Date()).format("YYYY-MM-DD"),
      //     invoice_number:e.payload.invoice_no,
      //     remarks: "",
      //   },
      // });
      const jsonData = yield response.json();
    }
    // console.log("JSONDATA ACC>", jsonData);
    // if (jsonData) {
    //   if (jsonData.status === true) {
    //     yield put({
    //       type: "ComponentPropsManagement/handleYesterdaySalesResponse",
    //       data: jsonData,
    //     });
    //     return;
    //   }
    //   toast.error(jsonData.message);
    //   yield put({
    //     type: "ComponentPropsManagement/handleYesterdaySalesResponse",
    //     data: null,
    //   });
    // } else {
    //   toast.error("Something went wrong server side");
    // }
  } catch (err) {
    console.log(err);
  }
}
//
function* handleDebitNoteRequest(e) {
  console.log("E PAYLOAD", e);
  try {
    const response = yield fetch(`${BASE_Url}/Debit/create-debitnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json();
    console.log("Debit Note JSONDATA", jsonData);
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleCreateTaxMasterResponse",
          data: jsonData.data,
        });
      } else {
        // toast.error(jsonData.message);
      }
    } else {
      // toast.error("Something went wrong");
    }
  } catch (err) {
    // toast.error(err.message);
  }
}

//user master

function* handleCreateUserMasterRequest(e) {
  // const { searchValue } = e.payload;
  console.log("E ADD PARTY", e);
  // const { storeId } = e.payload;
  // console.log("STORE ID", storeId);
  const response = yield fetch(`${BASE_Url}/user-master/add-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("ADD PARTY DATA", jsonData);
  if (jsonData) {
    if (jsonData.status === true) {
      toast.success(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleAddPartyResponse",
        data: jsonData,
      });
    } else {
      // toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleAddPartyResponse",
        data: {},
      });
    }
  } else {
    // toast.error(jsonData.message);
  }
}
// Delivery node
function* handleDeliveryNoteRequest(e) {
  console.log("E PAYLOAD", e);
  try {
    const response = yield fetch(`${BASE_Url}/Debit/create-debit-chalan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json();
    console.log("Debit Note JSONDATA", jsonData);
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleCreateTaxMasterResponse",
          data: jsonData.data,
        });
      } else {
        // toast.error(jsonData.message);
      }
    } else {
      // toast.error("Something went wrong");
    }
  } catch (err) {
    // toast.error(err.message);
  }
}

function* handleDelGetUserRequest(e) {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  console.log("E PAYLOAD USER DATA", e.payload);
  const { searchValue } = e.payload;
  try {
    const response = yield fetch(
      `${BASE_Url}/customer/search-customer/${storeId}/EEEE/${searchValue}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(e.payload),
      }
    );
    const jsonData = yield response.json();
    console.log("JSONDATA E USER", jsonData);
    if (jsonData) {
      if (jsonData.status === true) {
        const tempSearchArr = jsonData.data;
        const arr = [];
        tempSearchArr.map((el) => {
          // arr.push({ label: el.taxCode + "@" + el.taxRate, ...el });
          arr.push({ ...el, label: el.name, value: el.name });
        });
        // toast.success(jsonData.message);
        // console.log("ARR", arr);
        yield put({
          type: "ComponentPropsManagement/handleDelGetUserResponse",
          data: arr,
        });
      } else {
        // toast.error(jsonData.message);
      }
    } else {
      // toast.error("Something went wrong");
    }
  } catch (err) {
    // toast.error(err.message);
  }
}

// Handle GetParty Name
function* handleGetPatyNameRequest(e) {
  const response = yield fetch(
    `${BASE_Url}/bahikhata/get-party-name`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ effective_from, end_date, tax_desc, hsn_code }),
    }
  );
  const jsonData = yield response.json();

  if (jsonData) {
    if (jsonData && jsonData.data) {
      const arr = [];
      jsonData.data.map((item) => {
        arr.push({ label: item, value: item });
      });
      yield put({
        type: "ComponentPropsManagement/handleGetPatyNameResponse",
        data: arr,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handleBahikhataPartyDropdownResponse",
      data: [],
    });
  }
}
function* handelgetOrderDetailsRequest(e) {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const response = yield fetch(
    `${BASE_Url}/order/get-order-details/${saasId}/${storeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const jsonData = yield response.json();
  console.log("status JSONDATA", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      // const arr = [];
      // jsonData.data.map((item) => {
      //   arr.push({ label: item, value: item });
      // });
      yield put({
        type: "ComponentPropsManagement/handelgetOrderDetailsResponse",
        data: jsonData.data,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handelgetOrderDetailsResponse",
      data: [],
    });
  }
}
// handleLinkLoyaltyRequest
function* handleLinkLoyaltyRequest(e) {
  console.log("SEARCH LINK MOBILE", e);
  // const { mobile_number } = e.payload;
  try {
    const response = yield fetch(
      // `${LOYALTY_BASE_URL}/loyalty/customer-details`,
      `${LOYALTY_BASE_URL}/loyalty/customer-details`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(e.payload),
      }
    );
    const jsonData = yield response.json();
    // 9877678
    if (jsonData) {
      console.log("JSONDATA loyalty data", jsonData);
      yield put({
        type: "ComponentPropsManagement/handleLinkLoyaltyResponse",
        data: jsonData,
      });
    } else {
      toast.error(jsonData.error_message);
    }
  } catch (err) {
    // toast.error("No data Found");
  }
}
function* handleLinkCustomerRequest(e) {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));

  console.log("SEARCH LINK MOBILE", e);
  // const { mobile_number } = e.payload;
  try {
    const response = yield fetch(
      `${BASE_Url}/customer/search-customer/${storeId}/${saasId}/${e.payload.name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(e.payload),
      }
    );
    const jsonData = yield response.json();
    console.log("JSONDATA LINK CUSTOMER", jsonData);
    // if (jsonData) {
    //   yield put({
    //     type: "ComponentPropsManagement/handleLinkLoyaltyResponse",
    //     data: jsonData,
    //   });
    // } else {
    //   // toast.error("Something went wrong");
    // }
  } catch (err) {
    // toast.error(err.message);
  }
}

// handleRedeemPointRequest
function* handleRedeemPointRequest(e) {
  console.log("SEARCH LINK MOBILE", e);
  // const { mobile_number } = e.payload;
  try {
    const response = yield fetch(
      `${LOYALTY_BASE_URL}/loyalty/redeem-points/${e.payload.link_loyalty_detail.loyalty_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(e.payload),
      }
    );
    const jsonData = yield response.json();
    console.log("JSONDATA E USER", jsonData);
    //   if (jsonData) {
    //     yield put({
    //       type: "ComponentPropsManagement/handleLinkLoyaltyResponse",
    //       data: jsonData,
    //     });
    //   } else {
    //     toast.error("Something went wrong");
    //   }
  } catch (err) {
    // toast.error(err.message);
  }
}
// HandleCustomerDetailforpendingorder
function* handelCustomerDetailforPendingRequest(e) {
  const { orderNumber } = e.payload;
  console.log("ORDER NUMBER", orderNumber);
  const { storeId, saasId, userName } = JSON.parse(
    localStorage.getItem("User_data")
  );
  const response = yield fetch(
    `${host}order/get-ordermaster-details/${saasId}/${storeId}/${orderNumber}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const jsonData = yield response.json();
  console.log("get-ordermaster-details", jsonData);
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handelCustomerDetailforPendingResponse",
        // data: jsonData,
        data: jsonData.data,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handelCustomerDetailforPendingResponse",
      data: "",
    });
  }
}
function* handelCustomerDetailforAddressRequest(e) {
  // const { orderNumber } = e.payload;
  console.log("EEEEEEEEE", e);
  const { storeId, saasId, userName } = JSON.parse(
    localStorage.getItem("User_data")
  );
  const response = yield fetch(
    `${host}customer/get-address/${saasId}/${storeId}/2`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const jsonData = yield response.json();
  // console.log("ADDRESS", jsonData);
  // if (jsonData) {
  //   if (jsonData.status === true) {
  //     yield put({
  //       type: "ComponentPropsManagement/handelCustomerDetailforAddressResponse",
  //       // data: jsonData,
  //       data: jsonData.data,
  //     });
  //   }
  // } else {
  //   yield put({
  //     type: "ComponentPropsManagement/handelCustomerDetailforAddressResponse",
  //     data: "",
  //   });
  // }
}

// Search Invoice By Invoice No /Return
function* handleSearchInvoiceRequest(e) {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const response = yield fetch(
    `${host}transaction/search-invoice/${storeId}/${saasId}/${e.payload.searchValue}`,
    {
      method: "GET",
    }
  );
  const jsonData = yield response.json();
  console.log("JSONDATA RETURN", jsonData);
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleSearchInvoiceResponse",
        data: jsonData.data,
      });
      return;
    }
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleSearchInvoiceResponse",
      data: [],
    });
  } else {
    // toast.error(jsonData.message);
  }
}

// Search handlePurchaseRequest
function* handelPurchaseRequest(e) {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const date = new Date();
  const response = yield fetch(
    `${BASE_Url}/ledger/getLedger/2023-07-27/${saasId}/${storeId}`,
    {
      method: "GET",
    }
  );
  const jsonData = yield response.json();
  console.log("Done by prince", jsonData);
  if (jsonData) {
    yield put({
      type: "ComponentPropsManagement/handelPurchaseResponse",
      data: jsonData.data,
    });
  } else {
    yield put({
      type: "ComponentPropsManagement/handelPurchaseResponse",
      data: "",
    });
  }
}

// View Order Request
function* handleViewOrderRequest(e) {
  // console.log("ORDER ID SAGA", e);
  const { order_id } = e.payload.item;
  // console.log("customer_id SAGA", order_id);
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const response = yield fetch(
    `${BASE_Url}/order/view-order-detail-web/${storeId}/${saasId}/${order_id}`,
    {
      method: "GET",
    }
  );
  const jsonData = yield response.json();
  console.log("JSONDATA VIEW ORDER", jsonData.data);
  // if (jsonData) {
  //   const arr = jsonData.data;
  //   arr.map((el) => {
  //     el["discount"] = 0;
  //     el["sku"] = "SKU";
  //     el["description"] = "description";
  //     el["tax"] = 0.0;
  //     el["department"] = "Dept2";
  //     el["promoId"] = "123";
  //     el["discount_menu_is_open"] = false;
  //     el["discount_value"] = 0;
  //     // item["discount_menu_is_open"] = false;
  //   });
  //   if (jsonData.status === true) {
  //     yield put({
  //       type: "ComponentPropsManagement/handleViewOrderResponse",
  //       // data: jsonData.data,
  //       data: arr,
  //     });
  //     return;
  //   }
  //   toast.error(jsonData.message);
  //   yield put({
  //     type: "ComponentPropsManagement/handleViewOrderResponse",
  //     data: [],
  //   });
  // } else {
  //   toast.error(jsonData.message);
  // }
}

// View order By orderDate and saasId
function* handleViewOrderBySaasIdAndOrderIdRequest(e) {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const response = yield fetch(
    `${BASE_Url}/order/view-order/2023-07-14/${saasId}`,
    {
      method: "GET",
    }
  );
  const jsonData = yield response.json();
  // console.log("View order By orderDate and saasId", jsonData.data);
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleViewOrderBySaasIdAndOrderIdResponse",
        data: jsonData.data,
      });
      return;
    }
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleViewOrderBySaasIdAndOrderIdResponse",
      data: [],
    });
  } else {
    // toast.error(jsonData.message);
  }
}
// View order By Customer
function* handleViewOrderByCustomerRequest(e) {
  const { storeId, saasId, } = JSON.parse(
    localStorage.getItem("User_data")
  );
  const { id } = JSON.parse(
    localStorage.getItem("Customer_data")
  );
  const response = yield fetch(
    `${BASE_Url}/order/view-order-customer/${saasId}/${storeId}/${id}`,
    {
      method: "GET",
    }
  );
  const jsonData = yield response.json();
  // console.log("__CUSTOMER", jsonData);
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleViewOrderByCustomerResponse",
        data: jsonData.data,
      });
      return;
    }
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleViewOrderBySaasIdAndOrderIdResponse",
      data: [],
    });
  } else {
    // toast.error(jsonData.message);
  }
}
// Category
function* handleCategoriesRequest(e) {
  const { storeId, saasId, userName } = JSON.parse(
    localStorage.getItem("User_data")
  );
  const response = yield fetch(`${BASE_Url}/item/get/category/${saasId}/${storeId}`, {
    method: "GET",
  });
  const jsonData = yield response.json();
  console.log("__CATEGORY", jsonData);
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleCategoriesResponse",
        data: jsonData.data,
      });
      return;
    }
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleCategoriesResponse",
      data: [],
    });
  } else {
    // toast.error(jsonData.message);
  }
}

// get all data by category
function* handleAllDataByCategoryRequest(e) {
  console.log(e.payload);
  const { el } = e.payload;
  const { storeId, saasId, userName } = JSON.parse(
    localStorage.getItem("User_data")
  );
  const response = yield fetch(
    // `${BASE_Url}/item/get/item/List/${"GROCERY"}/${saasId}`,
    `${BASE_Url}/item/get/item/List/${el}/${saasId}`,
    {
      method: "GET",
    }
  );
  const jsonData = yield response.json();
  console.log("CATEGORIES_____-_", jsonData);
  if (jsonData) {
    if (jsonData.status === true) {
      const tempSearchArr = jsonData.data;
      tempSearchArr.map((el) => {
        el["productQty"] = 1;
        el["item_id"] = el.productId;
        el["item_name"] = el.category;
        el["tax_percent"] = el.taxPercent;
        el["saas_id"] = el.saasId;
        el["store_id"] = el.storeId;
        el["promo_id"] = el.promoId;
        el["image_name"] = el.imageName;
        el["hsn_code"] = el.hsnCode;
        el["tax_rate"] = el.taxRate;
        el["tax_code"] = el.taxCode;
        el["new_price"] = el.price;
        el["discount_menu_is_open"] = false;
        el["discount_value"] = "";
        el["amount_value"] = "";
        el["zero_price"] = "";
        el["sku"] = "SKU";
        // el["department"] = "Dept2";
        el["bill_qty"] = 0;
        // userType === "CUSTOMER" ? (el["name"] = el.item_name) : "";
        // userType === "CUSTOMER" ? (el["order_qty"] = el.productQty) : "";
        // userType === "CUSTOMER" ? (el["order_price"] = el.price) : "";

        // el["new_edit_price"] = 0;
        // el["discount"] = false;
      });
      yield put({
        type: "ComponentPropsManagement/handleAllDataByCategoryResponse",
        data: tempSearchArr,
      });
      return;
    }
    // toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleAllDataByCategoryResponse",
      data: [],
    });
  } else {
    // toast.error(jsonData.message);
  }
}

// Invoiced
function* updateInvoicedRequest(e) {
  console.log("in saga update invoice E", e);
  const { order_id, status } = e.payload;
  // console.log(order_id);
  // console.log(status);
  try {
    const response = yield fetch(
      `${BASE_Url}/order/update/order/master/${order_id}`,
      // `${BASE_Url}order/update/order/master/${e.payload.order_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(e.payload),
      }
    );
    const jsonData = yield response.json();
    console.log("order Update JSONDATA", jsonData);
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        // yield put({
        //   type: "ComponentPropsManagement/handleCreateTaxMasterResponse",
        //   data: jsonData.data,
        // });
      } else {
        // toast.error(jsonData.message);
      }
    } else {
      // toast.error("Something went wrong");
    }
  } catch (err) {
    // toast.error(err.message);
  }
}

// Create OrderMaster
function* handleCreateOrderRequest(e) {
  // const navigate = useNavigate();
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const response = yield fetch(`${BASE_Url}/order/create/order/master`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("JSONDATA Create OrderMaster", jsonData);
  if (jsonData) {
    if (jsonData.status === true) {
      // yield put({
      //   type: "ComponentPropsManagement/handleCreateOrderResponse",
      //   data: jsonData.data,
      // });
      localStorage.removeItem("my-cart");
      localStorage.removeItem("invoiceValue");
      // navigate("/home")
      toast.success("Order Created Successfully!!!");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
      // return;
      yield put({
          type: "ComponentPropsManagement/handlecartCount",
          data: 0,
        });
    }
    // toast.error(jsonData.message);
    // yield put({
    //   type: "ComponentPropsManagement/handleCreateOrderResponse",
    //   data: [],
    // });
  } else {
    toast.error(jsonData.message);
  }
}
// GETALL CUSTOMER ADDRESS
function* handelCustomerAllAddressRequest(e) {
  const response = yield fetch(
    `${BASE_Url}/customer/get-all-customer-address`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handelCustomerAllAddressResponse",
        // data: jsonData,
        data: jsonData.data,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handelCustomerAllAddressResponse",
      data: [],
    });
  }
}

export function* helloSaga() {
  yield takeEvery(
    "ComponentPropsManagement/handleLoginRequest",
    handleLoginRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleBahikhataCreateRequest",
    handleBahikhataCreateRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleBahikhataPartyDropdownRequest",
    handleBahikhataPartyDropdownRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleItemMasterListRequest",
    handleItemMasterListRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleSalesReportRequest",
    handleSalesReportRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleGstReportRequest",
    handleGstReportRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleTenderReportRequest",
    handleTenderReportRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleGstReportItemRequest",
    handleGstReportItemRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleDebitNoteMisListRequest",
    handleDebitNoteMisListRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleChallanMisListRequest",
    handleChallanMisListRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleDaySaleMisListRequest",
    handleDaySaleMisListRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handlePurchaseMisListRequest",
    handlePurchaseMisListRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleBaikhataMisListRequest",
    handleBaikhataMisListRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleExpensesMisListRequest",
    handleExpensesMisListRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleLedgerMisListRequest",
    handleLedgerMisListRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleRegisterRequest",
    handleRegisterRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleExpenseCategoryDropdownRequest",
    handleExpenseCategoryDropdownRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handlePartyNameDataRequest",
    handlePartyNameDataRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handelCustomerListRequest",
    handelCustomerListRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleRegisterUserRequest",
    handleRegisterUserRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleUpdateMoqRequest",
    handleUpdateMoqRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleUpdatePriceRequest",
    handleUpdatePriceRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleAddItemToStoreRequest",
    handleAddItemToStoreRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleUpdateItemToStoreRequest",
    handleUpdateItemToStoreRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleHSNCODERequest",
    handleHSNCODERequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleSearchedDataRequest",
    handleSearchedDataRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handelCustomerDetailforAddressRequest",
    handelCustomerDetailforAddressRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleExpenseCreateRequest",
    handleExpenseCreateRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleSearchedDataRequest1",
    handleSearchedDataRequest1
  );
  yield takeEvery(
    "ComponentPropsManagement/handleRecommendedDataRequest",
    handleRecommendedDataRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleQRImageRequest",
    handleQRImageRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleDeleteCartItemRequest",
    handleDeleteCartItemRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleSaveTransactionRequest",
    handleSaveTransactionRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleTaxRatesRequest",
    handleTaxRatesRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleAddPartyRequest",
    handleAddPartyRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleCreateUserMasterRequest",
    handleCreateUserMasterRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleAddPurchaseRequest",
    handleAddPurchaseRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleCreateRowTaxMasterRequest",
    handleCreateRowTaxMasterRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleStoreNameRequest",
    handleStoreNameRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleAddItemSearchRequest",
    handleAddItemSearchRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleUploadPicRequest",
    handleUploadPicRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleUploadItemRequest",
    handleUploadItemRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleUploadInventoryRequest",
    handleUploadInventoryRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleSalesOverviewRequest",
    handleSalesOverviewRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleLastWeekSalesRequest",
    handleLastWeekSalesRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handelCreateDigitalPromotionRequest",
    handelCreateDigitalPromotionRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleLastMonthSalesRequest",
    handleLastMonthSalesRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleTodaySalesRequest",
    handleTodaySalesRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleNumberOfCustomerRequest",
    handleNumberOfCustomerRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleLowStockItemsRequest",
    handleLowStockItemsRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleQuantityInHandRequest",
    handleQuantityInHandRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleLastFourteenDaysSalesRequest",
    handleLastFourteenDaysSalesRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleLastSixtyDaysSalesRequest",
    handleLastSixtyDaysSalesRequest
  );
  // yield takeEvery(
  //   "ComponentPropsManagement/handleSearchedDataRequest2",
  //   handleSearchedDataRequest2
  // );

  yield takeEvery(
    "ComponentPropsManagement/handleYesterdaySalesRequest",
    handleYesterdaySalesRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleGstTypeDropdownRequest",
    handleGstTypeDropdownRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleGetHsnCodeDropdownRequest",
    handleGetHsnCodeDropdownRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleSalesDashboardChartRequest",
    handleSalesDashboardChartRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleInventoryMasterRequest",
    handleInventoryMasterRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleCreateTaxMasterRequest",
    handleCreateTaxMasterRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleCreateSaasMasterRequest",
    handleCreateSaasMasterRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleEmailNotificationResponse",
    handleEmailNotificationResponse
  );
  yield takeEvery(
    "ComponentPropsManagement/handlewhatsAppRequest",
    handlewhatsAppRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleLowStockItemListRequest",
    handleLowStockItemListRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleMemberEnrollmentRequest",
    handleMemberEnrollmentRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handelAddcategoryRequest",
    handelAddcategoryRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleAccruvalRequest",
    handleAccruvalRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleNoOfItemRequest",
    handleNoOfItemRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleDebitNoteRequest",
    handleDebitNoteRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleDeliveryNoteRequest",
    handleDeliveryNoteRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleDelGetUserRequest",
    handleDelGetUserRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleLinkLoyaltyRequest",
    handleLinkLoyaltyRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleRedeemPointRequest",
    handleRedeemPointRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleCreateSupplierRequest",
    handleCreateSupplierRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleSearchInvoiceRequest",
    handleSearchInvoiceRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleGetPatyNameRequest",
    handleGetPatyNameRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleViewOrderRequest",
    handleViewOrderRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleLinkCustomerRequest",
    handleLinkCustomerRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handelCustomerDetailforPendingRequest",
    handelCustomerDetailforPendingRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleCreateOrderRequest",
    handleCreateOrderRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleViewOrderBySaasIdAndOrderIdRequest",
    handleViewOrderBySaasIdAndOrderIdRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/pendingOrderCartDataRequest",
    pendingOrderCartDataRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleViewOrderPendingRequest",
    handleViewOrderPendingRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleUpdateAddressforUserRequest",
    handleUpdateAddressforUserRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/updateInvoicedRequest",
    updateInvoicedRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleViewOrderByCustomerRequest",
    handleViewOrderByCustomerRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handelPromotionAssetsRequest",
    handelPromotionAssetsRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handelCustomerAllAddressRequest",
    handelCustomerAllAddressRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleCategoriesRequest",
    handleCategoriesRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleAllDataByCategoryRequest",
    handleAllDataByCategoryRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleXYZRequest",
    handleXYZRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handelPurchaseRequest",
    handelPurchaseRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handelGetCategoryRequest",
    handelGetCategoryRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handelgetOrderDetailsRequest",
    handelgetOrderDetailsRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handelSMSRequest",
    handelSMSRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handeleCategoriesHomeRequest",
    handeleCategoriesHomeRequest
  );
}

// export function* incrementAsync() {
//     yield delay(1000)
//     yield put({ type: 'INCREMENT' })
// }

// export function* watchIncrementAsync() {
//     yield takeEvery('INCREMENT_ASYNC', incrementAsync)
// }

// export function* saga() {

// }

export default function* rootSaga() {
  yield all([
    helloSaga(),
    // watchIncrementAsync()
  ]);
}

// export default saga
