export let BASE_Url = "";
export let Email_Url = "";
export let host = "";
export let LOYALTY_BASE_URL = "";
export const isDev = false;
if (isDev === true) {
  BASE_Url = "http://103.139.59.233:8089/prod/api/v1";
  Email_Url = "http://103.139.59.233:8088/test/";
  host = "http://3.7.230.172:8088/test/api/v1/";
  LOYALTY_BASE_URL = "http://3.111.70.84:8091/test/v1";
} else if (isDev === false) {
  BASE_Url = "https://posprdapi.photonsoftwares.com/prod/api/v1";
  Email_Url = "https://posprdapi.photonsoftwares.com/prod/";
  host = "https://posprdapi.photonsoftwares.com/prod/api/v1/";
  LOYALTY_BASE_URL = "https://loyaltyprdapi.photonsoftwares.com/prod/api/v1";
}
