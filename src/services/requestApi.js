import http from "./http-common";

class DataService {
  // auth api's
 
  GetAllCustomer(saasId,storeId) {
    return http.get(`/customer/get/${saasId}/${storeId}`);
  }
  GetSMS(saasId,storeId) {
    return http.get(`/sms/sms-mobile/${saasId}/${storeId}`);
  }
  GetAllCategory(saasId,storeId) {
    return http.get(`/category/get-list/${saasId}/${storeId}`);
  }
  deleteCustomer(customer_id) {
    return http.delete(`/customer/delete-customers/${customer_id}`);
  }
  deleteCategory(category_id) {
    return http.delete(`/category/delete-detail/${category_id}`);
  }
  CategoryUpdate(category_id, data) {
    return http.put(`/category/update-detil/${category_id}`, data);
  }
  CategoryAdd(data) {
    return http.post(`/category/store/category`, data);
  }
  CustomerUpdate(customer_id, data) {
    return http.put(`/customer/update/${customer_id}`, data);
  }
  AddCutomer(data) {
    return http.post(`/customer/create`, data);
  }
  AddPaymentApproval(data) {
    return http.post(`/paymentReference/save-customer-details`, data);
  }
  UploadCsv(storeId, file){
    return http.post(`/email/upload-email/${storeId}`,file)
  }
  GetUploadData(date,storeId){
    return http.get(`/email/getAllCustomerEmail/${date}/${storeId}`)
  }
  SendEmail(data){
    return http.post(`/email/send-customer-email`,data)
  }
  GetSaleman(saasId,storeId,salesmanid){
    return http.get(`/customer/get-customer-by-sales-id/${saasId}/${storeId}/${salesmanid}`)
  }
  Scanitembyid(storeId,saasId,itemid){
    return http.get(`/search/item-by-itemId/${storeId}/${saasId}/${itemid}`)
  }
}
export default new DataService();
