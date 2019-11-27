const jsSHA = require("jssha");
const METHOD = {
  "alg": "HS256",
  "typ": "JWT"
};
const METHOD_JSON_BASE64 = window.btoa(JSON.stringify(METHOD));
const secret_Token = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const TEXT = "TEXT";
const EXPIRED_DATE = "expriedDate";
const USER_ID = "userID";
const generateThirdPart = (content) => {
  let shaObj = new jsSHA("SHA-256", TEXT);
  shaObj.setHMACKey(secret_Token, TEXT)
  shaObj.update(content);
  let hmac = shaObj.getHMAC("B64");
  hmac = hmac.replace(/(={0,2})$/, "");
  hmac = hmac.replace(/\//g, "_");
  hmac = hmac.replace(/\+/g, "-");
  return hmac
};
const verifyPayload = (payloadObj, userID) => {
  let ret = false;
  try {
    if (payloadObj[USER_ID] === userID) {
      let expiredTime = payloadObj[EXPIRED_DATE];
      if (expiredTime) {
        ret = (expiredTime > Date.now()) && payloadObj[USER_ID] === userID;
      } else {
        ret = true;
      }
    }
  } catch(e) {
    console.error(e);
  }
  return ret;
};
const encrypt = (payload) => {
  let ret;
  try {
    let payloadBase64 = window.btoa(JSON.stringify(payload));
    payloadBase64 = payloadBase64.replace(/(={0,2})$/, "");
    let contents = METHOD_JSON_BASE64 + "." + payloadBase64;
    let hmac = generateThirdPart(contents);
    ret = contents + "." + hmac;
    } catch(e) {
    console.error(e);
  }
  return ret;
};
const verify = (token, userID) => {
  let ret = false;
  try {
    userID = userID.toString();
    let tokenAry = token.split(".");
    if (generateThirdPart(tokenAry[0] + "." + tokenAry[1]) === tokenAry[2]) {
      let payloadObj = JSON.parse(window.atob(tokenAry[1]));
      ret = verifyPayload(payloadObj, userID);
    }
  } catch(e) {
    console.error(e);
  }
  return ret;
}
const JWT = {
  encrypt: encrypt,
  verify: verify
};

export default JWT;
