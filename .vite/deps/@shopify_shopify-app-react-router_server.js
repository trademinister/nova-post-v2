import "./chunk-R6G7IHLZ.js";
import {
  redirect
} from "./chunk-LPSZCDXK.js";
import {
  require_jsx_runtime
} from "./chunk-QFD2GQ4D.js";
import "./chunk-TWJRYSII.js";
import {
  __export,
  __publicField,
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@shopify/shopify-api/dist/esm/runtime/http/headers.mjs
function canonicalizeHeaderName(hdr) {
  return hdr.replace(/(^|-)(\w+)/g, (_fullMatch, start, letters) => start + letters.slice(0, 1).toUpperCase() + letters.slice(1).toLowerCase());
}
function getHeaders(headers, needle_) {
  const result = [];
  if (!headers)
    return result;
  const needle = canonicalizeHeaderName(needle_);
  for (const [key, values] of Object.entries(headers)) {
    if (canonicalizeHeaderName(key) !== needle)
      continue;
    if (Array.isArray(values)) {
      result.push(...values);
    } else {
      result.push(values);
    }
  }
  return result;
}
function getHeader(headers, needle) {
  var _a2;
  if (!headers)
    return void 0;
  return (_a2 = getHeaders(headers, needle)) == null ? void 0 : _a2[0];
}
function addHeader(headers, key, value) {
  canonicalizeHeaders(headers);
  const canonKey = canonicalizeHeaderName(key);
  let list = headers[canonKey];
  if (!list) {
    list = [];
  } else if (!Array.isArray(list)) {
    list = [list];
  }
  headers[canonKey] = list;
  list.push(value);
}
function canonicalizeValue(value) {
  if (typeof value === "number")
    return value.toString();
  return value;
}
function canonicalizeHeaders(hdr) {
  for (const [key, values] of Object.entries(hdr)) {
    const canonKey = canonicalizeHeaderName(key);
    if (!hdr[canonKey])
      hdr[canonKey] = [];
    if (!Array.isArray(hdr[canonKey]))
      hdr[canonKey] = [canonicalizeValue(hdr[canonKey])];
    if (key === canonKey)
      continue;
    delete hdr[key];
    hdr[canonKey].push(...[values].flat().map((value) => canonicalizeValue(value)));
  }
  return hdr;
}
function removeHeader(headers, needle) {
  canonicalizeHeaders(headers);
  const canonKey = canonicalizeHeaderName(needle);
  delete headers[canonKey];
}
function flatHeaders(headers) {
  if (!headers)
    return [];
  return Object.entries(headers).flatMap(([header, values]) => Array.isArray(values) ? values.map((value) => [header, value]) : [[header, values]]);
}

// node_modules/@shopify/shopify-api/dist/esm/adapters/web-api/adapter.mjs
async function webApiConvertRequest(adapterArgs) {
  const request2 = adapterArgs.rawRequest;
  const headers = {};
  for (const [key, value] of request2.headers.entries()) {
    addHeader(headers, key, value);
  }
  return {
    headers,
    method: request2.method ?? "GET",
    url: new URL(request2.url).toString()
  };
}
async function webApiConvertHeaders(headers, _adapterArgs) {
  const remixHeaders = new Headers();
  flatHeaders(headers ?? {}).forEach(([key, value]) => remixHeaders.append(key, value));
  return Promise.resolve(remixHeaders);
}
async function webApiConvertResponse(resp, adapterArgs) {
  return new Response(resp.body, {
    status: resp.statusCode,
    statusText: resp.statusText,
    headers: await webApiConvertHeaders(resp.headers ?? {})
  });
}
function webApiRuntimeString() {
  return "Web API";
}

// node_modules/@shopify/shopify-api/dist/esm/runtime/crypto/types.mjs
var HashFormat;
(function(HashFormat2) {
  HashFormat2["Base64"] = "base64";
  HashFormat2["Hex"] = "hex";
})(HashFormat || (HashFormat = {}));

// node_modules/@shopify/shopify-api/dist/esm/runtime/http/index.mjs
function isOK(resp) {
  return resp.statusCode >= 200 && resp.statusCode <= 299;
}
var abstractFetch = () => {
  throw new Error("Missing adapter implementation for 'abstractFetch' - make sure to import the appropriate adapter for your platform");
};
function setAbstractFetchFunc(func) {
  abstractFetch = func;
}
var abstractConvertRequest = () => {
  throw new Error("Missing adapter implementation for 'abstractConvertRequest' - make sure to import the appropriate adapter for your platform");
};
function setAbstractConvertRequestFunc(func) {
  abstractConvertRequest = func;
}
var abstractConvertIncomingResponse = () => Promise.resolve({});
var abstractConvertResponse = () => {
  throw new Error("Missing adapter implementation for 'abstractConvertResponse' - make sure to import the appropriate adapter for your platform");
};
function setAbstractConvertResponseFunc(func) {
  abstractConvertResponse = func;
}
var abstractConvertHeaders = () => {
  throw new Error("Missing adapter implementation for 'abstractConvertHeaders' - make sure to import the appropriate adapter for your platform");
};
function setAbstractConvertHeadersFunc(func) {
  abstractConvertHeaders = func;
}

// node_modules/@shopify/shopify-api/dist/esm/runtime/platform/runtime-string.mjs
var abstractRuntimeString = () => {
  throw new Error("Missing adapter implementation for 'abstractRuntimeString' - make sure to import the appropriate adapter for your platform");
};
function setAbstractRuntimeString(func) {
  abstractRuntimeString = func;
}

// node_modules/@shopify/shopify-api/dist/esm/adapters/web-api/index.mjs
setAbstractFetchFunc(fetch);
setAbstractConvertRequestFunc(webApiConvertRequest);
setAbstractConvertResponseFunc(webApiConvertResponse);
setAbstractConvertHeadersFunc(webApiConvertHeaders);
setAbstractRuntimeString(webApiRuntimeString);

// node_modules/@shopify/shopify-api/dist/esm/lib/error.mjs
var ShopifyError = class extends Error {
  constructor(message2) {
    super(message2);
    Object.setPrototypeOf(this, new.target.prototype);
  }
};
var InvalidHmacError = class extends ShopifyError {
};
var InvalidShopError = class extends ShopifyError {
};
var InvalidHostError = class extends ShopifyError {
};
var InvalidJwtError = class extends ShopifyError {
};
var MissingJwtTokenError = class extends ShopifyError {
};
var InvalidDeliveryMethodError = class extends ShopifyError {
};
var SafeCompareError = class extends ShopifyError {
};
var PrivateAppError = class extends ShopifyError {
};
var HttpRequestError = class extends ShopifyError {
};
var HttpMaxRetriesError = class extends ShopifyError {
};
var HttpResponseError = class extends ShopifyError {
  constructor({ message: message2, code, statusText, body, headers }) {
    super(message2);
    __publicField(this, "response");
    this.response = {
      code,
      statusText,
      body,
      headers
    };
  }
};
var HttpRetriableError = class extends HttpResponseError {
};
var HttpInternalError = class extends HttpRetriableError {
};
var HttpThrottlingError = class extends HttpRetriableError {
  constructor({ retryAfter, ...params }) {
    super(params);
    this.response.retryAfter = retryAfter;
  }
};
var GraphqlQueryError = class extends ShopifyError {
  constructor({ message: message2, response, headers, body }) {
    super(message2);
    __publicField(this, "response");
    __publicField(this, "headers");
    __publicField(this, "body");
    this.response = response;
    this.headers = headers;
    this.body = body;
  }
};
var InvalidOAuthError = class extends ShopifyError {
};
var BotActivityDetected = class extends ShopifyError {
};
var CookieNotFound = class extends ShopifyError {
};
var InvalidSession = class extends ShopifyError {
};
var InvalidWebhookError = class extends ShopifyError {
  constructor({ message: message2, response }) {
    super(message2);
    __publicField(this, "response");
    this.response = response;
  }
};
var MissingWebhookCallbackError = class extends InvalidWebhookError {
};
var MissingRequiredArgument = class extends ShopifyError {
};
var InvalidRequestError = class extends ShopifyError {
};
var BillingError = class extends ShopifyError {
  constructor({ message: message2, errorData }) {
    super(message2);
    __publicField(this, "errorData");
    this.errorData = errorData;
  }
};
var FeatureDeprecatedError = class extends ShopifyError {
};

// node_modules/@shopify/shopify-api/dist/esm/runtime/crypto/utils.mjs
async function createSHA256HMAC(secret, payload, returnFormat = HashFormat.Base64) {
  const cryptoLib = typeof (crypto == null ? void 0 : crypto.webcrypto) === "undefined" ? crypto : crypto.webcrypto;
  const enc = new TextEncoder();
  const key = await cryptoLib.subtle.importKey("raw", enc.encode(secret), {
    name: "HMAC",
    hash: { name: "SHA-256" }
  }, false, ["sign"]);
  const signature = await cryptoLib.subtle.sign("HMAC", key, enc.encode(payload));
  return returnFormat === HashFormat.Base64 ? asBase64(signature) : asHex(signature);
}
function asHex(buffer) {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
var LookupTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function asBase64(buffer) {
  let output = "";
  const input = new Uint8Array(buffer);
  for (let i = 0; i < input.length; ) {
    const byte1 = input[i++];
    const byte2 = input[i++];
    const byte3 = input[i++];
    const enc1 = byte1 >> 2;
    const enc2 = (byte1 & 3) << 4 | byte2 >> 4;
    let enc3 = (byte2 & 15) << 2 | byte3 >> 6;
    let enc4 = byte3 & 63;
    if (isNaN(byte2)) {
      enc3 = 64;
    }
    if (isNaN(byte3)) {
      enc4 = 64;
    }
    output += LookupTable[enc1] + LookupTable[enc2] + LookupTable[enc3] + LookupTable[enc4];
  }
  return output;
}
function hashString(str, returnFormat) {
  const buffer = new TextEncoder().encode(str);
  switch (returnFormat) {
    case HashFormat.Base64:
      return asBase64(buffer);
    case HashFormat.Hex:
      return asHex(buffer);
    default:
      throw new ShopifyError(`Unrecognized hash format '${returnFormat}'`);
  }
}

// node_modules/@shopify/shopify-api/dist/esm/runtime/http/utils.mjs
function splitN(str, sep, maxNumParts) {
  const parts = str.split(sep);
  const maxParts = Math.min(Math.abs(maxNumParts), parts.length);
  return [...parts.slice(0, maxParts - 1), parts.slice(maxParts - 1).join(sep)];
}

// node_modules/@shopify/shopify-api/dist/esm/runtime/http/cookies.mjs
var Cookies = class _Cookies {
  constructor(request2, response, { keys = [] } = {}) {
    __publicField(this, "response");
    __publicField(this, "receivedCookieJar", {});
    __publicField(this, "outgoingCookieJar", {});
    __publicField(this, "keys", []);
    this.response = response;
    if (keys)
      this.keys = keys;
    const cookieReqHdr = getHeader(request2.headers, "Cookie") ?? "";
    this.receivedCookieJar = _Cookies.parseCookies(cookieReqHdr.split(";"));
    const cookieResHdr = getHeaders(response.headers, "Set-Cookie") ?? [];
    this.outgoingCookieJar = _Cookies.parseCookies(cookieResHdr);
  }
  static parseCookies(hdrs) {
    const entries = hdrs.filter((hdr) => hdr.trim().length > 0).map((cookieDef) => {
      const [keyval, ...opts] = cookieDef.split(";");
      const [name, value] = splitN(keyval, "=", 2).map((value2) => value2.trim());
      return [
        name,
        {
          name,
          value,
          ...Object.fromEntries(opts.map((opt) => splitN(opt, "=", 2).map((value2) => value2.trim())))
        }
      ];
    });
    const jar = Object.fromEntries(entries);
    for (const cookie of Object.values(jar)) {
      if (typeof cookie.expires === "string") {
        cookie.expires = new Date(cookie.expires);
      }
    }
    return jar;
  }
  static encodeCookie(data) {
    let result = "";
    result += `${data.name}=${data.value};`;
    result += Object.entries(data).filter(([key]) => !["name", "value", "expires"].includes(key)).map(([key, value]) => `${key}=${value}`).join("; ");
    if (data.expires) {
      result += ";";
      result += `expires=${data.expires.toUTCString()}`;
    }
    return result;
  }
  toHeaders() {
    return Object.values(this.outgoingCookieJar).map((cookie) => _Cookies.encodeCookie(cookie));
  }
  updateHeader() {
    if (!this.response.headers) {
      this.response.headers = {};
    }
    removeHeader(this.response.headers, "Set-Cookie");
    this.toHeaders().map((hdr) => addHeader(this.response.headers, "Set-Cookie", hdr));
  }
  get(name) {
    var _a2;
    return (_a2 = this.receivedCookieJar[name]) == null ? void 0 : _a2.value;
  }
  deleteCookie(name) {
    this.set(name, "", {
      path: "/",
      expires: /* @__PURE__ */ new Date(0)
    });
  }
  async getAndVerify(name) {
    const value = this.get(name);
    if (!value)
      return void 0;
    if (!await this.isSignedCookieValid(name)) {
      return void 0;
    }
    return value;
  }
  get canSign() {
    var _a2;
    return ((_a2 = this.keys) == null ? void 0 : _a2.length) > 0;
  }
  set(name, value, opts = {}) {
    this.outgoingCookieJar[name] = {
      ...opts,
      name,
      value
    };
    this.updateHeader();
  }
  async setAndSign(name, value, opts = {}) {
    if (!this.canSign) {
      throw Error("No keys provided for signing.");
    }
    this.set(name, value, opts);
    const sigName = `${name}.sig`;
    const signature = await createSHA256HMAC(this.keys[0], value);
    this.set(sigName, signature, opts);
    this.updateHeader();
  }
  async isSignedCookieValid(cookieName) {
    const signedCookieName = `${cookieName}.sig`;
    if (!this.cookieExists(cookieName) || !this.cookieExists(signedCookieName)) {
      this.deleteInvalidCookies(cookieName, signedCookieName);
      return false;
    }
    const cookieValue = this.get(cookieName);
    const signature = this.get(signedCookieName);
    if (!cookieValue || !signature) {
      this.deleteInvalidCookies(cookieName, signedCookieName);
      return false;
    }
    const allCheckSignatures = await Promise.all(this.keys.map((key) => createSHA256HMAC(key, cookieValue)));
    if (!allCheckSignatures.includes(signature)) {
      this.deleteInvalidCookies(cookieName, signedCookieName);
      return false;
    }
    return true;
  }
  cookieExists(cookieName) {
    return Boolean(this.get(cookieName));
  }
  deleteInvalidCookies(...cookieNames) {
    cookieNames.forEach((cookieName) => this.deleteCookie(cookieName));
  }
};

// node_modules/compare-versions/lib/esm/utils.js
var semver = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
var validateAndParse = (version) => {
  if (typeof version !== "string") {
    throw new TypeError("Invalid argument expected string");
  }
  const match = version.match(semver);
  if (!match) {
    throw new Error(`Invalid argument not valid semver ('${version}' received)`);
  }
  match.shift();
  return match;
};
var isWildcard = (s) => s === "*" || s === "x" || s === "X";
var tryParse = (v) => {
  const n = parseInt(v, 10);
  return isNaN(n) ? v : n;
};
var forceType = (a, b) => typeof a !== typeof b ? [String(a), String(b)] : [a, b];
var compareStrings = (a, b) => {
  if (isWildcard(a) || isWildcard(b))
    return 0;
  const [ap, bp] = forceType(tryParse(a), tryParse(b));
  if (ap > bp)
    return 1;
  if (ap < bp)
    return -1;
  return 0;
};
var compareSegments = (a, b) => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const r = compareStrings(a[i] || "0", b[i] || "0");
    if (r !== 0)
      return r;
  }
  return 0;
};

// node_modules/compare-versions/lib/esm/compareVersions.js
var compareVersions = (v1, v2) => {
  const n1 = validateAndParse(v1);
  const n2 = validateAndParse(v2);
  const p1 = n1.pop();
  const p2 = n2.pop();
  const r = compareSegments(n1, n2);
  if (r !== 0)
    return r;
  if (p1 && p2) {
    return compareSegments(p1.split("."), p2.split("."));
  } else if (p1 || p2) {
    return p1 ? -1 : 1;
  }
  return 0;
};

// node_modules/compare-versions/lib/esm/compare.js
var compare = (v1, v2, operator) => {
  assertValidOperator(operator);
  const res = compareVersions(v1, v2);
  return operatorResMap[operator].includes(res);
};
var operatorResMap = {
  ">": [1],
  ">=": [0, 1],
  "=": [0],
  "<=": [-1, 0],
  "<": [-1],
  "!=": [-1, 1]
};
var allowedOperators = Object.keys(operatorResMap);
var assertValidOperator = (op) => {
  if (typeof op !== "string") {
    throw new TypeError(`Invalid operator type, expected string but got ${typeof op}`);
  }
  if (allowedOperators.indexOf(op) === -1) {
    throw new Error(`Invalid operator, expected one of ${allowedOperators.join("|")}`);
  }
};

// node_modules/@shopify/shopify-api/dist/esm/lib/types.mjs
var LogSeverity;
(function(LogSeverity2) {
  LogSeverity2[LogSeverity2["Error"] = 0] = "Error";
  LogSeverity2[LogSeverity2["Warning"] = 1] = "Warning";
  LogSeverity2[LogSeverity2["Info"] = 2] = "Info";
  LogSeverity2[LogSeverity2["Debug"] = 3] = "Debug";
})(LogSeverity || (LogSeverity = {}));
var ApiVersion;
(function(ApiVersion2) {
  ApiVersion2["October22"] = "2022-10";
  ApiVersion2["January23"] = "2023-01";
  ApiVersion2["April23"] = "2023-04";
  ApiVersion2["July23"] = "2023-07";
  ApiVersion2["October23"] = "2023-10";
  ApiVersion2["January24"] = "2024-01";
  ApiVersion2["April24"] = "2024-04";
  ApiVersion2["July24"] = "2024-07";
  ApiVersion2["October24"] = "2024-10";
  ApiVersion2["January25"] = "2025-01";
  ApiVersion2["April25"] = "2025-04";
  ApiVersion2["July25"] = "2025-07";
  ApiVersion2["October25"] = "2025-10";
  ApiVersion2["January26"] = "2026-01";
  ApiVersion2["Unstable"] = "unstable";
})(ApiVersion || (ApiVersion = {}));
var LIBRARY_NAME = "Shopify API Library";
var ShopifyHeader;
(function(ShopifyHeader2) {
  ShopifyHeader2["AccessToken"] = "X-Shopify-Access-Token";
  ShopifyHeader2["ApiVersion"] = "X-Shopify-API-Version";
  ShopifyHeader2["Domain"] = "X-Shopify-Shop-Domain";
  ShopifyHeader2["Hmac"] = "X-Shopify-Hmac-Sha256";
  ShopifyHeader2["Topic"] = "X-Shopify-Topic";
  ShopifyHeader2["SubTopic"] = "X-Shopify-Sub-Topic";
  ShopifyHeader2["WebhookId"] = "X-Shopify-Webhook-Id";
  ShopifyHeader2["StorefrontPrivateToken"] = "Shopify-Storefront-Private-Token";
  ShopifyHeader2["StorefrontSDKVariant"] = "X-SDK-Variant";
  ShopifyHeader2["StorefrontSDKVersion"] = "X-SDK-Version";
})(ShopifyHeader || (ShopifyHeader = {}));
var ClientType;
(function(ClientType2) {
  ClientType2["Rest"] = "rest";
  ClientType2["Graphql"] = "graphql";
})(ClientType || (ClientType = {}));
var privacyTopics = [
  "CUSTOMERS_DATA_REQUEST",
  "CUSTOMERS_REDACT",
  "SHOP_REDACT"
];
var BillingInterval;
(function(BillingInterval2) {
  BillingInterval2["OneTime"] = "ONE_TIME";
  BillingInterval2["Every30Days"] = "EVERY_30_DAYS";
  BillingInterval2["Annual"] = "ANNUAL";
  BillingInterval2["Usage"] = "USAGE";
})(BillingInterval || (BillingInterval = {}));
var BillingReplacementBehavior;
(function(BillingReplacementBehavior2) {
  BillingReplacementBehavior2["ApplyImmediately"] = "APPLY_IMMEDIATELY";
  BillingReplacementBehavior2["ApplyOnNextBillingCycle"] = "APPLY_ON_NEXT_BILLING_CYCLE";
  BillingReplacementBehavior2["Standard"] = "STANDARD";
})(BillingReplacementBehavior || (BillingReplacementBehavior = {}));
var StatusCode;
(function(StatusCode2) {
  StatusCode2[StatusCode2["Continue"] = 100] = "Continue";
  StatusCode2[StatusCode2["SwitchingProtocols"] = 101] = "SwitchingProtocols";
  StatusCode2[StatusCode2["Ok"] = 200] = "Ok";
  StatusCode2[StatusCode2["Created"] = 201] = "Created";
  StatusCode2[StatusCode2["Accepted"] = 202] = "Accepted";
  StatusCode2[StatusCode2["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
  StatusCode2[StatusCode2["NoContent"] = 204] = "NoContent";
  StatusCode2[StatusCode2["ResetContent"] = 205] = "ResetContent";
  StatusCode2[StatusCode2["PartialContent"] = 206] = "PartialContent";
  StatusCode2[StatusCode2["MultipleChoices"] = 300] = "MultipleChoices";
  StatusCode2[StatusCode2["MovedPermanently"] = 301] = "MovedPermanently";
  StatusCode2[StatusCode2["Found"] = 302] = "Found";
  StatusCode2[StatusCode2["SeeOther"] = 303] = "SeeOther";
  StatusCode2[StatusCode2["NotModified"] = 304] = "NotModified";
  StatusCode2[StatusCode2["UseProxy"] = 305] = "UseProxy";
  StatusCode2[StatusCode2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
  StatusCode2[StatusCode2["BadRequest"] = 400] = "BadRequest";
  StatusCode2[StatusCode2["Unauthorized"] = 401] = "Unauthorized";
  StatusCode2[StatusCode2["PaymentRequired"] = 402] = "PaymentRequired";
  StatusCode2[StatusCode2["Forbidden"] = 403] = "Forbidden";
  StatusCode2[StatusCode2["NotFound"] = 404] = "NotFound";
  StatusCode2[StatusCode2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
  StatusCode2[StatusCode2["NotAcceptable"] = 406] = "NotAcceptable";
  StatusCode2[StatusCode2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
  StatusCode2[StatusCode2["RequestTimeout"] = 408] = "RequestTimeout";
  StatusCode2[StatusCode2["Conflict"] = 409] = "Conflict";
  StatusCode2[StatusCode2["Gone"] = 410] = "Gone";
  StatusCode2[StatusCode2["LengthRequired"] = 411] = "LengthRequired";
  StatusCode2[StatusCode2["PreconditionFailed"] = 412] = "PreconditionFailed";
  StatusCode2[StatusCode2["RequestEntityTooLarge"] = 413] = "RequestEntityTooLarge";
  StatusCode2[StatusCode2["RequestUriTooLong"] = 414] = "RequestUriTooLong";
  StatusCode2[StatusCode2["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
  StatusCode2[StatusCode2["RequestedRangeNotSatisfiable"] = 416] = "RequestedRangeNotSatisfiable";
  StatusCode2[StatusCode2["ExpectationFailed"] = 417] = "ExpectationFailed";
  StatusCode2[StatusCode2["ImATeapot"] = 418] = "ImATeapot";
  StatusCode2[StatusCode2["UnprocessableEntity"] = 422] = "UnprocessableEntity";
  StatusCode2[StatusCode2["TooManyRequests"] = 429] = "TooManyRequests";
  StatusCode2[StatusCode2["InternalServerError"] = 500] = "InternalServerError";
  StatusCode2[StatusCode2["NotImplemented"] = 501] = "NotImplemented";
  StatusCode2[StatusCode2["BadGateway"] = 502] = "BadGateway";
  StatusCode2[StatusCode2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
  StatusCode2[StatusCode2["GatewayTimeout"] = 504] = "GatewayTimeout";
  StatusCode2[StatusCode2["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
})(StatusCode || (StatusCode = {}));
var Method;
(function(Method3) {
  Method3["Get"] = "GET";
  Method3["Post"] = "POST";
  Method3["Put"] = "PUT";
  Method3["Patch"] = "PATCH";
  Method3["Delete"] = "DELETE";
  Method3["Head"] = "HEAD";
  Method3["Options"] = "OPTIONS";
  Method3["Connect"] = "CONNECT";
})(Method || (Method = {}));

// node_modules/@shopify/shopify-api/dist/esm/lib/version.mjs
var SHOPIFY_API_LIBRARY_VERSION = "12.1.2";

// node_modules/@shopify/shopify-api/dist/esm/lib/logger/log.mjs
function log(config2) {
  return function(severity, message2, context = {}) {
    if (severity > config2.logger.level) {
      return;
    }
    const prefix = [];
    if (config2.logger.timestamps) {
      prefix.push(`${(/* @__PURE__ */ new Date()).toISOString().slice(0, -5)}Z`);
    }
    let packageString = context.package || "shopify-api";
    delete context.package;
    switch (severity) {
      case LogSeverity.Debug:
        packageString = `${packageString}/DEBUG`;
        break;
      case LogSeverity.Info:
        packageString = `${packageString}/INFO`;
        break;
      case LogSeverity.Warning:
        packageString = `${packageString}/WARNING`;
        break;
      case LogSeverity.Error:
        packageString = `${packageString}/ERROR`;
        break;
    }
    prefix.push(packageString);
    const contextParts = [];
    Object.entries(context).forEach(([key, value]) => {
      contextParts.push(`${key}: ${value}`);
    });
    let suffix = "";
    if (contextParts.length > 0) {
      suffix = ` | {${contextParts.join(", ")}}`;
    }
    config2.logger.log(severity, `[${prefix.join("] [")}] ${message2}${suffix}`);
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/logger/index.mjs
function logger(config2) {
  const logFunction = log(config2);
  return {
    log: logFunction,
    debug: async (message2, context = {}) => logFunction(LogSeverity.Debug, message2, context),
    info: async (message2, context = {}) => logFunction(LogSeverity.Info, message2, context),
    warning: async (message2, context = {}) => logFunction(LogSeverity.Warning, message2, context),
    error: async (message2, context = {}) => logFunction(LogSeverity.Error, message2, context),
    deprecated: deprecated(logFunction)
  };
}
function deprecated(logFunction) {
  return function(version, message2) {
    if (compare(SHOPIFY_API_LIBRARY_VERSION, version, ">=")) {
      throw new FeatureDeprecatedError(`Feature was deprecated in version ${version}`);
    }
    return logFunction(LogSeverity.Warning, `[Deprecated | ${version}] ${message2}`);
  };
}

// node_modules/@shopify/shopify-api/dist/esm/rest/load-rest-resources.mjs
function loadRestResources({ resources, config: config2, RestClient: RestClient2 }) {
  const firstResource = Object.keys(resources)[0];
  if (config2.apiVersion !== resources[firstResource].apiVersion) {
    logger(config2).warning(`Loading REST resources for API version ${resources[firstResource].apiVersion}, which doesn't match the default ${config2.apiVersion}`);
  }
  return Object.fromEntries(Object.entries(resources).map(([name, resource]) => {
    class NewResource extends resource {
    }
    NewResource.setClassProperties({
      Client: RestClient2,
      config: config2
    });
    Object.entries(NewResource.hasOne).map(([_attribute, klass]) => {
      klass.setClassProperties({
        Client: RestClient2,
        config: config2
      });
    });
    Object.entries(NewResource.hasMany).map(([_attribute, klass]) => {
      klass.setClassProperties({
        Client: RestClient2,
        config: config2
      });
    });
    Reflect.defineProperty(NewResource, "name", {
      value: name
    });
    return [name, NewResource];
  }));
}

// node_modules/@shopify/shopify-api/dist/esm/future/flags.mjs
function logDisabledFutureFlags(config2, logger2) {
  var _a2, _b2;
  if (!config2._logDisabledFutureFlags) {
    return;
  }
  const logFlag = (flag, message2) => logger2.info(`Future flag ${flag} is disabled.

  ${message2}
`);
  if (!((_a2 = config2.future) == null ? void 0 : _a2.customerAddressDefaultFix)) {
    logFlag("customerAddressDefaultFix", "Enable this flag to change the CustomerAddress classes to expose a 'is_default' property instead of 'default' when fetching data.");
  }
  if (!((_b2 = config2.future) == null ? void 0 : _b2.unstable_managedPricingSupport)) {
    logFlag("unstable_managedPricingSupport", "Enable this flag to support managed pricing, so apps can check for payments without needing a billing config. Learn more at https://shopify.dev/docs/apps/launch/billing/managed-pricing");
  }
}

// node_modules/@shopify/shopify-api/dist/esm/lib/auth/scopes/index.mjs
var _AuthScopes = class _AuthScopes {
  constructor(scopes) {
    __publicField(this, "compressedScopes");
    __publicField(this, "expandedScopes");
    __publicField(this, "originalScopes");
    let scopesArray = [];
    if (typeof scopes === "string") {
      scopesArray = scopes.split(new RegExp(`${_AuthScopes.SCOPE_DELIMITER}\\s*`));
    } else if (Array.isArray(scopes)) {
      scopesArray = scopes;
    } else if (scopes) {
      scopesArray = Array.from(scopes.expandedScopes);
    }
    scopesArray = scopesArray.map((scope) => scope.trim()).filter((scope) => scope.length);
    const impliedScopes = this.getImpliedScopes(scopesArray);
    const scopeSet = new Set(scopesArray);
    const impliedSet = new Set(impliedScopes);
    this.compressedScopes = new Set([...scopeSet].filter((x) => !impliedSet.has(x)));
    this.expandedScopes = /* @__PURE__ */ new Set([...scopeSet, ...impliedSet]);
    this.originalScopes = scopeSet;
  }
  /**
   * Checks whether the current set of scopes includes the given one.
   */
  has(scope) {
    let other;
    if (scope instanceof _AuthScopes) {
      other = scope;
    } else {
      other = new _AuthScopes(scope);
    }
    return other.toArray().filter((x) => !this.expandedScopes.has(x)).length === 0;
  }
  /**
   * Checks whether the current set of scopes equals the given one.
   */
  equals(otherScopes) {
    let other;
    if (otherScopes instanceof _AuthScopes) {
      other = otherScopes;
    } else {
      other = new _AuthScopes(otherScopes);
    }
    return this.compressedScopes.size === other.compressedScopes.size && this.toArray().filter((x) => !other.has(x)).length === 0;
  }
  /**
   * Returns a comma-separated string with the current set of scopes.
   */
  toString() {
    return this.toArray().join(_AuthScopes.SCOPE_DELIMITER);
  }
  /**
   * Returns an array with the current set of scopes.
   */
  toArray(returnOriginalScopes = false) {
    return returnOriginalScopes ? [...this.originalScopes] : [...this.compressedScopes];
  }
  getImpliedScopes(scopesArray) {
    return scopesArray.reduce((array, current) => {
      const matches = current.match(/^(unauthenticated_)?write_(.*)$/);
      if (matches) {
        array.push(`${matches[1] ? matches[1] : ""}read_${matches[2]}`);
      }
      return array;
    }, []);
  }
};
__publicField(_AuthScopes, "SCOPE_DELIMITER", ",");
var AuthScopes = _AuthScopes;

// node_modules/@shopify/shopify-api/dist/esm/lib/config.mjs
function validateConfig(params) {
  var _a2;
  const config2 = {
    apiKey: "",
    apiSecretKey: "",
    hostName: "",
    hostScheme: "https",
    isEmbeddedApp: true,
    isCustomStoreApp: false,
    logger: {
      log: defaultLogFunction,
      level: LogSeverity.Info,
      httpRequests: false,
      timestamps: false
    },
    future: {},
    _logDisabledFutureFlags: true
  };
  const mandatory = [
    "apiSecretKey",
    "hostName",
    "apiVersion"
  ];
  if (!("isCustomStoreApp" in params) || !params.isCustomStoreApp) {
    mandatory.push("apiKey");
  }
  if ("isCustomStoreApp" in params && params.isCustomStoreApp) {
    if (!("adminApiAccessToken" in params) || ((_a2 = params.adminApiAccessToken) == null ? void 0 : _a2.length) === 0) {
      mandatory.push("adminApiAccessToken");
    }
  }
  const missing = [];
  mandatory.forEach((key) => {
    if (!notEmpty(params[key])) {
      missing.push(key);
    }
  });
  if (missing.length) {
    throw new ShopifyError(`Cannot initialize Shopify API Library. Missing values for: ${missing.join(", ")}. For apiVersion, please specify an explicit API version (e.g., ApiVersion.July25). See https://shopify.dev/docs/api/usage/versioning for more information.`);
  }
  const { hostScheme, isCustomStoreApp, adminApiAccessToken, userAgentPrefix, logger: logger$1, privateAppStorefrontAccessToken, customShopDomains, billing, future, ...mandatoryParams } = params;
  let scopes;
  if (params.scopes === void 0) {
    scopes = void 0;
  } else if (params.scopes instanceof AuthScopes) {
    scopes = params.scopes;
  } else {
    scopes = new AuthScopes(params.scopes);
  }
  Object.assign(config2, mandatoryParams, {
    hostName: params.hostName.replace(/\/$/, ""),
    scopes,
    hostScheme: hostScheme ?? config2.hostScheme,
    isCustomStoreApp: isCustomStoreApp ?? config2.isCustomStoreApp,
    adminApiAccessToken: adminApiAccessToken ?? config2.adminApiAccessToken,
    userAgentPrefix: userAgentPrefix ?? config2.userAgentPrefix,
    logger: { ...config2.logger, ...logger$1 || {} },
    privateAppStorefrontAccessToken: privateAppStorefrontAccessToken ?? config2.privateAppStorefrontAccessToken,
    customShopDomains: customShopDomains ?? config2.customShopDomains,
    billing: billing ?? config2.billing,
    future: future ?? config2.future
  });
  if (config2.isCustomStoreApp && params.adminApiAccessToken === params.apiSecretKey) {
    logger(config2).warning("adminApiAccessToken is set to the same value as apiSecretKey. adminApiAccessToken should be set to the Admin API access token for custom store apps; apiSecretKey should be set to the custom store app's API secret key.");
  }
  return config2;
}
function notEmpty(value) {
  if (value == null) {
    return false;
  }
  return typeof value === "string" || Array.isArray(value) ? value.length > 0 : true;
}
function defaultLogFunction(severity, message2) {
  switch (severity) {
    case LogSeverity.Debug:
      console.debug(message2);
      break;
    case LogSeverity.Info:
      console.log(message2);
      break;
    case LogSeverity.Warning:
      console.warn(message2);
      break;
    case LogSeverity.Error:
      console.error(message2);
      break;
  }
}

// node_modules/@shopify/graphql-client/dist/graphql-client/constants.mjs
var CLIENT = "GraphQL Client";
var MIN_RETRIES = 0;
var MAX_RETRIES = 3;
var GQL_API_ERROR = "An error occurred while fetching from the API. Review 'graphQLErrors' for details.";
var UNEXPECTED_CONTENT_TYPE_ERROR = "Response returned unexpected Content-Type:";
var NO_DATA_OR_ERRORS_ERROR = "An unknown error has occurred. The API did not return a data object or any errors in its response.";
var CONTENT_TYPES = {
  json: "application/json",
  multipart: "multipart/mixed"
};
var SDK_VARIANT_HEADER = "X-SDK-Variant";
var SDK_VERSION_HEADER = "X-SDK-Version";
var DEFAULT_SDK_VARIANT = "shopify-graphql-client";
var DEFAULT_CLIENT_VERSION = "1.4.1";
var RETRY_WAIT_TIME = 1e3;
var RETRIABLE_STATUS_CODES = [429, 503];
var DEFER_OPERATION_REGEX = /@(defer)\b/i;
var NEWLINE_SEPARATOR = "\r\n";
var BOUNDARY_HEADER_REGEX = /boundary="?([^=";]+)"?/i;
var HEADER_SEPARATOR = NEWLINE_SEPARATOR + NEWLINE_SEPARATOR;

// node_modules/@shopify/graphql-client/dist/graphql-client/utilities.mjs
function formatErrorMessage(message2, client = CLIENT) {
  return message2.startsWith(`${client}`) ? message2 : `${client}: ${message2}`;
}
function getErrorMessage(error) {
  return error instanceof Error ? error.message : JSON.stringify(error);
}
function getErrorCause(error) {
  return error instanceof Error && error.cause ? error.cause : void 0;
}
function combineErrors(dataArray) {
  return dataArray.flatMap(({ errors }) => {
    return errors ?? [];
  });
}
function validateRetries({ client, retries }) {
  if (retries !== void 0 && (typeof retries !== "number" || retries < MIN_RETRIES || retries > MAX_RETRIES)) {
    throw new Error(`${client}: The provided "retries" value (${retries}) is invalid - it cannot be less than ${MIN_RETRIES} or greater than ${MAX_RETRIES}`);
  }
}
function getKeyValueIfValid(key, value) {
  return value && (typeof value !== "object" || Array.isArray(value) || typeof value === "object" && Object.keys(value).length > 0) ? { [key]: value } : {};
}
function buildDataObjectByPath(path, data) {
  if (path.length === 0) {
    return data;
  }
  const key = path.pop();
  const newData = {
    [key]: data
  };
  if (path.length === 0) {
    return newData;
  }
  return buildDataObjectByPath(path, newData);
}
function combineObjects(baseObject, newObject) {
  return Object.keys(newObject || {}).reduce((acc, key) => {
    if ((typeof newObject[key] === "object" || Array.isArray(newObject[key])) && baseObject[key]) {
      acc[key] = combineObjects(baseObject[key], newObject[key]);
      return acc;
    }
    acc[key] = newObject[key];
    return acc;
  }, Array.isArray(baseObject) ? [...baseObject] : { ...baseObject });
}
function buildCombinedDataObject([initialDatum, ...remainingData]) {
  return remainingData.reduce(combineObjects, { ...initialDatum });
}

// node_modules/@shopify/graphql-client/dist/graphql-client/http-fetch.mjs
function generateHttpFetch({ clientLogger, customFetchApi = fetch, client = CLIENT, defaultRetryWaitTime = RETRY_WAIT_TIME, retriableCodes = RETRIABLE_STATUS_CODES }) {
  const httpFetch = async (requestParams, count, maxRetries) => {
    const nextCount = count + 1;
    const maxTries = maxRetries + 1;
    let response;
    try {
      response = await customFetchApi(...requestParams);
      clientLogger({
        type: "HTTP-Response",
        content: {
          requestParams,
          response
        }
      });
      if (!response.ok && retriableCodes.includes(response.status) && nextCount <= maxTries) {
        throw new Error();
      }
      const deprecationNotice = (response == null ? void 0 : response.headers.get("X-Shopify-API-Deprecated-Reason")) || "";
      if (deprecationNotice) {
        clientLogger({
          type: "HTTP-Response-GraphQL-Deprecation-Notice",
          content: {
            requestParams,
            deprecationNotice
          }
        });
      }
      return response;
    } catch (error) {
      if (nextCount <= maxTries) {
        const retryAfter = response == null ? void 0 : response.headers.get("Retry-After");
        await sleep(retryAfter ? parseInt(retryAfter, 10) : defaultRetryWaitTime);
        clientLogger({
          type: "HTTP-Retry",
          content: {
            requestParams,
            lastResponse: response,
            retryAttempt: count,
            maxRetries
          }
        });
        return httpFetch(requestParams, nextCount, maxRetries);
      }
      throw new Error(formatErrorMessage(`${maxRetries > 0 ? `Attempted maximum number of ${maxRetries} network retries. Last message - ` : ""}${getErrorMessage(error)}`, client));
    }
  };
  return httpFetch;
}
async function sleep(waitTime) {
  return new Promise((resolve) => setTimeout(resolve, waitTime));
}

// node_modules/@shopify/graphql-client/dist/graphql-client/graphql-client.mjs
function createGraphQLClient({ headers, url, customFetchApi = fetch, retries = 0, logger: logger2 }) {
  validateRetries({ client: CLIENT, retries });
  const config2 = {
    headers,
    url,
    retries
  };
  const clientLogger = generateClientLogger(logger2);
  const httpFetch = generateHttpFetch({
    customFetchApi,
    clientLogger,
    defaultRetryWaitTime: RETRY_WAIT_TIME
  });
  const fetchFn = generateFetch(httpFetch, config2);
  const request2 = generateRequest(fetchFn);
  const requestStream = generateRequestStream(fetchFn);
  return {
    config: config2,
    fetch: fetchFn,
    request: request2,
    requestStream
  };
}
function generateClientLogger(logger2) {
  return (logContent) => {
    if (logger2) {
      logger2(logContent);
    }
  };
}
async function processJSONResponse(response) {
  const { errors, data, extensions } = await response.json();
  return {
    ...getKeyValueIfValid("data", data),
    ...getKeyValueIfValid("extensions", extensions),
    headers: response.headers,
    ...errors || !data ? {
      errors: {
        networkStatusCode: response.status,
        message: formatErrorMessage(errors ? GQL_API_ERROR : NO_DATA_OR_ERRORS_ERROR),
        ...getKeyValueIfValid("graphQLErrors", errors),
        response
      }
    } : {}
  };
}
function generateFetch(httpFetch, { url, headers, retries }) {
  return async (operation, options = {}) => {
    const { variables, headers: overrideHeaders, url: overrideUrl, retries: overrideRetries, keepalive, signal } = options;
    const body = JSON.stringify({
      query: operation,
      variables
    });
    validateRetries({ client: CLIENT, retries: overrideRetries });
    const flatHeaders2 = Object.entries({
      ...headers,
      ...overrideHeaders
    }).reduce((headers2, [key, value]) => {
      headers2[key] = Array.isArray(value) ? value.join(", ") : value.toString();
      return headers2;
    }, {});
    if (!flatHeaders2[SDK_VARIANT_HEADER] && !flatHeaders2[SDK_VERSION_HEADER]) {
      flatHeaders2[SDK_VARIANT_HEADER] = DEFAULT_SDK_VARIANT;
      flatHeaders2[SDK_VERSION_HEADER] = DEFAULT_CLIENT_VERSION;
    }
    const fetchParams = [
      overrideUrl ?? url,
      {
        method: "POST",
        headers: flatHeaders2,
        body,
        signal,
        keepalive
      }
    ];
    return httpFetch(fetchParams, 1, overrideRetries ?? retries);
  };
}
function generateRequest(fetchFn) {
  return async (...props) => {
    if (DEFER_OPERATION_REGEX.test(props[0])) {
      throw new Error(formatErrorMessage("This operation will result in a streamable response - use requestStream() instead."));
    }
    let response = null;
    try {
      response = await fetchFn(...props);
      const { status, statusText } = response;
      const contentType = response.headers.get("content-type") || "";
      if (!response.ok) {
        return {
          errors: {
            networkStatusCode: status,
            message: formatErrorMessage(statusText),
            response
          }
        };
      }
      if (!contentType.includes(CONTENT_TYPES.json)) {
        return {
          errors: {
            networkStatusCode: status,
            message: formatErrorMessage(`${UNEXPECTED_CONTENT_TYPE_ERROR} ${contentType}`),
            response
          }
        };
      }
      return await processJSONResponse(response);
    } catch (error) {
      return {
        errors: {
          message: getErrorMessage(error),
          ...response == null ? {} : {
            networkStatusCode: response.status,
            response
          }
        }
      };
    }
  };
}
async function* getStreamBodyIterator(response) {
  const decoder2 = new TextDecoder();
  if (response.body[Symbol.asyncIterator]) {
    for await (const chunk of response.body) {
      yield decoder2.decode(chunk);
    }
  } else {
    const reader = response.body.getReader();
    let readResult;
    try {
      while (!(readResult = await reader.read()).done) {
        yield decoder2.decode(readResult.value);
      }
    } finally {
      reader.cancel();
    }
  }
}
function readStreamChunk(streamBodyIterator, boundary2) {
  return {
    async *[Symbol.asyncIterator]() {
      try {
        let buffer = "";
        for await (const textChunk of streamBodyIterator) {
          buffer += textChunk;
          if (buffer.indexOf(boundary2) > -1) {
            const lastBoundaryIndex = buffer.lastIndexOf(boundary2);
            const fullResponses = buffer.slice(0, lastBoundaryIndex);
            const chunkBodies = fullResponses.split(boundary2).filter((chunk) => chunk.trim().length > 0).map((chunk) => {
              const body = chunk.slice(chunk.indexOf(HEADER_SEPARATOR) + HEADER_SEPARATOR.length).trim();
              return body;
            });
            if (chunkBodies.length > 0) {
              yield chunkBodies;
            }
            buffer = buffer.slice(lastBoundaryIndex + boundary2.length);
            if (buffer.trim() === `--`) {
              buffer = "";
            }
          }
        }
      } catch (error) {
        throw new Error(`Error occured while processing stream payload - ${getErrorMessage(error)}`);
      }
    }
  };
}
function createJsonResponseAsyncIterator(response) {
  return {
    async *[Symbol.asyncIterator]() {
      const processedResponse = await processJSONResponse(response);
      yield {
        ...processedResponse,
        hasNext: false
      };
    }
  };
}
function getResponseDataFromChunkBodies(chunkBodies) {
  return chunkBodies.map((value) => {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new Error(`Error in parsing multipart response - ${getErrorMessage(error)}`);
    }
  }).map((payload) => {
    const { data, incremental, hasNext, extensions, errors } = payload;
    if (!incremental) {
      return {
        data: data || {},
        ...getKeyValueIfValid("errors", errors),
        ...getKeyValueIfValid("extensions", extensions),
        hasNext
      };
    }
    const incrementalArray = incremental.map(({ data: data2, path, errors: errors2 }) => {
      return {
        data: data2 && path ? buildDataObjectByPath(path, data2) : {},
        ...getKeyValueIfValid("errors", errors2)
      };
    });
    return {
      data: incrementalArray.length === 1 ? incrementalArray[0].data : buildCombinedDataObject([
        ...incrementalArray.map(({ data: data2 }) => data2)
      ]),
      ...getKeyValueIfValid("errors", combineErrors(incrementalArray)),
      hasNext
    };
  });
}
function validateResponseData(responseErrors, combinedData) {
  if (responseErrors.length > 0) {
    throw new Error(GQL_API_ERROR, {
      cause: {
        graphQLErrors: responseErrors
      }
    });
  }
  if (Object.keys(combinedData).length === 0) {
    throw new Error(NO_DATA_OR_ERRORS_ERROR);
  }
}
function createMultipartResponseAsyncInterator(response, responseContentType) {
  var _a2, _b2;
  const boundaryHeader = (responseContentType ?? "").match(BOUNDARY_HEADER_REGEX);
  const boundary2 = `--${boundaryHeader ? boundaryHeader[1] : "-"}`;
  if (!((_a2 = response.body) == null ? void 0 : _a2.getReader) && !((_b2 = response.body) == null ? void 0 : _b2[Symbol.asyncIterator])) {
    throw new Error("API multipart response did not return an iterable body", {
      cause: response
    });
  }
  const streamBodyIterator = getStreamBodyIterator(response);
  let combinedData = {};
  let responseExtensions;
  return {
    async *[Symbol.asyncIterator]() {
      var _a3;
      try {
        let streamHasNext = true;
        for await (const chunkBodies of readStreamChunk(streamBodyIterator, boundary2)) {
          const responseData = getResponseDataFromChunkBodies(chunkBodies);
          responseExtensions = ((_a3 = responseData.find((datum) => datum.extensions)) == null ? void 0 : _a3.extensions) ?? responseExtensions;
          const responseErrors = combineErrors(responseData);
          combinedData = buildCombinedDataObject([
            combinedData,
            ...responseData.map(({ data }) => data)
          ]);
          streamHasNext = responseData.slice(-1)[0].hasNext;
          validateResponseData(responseErrors, combinedData);
          yield {
            ...getKeyValueIfValid("data", combinedData),
            ...getKeyValueIfValid("extensions", responseExtensions),
            hasNext: streamHasNext
          };
        }
        if (streamHasNext) {
          throw new Error(`Response stream terminated unexpectedly`);
        }
      } catch (error) {
        const cause = getErrorCause(error);
        yield {
          ...getKeyValueIfValid("data", combinedData),
          ...getKeyValueIfValid("extensions", responseExtensions),
          errors: {
            message: formatErrorMessage(getErrorMessage(error)),
            networkStatusCode: response.status,
            ...getKeyValueIfValid("graphQLErrors", cause == null ? void 0 : cause.graphQLErrors),
            response
          },
          hasNext: false
        };
      }
    }
  };
}
function generateRequestStream(fetchFn) {
  return async (...props) => {
    if (!DEFER_OPERATION_REGEX.test(props[0])) {
      throw new Error(formatErrorMessage("This operation does not result in a streamable response - use request() instead."));
    }
    try {
      const response = await fetchFn(...props);
      const { statusText } = response;
      if (!response.ok) {
        throw new Error(statusText, { cause: response });
      }
      const responseContentType = response.headers.get("content-type") || "";
      switch (true) {
        case responseContentType.includes(CONTENT_TYPES.json):
          return createJsonResponseAsyncIterator(response);
        case responseContentType.includes(CONTENT_TYPES.multipart):
          return createMultipartResponseAsyncInterator(response, responseContentType);
        default:
          throw new Error(`${UNEXPECTED_CONTENT_TYPE_ERROR} ${responseContentType}`, { cause: response });
      }
    } catch (error) {
      return {
        async *[Symbol.asyncIterator]() {
          const response = getErrorCause(error);
          yield {
            errors: {
              message: formatErrorMessage(getErrorMessage(error)),
              ...getKeyValueIfValid("networkStatusCode", response == null ? void 0 : response.status),
              ...getKeyValueIfValid("response", response)
            },
            hasNext: false
          };
        }
      };
    }
  };
}

// node_modules/@shopify/graphql-client/dist/api-client-utilities/validations.mjs
function validateDomainAndGetStoreUrl({ client, storeDomain }) {
  try {
    if (!storeDomain || typeof storeDomain !== "string") {
      throw new Error();
    }
    const trimmedDomain = storeDomain.trim();
    const protocolUrl = trimmedDomain.match(/^https?:/) ? trimmedDomain : `https://${trimmedDomain}`;
    const url = new URL(protocolUrl);
    url.protocol = "https";
    return url.origin;
  } catch (error) {
    throw new Error(`${client}: a valid store domain ("${storeDomain}") must be provided`, { cause: error });
  }
}
function validateApiVersion({ client, currentSupportedApiVersions, apiVersion, logger: logger2 }) {
  const versionError = `${client}: the provided apiVersion ("${apiVersion}")`;
  const supportedVersion = `Currently supported API versions: ${currentSupportedApiVersions.join(", ")}`;
  if (!apiVersion || typeof apiVersion !== "string") {
    throw new Error(`${versionError} is invalid. ${supportedVersion}`);
  }
  const trimmedApiVersion = apiVersion.trim();
  if (!currentSupportedApiVersions.includes(trimmedApiVersion)) {
    if (logger2) {
      logger2({
        type: "Unsupported_Api_Version",
        content: {
          apiVersion,
          supportedApiVersions: currentSupportedApiVersions
        }
      });
    } else {
      console.warn(`${versionError} is likely deprecated or not supported. ${supportedVersion}`);
    }
  }
}

// node_modules/@shopify/graphql-client/dist/api-client-utilities/api-versions.mjs
function getQuarterMonth(quarter) {
  const month = quarter * 3 - 2;
  return month === 10 ? month : `0${month}`;
}
function getPrevousVersion(year2, quarter, nQuarter) {
  const versionQuarter = quarter - nQuarter;
  if (versionQuarter <= 0) {
    return `${year2 - 1}-${getQuarterMonth(versionQuarter + 4)}`;
  }
  return `${year2}-${getQuarterMonth(versionQuarter)}`;
}
function getCurrentApiVersion() {
  const date = /* @__PURE__ */ new Date();
  const month = date.getUTCMonth();
  const year2 = date.getUTCFullYear();
  const quarter = Math.floor(month / 3 + 1);
  return {
    year: year2,
    quarter,
    version: `${year2}-${getQuarterMonth(quarter)}`
  };
}
function getCurrentSupportedApiVersions() {
  const { year: year2, quarter, version: currentVersion } = getCurrentApiVersion();
  const nextVersion = quarter === 4 ? `${year2 + 1}-01` : `${year2}-${getQuarterMonth(quarter + 1)}`;
  return [
    getPrevousVersion(year2, quarter, 3),
    getPrevousVersion(year2, quarter, 2),
    getPrevousVersion(year2, quarter, 1),
    currentVersion,
    nextVersion,
    "unstable"
  ];
}

// node_modules/@shopify/graphql-client/dist/api-client-utilities/utilities.mjs
function generateGetHeaders(config2) {
  return (customHeaders) => {
    return { ...customHeaders ?? {}, ...config2.headers };
  };
}
function generateGetGQLClientParams({ getHeaders: getHeaders2, getApiUrl }) {
  return (operation, options) => {
    const props = [operation];
    if (options && Object.keys(options).length > 0) {
      const { variables, apiVersion: propApiVersion, headers, retries, signal } = options;
      props.push({
        ...variables ? { variables } : {},
        ...headers ? { headers: getHeaders2(headers) } : {},
        ...propApiVersion ? { url: getApiUrl(propApiVersion) } : {},
        ...retries ? { retries } : {},
        ...signal ? { signal } : {}
      });
    }
    return props;
  };
}

// node_modules/@shopify/admin-api-client/dist/constants.mjs
var DEFAULT_CONTENT_TYPE = "application/json";
var DEFAULT_CLIENT_VERSION2 = "1.1.1";
var ACCESS_TOKEN_HEADER = "X-Shopify-Access-Token";
var CLIENT2 = "Admin API Client";
var RETRIABLE_STATUS_CODES2 = [429, 500, 503];
var DEFAULT_RETRY_WAIT_TIME = 1e3;

// node_modules/@shopify/admin-api-client/dist/validations.mjs
function validateRequiredAccessToken(accessToken) {
  if (!accessToken) {
    throw new Error(`${CLIENT2}: an access token must be provided`);
  }
}
function validateServerSideUsage(isTesting = false) {
  if (typeof window !== "undefined" && !isTesting) {
    throw new Error(`${CLIENT2}: this client should not be used in the browser`);
  }
}

// node_modules/@shopify/admin-api-client/dist/graphql/client.mjs
function createAdminApiClient({ storeDomain, apiVersion, accessToken, userAgentPrefix, retries = 0, customFetchApi, logger: logger2, isTesting }) {
  const currentSupportedApiVersions = getCurrentSupportedApiVersions();
  const storeUrl = validateDomainAndGetStoreUrl({
    client: CLIENT2,
    storeDomain
  });
  const baseApiVersionValidationParams = {
    client: CLIENT2,
    currentSupportedApiVersions,
    logger: logger2
  };
  validateServerSideUsage(isTesting);
  validateApiVersion({
    client: CLIENT2,
    currentSupportedApiVersions,
    apiVersion,
    logger: logger2
  });
  validateRequiredAccessToken(accessToken);
  const apiUrlFormatter = generateApiUrlFormatter(storeUrl, apiVersion, baseApiVersionValidationParams);
  const config2 = {
    storeDomain: storeUrl,
    apiVersion,
    accessToken,
    headers: {
      "Content-Type": DEFAULT_CONTENT_TYPE,
      Accept: DEFAULT_CONTENT_TYPE,
      [ACCESS_TOKEN_HEADER]: accessToken,
      "User-Agent": `${userAgentPrefix ? `${userAgentPrefix} | ` : ""}${CLIENT2} v${DEFAULT_CLIENT_VERSION2}`
    },
    apiUrl: apiUrlFormatter(),
    userAgentPrefix
  };
  const graphqlClient = createGraphQLClient({
    headers: config2.headers,
    url: config2.apiUrl,
    retries,
    customFetchApi,
    logger: logger2
  });
  const getHeaders2 = generateGetHeaders(config2);
  const getApiUrl = generateGetApiUrl(config2, apiUrlFormatter);
  const getGQLClientParams = generateGetGQLClientParams({
    getHeaders: getHeaders2,
    getApiUrl
  });
  const client = {
    config: config2,
    getHeaders: getHeaders2,
    getApiUrl,
    fetch: (...props) => {
      return graphqlClient.fetch(...getGQLClientParams(...props));
    },
    request: (...props) => {
      return graphqlClient.request(...getGQLClientParams(...props));
    }
  };
  return Object.freeze(client);
}
function generateApiUrlFormatter(storeUrl, defaultApiVersion, baseApiVersionValidationParams) {
  return (apiVersion) => {
    if (apiVersion) {
      validateApiVersion({
        ...baseApiVersionValidationParams,
        apiVersion
      });
    }
    const urlApiVersion = (apiVersion ?? defaultApiVersion).trim();
    return `${storeUrl}/admin/api/${urlApiVersion}/graphql.json`;
  };
}
function generateGetApiUrl(config2, apiUrlFormatter) {
  return (propApiVersion) => {
    return propApiVersion ? apiUrlFormatter(propApiVersion) : config2.apiUrl;
  };
}

// node_modules/@shopify/admin-api-client/dist/rest/types.mjs
var Method2;
(function(Method3) {
  Method3["Get"] = "GET";
  Method3["Post"] = "POST";
  Method3["Put"] = "PUT";
  Method3["Delete"] = "DELETE";
})(Method2 || (Method2 = {}));

// node_modules/@shopify/admin-api-client/dist/rest/client.mjs
function createAdminRestApiClient({ storeDomain, apiVersion, accessToken, userAgentPrefix, logger: logger2, customFetchApi = fetch, retries: clientRetries = 0, scheme = "https", defaultRetryTime = DEFAULT_RETRY_WAIT_TIME, formatPaths = true, isTesting }) {
  const currentSupportedApiVersions = getCurrentSupportedApiVersions();
  const storeUrl = validateDomainAndGetStoreUrl({
    client: CLIENT2,
    storeDomain
  }).replace("https://", `${scheme}://`);
  const baseApiVersionValidationParams = {
    client: CLIENT2,
    currentSupportedApiVersions,
    logger: logger2
  };
  validateServerSideUsage(isTesting);
  validateApiVersion({
    client: CLIENT2,
    currentSupportedApiVersions,
    apiVersion,
    logger: logger2
  });
  validateRequiredAccessToken(accessToken);
  validateRetries({ client: CLIENT2, retries: clientRetries });
  const apiUrlFormatter = generateApiUrlFormatter2(storeUrl, apiVersion, baseApiVersionValidationParams, formatPaths);
  const clientLogger = generateClientLogger2(logger2);
  const httpFetch = generateHttpFetch({
    customFetchApi,
    clientLogger,
    defaultRetryWaitTime: defaultRetryTime,
    client: CLIENT2,
    retriableCodes: RETRIABLE_STATUS_CODES2
  });
  const request2 = async (path, { method, data, headers: requestHeadersObj, searchParams, retries = 0, apiVersion: apiVersion2 }) => {
    validateRetries({ client: CLIENT2, retries });
    const url = apiUrlFormatter(path, searchParams ?? {}, apiVersion2);
    const requestHeaders = normalizedHeaders(requestHeadersObj ?? {});
    const userAgent = [
      ...requestHeaders["user-agent"] ? [requestHeaders["user-agent"]] : [],
      ...userAgentPrefix ? [userAgentPrefix] : [],
      `${CLIENT2} v${DEFAULT_CLIENT_VERSION2}`
    ].join(" | ");
    const headers = normalizedHeaders({
      "Content-Type": DEFAULT_CONTENT_TYPE,
      ...requestHeaders,
      Accept: DEFAULT_CONTENT_TYPE,
      [ACCESS_TOKEN_HEADER]: accessToken,
      "User-Agent": userAgent
    });
    const body = data && typeof data !== "string" ? JSON.stringify(data) : data;
    return httpFetch([url, { method, headers, ...body ? { body } : void 0 }], 1, retries ?? clientRetries);
  };
  return {
    get: (path, options) => request2(path, { method: Method2.Get, ...options }),
    put: (path, options) => request2(path, { method: Method2.Put, ...options }),
    post: (path, options) => request2(path, { method: Method2.Post, ...options }),
    delete: (path, options) => request2(path, { method: Method2.Delete, ...options })
  };
}
function generateApiUrlFormatter2(storeUrl, defaultApiVersion, baseApiVersionValidationParams, formatPaths = true) {
  return (path, searchParams, apiVersion) => {
    if (apiVersion) {
      validateApiVersion({
        ...baseApiVersionValidationParams,
        apiVersion
      });
    }
    function convertValue(params2, key, value) {
      if (Array.isArray(value)) {
        value.forEach((arrayValue) => convertValue(params2, `${key}[]`, arrayValue));
        return;
      } else if (typeof value === "object") {
        Object.entries(value).forEach(([objKey, objValue]) => convertValue(params2, `${key}[${objKey}]`, objValue));
        return;
      }
      params2.append(key, String(value));
    }
    const urlApiVersion = (apiVersion ?? defaultApiVersion).trim();
    let cleanPath = path.replace(/^\//, "");
    if (formatPaths) {
      if (!cleanPath.startsWith("admin")) {
        cleanPath = `admin/api/${urlApiVersion}/${cleanPath}`;
      }
      if (!cleanPath.endsWith(".json")) {
        cleanPath = `${cleanPath}.json`;
      }
    }
    const params = new URLSearchParams();
    if (searchParams) {
      for (const [key, value] of Object.entries(searchParams)) {
        convertValue(params, key, value);
      }
    }
    const queryString = params.toString() ? `?${params.toString()}` : "";
    return `${storeUrl}/${cleanPath}${queryString}`;
  };
}
function generateClientLogger2(logger2) {
  return (logContent) => {
    if (logger2) {
      logger2(logContent);
    }
  };
}
function normalizedHeaders(headersObj) {
  const normalizedHeaders2 = {};
  for (const [key, value] of Object.entries(headersObj)) {
    normalizedHeaders2[key.toLowerCase()] = Array.isArray(value) ? value.join(", ") : String(value);
  }
  return normalizedHeaders2;
}

// node_modules/@shopify/shopify-api/dist/esm/lib/clients/common.mjs
function getUserAgent(config2) {
  let userAgentPrefix = `${LIBRARY_NAME} v${SHOPIFY_API_LIBRARY_VERSION} | ${abstractRuntimeString()}`;
  if (config2.userAgentPrefix) {
    userAgentPrefix = `${config2.userAgentPrefix} | ${userAgentPrefix}`;
  }
  return userAgentPrefix;
}
function serializeResponse(response) {
  if (!response) {
    return { error: "No response object provided" };
  }
  try {
    const { status, statusText, ok, redirected, type, url, headers } = response;
    const serialized = {
      status,
      statusText,
      ok,
      redirected,
      type,
      url
    };
    if (headers == null ? void 0 : headers.entries) {
      serialized.headers = Object.fromEntries(headers.entries());
    } else if (headers) {
      serialized.headers = headers;
    }
    return serialized;
  } catch {
    return response;
  }
}
function clientLoggerFactory(config2) {
  return (logContent) => {
    if (config2.logger.httpRequests) {
      switch (logContent.type) {
        case "HTTP-Response": {
          const responseLog = logContent.content;
          logger(config2).debug("Received response for HTTP request", {
            requestParams: JSON.stringify(responseLog.requestParams),
            response: JSON.stringify(serializeResponse(responseLog.response))
          });
          break;
        }
        case "HTTP-Retry": {
          const responseLog = logContent.content;
          logger(config2).debug("Retrying HTTP request", {
            requestParams: JSON.stringify(responseLog.requestParams),
            retryAttempt: responseLog.retryAttempt,
            maxRetries: responseLog.maxRetries,
            response: responseLog.lastResponse ? JSON.stringify(serializeResponse(responseLog.lastResponse)) : "undefined"
          });
          break;
        }
        case "HTTP-Response-GraphQL-Deprecation-Notice": {
          const responseLog = logContent.content;
          logger(config2).debug("Received response containing Deprecated GraphQL Notice", {
            requestParams: JSON.stringify(responseLog.requestParams),
            deprecationNotice: responseLog.deprecationNotice
          });
          break;
        }
        default: {
          logger(config2).debug(`HTTP request event: ${logContent.content}`);
          break;
        }
      }
    }
  };
}
function throwFailedRequest(body, atMaxRetries, response) {
  var _a2, _b2;
  if (typeof response === "undefined") {
    const message2 = ((_a2 = body == null ? void 0 : body.errors) == null ? void 0 : _a2.message) ?? "";
    throw new HttpRequestError(`Http request error, no response available: ${message2}`);
  }
  const responseHeaders = canonicalizeHeaders(Object.fromEntries(response.headers.entries() ?? []));
  if (response.status === StatusCode.Ok && body.errors.graphQLErrors) {
    throw new GraphqlQueryError({
      message: ((_b2 = body.errors.graphQLErrors) == null ? void 0 : _b2[0].message) ?? "GraphQL operation failed",
      response,
      headers: responseHeaders,
      body
    });
  }
  const errorMessages = [];
  if (body.errors) {
    errorMessages.push(JSON.stringify(body.errors, null, 2));
  }
  const xRequestId = getHeader(responseHeaders, "x-request-id");
  if (xRequestId) {
    errorMessages.push(`If you report this error, please include this id: ${xRequestId}`);
  }
  const errorMessage = errorMessages.length ? `:
${errorMessages.join("\n")}` : "";
  const code = response.status;
  const statusText = response.statusText;
  switch (true) {
    case response.status === StatusCode.TooManyRequests: {
      if (atMaxRetries) {
        throw new HttpMaxRetriesError("Attempted the maximum number of retries for HTTP request.");
      } else {
        const retryAfter = getHeader(responseHeaders, "Retry-After");
        throw new HttpThrottlingError({
          message: `Shopify is throttling requests ${errorMessage}`,
          code,
          statusText,
          body,
          headers: responseHeaders,
          retryAfter: retryAfter ? parseFloat(retryAfter) : void 0
        });
      }
    }
    case response.status >= StatusCode.InternalServerError:
      if (atMaxRetries) {
        throw new HttpMaxRetriesError("Attempted the maximum number of retries for HTTP request.");
      } else {
        throw new HttpInternalError({
          message: `Shopify internal error${errorMessage}`,
          code,
          statusText,
          body,
          headers: responseHeaders
        });
      }
    default:
      throw new HttpResponseError({
        message: `Received an error response (${response.status} ${response.statusText}) from Shopify${errorMessage}`,
        code,
        statusText,
        body,
        headers: responseHeaders
      });
  }
}

// node_modules/@shopify/shopify-api/dist/esm/lib/clients/admin/graphql/client.mjs
var GraphqlClient = class {
  constructor(params) {
    __publicField(this, "session");
    __publicField(this, "client");
    __publicField(this, "apiVersion");
    const config2 = this.graphqlClass().config;
    if (!config2.isCustomStoreApp && !params.session.accessToken) {
      throw new MissingRequiredArgument("Missing access token when creating GraphQL client");
    }
    if (params.apiVersion) {
      const message2 = params.apiVersion === config2.apiVersion ? `Admin client has a redundant API version override to the default ${params.apiVersion}` : `Admin client overriding default API version ${config2.apiVersion} with ${params.apiVersion}`;
      logger(config2).debug(message2);
    }
    this.session = params.session;
    this.apiVersion = params.apiVersion;
    this.client = createAdminApiClient({
      accessToken: config2.adminApiAccessToken ?? this.session.accessToken,
      apiVersion: this.apiVersion ?? config2.apiVersion,
      storeDomain: this.session.shop,
      customFetchApi: abstractFetch,
      logger: clientLoggerFactory(config2),
      userAgentPrefix: getUserAgent(config2),
      isTesting: config2.isTesting
    });
  }
  async query(params) {
    logger(this.graphqlClass().config).deprecated("12.0.0", "The query method is deprecated, and was replaced with the request method.\nSee the migration guide: https://github.com/Shopify/shopify-app-js/blob/main/packages/apps/shopify-api/docs/migrating-to-v9.md#using-the-new-clients.");
    if (typeof params.data === "string" && params.data.length === 0 || Object.entries(params.data).length === 0) {
      throw new MissingRequiredArgument("Query missing.");
    }
    let operation;
    let variables;
    if (typeof params.data === "string") {
      operation = params.data;
    } else {
      operation = params.data.query;
      variables = params.data.variables;
    }
    const headers = Object.fromEntries(Object.entries((params == null ? void 0 : params.extraHeaders) ?? {}).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(", ") : value.toString()
    ]));
    const response = await this.request(operation, {
      headers,
      retries: params.tries ? params.tries - 1 : void 0,
      variables
    });
    return { body: response, headers: {} };
  }
  async request(operation, options) {
    const response = await this.client.request(operation, {
      apiVersion: this.apiVersion || this.graphqlClass().config.apiVersion,
      ...options
    });
    if (response.errors) {
      const fetchResponse = response.errors.response;
      throwFailedRequest(response, ((options == null ? void 0 : options.retries) ?? 0) > 0, fetchResponse);
    }
    const headerObject = Object.fromEntries(response.headers ? response.headers.entries() : []);
    return {
      ...response,
      headers: canonicalizeHeaders(headerObject ?? {})
    };
  }
  graphqlClass() {
    return this.constructor;
  }
};
__publicField(GraphqlClient, "config");
function graphqlClientClass({ config: config2 }) {
  class NewGraphqlClient extends GraphqlClient {
  }
  __publicField(NewGraphqlClient, "config", config2);
  Reflect.defineProperty(NewGraphqlClient, "name", {
    value: "GraphqlClient"
  });
  return NewGraphqlClient;
}

// node_modules/lossless-json/lib/esm/utils.js
function isInteger(value) {
  return INTEGER_REGEX.test(value);
}
var INTEGER_REGEX = /^-?[0-9]+$/;
function isNumber(value) {
  return NUMBER_REGEX.test(value);
}
var NUMBER_REGEX = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;
function isSafeNumber(value, config2) {
  if (isInteger(value)) {
    return Number.isSafeInteger(Number.parseInt(value, 10));
  }
  const num = Number.parseFloat(value);
  const parsed = String(num);
  if (value === parsed) {
    return true;
  }
  const valueDigits = extractSignificantDigits(value);
  const parsedDigits = extractSignificantDigits(parsed);
  if (valueDigits === parsedDigits) {
    return true;
  }
  if ((config2 == null ? void 0 : config2.approx) === true) {
    const requiredDigits = 14;
    if (!isInteger(value) && parsedDigits.length >= requiredDigits && valueDigits.startsWith(parsedDigits.substring(0, requiredDigits))) {
      return true;
    }
  }
  return false;
}
var UnsafeNumberReason = (function(UnsafeNumberReason2) {
  UnsafeNumberReason2["underflow"] = "underflow";
  UnsafeNumberReason2["overflow"] = "overflow";
  UnsafeNumberReason2["truncate_integer"] = "truncate_integer";
  UnsafeNumberReason2["truncate_float"] = "truncate_float";
  return UnsafeNumberReason2;
})({});
function getUnsafeNumberReason(value) {
  if (isSafeNumber(value, {
    approx: false
  })) {
    return void 0;
  }
  if (isInteger(value)) {
    return UnsafeNumberReason.truncate_integer;
  }
  const num = Number.parseFloat(value);
  if (!Number.isFinite(num)) {
    return UnsafeNumberReason.overflow;
  }
  if (num === 0) {
    return UnsafeNumberReason.underflow;
  }
  return UnsafeNumberReason.truncate_float;
}
function extractSignificantDigits(value) {
  const {
    start,
    end
  } = getSignificantDigitRange(value);
  const digits = value.substring(start, end);
  const dot = digits.indexOf(".");
  if (dot === -1) {
    return digits;
  }
  return digits.substring(0, dot) + digits.substring(dot + 1);
}
function getSignificantDigitRange(value) {
  let start = 0;
  if (value[0] === "-") {
    start++;
  }
  while (value[start] === "0" || value[start] === ".") {
    start++;
  }
  let end = value.lastIndexOf("e");
  if (end === -1) {
    end = value.lastIndexOf("E");
  }
  if (end === -1) {
    end = value.length;
  }
  while ((value[end - 1] === "0" || value[end - 1] === ".") && end > start) {
    end--;
  }
  return {
    start,
    end
  };
}

// node_modules/lossless-json/lib/esm/LosslessNumber.js
var LosslessNumber = class {
  constructor(value) {
    // numeric value as string
    // type information
    __publicField(this, "isLosslessNumber", true);
    if (!isNumber(value)) {
      throw new Error(`Invalid number (value: "${value}")`);
    }
    this.value = value;
  }
  /**
   * Get the value of the LosslessNumber as number or bigint.
   *
   * - a number is returned for safe numbers and decimal values that only lose some insignificant digits
   * - a bigint is returned for big integer numbers
   * - an Error is thrown for values that will overflow or underflow
   *
   * Note that you can implement your own strategy for conversion by just getting the value as string
   * via .toString(), and using util functions like isInteger, isSafeNumber, getUnsafeNumberReason,
   * and toSafeNumberOrThrow to convert it to a numeric value.
   */
  valueOf() {
    const unsafeReason = getUnsafeNumberReason(this.value);
    if (unsafeReason === void 0 || unsafeReason === UnsafeNumberReason.truncate_float) {
      return Number.parseFloat(this.value);
    }
    if (isInteger(this.value)) {
      return BigInt(this.value);
    }
    throw new Error(`Cannot safely convert to number: the value '${this.value}' would ${unsafeReason} and become ${Number.parseFloat(this.value)}`);
  }
  /**
   * Get the value of the LosslessNumber as string.
   */
  toString() {
    return this.value;
  }
  // Note: we do NOT implement a .toJSON() method, and you should not implement
  // or use that, it cannot safely turn the numeric value in the string into
  // stringified JSON since it has to be parsed into a number first.
};
function isLosslessNumber(value) {
  return value && typeof value === "object" && value.isLosslessNumber || false;
}

// node_modules/lossless-json/lib/esm/numberParsers.js
function parseLosslessNumber(value) {
  return new LosslessNumber(value);
}

// node_modules/lossless-json/lib/esm/revive.js
function revive(json, reviver) {
  return reviveValue({
    "": json
  }, "", json, reviver);
}
function reviveValue(context, key, value, reviver) {
  if (Array.isArray(value)) {
    return reviver.call(context, key, reviveArray(value, reviver));
  }
  if (value && typeof value === "object" && !isLosslessNumber(value)) {
    return reviver.call(context, key, reviveObject(value, reviver));
  }
  return reviver.call(context, key, value);
}
function reviveObject(object, reviver) {
  for (const key of Object.keys(object)) {
    const value = reviveValue(object, key, object[key], reviver);
    if (value !== void 0) {
      object[key] = value;
    } else {
      delete object[key];
    }
  }
  return object;
}
function reviveArray(array, reviver) {
  for (let i = 0; i < array.length; i++) {
    array[i] = reviveValue(array, String(i), array[i], reviver);
  }
  return array;
}

// node_modules/lossless-json/lib/esm/parse.js
function parse(text, reviver, options) {
  const optionsObj = typeof options === "function" ? {
    parseNumber: options
  } : options;
  const parseNumber = (optionsObj == null ? void 0 : optionsObj.parseNumber) ?? parseLosslessNumber;
  const onDuplicateKey = (optionsObj == null ? void 0 : optionsObj.onDuplicateKey) ?? throwDuplicateKey;
  let i = 0;
  const value = parseValue();
  expectValue(value);
  expectEndOfInput();
  return reviver ? revive(value, reviver) : value;
  function parseObject() {
    if (text.charCodeAt(i) === codeOpeningBrace) {
      i++;
      skipWhitespace();
      const object = {};
      let initial = true;
      while (i < text.length && text.charCodeAt(i) !== codeClosingBrace) {
        if (!initial) {
          eatComma();
          skipWhitespace();
        } else {
          initial = false;
        }
        const start = i;
        const key = parseString();
        if (key === void 0) {
          throwObjectKeyExpected();
          return;
        }
        skipWhitespace();
        eatColon();
        const value2 = parseValue();
        if (value2 === void 0) {
          throwObjectValueExpected();
          return;
        }
        if (Object.prototype.hasOwnProperty.call(object, key) && !isDeepEqual(value2, object[key])) {
          const returnedValue = onDuplicateKey({
            key,
            position: start + 1,
            oldValue: object[key],
            newValue: value2
          });
          if (returnedValue !== void 0) {
            object[key] = returnedValue;
          }
        } else {
          object[key] = value2;
        }
      }
      if (text.charCodeAt(i) !== codeClosingBrace) {
        throwObjectKeyOrEndExpected();
      }
      i++;
      return object;
    }
  }
  function parseArray() {
    if (text.charCodeAt(i) === codeOpeningBracket) {
      i++;
      skipWhitespace();
      const array = [];
      let initial = true;
      while (i < text.length && text.charCodeAt(i) !== codeClosingBracket) {
        if (!initial) {
          eatComma();
        } else {
          initial = false;
        }
        const value2 = parseValue();
        expectArrayItem(value2);
        array.push(value2);
      }
      if (text.charCodeAt(i) !== codeClosingBracket) {
        throwArrayItemOrEndExpected();
      }
      i++;
      return array;
    }
  }
  function parseValue() {
    skipWhitespace();
    const value2 = parseString() ?? parseNumeric() ?? parseObject() ?? parseArray() ?? parseKeyword("true", true) ?? parseKeyword("false", false) ?? parseKeyword("null", null);
    skipWhitespace();
    return value2;
  }
  function parseKeyword(name, value2) {
    if (text.slice(i, i + name.length) === name) {
      i += name.length;
      return value2;
    }
  }
  function skipWhitespace() {
    while (isWhitespace(text.charCodeAt(i))) {
      i++;
    }
  }
  function parseString() {
    if (text.charCodeAt(i) === codeDoubleQuote) {
      i++;
      let result = "";
      while (i < text.length && text.charCodeAt(i) !== codeDoubleQuote) {
        if (text.charCodeAt(i) === codeBackslash) {
          const char = text[i + 1];
          const escapeChar = escapeCharacters[char];
          if (escapeChar !== void 0) {
            result += escapeChar;
            i++;
          } else if (char === "u") {
            if (isHex(text.charCodeAt(i + 2)) && isHex(text.charCodeAt(i + 3)) && isHex(text.charCodeAt(i + 4)) && isHex(text.charCodeAt(i + 5))) {
              result += String.fromCharCode(Number.parseInt(text.slice(i + 2, i + 6), 16));
              i += 5;
            } else {
              throwInvalidUnicodeCharacter(i);
            }
          } else {
            throwInvalidEscapeCharacter(i);
          }
        } else {
          if (isValidStringCharacter(text.charCodeAt(i))) {
            result += text[i];
          } else {
            throwInvalidCharacter(text[i]);
          }
        }
        i++;
      }
      expectEndOfString();
      i++;
      return result;
    }
  }
  function parseNumeric() {
    const start = i;
    if (text.charCodeAt(i) === codeMinus) {
      i++;
      expectDigit(start);
    }
    if (text.charCodeAt(i) === codeZero) {
      i++;
    } else if (isNonZeroDigit(text.charCodeAt(i))) {
      i++;
      while (isDigit(text.charCodeAt(i))) {
        i++;
      }
    }
    if (text.charCodeAt(i) === codeDot) {
      i++;
      expectDigit(start);
      while (isDigit(text.charCodeAt(i))) {
        i++;
      }
    }
    if (text.charCodeAt(i) === codeLowercaseE || text.charCodeAt(i) === codeUppercaseE) {
      i++;
      if (text.charCodeAt(i) === codeMinus || text.charCodeAt(i) === codePlus) {
        i++;
      }
      expectDigit(start);
      while (isDigit(text.charCodeAt(i))) {
        i++;
      }
    }
    if (i > start) {
      return parseNumber(text.slice(start, i));
    }
  }
  function eatComma() {
    if (text.charCodeAt(i) !== codeComma) {
      throw new SyntaxError(`Comma ',' expected after value ${gotAt()}`);
    }
    i++;
  }
  function eatColon() {
    if (text.charCodeAt(i) !== codeColon) {
      throw new SyntaxError(`Colon ':' expected after property name ${gotAt()}`);
    }
    i++;
  }
  function expectValue(value2) {
    if (value2 === void 0) {
      throw new SyntaxError(`JSON value expected ${gotAt()}`);
    }
  }
  function expectArrayItem(value2) {
    if (value2 === void 0) {
      throw new SyntaxError(`Array item expected ${gotAt()}`);
    }
  }
  function expectEndOfInput() {
    if (i < text.length) {
      throw new SyntaxError(`Expected end of input ${gotAt()}`);
    }
  }
  function expectDigit(start) {
    if (!isDigit(text.charCodeAt(i))) {
      const numSoFar = text.slice(start, i);
      throw new SyntaxError(`Invalid number '${numSoFar}', expecting a digit ${gotAt()}`);
    }
  }
  function expectEndOfString() {
    if (text.charCodeAt(i) !== codeDoubleQuote) {
      throw new SyntaxError(`End of string '"' expected ${gotAt()}`);
    }
  }
  function throwObjectKeyExpected() {
    throw new SyntaxError(`Quoted object key expected ${gotAt()}`);
  }
  function throwDuplicateKey(_ref) {
    let {
      key,
      position
    } = _ref;
    throw new SyntaxError(`Duplicate key '${key}' encountered at position ${position}`);
  }
  function throwObjectKeyOrEndExpected() {
    throw new SyntaxError(`Quoted object key or end of object '}' expected ${gotAt()}`);
  }
  function throwArrayItemOrEndExpected() {
    throw new SyntaxError(`Array item or end of array ']' expected ${gotAt()}`);
  }
  function throwInvalidCharacter(char) {
    throw new SyntaxError(`Invalid character '${char}' ${pos()}`);
  }
  function throwInvalidEscapeCharacter(start) {
    const chars = text.slice(start, start + 2);
    throw new SyntaxError(`Invalid escape character '${chars}' ${pos()}`);
  }
  function throwObjectValueExpected() {
    throw new SyntaxError(`Object value expected after ':' ${pos()}`);
  }
  function throwInvalidUnicodeCharacter(start) {
    const chars = text.slice(start, start + 6);
    throw new SyntaxError(`Invalid unicode character '${chars}' ${pos()}`);
  }
  function pos() {
    return `at position ${i}`;
  }
  function got() {
    return i < text.length ? `but got '${text[i]}'` : "but reached end of input";
  }
  function gotAt() {
    return `${got()} ${pos()}`;
  }
}
function isWhitespace(code) {
  return code === codeSpace || code === codeNewline || code === codeTab || code === codeReturn;
}
function isHex(code) {
  return code >= codeZero && code <= codeNine || code >= codeUppercaseA && code <= codeUppercaseF || code >= codeLowercaseA && code <= codeLowercaseF;
}
function isDigit(code) {
  return code >= codeZero && code <= codeNine;
}
function isNonZeroDigit(code) {
  return code >= codeOne && code <= codeNine;
}
function isValidStringCharacter(code) {
  return code >= 32 && code <= 1114111;
}
function isDeepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((item, index) => isDeepEqual(item, b[index]));
  }
  if (isObject(a) && isObject(b)) {
    const keys = [.../* @__PURE__ */ new Set([...Object.keys(a), ...Object.keys(b)])];
    return keys.every((key) => isDeepEqual(a[key], b[key]));
  }
  return false;
}
function isObject(value) {
  return typeof value === "object" && value !== null;
}
var escapeCharacters = {
  '"': '"',
  "\\": "\\",
  "/": "/",
  b: "\b",
  f: "\f",
  n: "\n",
  r: "\r",
  t: "	"
  // note that \u is handled separately in parseString()
};
var codeBackslash = 92;
var codeOpeningBrace = 123;
var codeClosingBrace = 125;
var codeOpeningBracket = 91;
var codeClosingBracket = 93;
var codeSpace = 32;
var codeNewline = 10;
var codeTab = 9;
var codeReturn = 13;
var codeDoubleQuote = 34;
var codePlus = 43;
var codeMinus = 45;
var codeZero = 48;
var codeOne = 49;
var codeNine = 57;
var codeComma = 44;
var codeDot = 46;
var codeColon = 58;
var codeUppercaseA = 65;
var codeLowercaseA = 97;
var codeUppercaseE = 69;
var codeLowercaseE = 101;
var codeUppercaseF = 70;
var codeLowercaseF = 102;

// node_modules/@shopify/shopify-api/dist/esm/lib/clients/admin/rest/client.mjs
var _RestClient = class _RestClient {
  constructor({ session, apiVersion }) {
    __publicField(this, "loggedDeprecations", {});
    __publicField(this, "client");
    __publicField(this, "session");
    __publicField(this, "apiVersion");
    const config2 = this.restClass().config;
    if (!config2.isCustomStoreApp && !session.accessToken) {
      throw new MissingRequiredArgument("Missing access token when creating REST client");
    }
    if (apiVersion) {
      const message2 = apiVersion === config2.apiVersion ? `REST client has a redundant API version override to the default ${apiVersion}` : `REST client overriding default API version ${config2.apiVersion} with ${apiVersion}`;
      logger(config2).debug(message2);
    }
    const customStoreAppAccessToken = config2.adminApiAccessToken ?? config2.apiSecretKey;
    this.session = session;
    this.apiVersion = apiVersion ?? config2.apiVersion;
    this.client = createAdminRestApiClient({
      scheme: config2.hostScheme,
      storeDomain: session.shop,
      apiVersion: apiVersion ?? config2.apiVersion,
      accessToken: config2.isCustomStoreApp ? customStoreAppAccessToken : session.accessToken,
      customFetchApi: abstractFetch,
      logger: clientLoggerFactory(config2),
      userAgentPrefix: getUserAgent(config2),
      defaultRetryTime: this.restClass().RETRY_WAIT_TIME,
      formatPaths: this.restClass().formatPaths,
      isTesting: config2.isTesting
    });
  }
  /**
   * Performs a GET request on the given path.
   */
  async get(params) {
    return this.request({ method: Method.Get, ...params });
  }
  /**
   * Performs a POST request on the given path.
   */
  async post(params) {
    return this.request({ method: Method.Post, ...params });
  }
  /**
   * Performs a PUT request on the given path.
   */
  async put(params) {
    return this.request({ method: Method.Put, ...params });
  }
  /**
   * Performs a DELETE request on the given path.
   */
  async delete(params) {
    return this.request({ method: Method.Delete, ...params });
  }
  async request(params) {
    var _a2, _b2;
    const requestParams = {
      headers: {
        ...params.extraHeaders,
        ...params.type ? { "Content-Type": params.type.toString() } : {}
      },
      retries: params.tries ? params.tries - 1 : void 0,
      searchParams: params.query
    };
    let response;
    switch (params.method) {
      case Method.Get:
        response = await this.client.get(params.path, requestParams);
        break;
      case Method.Put:
        response = await this.client.put(params.path, {
          ...requestParams,
          data: params.data
        });
        break;
      case Method.Post:
        response = await this.client.post(params.path, {
          ...requestParams,
          data: params.data
        });
        break;
      case Method.Delete:
        response = await this.client.delete(params.path, requestParams);
        break;
      default:
        throw new InvalidRequestError(`Unsupported request method '${params.method}'`);
    }
    const bodyString = await response.text();
    const body = params.method === Method.Delete && bodyString === "" ? {} : this.parseJsonWithLosslessNumbers(bodyString);
    const responseHeaders = canonicalizeHeaders(Object.fromEntries(response.headers.entries()));
    if (!response.ok) {
      throwFailedRequest(body, (params.tries ?? 1) > 1, response);
    }
    const requestReturn = {
      body,
      headers: responseHeaders
    };
    await this.logDeprecations({
      method: params.method,
      url: params.path,
      headers: requestParams.headers,
      body: params.data ? JSON.stringify(params.data) : void 0
    }, requestReturn);
    const link = response.headers.get("Link");
    if (link !== void 0) {
      const pageInfo = {
        limit: ((_a2 = params.query) == null ? void 0 : _a2.limit) ? (_b2 = params.query) == null ? void 0 : _b2.limit.toString() : _RestClient.DEFAULT_LIMIT
      };
      if (link) {
        const links = link.split(", ");
        for (const link2 of links) {
          const parsedLink = link2.match(_RestClient.LINK_HEADER_REGEXP);
          if (!parsedLink) {
            continue;
          }
          const linkRel = parsedLink[2];
          const linkUrl = new URL(parsedLink[1]);
          const linkFields = linkUrl.searchParams.get("fields");
          const linkPageToken = linkUrl.searchParams.get("page_info");
          if (!pageInfo.fields && linkFields) {
            pageInfo.fields = linkFields.split(",");
          }
          if (linkPageToken) {
            switch (linkRel) {
              case "previous":
                pageInfo.previousPageUrl = parsedLink[1];
                pageInfo.prevPage = this.buildRequestParams(parsedLink[1]);
                break;
              case "next":
                pageInfo.nextPageUrl = parsedLink[1];
                pageInfo.nextPage = this.buildRequestParams(parsedLink[1]);
                break;
            }
          }
        }
      }
      requestReturn.pageInfo = pageInfo;
    }
    return requestReturn;
  }
  restClass() {
    return this.constructor;
  }
  /**
   * Parse JSON with lossless-json to preserve numeric precision.
   * Converts all ID fields (ending with _id, _ids, or named 'id') to strings.
   */
  parseJsonWithLosslessNumbers(jsonString) {
    const parsed = parse(jsonString);
    const processValue = (value, key) => {
      if (value === null || value === void 0) {
        return value;
      }
      if (value && value.isLosslessNumber === true) {
        const keyLower = (key || "").toLowerCase();
        if (keyLower === "id" || keyLower.endsWith("_id")) {
          return value.toString();
        }
        return Number(value.value);
      }
      if (Array.isArray(value)) {
        const isIdsArray = key && key.toLowerCase().endsWith("_ids");
        return value.map((item) => {
          if (isIdsArray && item && item.isLosslessNumber === true) {
            return item.toString();
          }
          return processValue(item);
        });
      }
      if (typeof value === "object") {
        const result = {};
        for (const objKey in value) {
          if (Object.prototype.hasOwnProperty.call(value, objKey)) {
            result[objKey] = processValue(value[objKey], objKey);
          }
        }
        return result;
      }
      return value;
    };
    return processValue(parsed);
  }
  buildRequestParams(newPageUrl) {
    const pattern2 = `^/admin/api/[^/]+/(.*).json$`;
    const url = new URL(newPageUrl);
    const path = url.pathname.replace(new RegExp(pattern2), "$1");
    return {
      path,
      query: Object.fromEntries(url.searchParams.entries())
    };
  }
  async logDeprecations(request2, response) {
    const config2 = this.restClass().config;
    const deprecationReason = getHeader(response.headers, "X-Shopify-API-Deprecated-Reason");
    if (deprecationReason) {
      const deprecation = {
        message: deprecationReason,
        path: request2.url
      };
      if (request2.body) {
        deprecation.body = `${request2.body.substring(0, 100)}...`;
      }
      const depHash = await createSHA256HMAC(config2.apiSecretKey, JSON.stringify(deprecation), HashFormat.Hex);
      if (!Object.keys(this.loggedDeprecations).includes(depHash) || Date.now() - this.loggedDeprecations[depHash] >= _RestClient.DEPRECATION_ALERT_DELAY) {
        this.loggedDeprecations[depHash] = Date.now();
        const stack = new Error().stack;
        const message2 = `API Deprecation Notice ${(/* @__PURE__ */ new Date()).toLocaleString()} : ${JSON.stringify(deprecation)}  -  Stack Trace: ${stack}`;
        await logger(config2).warning(message2);
      }
    }
  }
};
__publicField(_RestClient, "config");
__publicField(_RestClient, "formatPaths");
__publicField(_RestClient, "LINK_HEADER_REGEXP", /<([^<]+)>; rel="([^"]+)"/);
__publicField(_RestClient, "DEFAULT_LIMIT", "50");
__publicField(_RestClient, "RETRY_WAIT_TIME", 1e3);
__publicField(_RestClient, "DEPRECATION_ALERT_DELAY", 3e5);
var RestClient = _RestClient;
function restClientClass(params) {
  const { config: config2, formatPaths } = params;
  class NewRestClient extends RestClient {
  }
  __publicField(NewRestClient, "config", config2);
  __publicField(NewRestClient, "formatPaths", formatPaths === void 0 ? true : formatPaths);
  Reflect.defineProperty(NewRestClient, "name", {
    value: "RestClient"
  });
  return NewRestClient;
}

// node_modules/@shopify/storefront-api-client/dist/constants.mjs
var DEFAULT_CONTENT_TYPE2 = "application/json";
var DEFAULT_SDK_VARIANT2 = "storefront-api-client";
var DEFAULT_CLIENT_VERSION3 = "1.0.9";
var PUBLIC_ACCESS_TOKEN_HEADER = "X-Shopify-Storefront-Access-Token";
var PRIVATE_ACCESS_TOKEN_HEADER = "Shopify-Storefront-Private-Token";
var SDK_VARIANT_HEADER2 = "X-SDK-Variant";
var SDK_VERSION_HEADER2 = "X-SDK-Version";
var SDK_VARIANT_SOURCE_HEADER = "X-SDK-Variant-Source";
var CLIENT3 = "Storefront API Client";

// node_modules/@shopify/storefront-api-client/dist/validations.mjs
function validatePrivateAccessTokenUsage(privateAccessToken) {
  if (privateAccessToken && typeof window !== "undefined") {
    throw new Error(`${CLIENT3}: private access tokens and headers should only be used in a server-to-server implementation. Use the public API access token in nonserver environments.`);
  }
}
function validateRequiredAccessTokens(publicAccessToken, privateAccessToken) {
  if (!publicAccessToken && !privateAccessToken) {
    throw new Error(`${CLIENT3}: a public or private access token must be provided`);
  }
  if (publicAccessToken && privateAccessToken) {
    throw new Error(`${CLIENT3}: only provide either a public or private access token`);
  }
}

// node_modules/@shopify/storefront-api-client/dist/storefront-api-client.mjs
function createStorefrontApiClient({ storeDomain, apiVersion, publicAccessToken, privateAccessToken, clientName, retries = 0, customFetchApi, logger: logger2 }) {
  const currentSupportedApiVersions = getCurrentSupportedApiVersions();
  const storeUrl = validateDomainAndGetStoreUrl({
    client: CLIENT3,
    storeDomain
  });
  const baseApiVersionValidationParams = {
    client: CLIENT3,
    currentSupportedApiVersions,
    logger: logger2
  };
  validateApiVersion({ ...baseApiVersionValidationParams, apiVersion });
  validateRequiredAccessTokens(publicAccessToken, privateAccessToken);
  validatePrivateAccessTokenUsage(privateAccessToken);
  const apiUrlFormatter = generateApiUrlFormatter3(storeUrl, apiVersion, baseApiVersionValidationParams);
  const config2 = {
    storeDomain: storeUrl,
    apiVersion,
    ...publicAccessToken ? { publicAccessToken } : {
      privateAccessToken
    },
    headers: {
      "Content-Type": DEFAULT_CONTENT_TYPE2,
      Accept: DEFAULT_CONTENT_TYPE2,
      [SDK_VARIANT_HEADER2]: DEFAULT_SDK_VARIANT2,
      [SDK_VERSION_HEADER2]: DEFAULT_CLIENT_VERSION3,
      ...clientName ? { [SDK_VARIANT_SOURCE_HEADER]: clientName } : {},
      ...publicAccessToken ? { [PUBLIC_ACCESS_TOKEN_HEADER]: publicAccessToken } : { [PRIVATE_ACCESS_TOKEN_HEADER]: privateAccessToken }
    },
    apiUrl: apiUrlFormatter(),
    clientName
  };
  const graphqlClient = createGraphQLClient({
    headers: config2.headers,
    url: config2.apiUrl,
    retries,
    customFetchApi,
    logger: logger2
  });
  const getHeaders2 = generateGetHeaders(config2);
  const getApiUrl = generateGetApiUrl2(config2, apiUrlFormatter);
  const getGQLClientParams = generateGetGQLClientParams({
    getHeaders: getHeaders2,
    getApiUrl
  });
  const client = {
    config: config2,
    getHeaders: getHeaders2,
    getApiUrl,
    fetch: (...props) => {
      return graphqlClient.fetch(...getGQLClientParams(...props));
    },
    request: (...props) => {
      return graphqlClient.request(...getGQLClientParams(...props));
    },
    requestStream: (...props) => {
      return graphqlClient.requestStream(...getGQLClientParams(...props));
    }
  };
  return Object.freeze(client);
}
function generateApiUrlFormatter3(storeUrl, defaultApiVersion, baseApiVersionValidationParams) {
  return (apiVersion) => {
    if (apiVersion) {
      validateApiVersion({
        ...baseApiVersionValidationParams,
        apiVersion
      });
    }
    const urlApiVersion = (apiVersion ?? defaultApiVersion).trim();
    return `${storeUrl}/api/${urlApiVersion}/graphql.json`;
  };
}
function generateGetApiUrl2(config2, apiUrlFormatter) {
  return (propApiVersion) => {
    return propApiVersion ? apiUrlFormatter(propApiVersion) : config2.apiUrl;
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/clients/storefront/client.mjs
var StorefrontClient = class {
  constructor(params) {
    __publicField(this, "session");
    __publicField(this, "client");
    __publicField(this, "apiVersion");
    const config2 = this.storefrontClass().config;
    if (!config2.isCustomStoreApp && !params.session.accessToken) {
      throw new MissingRequiredArgument("Missing access token when creating GraphQL client");
    }
    if (params.apiVersion) {
      const message2 = params.apiVersion === config2.apiVersion ? `Storefront client has a redundant API version override to the default ${params.apiVersion}` : `Storefront client overriding default API version ${config2.apiVersion} with ${params.apiVersion}`;
      logger(config2).debug(message2);
    }
    let accessToken;
    if (config2.isCustomStoreApp) {
      accessToken = config2.privateAppStorefrontAccessToken;
      if (!accessToken) {
        throw new MissingRequiredArgument("Custom store apps must set the privateAppStorefrontAccessToken property to call the Storefront API.");
      }
    } else {
      accessToken = params.session.accessToken;
      if (!accessToken) {
        throw new MissingRequiredArgument("Session missing access token.");
      }
    }
    this.session = params.session;
    this.apiVersion = params.apiVersion;
    this.client = createStorefrontApiClient({
      privateAccessToken: accessToken,
      apiVersion: this.apiVersion ?? config2.apiVersion,
      storeDomain: this.session.shop,
      customFetchApi: abstractFetch,
      logger: clientLoggerFactory(config2),
      clientName: getUserAgent(config2)
    });
  }
  async query(params) {
    logger(this.storefrontClass().config).deprecated("12.0.0", "The query method is deprecated, and was replaced with the request method.\nSee the migration guide: https://github.com/Shopify/shopify-app-js/blob/main/packages/apps/shopify-api/docs/migrating-to-v9.md#using-the-new-clients.");
    if (typeof params.data === "string" && params.data.length === 0 || Object.entries(params.data).length === 0) {
      throw new MissingRequiredArgument("Query missing.");
    }
    let operation;
    let variables;
    if (typeof params.data === "string") {
      operation = params.data;
    } else {
      operation = params.data.query;
      variables = params.data.variables;
    }
    const headers = Object.fromEntries(Object.entries((params == null ? void 0 : params.extraHeaders) ?? {}).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(", ") : value.toString()
    ]));
    const response = await this.request(operation, {
      headers,
      retries: params.tries ? params.tries - 1 : void 0,
      variables
    });
    return { body: response, headers: {} };
  }
  async request(operation, options) {
    const response = await this.client.request(operation, {
      apiVersion: this.apiVersion || this.storefrontClass().config.apiVersion,
      ...options
    });
    if (response.errors) {
      const fetchResponse = response.errors.response;
      throwFailedRequest(response, ((options == null ? void 0 : options.retries) ?? 0) > 0, fetchResponse);
    }
    return response;
  }
  storefrontClass() {
    return this.constructor;
  }
};
__publicField(StorefrontClient, "config");
function storefrontClientClass(params) {
  const { config: config2 } = params;
  class NewStorefrontClient extends StorefrontClient {
  }
  __publicField(NewStorefrontClient, "config", config2);
  Reflect.defineProperty(NewStorefrontClient, "name", {
    value: "StorefrontClient"
  });
  return NewStorefrontClient;
}

// node_modules/@shopify/shopify-api/dist/esm/lib/clients/graphql_proxy/graphql_proxy.mjs
function graphqlProxy(config2) {
  return async ({ session, rawBody }) => {
    if (!session.accessToken) {
      throw new InvalidSession("Cannot proxy query. Session not authenticated.");
    }
    const GraphqlClient2 = graphqlClientClass({ config: config2 });
    const client = new GraphqlClient2({ session });
    let query;
    let variables;
    if (typeof rawBody === "string") {
      query = rawBody;
    } else {
      query = rawBody.query;
      variables = rawBody.variables;
    }
    if (!query) {
      throw new MissingRequiredArgument("Query missing.");
    }
    const response = await client.request(query, { variables });
    return { body: response, headers: {} };
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/clients/index.mjs
function clientClasses(config2) {
  return {
    // We don't pass in the HttpClient because the RestClient inherits from it, and goes through the same setup process
    Rest: restClientClass({ config: config2 }),
    Graphql: graphqlClientClass({ config: config2 }),
    Storefront: storefrontClientClass({ config: config2 }),
    graphqlProxy: graphqlProxy(config2)
  };
}

// node_modules/isbot/index.mjs
var fullPattern = " daum[ /]| deusu/|(?:^|[^g])news(?!sapphire)|(?<! (?:channel/|google/))google(?!(app|/google| pixel))|(?<! cu)bots?(?:\\b|_)|(?<!(?:lib))http|(?<![hg]m)score|(?<!cam)scan|24x7|@[a-z][\\w-]+\\.|\\(\\)|\\.com\\b|\\bperl\\b|\\btime/|\\||^[\\w \\.\\-\\(?:\\):%]+(?:/v?\\d+(?:\\.\\d+)?(?:\\.\\d{1,10})*?)?(?:,|$)|^[^ ]{50,}$|^\\d+\\b|^\\W|^\\w*search\\b|^\\w+/[\\w\\(\\)]*$|^active|^ad muncher|^amaya|^avsdevicesdk/|^azure|^biglotron|^bot|^bw/|^clamav[ /]|^client/|^cobweb/|^custom|^ddg[_-]android|^discourse|^dispatch/\\d|^downcast/|^duckduckgo|^email|^facebook|^getright/|^gozilla/|^hobbit|^hotzonu|^hwcdn/|^igetter/|^jeode/|^jetty/|^jigsaw|^microsoft bits|^movabletype|^mozilla/\\d\\.\\d\\s[\\w\\.-]+$|^mozilla/\\d\\.\\d\\s\\(compatible;?(?:\\s\\w+\\/\\d+\\.\\d+)?\\)$|^navermailapp|^netsurf|^offline|^openai/|^owler|^php|^postman|^python|^rank|^read|^reed|^rest|^rss|^snapchat|^space bison|^svn|^swcd |^taringa|^thumbor/|^track|^w3c|^webbandit/|^webcopier|^wget|^whatsapp|^wordpress|^xenu link sleuth|^yahoo|^yandex|^zdm/\\d|^zoom marketplace/|agent\\b|analyzer|archive|ask jeeves/teoma|audit|bit\\.ly/|bluecoat drtr|browsex|burpcollaborator|capture|catch|check\\b|checker|chrome-lighthouse|chromeframe|classifier|cloudflare|convertify|crawl|cypress/|dareboost|datanyze|dejaclick|detect|dmbrowser|download|evc-batch/|exaleadcloudview|feed|fetcher|firephp|functionize|grab|headless|httrack|hubspot marketing grader|hydra|ibisbrowser|infrawatch|insight|inspect|iplabel|java(?!;)|library|linkcheck|mail\\.ru/|manager|measure|neustar wpm|node\\b|nutch|offbyone|onetrust|optimize|pageburst|pagespeed|parser|phantomjs|pingdom|powermarks|preview|proxy|ptst[ /]\\d|retriever|rexx;|rigor|rss\\b|scrape|server|sogou|sparkler/|speedcurve|spider|splash|statuscake|supercleaner|synapse|synthetic|tools|torrent|transcoder|url|validator|virtuoso|wappalyzer|webglance|webkit2png|whatcms/|xtate/";
var naivePattern = /bot|crawl|http|lighthouse|scan|search|spider/i;
var pattern;
function getPattern() {
  if (pattern instanceof RegExp) {
    return pattern;
  }
  try {
    pattern = new RegExp(fullPattern, "i");
  } catch (error) {
    pattern = naivePattern;
  }
  return pattern;
}
function isbot(userAgent) {
  return Boolean(userAgent) && getPattern().test(userAgent);
}

// node_modules/@shopify/shopify-api/dist/esm/lib/utils/processed-query.mjs
var ProcessedQuery = class _ProcessedQuery {
  constructor() {
    __publicField(this, "processedQuery");
    this.processedQuery = new URLSearchParams();
  }
  static stringify(keyValuePairs) {
    if (!keyValuePairs || Object.keys(keyValuePairs).length === 0)
      return "";
    return new _ProcessedQuery().putAll(keyValuePairs).stringify();
  }
  putAll(keyValuePairs) {
    Object.entries(keyValuePairs).forEach(([key, value]) => this.put(key, value));
    return this;
  }
  put(key, value) {
    if (Array.isArray(value)) {
      this.putArray(key, value);
    } else if ((value == null ? void 0 : value.constructor) === Object) {
      this.putObject(key, value);
    } else {
      this.putSimple(key, value);
    }
  }
  putArray(key, value) {
    value.forEach((arrayValue) => this.processedQuery.append(`${key}[]`, `${arrayValue}`));
  }
  putObject(key, value) {
    Object.entries(value).forEach(([entry, entryValue]) => {
      this.processedQuery.append(`${key}[${entry}]`, `${entryValue}`);
    });
  }
  putSimple(key, value) {
    this.processedQuery.append(key, `${value}`);
  }
  stringify(omitQuestionMark = false) {
    const queryString = this.processedQuery.toString();
    return omitQuestionMark ? queryString : `?${queryString}`;
  }
};

// node_modules/@shopify/shopify-api/dist/esm/lib/auth/oauth/safe-compare.mjs
var safeCompare = (strA, strB) => {
  if (typeof strA === typeof strB) {
    const enc = new TextEncoder();
    const buffA = enc.encode(JSON.stringify(strA));
    const buffB = enc.encode(JSON.stringify(strB));
    if (buffA.length === buffB.length) {
      return timingSafeEqual(buffA, buffB);
    }
  } else {
    throw new SafeCompareError(`Mismatched data types provided: ${typeof strA} and ${typeof strB}`);
  }
  return false;
};
function timingSafeEqual(bufA, bufB) {
  const viewA = new Uint8Array(bufA);
  const viewB = new Uint8Array(bufB);
  let out = 0;
  for (let i = 0; i < viewA.length; i++) {
    out |= viewA[i] ^ viewB[i];
  }
  return out === 0;
}

// node_modules/@shopify/shopify-api/dist/esm/lib/utils/types.mjs
var HmacValidationType;
(function(HmacValidationType2) {
  HmacValidationType2["Flow"] = "flow";
  HmacValidationType2["Webhook"] = "webhook";
  HmacValidationType2["FulfillmentService"] = "fulfillment_service";
})(HmacValidationType || (HmacValidationType = {}));
var ValidationErrorReason = {
  MissingBody: "missing_body",
  InvalidHmac: "invalid_hmac",
  MissingHmac: "missing_hmac"
};

// node_modules/@shopify/shopify-api/dist/esm/lib/utils/hmac-validator.mjs
var HMAC_TIMESTAMP_PERMITTED_CLOCK_TOLERANCE_SEC = 90;
function stringifyQueryForAdmin(query) {
  const processedQuery = new ProcessedQuery();
  Object.keys(query).sort((val1, val2) => val1.localeCompare(val2)).forEach((key) => processedQuery.put(key, query[key]));
  return processedQuery.stringify(true);
}
function stringifyQueryForAppProxy(query) {
  return Object.entries(query).sort(([val1], [val2]) => val1.localeCompare(val2)).reduce((acc, [key, value]) => {
    return `${acc}${key}=${Array.isArray(value) ? value.join(",") : value}`;
  }, "");
}
function generateLocalHmac(config2) {
  return async (params, signator = "admin") => {
    const { hmac, signature, ...query } = params;
    const queryString = signator === "admin" ? stringifyQueryForAdmin(query) : stringifyQueryForAppProxy(query);
    return createSHA256HMAC(config2.apiSecretKey, queryString, HashFormat.Hex);
  };
}
function validateHmac(config2) {
  return async (query, { signator } = { signator: "admin" }) => {
    if (signator === "admin" && !query.hmac) {
      throw new InvalidHmacError("Query does not contain an HMAC value.");
    }
    if (signator === "appProxy" && !query.signature) {
      throw new InvalidHmacError("Query does not contain a signature value.");
    }
    validateHmacTimestamp(query);
    const hmac = signator === "appProxy" ? query.signature : query.hmac;
    const localHmac = await generateLocalHmac(config2)(query, signator);
    return safeCompare(hmac, localHmac);
  };
}
async function validateHmacString(config2, data, hmac, format) {
  const localHmac = await createSHA256HMAC(config2.apiSecretKey, data, format);
  return safeCompare(hmac, localHmac);
}
function getCurrentTimeInSec() {
  return Math.trunc(Date.now() / 1e3);
}
function validateHmacFromRequestFactory(config2) {
  return async function validateHmacFromRequest({ type, rawBody, ...adapterArgs }) {
    const request2 = await abstractConvertRequest(adapterArgs);
    if (!rawBody.length) {
      return fail(ValidationErrorReason.MissingBody, type, config2);
    }
    const hmac = getHeader(request2.headers, ShopifyHeader.Hmac);
    if (!hmac) {
      return fail(ValidationErrorReason.MissingHmac, type, config2);
    }
    const validHmac = await validateHmacString(config2, rawBody, hmac, HashFormat.Base64);
    if (!validHmac) {
      return fail(ValidationErrorReason.InvalidHmac, type, config2);
    }
    return succeed(type, config2);
  };
}
function validateHmacTimestamp(query) {
  if (Math.abs(getCurrentTimeInSec() - Number(query.timestamp)) > HMAC_TIMESTAMP_PERMITTED_CLOCK_TOLERANCE_SEC) {
    throw new InvalidHmacError("HMAC timestamp is outside of the tolerance range");
  }
}
async function fail(reason, type, config2) {
  const log2 = logger(config2);
  await log2.debug(`${type} request is not valid`, { reason });
  return {
    valid: false,
    reason
  };
}
async function succeed(type, config2) {
  const log2 = logger(config2);
  await log2.debug(`${type} request is valid`);
  return {
    valid: true
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/auth/decode-host.mjs
function decodeHost(host) {
  return atob(host);
}

// node_modules/@shopify/shopify-api/dist/esm/lib/utils/shop-admin-url-helper.mjs
function shopAdminUrlToLegacyUrl(shopAdminUrl) {
  const shopUrl = removeProtocol(shopAdminUrl);
  const isShopAdminUrl = shopUrl.split(".")[0] === "admin";
  if (!isShopAdminUrl) {
    return null;
  }
  const regex = new RegExp(`admin\\..+/store/([^/]+)`);
  const matches = shopUrl.match(regex);
  if (matches && matches.length === 2) {
    const shopName = matches[1];
    const isSpinUrl = shopUrl.includes("spin.dev/store/");
    const isLocalUrl = shopUrl.includes("shop.dev/store/");
    if (isSpinUrl) {
      return spinAdminUrlToLegacyUrl(shopUrl);
    } else if (isLocalUrl) {
      return localAdminUrlToLegacyUrl(shopUrl);
    } else {
      return `${shopName}.myshopify.com`;
    }
  } else {
    return null;
  }
}
function legacyUrlToShopAdminUrl(legacyAdminUrl) {
  const shopUrl = removeProtocol(legacyAdminUrl);
  const regex = new RegExp(`(.+)\\.myshopify\\.com$`);
  const matches = shopUrl.match(regex);
  if (matches && matches.length === 2) {
    const shopName = matches[1];
    return `admin.shopify.com/store/${shopName}`;
  } else {
    const isSpinUrl = shopUrl.endsWith("spin.dev");
    const isLocalUrl = shopUrl.endsWith("shop.dev");
    if (isSpinUrl) {
      return spinLegacyUrlToAdminUrl(shopUrl);
    } else if (isLocalUrl) {
      return localLegacyUrlToAdminUrl(shopUrl);
    } else {
      return null;
    }
  }
}
function spinAdminUrlToLegacyUrl(shopAdminUrl) {
  const spinRegex = new RegExp(`admin\\.web\\.(.+\\.spin\\.dev)/store/(.+)`);
  const spinMatches = shopAdminUrl.match(spinRegex);
  if (spinMatches && spinMatches.length === 3) {
    const spinUrl = spinMatches[1];
    const shopName = spinMatches[2];
    return `${shopName}.shopify.${spinUrl}`;
  } else {
    return null;
  }
}
function localAdminUrlToLegacyUrl(shopAdminUrl) {
  const localRegex = new RegExp(`admin\\.shop\\.dev/store/(.+)`);
  const localMatches = shopAdminUrl.match(localRegex);
  if (localMatches && localMatches.length === 2) {
    const shopName = localMatches[1];
    return `${shopName}.shop.dev`;
  } else {
    return null;
  }
}
function spinLegacyUrlToAdminUrl(legacyAdminUrl) {
  const spinRegex = new RegExp(`(.+)\\.shopify\\.(.+\\.spin\\.dev)`);
  const spinMatches = legacyAdminUrl.match(spinRegex);
  if (spinMatches && spinMatches.length === 3) {
    const shopName = spinMatches[1];
    const spinUrl = spinMatches[2];
    return `admin.web.${spinUrl}/store/${shopName}`;
  } else {
    return null;
  }
}
function localLegacyUrlToAdminUrl(legacyAdminUrl) {
  const localRegex = new RegExp(`(.+)\\.shop\\.dev$`);
  const localMatches = legacyAdminUrl.match(localRegex);
  if (localMatches && localMatches.length === 2) {
    const shopName = localMatches[1];
    return `admin.shop.dev/store/${shopName}`;
  } else {
    return null;
  }
}
function removeProtocol(url) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

// node_modules/@shopify/shopify-api/dist/esm/lib/utils/shop-validator.mjs
function sanitizeShop(config2) {
  return (shop, throwOnInvalid = false) => {
    let shopUrl = shop;
    const domainsRegex = [
      "myshopify\\.com",
      "shopify\\.com",
      "myshopify\\.io",
      "shop\\.dev"
    ];
    if (config2.customShopDomains) {
      domainsRegex.push(...config2.customShopDomains.map((regex) => typeof regex === "string" ? regex : regex.source));
    }
    const shopUrlRegex = new RegExp(`^[a-zA-Z0-9][a-zA-Z0-9-_]*\\.(${domainsRegex.join("|")})[/]*$`);
    const shopAdminRegex = new RegExp(`^admin\\.(${domainsRegex.join("|")})/store/([a-zA-Z0-9][a-zA-Z0-9-_]*)$`);
    const isShopAdminUrl = shopAdminRegex.test(shopUrl);
    if (isShopAdminUrl) {
      shopUrl = shopAdminUrlToLegacyUrl(shopUrl) || "";
    }
    const sanitizedShop = shopUrlRegex.test(shopUrl) ? shopUrl : null;
    if (!sanitizedShop && throwOnInvalid) {
      throw new InvalidShopError("Received invalid shop argument");
    }
    return sanitizedShop;
  };
}
function sanitizeHost() {
  return (host, throwOnInvalid = false) => {
    const base64regex = /^[0-9a-zA-Z+/]+={0,2}$/;
    let sanitizedHost = base64regex.test(host) ? host : null;
    if (sanitizedHost) {
      const { hostname } = new URL(`https://${decodeHost(sanitizedHost)}`);
      const originsRegex = [
        "myshopify\\.com",
        "shopify\\.com",
        "myshopify\\.io",
        "spin\\.dev",
        "shop\\.dev"
      ];
      const hostRegex = new RegExp(`\\.(${originsRegex.join("|")})$`);
      if (!hostRegex.test(hostname)) {
        sanitizedHost = null;
      }
    }
    if (!sanitizedHost && throwOnInvalid) {
      throw new InvalidHostError("Received invalid host argument");
    }
    return sanitizedHost;
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/clients/types.mjs
var DataType;
(function(DataType2) {
  DataType2["JSON"] = "application/json";
  DataType2["GraphQL"] = "application/graphql";
  DataType2["URLEncoded"] = "application/x-www-form-urlencoded";
})(DataType || (DataType = {}));

// node_modules/@shopify/shopify-api/dist/esm/lib/utils/fetch-request.mjs
function fetchRequestFactory(config2) {
  return async function fetchRequest(url, options) {
    const log2 = logger(config2);
    const doLog = config2.logger.httpRequests && config2.logger.level === LogSeverity.Debug;
    if (doLog) {
      log2.debug("Making HTTP request", {
        method: (options == null ? void 0 : options.method) || "GET",
        url,
        ...(options == null ? void 0 : options.body) && { body: options == null ? void 0 : options.body }
      });
    }
    const response = await abstractFetch(url, options);
    if (doLog) {
      log2.debug("HTTP request completed", {
        method: (options == null ? void 0 : options.method) || "GET",
        url,
        status: response.status
      });
    }
    return response;
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/auth/oauth/types.mjs
var SESSION_COOKIE_NAME = "shopify_app_session";
var STATE_COOKIE_NAME = "shopify_app_state";

// node_modules/@shopify/shopify-api/dist/esm/lib/auth/oauth/nonce.mjs
function nonce() {
  const length = 15;
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  const nonce2 = bytes.map((byte) => {
    return byte % 10;
  }).join("");
  return nonce2;
}

// node_modules/@shopify/shopify-api/dist/esm/lib/session/session.mjs
var propertiesToSave = [
  "id",
  "shop",
  "state",
  "isOnline",
  "scope",
  "accessToken",
  "expires",
  "onlineAccessInfo"
];
var Session = class _Session {
  constructor(params) {
    /**
     * The unique identifier for the session.
     */
    __publicField(this, "id");
    /**
     * The Shopify shop domain, such as `example.myshopify.com`.
     */
    __publicField(this, "shop");
    /**
     * The state of the session. Used for the OAuth authentication code flow.
     */
    __publicField(this, "state");
    /**
     * Whether the access token in the session is online or offline.
     */
    __publicField(this, "isOnline");
    /**
     * The desired scopes for the access token, at the time the session was created.
     */
    __publicField(this, "scope");
    /**
     * The date the access token expires.
     */
    __publicField(this, "expires");
    /**
     * The access token for the session.
     */
    __publicField(this, "accessToken");
    /**
     * Information on the user for the session. Only present for online sessions.
     */
    __publicField(this, "onlineAccessInfo");
    Object.assign(this, params);
  }
  static fromPropertyArray(entries, returnUserData = false) {
    if (!Array.isArray(entries)) {
      throw new InvalidSession("The parameter is not an array: a Session cannot be created from this object.");
    }
    const obj = Object.fromEntries(entries.filter(([_key, value]) => value !== null && value !== void 0).map(([key, value]) => {
      switch (key.toLowerCase()) {
        case "isonline":
          return ["isOnline", value];
        case "accesstoken":
          return ["accessToken", value];
        case "onlineaccessinfo":
          return ["onlineAccessInfo", value];
        case "userid":
          return ["userId", value];
        case "firstname":
          return ["firstName", value];
        case "lastname":
          return ["lastName", value];
        case "accountowner":
          return ["accountOwner", value];
        case "emailverified":
          return ["emailVerified", value];
        default:
          return [key.toLowerCase(), value];
      }
    }));
    const sessionData = {};
    const onlineAccessInfo = {
      associated_user: {}
    };
    Object.entries(obj).forEach(([key, value]) => {
      switch (key) {
        case "isOnline":
          if (typeof value === "string") {
            sessionData[key] = value.toString().toLowerCase() === "true";
          } else if (typeof value === "number") {
            sessionData[key] = Boolean(value);
          } else {
            sessionData[key] = value;
          }
          break;
        case "scope":
          sessionData[key] = value.toString();
          break;
        case "expires":
          sessionData[key] = value ? new Date(Number(value)) : void 0;
          break;
        case "onlineAccessInfo":
          onlineAccessInfo.associated_user.id = Number(value);
          break;
        case "userId":
          if (returnUserData) {
            onlineAccessInfo.associated_user.id = Number(value);
            break;
          }
        case "firstName":
          if (returnUserData) {
            onlineAccessInfo.associated_user.first_name = String(value);
            break;
          }
        case "lastName":
          if (returnUserData) {
            onlineAccessInfo.associated_user.last_name = String(value);
            break;
          }
        case "email":
          if (returnUserData) {
            onlineAccessInfo.associated_user.email = String(value);
            break;
          }
        case "accountOwner":
          if (returnUserData) {
            onlineAccessInfo.associated_user.account_owner = Boolean(value);
            break;
          }
        case "locale":
          if (returnUserData) {
            onlineAccessInfo.associated_user.locale = String(value);
            break;
          }
        case "collaborator":
          if (returnUserData) {
            onlineAccessInfo.associated_user.collaborator = Boolean(value);
            break;
          }
        case "emailVerified":
          if (returnUserData) {
            onlineAccessInfo.associated_user.email_verified = Boolean(value);
            break;
          }
        // Return any user keys as passed in
        default:
          sessionData[key] = value;
      }
    });
    if (sessionData.isOnline) {
      sessionData.onlineAccessInfo = onlineAccessInfo;
    }
    const session = new _Session(sessionData);
    return session;
  }
  /**
   * Whether the session is active. Active sessions have an access token that is not expired, and has has the given
   * scopes if scopes is equal to a truthy value.
   */
  isActive(scopes, withinMillisecondsOfExpiry = 500) {
    const hasAccessToken = Boolean(this.accessToken);
    const isTokenNotExpired = !this.isExpired(withinMillisecondsOfExpiry);
    const isScopeChanged = this.isScopeChanged(scopes);
    return !isScopeChanged && hasAccessToken && isTokenNotExpired;
  }
  /**
   * Whether the access token includes the given scopes if they are provided.
   */
  isScopeChanged(scopes) {
    if (typeof scopes === "undefined") {
      return false;
    }
    return !this.isScopeIncluded(scopes);
  }
  /**
   * Whether the access token includes the given scopes.
   */
  isScopeIncluded(scopes) {
    const requiredScopes = scopes instanceof AuthScopes ? scopes : new AuthScopes(scopes);
    const sessionScopes = new AuthScopes(this.scope);
    return sessionScopes.has(requiredScopes);
  }
  /**
   * Whether the access token is expired.
   */
  isExpired(withinMillisecondsOfExpiry = 0) {
    return Boolean(this.expires && this.expires.getTime() - withinMillisecondsOfExpiry < Date.now());
  }
  /**
   * Converts an object with data into a Session.
   */
  toObject() {
    const object = {
      id: this.id,
      shop: this.shop,
      state: this.state,
      isOnline: this.isOnline
    };
    if (this.scope) {
      object.scope = this.scope;
    }
    if (this.expires) {
      object.expires = this.expires;
    }
    if (this.accessToken) {
      object.accessToken = this.accessToken;
    }
    if (this.onlineAccessInfo) {
      object.onlineAccessInfo = this.onlineAccessInfo;
    }
    return object;
  }
  /**
   * Checks whether the given session is equal to this session.
   */
  equals(other) {
    if (!other)
      return false;
    const mandatoryPropsMatch = this.id === other.id && this.shop === other.shop && this.state === other.state && this.isOnline === other.isOnline;
    if (!mandatoryPropsMatch)
      return false;
    const copyA = this.toPropertyArray(true);
    copyA.sort(([k1], [k2]) => k1 < k2 ? -1 : 1);
    const copyB = other.toPropertyArray(true);
    copyB.sort(([k1], [k2]) => k1 < k2 ? -1 : 1);
    return JSON.stringify(copyA) === JSON.stringify(copyB);
  }
  /**
   * Converts the session into an array of key-value pairs.
   */
  toPropertyArray(returnUserData = false) {
    return Object.entries(this).filter(([key, value]) => propertiesToSave.includes(key) && value !== void 0 && value !== null).flatMap(([key, value]) => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h;
      switch (key) {
        case "expires":
          return [[key, value ? value.getTime() : void 0]];
        case "onlineAccessInfo":
          if (!returnUserData) {
            return [[key, value.associated_user.id]];
          } else {
            return [
              ["userId", (_a2 = value == null ? void 0 : value.associated_user) == null ? void 0 : _a2.id],
              ["firstName", (_b2 = value == null ? void 0 : value.associated_user) == null ? void 0 : _b2.first_name],
              ["lastName", (_c = value == null ? void 0 : value.associated_user) == null ? void 0 : _c.last_name],
              ["email", (_d = value == null ? void 0 : value.associated_user) == null ? void 0 : _d.email],
              ["locale", (_e = value == null ? void 0 : value.associated_user) == null ? void 0 : _e.locale],
              ["emailVerified", (_f = value == null ? void 0 : value.associated_user) == null ? void 0 : _f.email_verified],
              ["accountOwner", (_g = value == null ? void 0 : value.associated_user) == null ? void 0 : _g.account_owner],
              ["collaborator", (_h = value == null ? void 0 : value.associated_user) == null ? void 0 : _h.collaborator]
            ];
          }
        default:
          return [[key, value]];
      }
    }).filter(([_key, value]) => value !== void 0);
  }
};

// node_modules/jose/dist/browser/runtime/webcrypto.js
var webcrypto_default = crypto;
var isCryptoKey = (key) => key instanceof CryptoKey;

// node_modules/jose/dist/browser/lib/buffer_utils.js
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var MAX_INT32 = 2 ** 32;
function concat(...buffers) {
  const size = buffers.reduce((acc, { length }) => acc + length, 0);
  const buf = new Uint8Array(size);
  let i = 0;
  for (const buffer of buffers) {
    buf.set(buffer, i);
    i += buffer.length;
  }
  return buf;
}

// node_modules/jose/dist/browser/runtime/base64url.js
var encodeBase64 = (input) => {
  let unencoded = input;
  if (typeof unencoded === "string") {
    unencoded = encoder.encode(unencoded);
  }
  const CHUNK_SIZE = 32768;
  const arr = [];
  for (let i = 0; i < unencoded.length; i += CHUNK_SIZE) {
    arr.push(String.fromCharCode.apply(null, unencoded.subarray(i, i + CHUNK_SIZE)));
  }
  return btoa(arr.join(""));
};
var encode = (input) => {
  return encodeBase64(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};
var decodeBase64 = (encoded) => {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};
var decode = (input) => {
  let encoded = input;
  if (encoded instanceof Uint8Array) {
    encoded = decoder.decode(encoded);
  }
  encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
  try {
    return decodeBase64(encoded);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
};

// node_modules/jose/dist/browser/util/errors.js
var errors_exports = {};
__export(errors_exports, {
  JOSEAlgNotAllowed: () => JOSEAlgNotAllowed,
  JOSEError: () => JOSEError,
  JOSENotSupported: () => JOSENotSupported,
  JWEDecryptionFailed: () => JWEDecryptionFailed,
  JWEInvalid: () => JWEInvalid,
  JWKInvalid: () => JWKInvalid,
  JWKSInvalid: () => JWKSInvalid,
  JWKSMultipleMatchingKeys: () => JWKSMultipleMatchingKeys,
  JWKSNoMatchingKey: () => JWKSNoMatchingKey,
  JWKSTimeout: () => JWKSTimeout,
  JWSInvalid: () => JWSInvalid,
  JWSSignatureVerificationFailed: () => JWSSignatureVerificationFailed,
  JWTClaimValidationFailed: () => JWTClaimValidationFailed,
  JWTExpired: () => JWTExpired,
  JWTInvalid: () => JWTInvalid
});
var JOSEError = class extends Error {
  constructor(message2, options) {
    var _a2;
    super(message2, options);
    this.code = "ERR_JOSE_GENERIC";
    this.name = this.constructor.name;
    (_a2 = Error.captureStackTrace) == null ? void 0 : _a2.call(Error, this, this.constructor);
  }
};
JOSEError.code = "ERR_JOSE_GENERIC";
var JWTClaimValidationFailed = class extends JOSEError {
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } });
    this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
    this.claim = claim;
    this.reason = reason;
    this.payload = payload;
  }
};
JWTClaimValidationFailed.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
var JWTExpired = class extends JOSEError {
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } });
    this.code = "ERR_JWT_EXPIRED";
    this.claim = claim;
    this.reason = reason;
    this.payload = payload;
  }
};
JWTExpired.code = "ERR_JWT_EXPIRED";
var JOSEAlgNotAllowed = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
  }
};
JOSEAlgNotAllowed.code = "ERR_JOSE_ALG_NOT_ALLOWED";
var JOSENotSupported = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JOSE_NOT_SUPPORTED";
  }
};
JOSENotSupported.code = "ERR_JOSE_NOT_SUPPORTED";
var JWEDecryptionFailed = class extends JOSEError {
  constructor(message2 = "decryption operation failed", options) {
    super(message2, options);
    this.code = "ERR_JWE_DECRYPTION_FAILED";
  }
};
JWEDecryptionFailed.code = "ERR_JWE_DECRYPTION_FAILED";
var JWEInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWE_INVALID";
  }
};
JWEInvalid.code = "ERR_JWE_INVALID";
var JWSInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWS_INVALID";
  }
};
JWSInvalid.code = "ERR_JWS_INVALID";
var JWTInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWT_INVALID";
  }
};
JWTInvalid.code = "ERR_JWT_INVALID";
var JWKInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWK_INVALID";
  }
};
JWKInvalid.code = "ERR_JWK_INVALID";
var JWKSInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWKS_INVALID";
  }
};
JWKSInvalid.code = "ERR_JWKS_INVALID";
var JWKSNoMatchingKey = class extends JOSEError {
  constructor(message2 = "no applicable key found in the JSON Web Key Set", options) {
    super(message2, options);
    this.code = "ERR_JWKS_NO_MATCHING_KEY";
  }
};
JWKSNoMatchingKey.code = "ERR_JWKS_NO_MATCHING_KEY";
var JWKSMultipleMatchingKeys = class extends JOSEError {
  constructor(message2 = "multiple matching keys found in the JSON Web Key Set", options) {
    super(message2, options);
    this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  }
};
JWKSMultipleMatchingKeys.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
var JWKSTimeout = class extends JOSEError {
  constructor(message2 = "request timed out", options) {
    super(message2, options);
    this.code = "ERR_JWKS_TIMEOUT";
  }
};
JWKSTimeout.code = "ERR_JWKS_TIMEOUT";
var JWSSignatureVerificationFailed = class extends JOSEError {
  constructor(message2 = "signature verification failed", options) {
    super(message2, options);
    this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  }
};
JWSSignatureVerificationFailed.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";

// node_modules/jose/dist/browser/runtime/random.js
var random_default = webcrypto_default.getRandomValues.bind(webcrypto_default);

// node_modules/jose/dist/browser/lib/crypto_key.js
function unusable(name, prop = "algorithm.name") {
  return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
}
function isAlgorithm(algorithm, name) {
  return algorithm.name === name;
}
function getHashLength(hash) {
  return parseInt(hash.name.slice(4), 10);
}
function getNamedCurve(alg) {
  switch (alg) {
    case "ES256":
      return "P-256";
    case "ES384":
      return "P-384";
    case "ES512":
      return "P-521";
    default:
      throw new Error("unreachable");
  }
}
function checkUsage(key, usages) {
  if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
    let msg = "CryptoKey does not support this operation, its usages must include ";
    if (usages.length > 2) {
      const last = usages.pop();
      msg += `one of ${usages.join(", ")}, or ${last}.`;
    } else if (usages.length === 2) {
      msg += `one of ${usages[0]} or ${usages[1]}.`;
    } else {
      msg += `${usages[0]}.`;
    }
    throw new TypeError(msg);
  }
}
function checkSigCryptoKey(key, alg, ...usages) {
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512": {
      if (!isAlgorithm(key.algorithm, "HMAC"))
        throw unusable("HMAC");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "RS256":
    case "RS384":
    case "RS512": {
      if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5"))
        throw unusable("RSASSA-PKCS1-v1_5");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "PS256":
    case "PS384":
    case "PS512": {
      if (!isAlgorithm(key.algorithm, "RSA-PSS"))
        throw unusable("RSA-PSS");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "EdDSA": {
      if (key.algorithm.name !== "Ed25519" && key.algorithm.name !== "Ed448") {
        throw unusable("Ed25519 or Ed448");
      }
      break;
    }
    case "Ed25519": {
      if (!isAlgorithm(key.algorithm, "Ed25519"))
        throw unusable("Ed25519");
      break;
    }
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!isAlgorithm(key.algorithm, "ECDSA"))
        throw unusable("ECDSA");
      const expected = getNamedCurve(alg);
      const actual = key.algorithm.namedCurve;
      if (actual !== expected)
        throw unusable(expected, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  checkUsage(key, usages);
}

// node_modules/jose/dist/browser/lib/invalid_key_input.js
function message(msg, actual, ...types2) {
  var _a2;
  types2 = types2.filter(Boolean);
  if (types2.length > 2) {
    const last = types2.pop();
    msg += `one of type ${types2.join(", ")}, or ${last}.`;
  } else if (types2.length === 2) {
    msg += `one of type ${types2[0]} or ${types2[1]}.`;
  } else {
    msg += `of type ${types2[0]}.`;
  }
  if (actual == null) {
    msg += ` Received ${actual}`;
  } else if (typeof actual === "function" && actual.name) {
    msg += ` Received function ${actual.name}`;
  } else if (typeof actual === "object" && actual != null) {
    if ((_a2 = actual.constructor) == null ? void 0 : _a2.name) {
      msg += ` Received an instance of ${actual.constructor.name}`;
    }
  }
  return msg;
}
var invalid_key_input_default = (actual, ...types2) => {
  return message("Key must be ", actual, ...types2);
};
function withAlg(alg, actual, ...types2) {
  return message(`Key for the ${alg} algorithm must be `, actual, ...types2);
}

// node_modules/jose/dist/browser/runtime/is_key_like.js
var is_key_like_default = (key) => {
  if (isCryptoKey(key)) {
    return true;
  }
  return (key == null ? void 0 : key[Symbol.toStringTag]) === "KeyObject";
};
var types = ["CryptoKey"];

// node_modules/jose/dist/browser/lib/is_disjoint.js
var isDisjoint = (...headers) => {
  const sources = headers.filter(Boolean);
  if (sources.length === 0 || sources.length === 1) {
    return true;
  }
  let acc;
  for (const header of sources) {
    const parameters = Object.keys(header);
    if (!acc || acc.size === 0) {
      acc = new Set(parameters);
      continue;
    }
    for (const parameter of parameters) {
      if (acc.has(parameter)) {
        return false;
      }
      acc.add(parameter);
    }
  }
  return true;
};
var is_disjoint_default = isDisjoint;

// node_modules/jose/dist/browser/lib/is_object.js
function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}
function isObject2(input) {
  if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(input) === null) {
    return true;
  }
  let proto = input;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(input) === proto;
}

// node_modules/jose/dist/browser/runtime/check_key_length.js
var check_key_length_default = (alg, key) => {
  if (alg.startsWith("RS") || alg.startsWith("PS")) {
    const { modulusLength } = key.algorithm;
    if (typeof modulusLength !== "number" || modulusLength < 2048) {
      throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
    }
  }
};

// node_modules/jose/dist/browser/lib/is_jwk.js
function isJWK(key) {
  return isObject2(key) && typeof key.kty === "string";
}
function isPrivateJWK(key) {
  return key.kty !== "oct" && typeof key.d === "string";
}
function isPublicJWK(key) {
  return key.kty !== "oct" && typeof key.d === "undefined";
}
function isSecretJWK(key) {
  return isJWK(key) && key.kty === "oct" && typeof key.k === "string";
}

// node_modules/jose/dist/browser/runtime/jwk_to_key.js
function subtleMapping(jwk) {
  let algorithm;
  let keyUsages;
  switch (jwk.kty) {
    case "RSA": {
      switch (jwk.alg) {
        case "PS256":
        case "PS384":
        case "PS512":
          algorithm = { name: "RSA-PSS", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RS256":
        case "RS384":
        case "RS512":
          algorithm = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
          algorithm = {
            name: "RSA-OAEP",
            hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
          };
          keyUsages = jwk.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "EC": {
      switch (jwk.alg) {
        case "ES256":
          algorithm = { name: "ECDSA", namedCurve: "P-256" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ES384":
          algorithm = { name: "ECDSA", namedCurve: "P-384" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ES512":
          algorithm = { name: "ECDSA", namedCurve: "P-521" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: "ECDH", namedCurve: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "OKP": {
      switch (jwk.alg) {
        case "Ed25519":
          algorithm = { name: "Ed25519" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "EdDSA":
          algorithm = { name: jwk.crv };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    default:
      throw new JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
  }
  return { algorithm, keyUsages };
}
var parse2 = async (jwk) => {
  if (!jwk.alg) {
    throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  }
  const { algorithm, keyUsages } = subtleMapping(jwk);
  const rest = [
    algorithm,
    jwk.ext ?? false,
    jwk.key_ops ?? keyUsages
  ];
  const keyData = { ...jwk };
  delete keyData.alg;
  delete keyData.use;
  return webcrypto_default.subtle.importKey("jwk", keyData, ...rest);
};
var jwk_to_key_default = parse2;

// node_modules/jose/dist/browser/runtime/normalize_key.js
var exportKeyValue = (k) => decode(k);
var privCache;
var pubCache;
var isKeyObject = (key) => {
  return (key == null ? void 0 : key[Symbol.toStringTag]) === "KeyObject";
};
var importAndCache = async (cache, key, jwk, alg, freeze = false) => {
  let cached = cache.get(key);
  if (cached == null ? void 0 : cached[alg]) {
    return cached[alg];
  }
  const cryptoKey = await jwk_to_key_default({ ...jwk, alg });
  if (freeze)
    Object.freeze(key);
  if (!cached) {
    cache.set(key, { [alg]: cryptoKey });
  } else {
    cached[alg] = cryptoKey;
  }
  return cryptoKey;
};
var normalizePublicKey = (key, alg) => {
  if (isKeyObject(key)) {
    let jwk = key.export({ format: "jwk" });
    delete jwk.d;
    delete jwk.dp;
    delete jwk.dq;
    delete jwk.p;
    delete jwk.q;
    delete jwk.qi;
    if (jwk.k) {
      return exportKeyValue(jwk.k);
    }
    pubCache || (pubCache = /* @__PURE__ */ new WeakMap());
    return importAndCache(pubCache, key, jwk, alg);
  }
  if (isJWK(key)) {
    if (key.k)
      return decode(key.k);
    pubCache || (pubCache = /* @__PURE__ */ new WeakMap());
    const cryptoKey = importAndCache(pubCache, key, key, alg, true);
    return cryptoKey;
  }
  return key;
};
var normalizePrivateKey = (key, alg) => {
  if (isKeyObject(key)) {
    let jwk = key.export({ format: "jwk" });
    if (jwk.k) {
      return exportKeyValue(jwk.k);
    }
    privCache || (privCache = /* @__PURE__ */ new WeakMap());
    return importAndCache(privCache, key, jwk, alg);
  }
  if (isJWK(key)) {
    if (key.k)
      return decode(key.k);
    privCache || (privCache = /* @__PURE__ */ new WeakMap());
    const cryptoKey = importAndCache(privCache, key, key, alg, true);
    return cryptoKey;
  }
  return key;
};
var normalize_key_default = { normalizePublicKey, normalizePrivateKey };

// node_modules/jose/dist/browser/key/import.js
async function importJWK(jwk, alg) {
  if (!isObject2(jwk)) {
    throw new TypeError("JWK must be an object");
  }
  alg || (alg = jwk.alg);
  switch (jwk.kty) {
    case "oct":
      if (typeof jwk.k !== "string" || !jwk.k) {
        throw new TypeError('missing "k" (Key Value) Parameter value');
      }
      return decode(jwk.k);
    case "RSA":
      if ("oth" in jwk && jwk.oth !== void 0) {
        throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
      }
    case "EC":
    case "OKP":
      return jwk_to_key_default({ ...jwk, alg });
    default:
      throw new JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
  }
}

// node_modules/jose/dist/browser/lib/check_key_type.js
var tag = (key) => key == null ? void 0 : key[Symbol.toStringTag];
var jwkMatchesOp = (alg, key, usage) => {
  var _a2, _b2;
  if (key.use !== void 0 && key.use !== "sig") {
    throw new TypeError("Invalid key for this operation, when present its use must be sig");
  }
  if (key.key_ops !== void 0 && ((_b2 = (_a2 = key.key_ops).includes) == null ? void 0 : _b2.call(_a2, usage)) !== true) {
    throw new TypeError(`Invalid key for this operation, when present its key_ops must include ${usage}`);
  }
  if (key.alg !== void 0 && key.alg !== alg) {
    throw new TypeError(`Invalid key for this operation, when present its alg must be ${alg}`);
  }
  return true;
};
var symmetricTypeCheck = (alg, key, usage, allowJwk) => {
  if (key instanceof Uint8Array)
    return;
  if (allowJwk && isJWK(key)) {
    if (isSecretJWK(key) && jwkMatchesOp(alg, key, usage))
      return;
    throw new TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
  }
  if (!is_key_like_default(key)) {
    throw new TypeError(withAlg(alg, key, ...types, "Uint8Array", allowJwk ? "JSON Web Key" : null));
  }
  if (key.type !== "secret") {
    throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
  }
};
var asymmetricTypeCheck = (alg, key, usage, allowJwk) => {
  if (allowJwk && isJWK(key)) {
    switch (usage) {
      case "sign":
        if (isPrivateJWK(key) && jwkMatchesOp(alg, key, usage))
          return;
        throw new TypeError(`JSON Web Key for this operation be a private JWK`);
      case "verify":
        if (isPublicJWK(key) && jwkMatchesOp(alg, key, usage))
          return;
        throw new TypeError(`JSON Web Key for this operation be a public JWK`);
    }
  }
  if (!is_key_like_default(key)) {
    throw new TypeError(withAlg(alg, key, ...types, allowJwk ? "JSON Web Key" : null));
  }
  if (key.type === "secret") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
  }
  if (usage === "sign" && key.type === "public") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
  }
  if (usage === "decrypt" && key.type === "public") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
  }
  if (key.algorithm && usage === "verify" && key.type === "private") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
  }
  if (key.algorithm && usage === "encrypt" && key.type === "private") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
  }
};
function checkKeyType(allowJwk, alg, key, usage) {
  const symmetric = alg.startsWith("HS") || alg === "dir" || alg.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(alg);
  if (symmetric) {
    symmetricTypeCheck(alg, key, usage, allowJwk);
  } else {
    asymmetricTypeCheck(alg, key, usage, allowJwk);
  }
}
var check_key_type_default = checkKeyType.bind(void 0, false);
var checkKeyTypeWithJwk = checkKeyType.bind(void 0, true);

// node_modules/jose/dist/browser/lib/validate_crit.js
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
  if (joseHeader.crit !== void 0 && (protectedHeader == null ? void 0 : protectedHeader.crit) === void 0) {
    throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
  }
  if (!protectedHeader || protectedHeader.crit === void 0) {
    return /* @__PURE__ */ new Set();
  }
  if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) {
    throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  }
  let recognized;
  if (recognizedOption !== void 0) {
    recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
  } else {
    recognized = recognizedDefault;
  }
  for (const parameter of protectedHeader.crit) {
    if (!recognized.has(parameter)) {
      throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
    }
    if (joseHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" is missing`);
    }
    if (recognized.get(parameter) && protectedHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
    }
  }
  return new Set(protectedHeader.crit);
}
var validate_crit_default = validateCrit;

// node_modules/jose/dist/browser/lib/validate_algorithms.js
var validateAlgorithms = (option, algorithms) => {
  if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) {
    throw new TypeError(`"${option}" option must be an array of strings`);
  }
  if (!algorithms) {
    return void 0;
  }
  return new Set(algorithms);
};
var validate_algorithms_default = validateAlgorithms;

// node_modules/jose/dist/browser/lib/private_symbols.js
var unprotected = Symbol();

// node_modules/jose/dist/browser/runtime/subtle_dsa.js
function subtleDsa(alg, algorithm) {
  const hash = `SHA-${alg.slice(-3)}`;
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512":
      return { hash, name: "HMAC" };
    case "PS256":
    case "PS384":
    case "PS512":
      return { hash, name: "RSA-PSS", saltLength: alg.slice(-3) >> 3 };
    case "RS256":
    case "RS384":
    case "RS512":
      return { hash, name: "RSASSA-PKCS1-v1_5" };
    case "ES256":
    case "ES384":
    case "ES512":
      return { hash, name: "ECDSA", namedCurve: algorithm.namedCurve };
    case "Ed25519":
      return { name: "Ed25519" };
    case "EdDSA":
      return { name: algorithm.name };
    default:
      throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
}

// node_modules/jose/dist/browser/runtime/get_sign_verify_key.js
async function getCryptoKey(alg, key, usage) {
  if (usage === "sign") {
    key = await normalize_key_default.normalizePrivateKey(key, alg);
  }
  if (usage === "verify") {
    key = await normalize_key_default.normalizePublicKey(key, alg);
  }
  if (isCryptoKey(key)) {
    checkSigCryptoKey(key, alg, usage);
    return key;
  }
  if (key instanceof Uint8Array) {
    if (!alg.startsWith("HS")) {
      throw new TypeError(invalid_key_input_default(key, ...types));
    }
    return webcrypto_default.subtle.importKey("raw", key, { hash: `SHA-${alg.slice(-3)}`, name: "HMAC" }, false, [usage]);
  }
  throw new TypeError(invalid_key_input_default(key, ...types, "Uint8Array", "JSON Web Key"));
}

// node_modules/jose/dist/browser/runtime/verify.js
var verify = async (alg, key, signature, data) => {
  const cryptoKey = await getCryptoKey(alg, key, "verify");
  check_key_length_default(alg, cryptoKey);
  const algorithm = subtleDsa(alg, cryptoKey.algorithm);
  try {
    return await webcrypto_default.subtle.verify(algorithm, cryptoKey, signature, data);
  } catch {
    return false;
  }
};
var verify_default = verify;

// node_modules/jose/dist/browser/jws/flattened/verify.js
async function flattenedVerify(jws, key, options) {
  if (!isObject2(jws)) {
    throw new JWSInvalid("Flattened JWS must be an object");
  }
  if (jws.protected === void 0 && jws.header === void 0) {
    throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
  }
  if (jws.protected !== void 0 && typeof jws.protected !== "string") {
    throw new JWSInvalid("JWS Protected Header incorrect type");
  }
  if (jws.payload === void 0) {
    throw new JWSInvalid("JWS Payload missing");
  }
  if (typeof jws.signature !== "string") {
    throw new JWSInvalid("JWS Signature missing or incorrect type");
  }
  if (jws.header !== void 0 && !isObject2(jws.header)) {
    throw new JWSInvalid("JWS Unprotected Header incorrect type");
  }
  let parsedProt = {};
  if (jws.protected) {
    try {
      const protectedHeader = decode(jws.protected);
      parsedProt = JSON.parse(decoder.decode(protectedHeader));
    } catch {
      throw new JWSInvalid("JWS Protected Header is invalid");
    }
  }
  if (!is_disjoint_default(parsedProt, jws.header)) {
    throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
  }
  const joseHeader = {
    ...parsedProt,
    ...jws.header
  };
  const extensions = validate_crit_default(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options == null ? void 0 : options.crit, parsedProt, joseHeader);
  let b64 = true;
  if (extensions.has("b64")) {
    b64 = parsedProt.b64;
    if (typeof b64 !== "boolean") {
      throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
    }
  }
  const { alg } = joseHeader;
  if (typeof alg !== "string" || !alg) {
    throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
  }
  const algorithms = options && validate_algorithms_default("algorithms", options.algorithms);
  if (algorithms && !algorithms.has(alg)) {
    throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
  }
  if (b64) {
    if (typeof jws.payload !== "string") {
      throw new JWSInvalid("JWS Payload must be a string");
    }
  } else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) {
    throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
  }
  let resolvedKey = false;
  if (typeof key === "function") {
    key = await key(parsedProt, jws);
    resolvedKey = true;
    checkKeyTypeWithJwk(alg, key, "verify");
    if (isJWK(key)) {
      key = await importJWK(key, alg);
    }
  } else {
    checkKeyTypeWithJwk(alg, key, "verify");
  }
  const data = concat(encoder.encode(jws.protected ?? ""), encoder.encode("."), typeof jws.payload === "string" ? encoder.encode(jws.payload) : jws.payload);
  let signature;
  try {
    signature = decode(jws.signature);
  } catch {
    throw new JWSInvalid("Failed to base64url decode the signature");
  }
  const verified = await verify_default(alg, key, signature, data);
  if (!verified) {
    throw new JWSSignatureVerificationFailed();
  }
  let payload;
  if (b64) {
    try {
      payload = decode(jws.payload);
    } catch {
      throw new JWSInvalid("Failed to base64url decode the payload");
    }
  } else if (typeof jws.payload === "string") {
    payload = encoder.encode(jws.payload);
  } else {
    payload = jws.payload;
  }
  const result = { payload };
  if (jws.protected !== void 0) {
    result.protectedHeader = parsedProt;
  }
  if (jws.header !== void 0) {
    result.unprotectedHeader = jws.header;
  }
  if (resolvedKey) {
    return { ...result, key };
  }
  return result;
}

// node_modules/jose/dist/browser/jws/compact/verify.js
async function compactVerify(jws, key, options) {
  if (jws instanceof Uint8Array) {
    jws = decoder.decode(jws);
  }
  if (typeof jws !== "string") {
    throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
  }
  const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
  if (length !== 3) {
    throw new JWSInvalid("Invalid Compact JWS");
  }
  const verified = await flattenedVerify({ payload, protected: protectedHeader, signature }, key, options);
  const result = { payload: verified.payload, protectedHeader: verified.protectedHeader };
  if (typeof key === "function") {
    return { ...result, key: verified.key };
  }
  return result;
}

// node_modules/jose/dist/browser/lib/epoch.js
var epoch_default = (date) => Math.floor(date.getTime() / 1e3);

// node_modules/jose/dist/browser/lib/secs.js
var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var year = day * 365.25;
var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
var secs_default = (str) => {
  const matched = REGEX.exec(str);
  if (!matched || matched[4] && matched[1]) {
    throw new TypeError("Invalid time period format");
  }
  const value = parseFloat(matched[2]);
  const unit = matched[3].toLowerCase();
  let numericDate;
  switch (unit) {
    case "sec":
    case "secs":
    case "second":
    case "seconds":
    case "s":
      numericDate = Math.round(value);
      break;
    case "minute":
    case "minutes":
    case "min":
    case "mins":
    case "m":
      numericDate = Math.round(value * minute);
      break;
    case "hour":
    case "hours":
    case "hr":
    case "hrs":
    case "h":
      numericDate = Math.round(value * hour);
      break;
    case "day":
    case "days":
    case "d":
      numericDate = Math.round(value * day);
      break;
    case "week":
    case "weeks":
    case "w":
      numericDate = Math.round(value * week);
      break;
    default:
      numericDate = Math.round(value * year);
      break;
  }
  if (matched[1] === "-" || matched[4] === "ago") {
    return -numericDate;
  }
  return numericDate;
};

// node_modules/jose/dist/browser/lib/jwt_claims_set.js
var normalizeTyp = (value) => value.toLowerCase().replace(/^application\//, "");
var checkAudiencePresence = (audPayload, audOption) => {
  if (typeof audPayload === "string") {
    return audOption.includes(audPayload);
  }
  if (Array.isArray(audPayload)) {
    return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
  }
  return false;
};
var jwt_claims_set_default = (protectedHeader, encodedPayload, options = {}) => {
  let payload;
  try {
    payload = JSON.parse(decoder.decode(encodedPayload));
  } catch {
  }
  if (!isObject2(payload)) {
    throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
  }
  const { typ } = options;
  if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
    throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', payload, "typ", "check_failed");
  }
  const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
  const presenceCheck = [...requiredClaims];
  if (maxTokenAge !== void 0)
    presenceCheck.push("iat");
  if (audience !== void 0)
    presenceCheck.push("aud");
  if (subject !== void 0)
    presenceCheck.push("sub");
  if (issuer !== void 0)
    presenceCheck.push("iss");
  for (const claim of new Set(presenceCheck.reverse())) {
    if (!(claim in payload)) {
      throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, "missing");
    }
  }
  if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
    throw new JWTClaimValidationFailed('unexpected "iss" claim value', payload, "iss", "check_failed");
  }
  if (subject && payload.sub !== subject) {
    throw new JWTClaimValidationFailed('unexpected "sub" claim value', payload, "sub", "check_failed");
  }
  if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) {
    throw new JWTClaimValidationFailed('unexpected "aud" claim value', payload, "aud", "check_failed");
  }
  let tolerance;
  switch (typeof options.clockTolerance) {
    case "string":
      tolerance = secs_default(options.clockTolerance);
      break;
    case "number":
      tolerance = options.clockTolerance;
      break;
    case "undefined":
      tolerance = 0;
      break;
    default:
      throw new TypeError("Invalid clockTolerance option type");
  }
  const { currentDate } = options;
  const now = epoch_default(currentDate || /* @__PURE__ */ new Date());
  if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") {
    throw new JWTClaimValidationFailed('"iat" claim must be a number', payload, "iat", "invalid");
  }
  if (payload.nbf !== void 0) {
    if (typeof payload.nbf !== "number") {
      throw new JWTClaimValidationFailed('"nbf" claim must be a number', payload, "nbf", "invalid");
    }
    if (payload.nbf > now + tolerance) {
      throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', payload, "nbf", "check_failed");
    }
  }
  if (payload.exp !== void 0) {
    if (typeof payload.exp !== "number") {
      throw new JWTClaimValidationFailed('"exp" claim must be a number', payload, "exp", "invalid");
    }
    if (payload.exp <= now - tolerance) {
      throw new JWTExpired('"exp" claim timestamp check failed', payload, "exp", "check_failed");
    }
  }
  if (maxTokenAge) {
    const age = now - payload.iat;
    const max = typeof maxTokenAge === "number" ? maxTokenAge : secs_default(maxTokenAge);
    if (age - tolerance > max) {
      throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', payload, "iat", "check_failed");
    }
    if (age < 0 - tolerance) {
      throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', payload, "iat", "check_failed");
    }
  }
  return payload;
};

// node_modules/jose/dist/browser/jwt/verify.js
async function jwtVerify(jwt, key, options) {
  var _a2;
  const verified = await compactVerify(jwt, key, options);
  if (((_a2 = verified.protectedHeader.crit) == null ? void 0 : _a2.includes("b64")) && verified.protectedHeader.b64 === false) {
    throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
  }
  const payload = jwt_claims_set_default(verified.protectedHeader, verified.payload, options);
  const result = { payload, protectedHeader: verified.protectedHeader };
  if (typeof key === "function") {
    return { ...result, key: verified.key };
  }
  return result;
}

// node_modules/jose/dist/browser/jwks/remote.js
var USER_AGENT;
var _a, _b;
if (typeof navigator === "undefined" || !((_b = (_a = navigator.userAgent) == null ? void 0 : _a.startsWith) == null ? void 0 : _b.call(_a, "Mozilla/5.0 "))) {
  const NAME = "jose";
  const VERSION = "v5.10.0";
  USER_AGENT = `${NAME}/${VERSION}`;
}
var jwksCache = Symbol();

// node_modules/jose/dist/browser/util/base64url.js
var base64url_exports2 = {};
__export(base64url_exports2, {
  decode: () => decode2,
  encode: () => encode2
});
var encode2 = encode;
var decode2 = decode;

// node_modules/@shopify/shopify-api/dist/esm/lib/utils/get-hmac-key.mjs
function getHMACKey(key) {
  const arrayBuffer = new Uint8Array(key.length);
  for (let i = 0, keyLen = key.length; i < keyLen; i++) {
    arrayBuffer[i] = key.charCodeAt(i);
  }
  return arrayBuffer;
}

// node_modules/@shopify/shopify-api/dist/esm/lib/session/decode-session-token.mjs
var JWT_PERMITTED_CLOCK_TOLERANCE = 10;
function decodeSessionToken(config2) {
  return async (token, { checkAudience = true } = {}) => {
    let payload;
    try {
      payload = (await jwtVerify(token, getHMACKey(config2.apiSecretKey), {
        algorithms: ["HS256"],
        clockTolerance: JWT_PERMITTED_CLOCK_TOLERANCE
      })).payload;
    } catch (error) {
      throw new InvalidJwtError(`Failed to parse session token '${token}': ${error.message}`);
    }
    if (checkAudience && payload.aud !== config2.apiKey) {
      throw new InvalidJwtError("Session token had invalid API key");
    }
    return payload;
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/session/session-utils.mjs
function getJwtSessionId(config2) {
  return (shop, userId) => {
    return `${sanitizeShop(config2)(shop, true)}_${userId}`;
  };
}
function getOfflineId(config2) {
  return (shop) => {
    return `offline_${sanitizeShop(config2)(shop, true)}`;
  };
}
function getCurrentSessionId(config2) {
  return async function getCurrentSessionId2({ isOnline, ...adapterArgs }) {
    const request2 = await abstractConvertRequest(adapterArgs);
    const log2 = logger(config2);
    if (config2.isEmbeddedApp) {
      log2.debug("App is embedded, looking for session id in JWT payload", {
        isOnline
      });
      const authHeader = request2.headers.Authorization;
      if (authHeader) {
        const matches = (typeof authHeader === "string" ? authHeader : authHeader[0]).match(/^Bearer (.+)$/);
        if (!matches) {
          log2.error("Missing Bearer token in authorization header", { isOnline });
          throw new MissingJwtTokenError("Missing Bearer token in authorization header");
        }
        const jwtPayload = await decodeSessionToken(config2)(matches[1]);
        const shop = jwtPayload.dest.replace(/^https:\/\//, "");
        log2.debug("Found valid JWT payload", { shop, isOnline });
        if (isOnline) {
          return getJwtSessionId(config2)(shop, jwtPayload.sub);
        } else {
          return getOfflineId(config2)(shop);
        }
      } else {
        log2.error("Missing Authorization header review App Bridge configuration", { isOnline });
      }
    } else {
      log2.debug("App is not embedded, looking for session id in cookies", {
        isOnline
      });
      const cookies = new Cookies(request2, {}, {
        keys: [config2.apiSecretKey]
      });
      return cookies.getAndVerify(SESSION_COOKIE_NAME);
    }
    return void 0;
  };
}
function customAppSession(config2) {
  return (shop) => {
    return new Session({
      id: "",
      shop: `${sanitizeShop(config2)(shop, true)}`,
      state: "",
      isOnline: false
    });
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/auth/oauth/create-session.mjs
function createSession({ config: config2, accessTokenResponse, shop, state }) {
  const associatedUser = accessTokenResponse.associated_user;
  const isOnline = Boolean(associatedUser);
  logger(config2).info("Creating new session", { shop, isOnline });
  const getSessionExpiration = (expires_in) => new Date(Date.now() + expires_in * 1e3);
  const getOnlineSessionProperties = (responseBody) => {
    const { access_token, scope, ...rest } = responseBody;
    const sessionId = config2.isEmbeddedApp ? getJwtSessionId(config2)(shop, `${rest.associated_user.id}`) : crypto.randomUUID();
    return {
      id: sessionId,
      onlineAccessInfo: rest,
      expires: getSessionExpiration(rest.expires_in)
    };
  };
  const getOfflineSessionProperties = (responseBody) => {
    const { expires_in } = responseBody;
    return {
      id: getOfflineId(config2)(shop),
      ...expires_in && { expires: getSessionExpiration(expires_in) }
    };
  };
  return new Session({
    shop,
    state,
    isOnline,
    accessToken: accessTokenResponse.access_token,
    scope: accessTokenResponse.scope,
    ...isOnline ? getOnlineSessionProperties(accessTokenResponse) : getOfflineSessionProperties(accessTokenResponse)
  });
}

// node_modules/@shopify/shopify-api/dist/esm/lib/auth/oauth/oauth.mjs
var logForBot = ({ request: request2, log: log2, func }) => {
  log2.debug(`Possible bot request to auth ${func}: `, {
    userAgent: request2.headers["User-Agent"]
  });
};
function begin(config2) {
  return async ({ shop, callbackPath, isOnline, ...adapterArgs }) => {
    throwIfCustomStoreApp(config2.isCustomStoreApp, "Cannot perform OAuth for private apps");
    const log2 = logger(config2);
    log2.info("Beginning OAuth", { shop, isOnline, callbackPath });
    const request2 = await abstractConvertRequest(adapterArgs);
    const response = await abstractConvertIncomingResponse(adapterArgs);
    let userAgent = request2.headers["User-Agent"];
    if (Array.isArray(userAgent)) {
      userAgent = userAgent[0];
    }
    if (isbot(userAgent)) {
      logForBot({ request: request2, log: log2, func: "begin" });
      response.statusCode = 410;
      return abstractConvertResponse(response, adapterArgs);
    }
    const cookies = new Cookies(request2, response, {
      keys: [config2.apiSecretKey],
      secure: true
    });
    const state = nonce();
    await cookies.setAndSign(STATE_COOKIE_NAME, state, {
      expires: new Date(Date.now() + 6e4),
      sameSite: "lax",
      secure: true,
      path: callbackPath
    });
    const scopes = config2.scopes ? config2.scopes.toString() : "";
    const query = {
      client_id: config2.apiKey,
      scope: scopes,
      redirect_uri: `${config2.hostScheme}://${config2.hostName}${callbackPath}`,
      state,
      "grant_options[]": isOnline ? "per-user" : ""
    };
    const processedQuery = new ProcessedQuery();
    processedQuery.putAll(query);
    const cleanShop = sanitizeShop(config2)(shop, true);
    const redirectUrl = `https://${cleanShop}/admin/oauth/authorize${processedQuery.stringify()}`;
    response.statusCode = 302;
    response.statusText = "Found";
    response.headers = {
      ...response.headers,
      ...cookies.response.headers,
      Location: redirectUrl
    };
    log2.debug(`OAuth started, redirecting to ${redirectUrl}`, { shop, isOnline });
    return abstractConvertResponse(response, adapterArgs);
  };
}
function callback(config2) {
  return async function callback2({ ...adapterArgs }) {
    throwIfCustomStoreApp(config2.isCustomStoreApp, "Cannot perform OAuth for private apps");
    const log2 = logger(config2);
    const request2 = await abstractConvertRequest(adapterArgs);
    const query = new URL(request2.url, `${config2.hostScheme}://${config2.hostName}`).searchParams;
    const shop = query.get("shop");
    const response = {};
    let userAgent = request2.headers["User-Agent"];
    if (Array.isArray(userAgent)) {
      userAgent = userAgent[0];
    }
    if (isbot(userAgent)) {
      logForBot({ request: request2, log: log2, func: "callback" });
      throw new BotActivityDetected("Invalid OAuth callback initiated by bot");
    }
    log2.info("Completing OAuth", { shop });
    const cookies = new Cookies(request2, response, {
      keys: [config2.apiSecretKey],
      secure: true
    });
    const stateFromCookie = await cookies.getAndVerify(STATE_COOKIE_NAME);
    cookies.deleteCookie(STATE_COOKIE_NAME);
    if (!stateFromCookie) {
      log2.error("Could not find OAuth cookie", { shop });
      throw new CookieNotFound(`Cannot complete OAuth process. Could not find an OAuth cookie for shop url: ${shop}`);
    }
    const authQuery = Object.fromEntries(query.entries());
    if (!await validQuery({ config: config2, query: authQuery, stateFromCookie })) {
      log2.error("Invalid OAuth callback", { shop, stateFromCookie });
      throw new InvalidOAuthError("Invalid OAuth callback.");
    }
    log2.debug("OAuth request is valid, requesting access token", { shop });
    const body = {
      client_id: config2.apiKey,
      client_secret: config2.apiSecretKey,
      code: query.get("code")
    };
    const cleanShop = sanitizeShop(config2)(query.get("shop"), true);
    const postResponse = await fetchRequestFactory(config2)(`https://${cleanShop}/admin/oauth/access_token`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": DataType.JSON,
        Accept: DataType.JSON
      }
    });
    if (!postResponse.ok) {
      throwFailedRequest(await postResponse.json(), false, postResponse);
    }
    const session = createSession({
      accessTokenResponse: await postResponse.json(),
      shop: cleanShop,
      state: stateFromCookie,
      config: config2
    });
    if (!config2.isEmbeddedApp) {
      await cookies.setAndSign(SESSION_COOKIE_NAME, session.id, {
        expires: session.expires,
        sameSite: "lax",
        secure: true,
        path: "/"
      });
    }
    return {
      headers: await abstractConvertHeaders(cookies.response.headers, adapterArgs),
      session
    };
  };
}
async function validQuery({ config: config2, query, stateFromCookie }) {
  return await validateHmac(config2)(query) && safeCompare(query.state, stateFromCookie);
}
function throwIfCustomStoreApp(isCustomStoreApp, message2) {
  if (isCustomStoreApp) {
    throw new PrivateAppError(message2);
  }
}

// node_modules/@shopify/shopify-api/dist/esm/lib/auth/get-embedded-app-url.mjs
function getEmbeddedAppUrl(config2) {
  return async ({ ...adapterArgs }) => {
    const request2 = await abstractConvertRequest(adapterArgs);
    if (!request2) {
      throw new MissingRequiredArgument("getEmbeddedAppUrl requires a request object argument");
    }
    if (!request2.url) {
      throw new InvalidRequestError("Request does not contain a URL");
    }
    const url = new URL(request2.url, `https://${request2.headers.host}`);
    const host = url.searchParams.get("host");
    if (typeof host !== "string") {
      throw new InvalidRequestError("Request does not contain a host query parameter");
    }
    return buildEmbeddedAppUrl(config2)(host);
  };
}
function buildEmbeddedAppUrl(config2) {
  return (host) => {
    sanitizeHost()(host, true);
    const decodedHost = decodeHost(host);
    return `https://${decodedHost}/apps/${config2.apiKey}`;
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/auth/oauth/token-exchange.mjs
var RequestedTokenType;
(function(RequestedTokenType2) {
  RequestedTokenType2["OnlineAccessToken"] = "urn:shopify:params:oauth:token-type:online-access-token";
  RequestedTokenType2["OfflineAccessToken"] = "urn:shopify:params:oauth:token-type:offline-access-token";
})(RequestedTokenType || (RequestedTokenType = {}));
var TokenExchangeGrantType = "urn:ietf:params:oauth:grant-type:token-exchange";
var IdTokenType = "urn:ietf:params:oauth:token-type:id_token";
function tokenExchange(config2) {
  return async ({ shop, sessionToken, requestedTokenType }) => {
    await decodeSessionToken(config2)(sessionToken);
    const body = {
      client_id: config2.apiKey,
      client_secret: config2.apiSecretKey,
      grant_type: TokenExchangeGrantType,
      subject_token: sessionToken,
      subject_token_type: IdTokenType,
      requested_token_type: requestedTokenType
    };
    const cleanShop = sanitizeShop(config2)(shop, true);
    const postResponse = await fetchRequestFactory(config2)(`https://${cleanShop}/admin/oauth/access_token`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": DataType.JSON,
        Accept: DataType.JSON
      }
    });
    if (!postResponse.ok) {
      throwFailedRequest(await postResponse.json(), false, postResponse);
    }
    return {
      session: createSession({
        accessTokenResponse: await postResponse.json(),
        shop: cleanShop,
        // We need to keep this as an empty string as our template DB schemas have this required
        state: "",
        config: config2
      })
    };
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/auth/oauth/client-credentials.mjs
var ClientCredentialsGrantType = "client_credentials";
function clientCredentials(config2) {
  return async ({ shop }) => {
    const cleanShop = sanitizeShop(config2)(shop, true);
    const requestConfig = {
      method: "POST",
      body: JSON.stringify({
        client_id: config2.apiKey,
        client_secret: config2.apiSecretKey,
        grant_type: ClientCredentialsGrantType
      }),
      headers: {
        "Content-Type": DataType.JSON,
        Accept: DataType.JSON
      }
    };
    const postResponse = await fetchRequestFactory(config2)(`https://${cleanShop}/admin/oauth/access_token`, requestConfig);
    const responseData = await postResponse.json();
    if (!postResponse.ok) {
      throwFailedRequest(responseData, false, postResponse);
    }
    return {
      session: createSession({
        accessTokenResponse: responseData,
        shop: cleanShop,
        // We need to keep this as an empty string as our template DB schemas have this required
        state: "",
        config: config2
      })
    };
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/auth/index.mjs
function shopifyAuth(config2) {
  const shopify = {
    begin: begin(config2),
    callback: callback(config2),
    nonce,
    safeCompare,
    getEmbeddedAppUrl: getEmbeddedAppUrl(config2),
    buildEmbeddedAppUrl: buildEmbeddedAppUrl(config2),
    tokenExchange: tokenExchange(config2),
    clientCredentials: clientCredentials(config2)
  };
  return shopify;
}

// node_modules/@shopify/shopify-api/dist/esm/lib/session/index.mjs
function shopifySession(config2) {
  return {
    customAppSession: customAppSession(config2),
    getCurrentId: getCurrentSessionId(config2),
    getOfflineId: getOfflineId(config2),
    getJwtSessionId: getJwtSessionId(config2),
    decodeSessionToken: decodeSessionToken(config2)
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/utils/version-compatible.mjs
function versionCompatible(config2) {
  return (referenceVersion, currentVersion = config2.apiVersion) => {
    if (currentVersion === ApiVersion.Unstable) {
      return true;
    }
    const numericVersion = (version) => parseInt(version.replace("-", ""), 10);
    const current = numericVersion(currentVersion);
    const reference = numericVersion(referenceVersion);
    return current >= reference;
  };
}
function versionPriorTo(config2) {
  return (referenceVersion, currentVersion = config2.apiVersion) => {
    return !versionCompatible(config2)(referenceVersion, currentVersion);
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/utils/index.mjs
function shopifyUtils(config2) {
  return {
    sanitizeShop: sanitizeShop(config2),
    sanitizeHost: sanitizeHost(),
    validateHmac: validateHmac(config2),
    versionCompatible: versionCompatible(config2),
    versionPriorTo: versionPriorTo(config2),
    shopAdminUrlToLegacyUrl,
    legacyUrlToShopAdminUrl
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/webhooks/types.mjs
var DeliveryMethod;
(function(DeliveryMethod2) {
  DeliveryMethod2["Http"] = "http";
  DeliveryMethod2["EventBridge"] = "eventbridge";
  DeliveryMethod2["PubSub"] = "pubsub";
})(DeliveryMethod || (DeliveryMethod = {}));
var WebhookOperation;
(function(WebhookOperation2) {
  WebhookOperation2["Create"] = "create";
  WebhookOperation2["Update"] = "update";
  WebhookOperation2["Delete"] = "delete";
})(WebhookOperation || (WebhookOperation = {}));
var WebhookValidationErrorReason = {
  ...ValidationErrorReason,
  MissingHeaders: "missing_headers"
};

// node_modules/@shopify/shopify-api/dist/esm/lib/webhooks/registry.mjs
function registry() {
  return {};
}
function topicForStorage(topic) {
  return topic.toUpperCase().replace(/\/|\./g, "_");
}
function addHandlers(config2, webhookRegistry) {
  return function addHandlers2(handlersToAdd) {
    for (const [topic, handlers] of Object.entries(handlersToAdd)) {
      const topicKey = topicForStorage(topic);
      if (Array.isArray(handlers)) {
        for (const handler of handlers) {
          mergeOrAddHandler(config2, webhookRegistry, topicKey, handler);
        }
      } else {
        mergeOrAddHandler(config2, webhookRegistry, topicKey, handlers);
      }
    }
  };
}
function getTopicsAdded(webhookRegistry) {
  return function getTopicsAdded2() {
    return Object.keys(webhookRegistry);
  };
}
function getHandlers(webhookRegistry) {
  return function getHandlers2(topic) {
    return webhookRegistry[topicForStorage(topic)] || [];
  };
}
function handlerIdentifier(config2, handler) {
  const prefix = handler.deliveryMethod;
  switch (handler.deliveryMethod) {
    case DeliveryMethod.Http:
      return `${prefix}_${addHostToCallbackUrl(config2, handler.callbackUrl)}`;
    case DeliveryMethod.EventBridge:
      return `${prefix}_${handler.arn}`;
    case DeliveryMethod.PubSub:
      return `${prefix}_${handler.pubSubProject}:${handler.pubSubTopic}`;
    default:
      throw new InvalidDeliveryMethodError(`Unrecognized delivery method '${handler.deliveryMethod}'`);
  }
}
function addHostToCallbackUrl(config2, callbackUrl) {
  if (callbackUrl.startsWith("/")) {
    return `${config2.hostScheme}://${config2.hostName}${callbackUrl}`;
  } else {
    return callbackUrl;
  }
}
function mergeOrAddHandler(config2, webhookRegistry, topic, handler) {
  var _a2, _b2;
  const log2 = logger(config2);
  (_a2 = handler.includeFields) == null ? void 0 : _a2.sort();
  (_b2 = handler.metafieldNamespaces) == null ? void 0 : _b2.sort();
  if (!(topic in webhookRegistry)) {
    webhookRegistry[topic] = [handler];
    return;
  }
  const identifier = handlerIdentifier(config2, handler);
  for (const index in webhookRegistry[topic]) {
    if (!Object.prototype.hasOwnProperty.call(webhookRegistry[topic], index)) {
      continue;
    }
    const existingHandler = webhookRegistry[topic][index];
    const existingIdentifier = handlerIdentifier(config2, existingHandler);
    if (identifier !== existingIdentifier) {
      continue;
    }
    if (handler.deliveryMethod === DeliveryMethod.Http) {
      log2.info(`Detected multiple handlers for '${topic}', webhooks.process will call them sequentially`);
      break;
    } else {
      throw new InvalidDeliveryMethodError(`Can only add multiple handlers for a topic when deliveryMethod is Http. Please be sure that you used addHandler method once after creating ShopifyApi instance in your app.  Invalid handler: ${JSON.stringify(handler)}`);
    }
  }
  webhookRegistry[topic].push(handler);
}

// node_modules/@shopify/shopify-api/dist/esm/lib/webhooks/query-template.mjs
function queryTemplate(template, params) {
  let query = template;
  Object.entries(params).forEach(([key, value]) => {
    query = query.replace(`{{${key}}}`, value);
  });
  return query;
}

// node_modules/@shopify/shopify-api/dist/esm/lib/webhooks/register.mjs
function register(config2, webhookRegistry) {
  return async function register2({ session }) {
    const log2 = logger(config2);
    log2.info("Registering webhooks", { shop: session.shop });
    const registerReturn = Object.keys(webhookRegistry).reduce((acc, topic) => {
      acc[topic] = [];
      return acc;
    }, {});
    const existingHandlers = await getExistingHandlers(config2, session);
    log2.debug(`Existing topics: [${Object.keys(existingHandlers).join(", ")}]`, { shop: session.shop });
    for (const topic in webhookRegistry) {
      if (!Object.prototype.hasOwnProperty.call(webhookRegistry, topic)) {
        continue;
      }
      if (privacyTopics.includes(topic)) {
        continue;
      }
      registerReturn[topic] = await registerTopic({
        config: config2,
        session,
        topic,
        existingHandlers: existingHandlers[topic] || [],
        handlers: getHandlers(webhookRegistry)(topic)
      });
      delete existingHandlers[topic];
    }
    for (const topic in existingHandlers) {
      if (!Object.prototype.hasOwnProperty.call(existingHandlers, topic)) {
        continue;
      }
      const GraphqlClient2 = graphqlClientClass({ config: config2 });
      const client = new GraphqlClient2({ session });
      registerReturn[topic] = await runMutations({
        config: config2,
        client,
        topic,
        handlers: existingHandlers[topic],
        operation: WebhookOperation.Delete
      });
    }
    return registerReturn;
  };
}
async function getExistingHandlers(config2, session) {
  var _a2, _b2, _c, _d, _e, _f;
  const GraphqlClient2 = graphqlClientClass({ config: config2 });
  const client = new GraphqlClient2({ session });
  const existingHandlers = {};
  let hasNextPage;
  let endCursor = null;
  do {
    const query = buildCheckQuery(endCursor);
    const response = await client.request(query);
    (_b2 = (_a2 = response.data) == null ? void 0 : _a2.webhookSubscriptions) == null ? void 0 : _b2.edges.forEach((edge) => {
      const handler = buildHandlerFromNode(edge);
      if (!existingHandlers[edge.node.topic]) {
        existingHandlers[edge.node.topic] = [];
      }
      existingHandlers[edge.node.topic].push(handler);
    });
    endCursor = (_d = (_c = response.data) == null ? void 0 : _c.webhookSubscriptions) == null ? void 0 : _d.pageInfo.endCursor;
    hasNextPage = (_f = (_e = response.data) == null ? void 0 : _e.webhookSubscriptions) == null ? void 0 : _f.pageInfo.hasNextPage;
  } while (hasNextPage);
  return existingHandlers;
}
function buildCheckQuery(endCursor) {
  return queryTemplate(TEMPLATE_GET_HANDLERS, {
    END_CURSOR: JSON.stringify(endCursor)
  });
}
function buildHandlerFromNode(edge) {
  var _a2, _b2;
  const endpoint = edge.node.endpoint;
  let handler;
  switch (endpoint.__typename) {
    case "WebhookHttpEndpoint":
      handler = {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: endpoint.callbackUrl,
        // This is a dummy for now because we don't really care about it
        callback: async () => {
        }
      };
      break;
    case "WebhookEventBridgeEndpoint":
      handler = {
        deliveryMethod: DeliveryMethod.EventBridge,
        arn: endpoint.arn
      };
      break;
    case "WebhookPubSubEndpoint":
      handler = {
        deliveryMethod: DeliveryMethod.PubSub,
        pubSubProject: endpoint.pubSubProject,
        pubSubTopic: endpoint.pubSubTopic
      };
      break;
  }
  handler.id = edge.node.id;
  handler.includeFields = edge.node.includeFields;
  handler.metafieldNamespaces = edge.node.metafieldNamespaces;
  (_a2 = handler.includeFields) == null ? void 0 : _a2.sort();
  (_b2 = handler.metafieldNamespaces) == null ? void 0 : _b2.sort();
  return handler;
}
async function registerTopic({ config: config2, session, topic, existingHandlers, handlers }) {
  let registerResults = [];
  const { toCreate, toUpdate, toDelete } = categorizeHandlers(config2, existingHandlers, handlers);
  const GraphqlClient2 = graphqlClientClass({ config: config2 });
  const client = new GraphqlClient2({ session });
  let operation = WebhookOperation.Create;
  registerResults = registerResults.concat(await runMutations({ config: config2, client, topic, operation, handlers: toCreate }));
  operation = WebhookOperation.Update;
  registerResults = registerResults.concat(await runMutations({ config: config2, client, topic, operation, handlers: toUpdate }));
  operation = WebhookOperation.Delete;
  registerResults = registerResults.concat(await runMutations({ config: config2, client, topic, operation, handlers: toDelete }));
  return registerResults;
}
function categorizeHandlers(config2, existingHandlers, handlers) {
  const handlersByKey = handlers.reduce((acc, value) => {
    acc[handlerIdentifier(config2, value)] = value;
    return acc;
  }, {});
  const existingHandlersByKey = existingHandlers.reduce((acc, value) => {
    acc[handlerIdentifier(config2, value)] = value;
    return acc;
  }, {});
  const toCreate = { ...handlersByKey };
  const toUpdate = {};
  const toDelete = {};
  for (const existingKey in existingHandlersByKey) {
    if (!Object.prototype.hasOwnProperty.call(existingHandlersByKey, existingKey)) {
      continue;
    }
    const existingHandler = existingHandlersByKey[existingKey];
    const handler = handlersByKey[existingKey];
    if (existingKey in handlersByKey) {
      delete toCreate[existingKey];
      if (!areHandlerFieldsEqual(existingHandler, handler)) {
        toUpdate[existingKey] = handler;
        toUpdate[existingKey].id = existingHandler.id;
      }
    } else {
      toDelete[existingKey] = existingHandler;
    }
  }
  return {
    toCreate: Object.values(toCreate),
    toUpdate: Object.values(toUpdate),
    toDelete: Object.values(toDelete)
  };
}
function areHandlerFieldsEqual(arr1, arr2) {
  const includeFieldsEqual = arraysEqual(arr1.includeFields || [], arr2.includeFields || []);
  const metafieldNamespacesEqual = arraysEqual(arr1.metafieldNamespaces || [], arr2.metafieldNamespaces || []);
  return includeFieldsEqual && metafieldNamespacesEqual;
}
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
async function runMutations({ config: config2, client, topic, handlers, operation }) {
  const registerResults = [];
  for (const handler of handlers) {
    registerResults.push(await runMutation({ config: config2, client, topic, handler, operation }));
  }
  return registerResults;
}
async function runMutation({ config: config2, client, topic, handler, operation }) {
  let registerResult;
  logger(config2).debug(`Running webhook mutation`, { topic, operation });
  try {
    const query = buildMutation(config2, topic, handler, operation);
    const result = await client.request(query);
    registerResult = {
      deliveryMethod: handler.deliveryMethod,
      success: isSuccess(result, handler, operation),
      result,
      operation
    };
  } catch (error) {
    if (error instanceof InvalidDeliveryMethodError) {
      registerResult = {
        deliveryMethod: handler.deliveryMethod,
        success: false,
        result: { message: error.message },
        operation
      };
    } else {
      throw error;
    }
  }
  return registerResult;
}
function buildMutation(config2, topic, handler, operation) {
  const params = {};
  let identifier;
  if (handler.id) {
    identifier = `id: "${handler.id}"`;
  } else {
    identifier = `topic: ${topic}`;
  }
  const mutationArguments = {
    MUTATION_NAME: getMutationName(handler, operation),
    IDENTIFIER: identifier,
    MUTATION_PARAMS: ""
  };
  if (operation !== WebhookOperation.Delete) {
    switch (handler.deliveryMethod) {
      case DeliveryMethod.Http:
        params.callbackUrl = `"${addHostToCallbackUrl(config2, handler.callbackUrl)}"`;
        break;
      case DeliveryMethod.EventBridge:
        params.arn = `"${handler.arn}"`;
        break;
      case DeliveryMethod.PubSub:
        params.pubSubProject = `"${handler.pubSubProject}"`;
        params.pubSubTopic = `"${handler.pubSubTopic}"`;
        break;
      default:
        throw new InvalidDeliveryMethodError(`Unrecognized delivery method '${handler.deliveryMethod}'`);
    }
    if (handler.includeFields) {
      params.includeFields = JSON.stringify(handler.includeFields);
    }
    if (handler.metafieldNamespaces) {
      params.metafieldNamespaces = JSON.stringify(handler.metafieldNamespaces);
    }
    if (handler.subTopic) {
      const subTopicString = `subTopic: "${handler.subTopic}",`;
      mutationArguments.MUTATION_PARAMS = subTopicString;
    }
    const paramsString = Object.entries(params).map(([key, value]) => `${key}: ${value}`).join(", ");
    mutationArguments.MUTATION_PARAMS += `webhookSubscription: {${paramsString}}`;
  }
  return queryTemplate(TEMPLATE_MUTATION, mutationArguments);
}
function getMutationName(handler, operation) {
  switch (operation) {
    case WebhookOperation.Create:
      return `${getEndpoint(handler)}Create`;
    case WebhookOperation.Update:
      return `${getEndpoint(handler)}Update`;
    case WebhookOperation.Delete:
      return "webhookSubscriptionDelete";
    default:
      throw new ShopifyError(`Unrecognized operation '${operation}'`);
  }
}
function getEndpoint(handler) {
  switch (handler.deliveryMethod) {
    case DeliveryMethod.Http:
      return "webhookSubscription";
    case DeliveryMethod.EventBridge:
      return "eventBridgeWebhookSubscription";
    case DeliveryMethod.PubSub:
      return "pubSubWebhookSubscription";
    default:
      throw new ShopifyError(`Unrecognized delivery method '${handler.deliveryMethod}'`);
  }
}
function isSuccess(result, handler, operation) {
  const mutationName = getMutationName(handler, operation);
  return Boolean(result.data && result.data[mutationName] && result.data[mutationName].userErrors.length === 0);
}
var TEMPLATE_GET_HANDLERS = `query shopifyApiReadWebhookSubscriptions {
  webhookSubscriptions(
    first: 250,
    after: {{END_CURSOR}},
  ) {
    edges {
      node {
        id
        topic
        includeFields
        metafieldNamespaces
        endpoint {
          __typename
          ... on WebhookHttpEndpoint {
            callbackUrl
          }
          ... on WebhookEventBridgeEndpoint {
            arn
          }
          ... on WebhookPubSubEndpoint {
            pubSubProject
            pubSubTopic
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}`;
var TEMPLATE_MUTATION = `
  mutation shopifyApiCreateWebhookSubscription {
    {{MUTATION_NAME}}(
      {{IDENTIFIER}},
      {{MUTATION_PARAMS}}
    ) {
      userErrors {
        field
        message
      }
    }
  }
`;

// node_modules/@shopify/shopify-api/dist/esm/lib/webhooks/validate.mjs
var OPTIONAL_HANDLER_PROPERTIES = {
  subTopic: ShopifyHeader.SubTopic
};
var HANDLER_PROPERTIES = {
  apiVersion: ShopifyHeader.ApiVersion,
  domain: ShopifyHeader.Domain,
  hmac: ShopifyHeader.Hmac,
  topic: ShopifyHeader.Topic,
  webhookId: ShopifyHeader.WebhookId,
  ...OPTIONAL_HANDLER_PROPERTIES
};
function validateFactory(config2) {
  return async function validate2({ rawBody, ...adapterArgs }) {
    const request2 = await abstractConvertRequest(adapterArgs);
    const validHmacResult = await validateHmacFromRequestFactory(config2)({
      type: HmacValidationType.Webhook,
      rawBody,
      ...adapterArgs
    });
    if (!validHmacResult.valid) {
      if (validHmacResult.reason === ValidationErrorReason.InvalidHmac) {
        const log2 = logger(config2);
        await log2.debug("Webhook HMAC validation failed. Please note that events manually triggered from a store's Notifications settings will fail this validation. To test this, please use the CLI or trigger the actual event in a development store.");
      }
      return validHmacResult;
    }
    return checkWebhookHeaders(request2.headers);
  };
}
function checkWebhookHeaders(headers) {
  const missingHeaders = [];
  const entries = Object.entries(HANDLER_PROPERTIES);
  const headerValues = entries.reduce((acc, [property, headerName]) => {
    const headerValue = getHeader(headers, headerName);
    if (headerValue) {
      acc[property] = headerValue;
    } else if (!(property in OPTIONAL_HANDLER_PROPERTIES)) {
      missingHeaders.push(headerName);
    }
    return acc;
  }, {});
  if (missingHeaders.length) {
    return {
      valid: false,
      reason: WebhookValidationErrorReason.MissingHeaders,
      missingHeaders
    };
  } else {
    return {
      valid: true,
      ...headerValues,
      ...headerValues.subTopic ? { subTopic: headerValues.subTopic } : {},
      topic: topicForStorage(headerValues.topic)
    };
  }
}

// node_modules/@shopify/shopify-api/dist/esm/lib/webhooks/process.mjs
var STATUS_TEXT_LOOKUP = {
  [StatusCode.Ok]: "OK",
  [StatusCode.BadRequest]: "Bad Request",
  [StatusCode.Unauthorized]: "Unauthorized",
  [StatusCode.NotFound]: "Not Found",
  [StatusCode.InternalServerError]: "Internal Server Error"
};
function process2(config2, webhookRegistry) {
  return async function process3({ context, rawBody, ...adapterArgs }) {
    const response = {
      statusCode: StatusCode.Ok,
      statusText: STATUS_TEXT_LOOKUP[StatusCode.Ok],
      headers: {}
    };
    await logger(config2).info("Receiving webhook request");
    const webhookCheck = await validateFactory(config2)({
      rawBody,
      ...adapterArgs
    });
    let errorMessage = "Unknown error while handling webhook";
    if (webhookCheck.valid) {
      const handlerResult = await callWebhookHandlers(config2, webhookRegistry, webhookCheck, rawBody, context);
      response.statusCode = handlerResult.statusCode;
      if (!isOK(response)) {
        errorMessage = handlerResult.errorMessage || errorMessage;
      }
    } else {
      const errorResult = await handleInvalidWebhook(config2, webhookCheck);
      response.statusCode = errorResult.statusCode;
      response.statusText = STATUS_TEXT_LOOKUP[response.statusCode];
      errorMessage = errorResult.errorMessage;
    }
    const returnResponse = await abstractConvertResponse(response, adapterArgs);
    if (!isOK(response)) {
      throw new InvalidWebhookError({
        message: errorMessage,
        response: returnResponse
      });
    }
    return Promise.resolve(returnResponse);
  };
}
async function callWebhookHandlers(config2, webhookRegistry, webhookCheck, rawBody, context) {
  const log2 = logger(config2);
  const { hmac: _hmac, valid: _valid, ...loggingContext } = webhookCheck;
  await log2.debug("Webhook request is valid, looking for HTTP handlers to call", loggingContext);
  const handlers = webhookRegistry[webhookCheck.topic] || [];
  const response = { statusCode: StatusCode.Ok };
  let found = false;
  for (const handler of handlers) {
    if (handler.deliveryMethod !== DeliveryMethod.Http) {
      continue;
    }
    if (!handler.callback) {
      response.statusCode = StatusCode.InternalServerError;
      response.errorMessage = "Cannot call webhooks.process with a webhook handler that doesn't have a callback";
      throw new MissingWebhookCallbackError({
        message: response.errorMessage,
        response
      });
    }
    found = true;
    await log2.debug("Found HTTP handler, triggering it", loggingContext);
    try {
      await handler.callback(webhookCheck.topic, webhookCheck.domain, rawBody, webhookCheck.webhookId, webhookCheck.apiVersion, ...(webhookCheck == null ? void 0 : webhookCheck.subTopic) ? webhookCheck.subTopic : "", context);
    } catch (error) {
      response.statusCode = StatusCode.InternalServerError;
      response.errorMessage = error.message;
    }
  }
  if (!found) {
    await log2.debug("No HTTP handlers found", loggingContext);
    response.statusCode = StatusCode.NotFound;
    response.errorMessage = `No HTTP webhooks registered for topic ${webhookCheck.topic}`;
  }
  return response;
}
async function handleInvalidWebhook(config2, webhookCheck) {
  const response = {
    statusCode: StatusCode.InternalServerError,
    errorMessage: "Unknown error while handling webhook"
  };
  switch (webhookCheck.reason) {
    case WebhookValidationErrorReason.MissingHeaders:
      response.statusCode = StatusCode.BadRequest;
      response.errorMessage = `Missing one or more of the required HTTP headers to process webhooks: [${webhookCheck.missingHeaders.join(", ")}]`;
      break;
    case WebhookValidationErrorReason.MissingBody:
      response.statusCode = StatusCode.BadRequest;
      response.errorMessage = "No body was received when processing webhook";
      break;
    case WebhookValidationErrorReason.MissingHmac:
      response.statusCode = StatusCode.BadRequest;
      response.errorMessage = `Missing HMAC header in request`;
      break;
    case WebhookValidationErrorReason.InvalidHmac:
      response.statusCode = StatusCode.Unauthorized;
      response.errorMessage = `Could not validate request HMAC`;
      break;
  }
  await logger(config2).debug(`Webhook request is invalid, returning ${response.statusCode}: ${response.errorMessage}`);
  return response;
}

// node_modules/@shopify/shopify-api/dist/esm/lib/webhooks/index.mjs
function shopifyWebhooks(config2) {
  const webhookRegistry = registry();
  return {
    addHandlers: addHandlers(config2, webhookRegistry),
    getTopicsAdded: getTopicsAdded(webhookRegistry),
    getHandlers: getHandlers(webhookRegistry),
    register: register(config2, webhookRegistry),
    process: process2(config2, webhookRegistry),
    validate: validateFactory(config2)
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/billing/types.mjs
var APP_SUBSCRIPTION_FRAGMENT = `
  fragment AppSubscriptionFragment on AppSubscription {
    id
    name
    test
    status
    trialDays
    createdAt
    currentPeriodEnd
    returnUrl
    lineItems {
      id
      plan {
        pricingDetails {
          ... on AppRecurringPricing {
            price {
              amount
              currencyCode
            }
            interval
            discount {
              durationLimitInIntervals
              remainingDurationInIntervals
              priceAfterDiscount {
                amount
              }
              value {
                ... on AppSubscriptionDiscountAmount {
                  amount {
                    amount
                    currencyCode
                  }
                }
                ... on AppSubscriptionDiscountPercentage {
                  percentage
                }
              }
            }
          }
          ... on AppUsagePricing {
            balanceUsed {
              amount
              currencyCode
            }
            cappedAmount {
              amount
              currencyCode
            }
            terms
          }
        }
      }
    }
  }
`;

// node_modules/@shopify/shopify-api/dist/esm/lib/billing/utils.mjs
function convertMoneyAmount(data) {
  if (!data)
    return data;
  convertAppUsagePricingMoney(data);
  convertAppRecurringPricingMoney(data);
  convertAppDiscountMoney(data);
  return data;
}
function convertAppRecurringPricingMoney(data) {
  var _a2;
  if (!data)
    return;
  if (((_a2 = data.price) == null ? void 0 : _a2.amount) && typeof data.price.amount === "string") {
    data.price.amount = parseFloat(data.price.amount);
  }
}
function convertAppDiscountMoney(data) {
  var _a2, _b2, _c, _d, _e;
  if (!data)
    return;
  if (((_b2 = (_a2 = data.discount) == null ? void 0 : _a2.priceAfterDiscount) == null ? void 0 : _b2.amount) && typeof data.discount.priceAfterDiscount.amount === "string") {
    data.discount.priceAfterDiscount.amount = parseFloat(data.discount.priceAfterDiscount.amount);
  }
  if (((_e = (_d = (_c = data.discount) == null ? void 0 : _c.value) == null ? void 0 : _d.amount) == null ? void 0 : _e.amount) && typeof data.discount.value.amount.amount === "string") {
    data.discount.value.amount.amount = parseFloat(data.discount.value.amount.amount);
  }
}
function convertAppUsagePricingMoney(data) {
  var _a2, _b2;
  if (!data)
    return;
  if (((_a2 = data.balanceUsed) == null ? void 0 : _a2.amount) && typeof data.balanceUsed.amount === "string") {
    data.balanceUsed.amount = parseFloat(data.balanceUsed.amount);
  }
  if (((_b2 = data.cappedAmount) == null ? void 0 : _b2.amount) && typeof data.cappedAmount.amount === "string") {
    data.cappedAmount.amount = parseFloat(data.cappedAmount.amount);
  }
}
function convertLineItems(lineItems) {
  return lineItems.map((item) => {
    var _a2;
    if ((_a2 = item.plan) == null ? void 0 : _a2.pricingDetails) {
      item.plan.pricingDetails = convertMoneyAmount(item.plan.pricingDetails);
    }
    return item;
  });
}

// node_modules/@shopify/shopify-api/dist/esm/lib/billing/check.mjs
function check(config2) {
  return async function check2(params) {
    var _a2, _b2;
    if (!((_a2 = config2.future) == null ? void 0 : _a2.unstable_managedPricingSupport) && !config2.billing) {
      throw new BillingError({
        message: "Attempted to look for purchases without billing configs",
        errorData: []
      });
    }
    const { session, isTest = true, plans } = params;
    const returnObject = params.returnObject ?? false;
    const GraphqlClient2 = graphqlClientClass({ config: config2 });
    const client = new GraphqlClient2({ session });
    const payments = await assessPayments({ client, isTest, plans });
    if (((_b2 = config2.future) == null ? void 0 : _b2.unstable_managedPricingSupport) || returnObject) {
      return payments;
    } else {
      return payments.hasActivePayment;
    }
  };
}
async function assessPayments({ client, isTest, plans }) {
  var _a2;
  const returnValue = {
    hasActivePayment: false,
    oneTimePurchases: [],
    appSubscriptions: []
  };
  let installation;
  let endCursor = null;
  do {
    const currentInstallations = await client.request(HAS_PAYMENTS_QUERY, { variables: { endCursor } });
    installation = (_a2 = currentInstallations.data) == null ? void 0 : _a2.currentAppInstallation;
    installation.activeSubscriptions.forEach((subscription) => {
      if (subscriptionMeetsCriteria({ subscription, isTest, plans })) {
        returnValue.hasActivePayment = true;
        if (subscription.lineItems) {
          subscription.lineItems = convertLineItems(subscription.lineItems);
        }
        returnValue.appSubscriptions.push(subscription);
      }
    });
    installation.oneTimePurchases.edges.forEach(({ node: purchase }) => {
      if (purchaseMeetsCriteria({ purchase, isTest, plans })) {
        returnValue.hasActivePayment = true;
        returnValue.oneTimePurchases.push(purchase);
      }
    });
    endCursor = installation.oneTimePurchases.pageInfo.endCursor;
  } while (installation == null ? void 0 : installation.oneTimePurchases.pageInfo.hasNextPage);
  return returnValue;
}
function subscriptionMeetsCriteria({ subscription, isTest, plans }) {
  return (typeof plans === "undefined" || plans.includes(subscription.name)) && (isTest || !subscription.test);
}
function purchaseMeetsCriteria({ purchase, isTest, plans }) {
  return (typeof plans === "undefined" || plans.includes(purchase.name)) && (isTest || !purchase.test) && purchase.status === "ACTIVE";
}
var HAS_PAYMENTS_QUERY = `
  ${APP_SUBSCRIPTION_FRAGMENT}
  query appSubscription($endCursor: String) {
    currentAppInstallation {
      activeSubscriptions {
        ...AppSubscriptionFragment
      }
      oneTimePurchases(first: 250, sortKey: CREATED_AT, after: $endCursor) {
        edges {
          node {
            id
            name
            test
            status
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

// node_modules/@shopify/shopify-api/dist/esm/lib/billing/request.mjs
var RECURRING_PURCHASE_MUTATION = `
  ${APP_SUBSCRIPTION_FRAGMENT}
  mutation AppSubscriptionCreate(
    $name: String!
    $returnUrl: URL!
    $test: Boolean
    $trialDays: Int
    $replacementBehavior: AppSubscriptionReplacementBehavior
    $lineItems: [AppSubscriptionLineItemInput!]!
  ) {
    appSubscriptionCreate(
      name: $name
      returnUrl: $returnUrl
      test: $test
      trialDays: $trialDays
      replacementBehavior: $replacementBehavior
      lineItems: $lineItems
    ) {
      appSubscription {
        ...AppSubscriptionFragment
      }
      confirmationUrl
      userErrors {
        field
        message
      }
    }
  }
`;
var ONE_TIME_PURCHASE_MUTATION = `
  mutation test(
    $name: String!
    $price: MoneyInput!
    $returnUrl: URL!
    $test: Boolean
  ) {
    appPurchaseOneTimeCreate(
      name: $name
      price: $price
      returnUrl: $returnUrl
      test: $test
    ) {
      appPurchaseOneTime {
        id
        name
        test
      }
      confirmationUrl
      userErrors {
        field
        message
      }
    }
  }
`;
function request(config2) {
  return async function({ session, plan, isTest = true, returnUrl: returnUrlParam, returnObject = false, ...overrides }) {
    var _a2;
    if (!config2.billing || !config2.billing[plan]) {
      throw new BillingError({
        message: `Could not find plan ${plan} in billing settings`,
        errorData: []
      });
    }
    const billingConfig = {
      ...config2.billing[plan]
    };
    const filteredOverrides = Object.fromEntries(Object.entries(overrides).filter(([_key, value]) => value !== void 0));
    const cleanShopName = session.shop.replace(".myshopify.com", "");
    const embeddedAppUrl = buildEmbeddedAppUrl(config2)(hashString(`admin.shopify.com/store/${cleanShopName}`, HashFormat.Base64));
    const appUrl = `${config2.hostScheme}://${config2.hostName}?shop=${session.shop}`;
    const returnUrl = returnUrlParam || (config2.isEmbeddedApp ? embeddedAppUrl : appUrl);
    const GraphqlClient2 = graphqlClientClass({ config: config2 });
    const client = new GraphqlClient2({ session });
    function isLineItemPlan(billingConfig2) {
      return "lineItems" in billingConfig2;
    }
    function isOneTimePlan(billingConfig2) {
      return billingConfig2.interval === BillingInterval.OneTime;
    }
    let data;
    if (isLineItemPlan(billingConfig)) {
      const mergedBillingConfigs = mergeBillingConfigs(billingConfig, filteredOverrides);
      const mutationRecurringResponse = await requestSubscriptionPayment({
        billingConfig: mergedBillingConfigs,
        plan,
        client,
        returnUrl,
        isTest
      });
      data = mutationRecurringResponse.appSubscriptionCreate;
    } else if (isOneTimePlan(billingConfig)) {
      const mutationOneTimeResponse = await requestSinglePayment({
        billingConfig: { ...billingConfig, ...filteredOverrides },
        plan,
        client,
        returnUrl,
        isTest
      });
      data = mutationOneTimeResponse.appPurchaseOneTimeCreate;
    } else {
      throw new BillingError({
        message: `Invalid billing configuration for plan ${plan}. Must be either a one-time plan or a subscription plan with line items.`,
        errorData: []
      });
    }
    if ((_a2 = data.userErrors) == null ? void 0 : _a2.length) {
      throw new BillingError({
        message: "Error while billing the store",
        errorData: data.userErrors
      });
    }
    if (returnObject) {
      return data;
    } else {
      return data.confirmationUrl;
    }
  };
}
async function requestSubscriptionPayment({ billingConfig, plan, client, returnUrl, isTest }) {
  const lineItems = billingConfig.lineItems.map((item) => {
    if (item.interval === BillingInterval.Every30Days || item.interval === BillingInterval.Annual) {
      const appRecurringPricingDetails = {
        interval: item.interval,
        price: {
          amount: item.amount,
          currencyCode: item.currencyCode
        }
      };
      if (item.discount) {
        appRecurringPricingDetails.discount = {
          durationLimitInIntervals: item.discount.durationLimitInIntervals,
          value: {
            amount: item.discount.value.amount,
            percentage: item.discount.value.percentage
          }
        };
      }
      return {
        plan: {
          appRecurringPricingDetails
        }
      };
    } else if (item.interval === BillingInterval.Usage) {
      const appUsagePricingDetails = {
        terms: item.terms,
        cappedAmount: {
          amount: item.amount,
          currencyCode: item.currencyCode
        }
      };
      return {
        plan: {
          appUsagePricingDetails
        }
      };
    } else {
      throw new BillingError({
        message: "Invalid interval provided",
        errorData: [item]
      });
    }
  });
  const mutationResponse = await client.request(RECURRING_PURCHASE_MUTATION, {
    variables: {
      name: plan,
      trialDays: billingConfig.trialDays,
      replacementBehavior: billingConfig.replacementBehavior,
      returnUrl,
      test: isTest,
      lineItems
    }
  });
  if (mutationResponse.errors) {
    throw new BillingError({
      message: "Error while billing the store",
      errorData: mutationResponse.errors
    });
  }
  return mutationResponse.data;
}
async function requestSinglePayment({ billingConfig, plan, client, returnUrl, isTest }) {
  const mutationResponse = await client.request(ONE_TIME_PURCHASE_MUTATION, {
    variables: {
      name: plan,
      returnUrl,
      test: isTest,
      price: {
        amount: billingConfig.amount,
        currencyCode: billingConfig.currencyCode
      }
    }
  });
  if (mutationResponse.errors) {
    throw new BillingError({
      message: "Error while billing the store",
      errorData: mutationResponse.errors
    });
  }
  return mutationResponse.data;
}
function mergeBillingConfigs(billingConfig, overrides) {
  const mergedConfig = { ...billingConfig, ...overrides };
  const mergedLineItems = [];
  if (billingConfig.lineItems && overrides.lineItems) {
    for (const i of billingConfig.lineItems) {
      let found = false;
      for (const j of overrides.lineItems) {
        if (i.interval === j.interval) {
          mergedLineItems.push({ ...i, ...j });
          found = true;
          break;
        }
      }
      if (!found) {
        mergedLineItems.push(i);
      }
    }
    mergedConfig.lineItems = mergedLineItems;
  }
  return mergedConfig;
}

// node_modules/@shopify/shopify-api/dist/esm/lib/billing/cancel.mjs
var CANCEL_MUTATION = `
  ${APP_SUBSCRIPTION_FRAGMENT}
  mutation appSubscriptionCancel($id: ID!, $prorate: Boolean) {
    appSubscriptionCancel(id: $id, prorate: $prorate) {
      appSubscription {
        ...AppSubscriptionFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;
function cancel(config2) {
  return async function(subscriptionInfo) {
    var _a2, _b2, _c, _d, _e, _f, _g;
    const { session, subscriptionId, prorate = true } = subscriptionInfo;
    const GraphqlClient2 = graphqlClientClass({ config: config2 });
    const client = new GraphqlClient2({ session });
    try {
      const response = await client.request(CANCEL_MUTATION, {
        variables: { id: subscriptionId, prorate }
      });
      if ((_b2 = (_a2 = response.data) == null ? void 0 : _a2.appSubscriptionCancel) == null ? void 0 : _b2.userErrors.length) {
        throw new BillingError({
          message: "Error while canceling a subscription",
          errorData: (_d = (_c = response.data) == null ? void 0 : _c.appSubscriptionCancel) == null ? void 0 : _d.userErrors
        });
      }
      return (_f = (_e = response.data) == null ? void 0 : _e.appSubscriptionCancel) == null ? void 0 : _f.appSubscription;
    } catch (error) {
      if (error instanceof GraphqlQueryError) {
        throw new BillingError({
          message: error.message,
          errorData: (_g = error.response) == null ? void 0 : _g.errors
        });
      } else {
        throw error;
      }
    }
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/billing/subscriptions.mjs
var SUBSCRIPTION_QUERY = `
${APP_SUBSCRIPTION_FRAGMENT}
query appSubscription {
  currentAppInstallation {
    activeSubscriptions {
      ...AppSubscriptionFragment
    }
  }
}
`;
function subscriptions(config2) {
  return async function({ session }) {
    var _a2, _b2, _c;
    if (!((_a2 = config2.future) == null ? void 0 : _a2.unstable_managedPricingSupport) && !config2.billing) {
      throw new BillingError({
        message: "Attempted to look for purchases without billing configs",
        errorData: []
      });
    }
    const GraphqlClient2 = graphqlClientClass({ config: config2 });
    const client = new GraphqlClient2({ session });
    const response = await client.request(SUBSCRIPTION_QUERY);
    if (!((_c = (_b2 = response.data) == null ? void 0 : _b2.currentAppInstallation) == null ? void 0 : _c.activeSubscriptions)) {
      return { activeSubscriptions: [] };
    }
    const activeSubscriptions = response.data.currentAppInstallation.activeSubscriptions;
    activeSubscriptions.forEach((subscription) => {
      if (subscription.lineItems) {
        subscription.lineItems = convertLineItems(subscription.lineItems);
      }
    });
    return {
      activeSubscriptions
    };
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/billing/create-usage-record.mjs
var CREATE_USAGE_RECORD_MUTATION = `
mutation appUsageRecordCreate($description: String!, $price: MoneyInput!, $subscriptionLineItemId: ID!) {
  appUsageRecordCreate(description: $description, price: $price, subscriptionLineItemId: $subscriptionLineItemId) {
    userErrors {
      field
      message
    }
    appUsageRecord {
      id
      description
      idempotencyKey
      price {
        amount
        currencyCode
      }
      subscriptionLineItem {
        id
        plan {
          pricingDetails {
            ... on AppUsagePricing {
              balanceUsed {
                amount
                currencyCode
              }
              cappedAmount {
                amount
                currencyCode
              }
              terms
            }
          }
        }
      }
    }
  }
}
`;
function createUsageRecord(config2) {
  return async function createUsageRecord2(usageRecordInfo) {
    var _a2, _b2, _c, _d, _e, _f, _g;
    const { session, subscriptionLineItemId, description, price, idempotencyKey, isTest = true } = usageRecordInfo;
    const GraphqlClient2 = graphqlClientClass({ config: config2 });
    const client = new GraphqlClient2({ session });
    const usageSubscriptionLineItemId = subscriptionLineItemId ? subscriptionLineItemId : await getUsageRecordSubscriptionLineItemId({ client, isTest });
    const variables = {
      description,
      price,
      subscriptionLineItemId: usageSubscriptionLineItemId
    };
    if (idempotencyKey) {
      variables.idempotencyKey = idempotencyKey;
    }
    try {
      const response = await client.request(CREATE_USAGE_RECORD_MUTATION, {
        variables
      });
      if ((_b2 = (_a2 = response.data) == null ? void 0 : _a2.appUsageRecordCreate) == null ? void 0 : _b2.userErrors.length) {
        throw new BillingError({
          message: "Error while creating a usage record",
          errorData: (_d = (_c = response.data) == null ? void 0 : _c.appUsageRecordCreate) == null ? void 0 : _d.userErrors
        });
      }
      const appUsageRecord = (_f = (_e = response.data) == null ? void 0 : _e.appUsageRecordCreate) == null ? void 0 : _f.appUsageRecord;
      convertAppRecurringPricingMoney(appUsageRecord.price);
      convertAppUsagePricingMoney(appUsageRecord.subscriptionLineItem.plan.pricingDetails);
      return appUsageRecord;
    } catch (error) {
      if (error instanceof GraphqlQueryError) {
        throw new BillingError({
          message: error.message,
          errorData: (_g = error.response) == null ? void 0 : _g.errors
        });
      } else {
        throw error;
      }
    }
  };
}
async function getUsageRecordSubscriptionLineItemId({ client, isTest }) {
  const payments = await assessPayments({ client, isTest });
  if (!payments.hasActivePayment) {
    throw new BillingError({
      message: "No active payment found",
      errorData: []
    });
  }
  if (!payments.appSubscriptions.length) {
    throw new BillingError({
      message: "No active subscriptions found",
      errorData: []
    });
  }
  if (payments.appSubscriptions) {
    const usageSubscriptionLineItemId = getUsageLineItemId(payments.appSubscriptions);
    return usageSubscriptionLineItemId;
  }
  throw new BillingError({
    message: "Unable to find active subscription line item",
    errorData: []
  });
}
function getUsageLineItemId(subscriptions2) {
  for (const subscription of subscriptions2) {
    if (subscription.status === "ACTIVE" && subscription.lineItems) {
      for (const lineItem of subscription.lineItems) {
        if ("balanceUsed" in lineItem.plan.pricingDetails) {
          return lineItem.id;
        }
      }
    }
  }
  throw new BillingError({
    message: "No active usage subscription found",
    errorData: []
  });
}

// node_modules/@shopify/shopify-api/dist/esm/lib/billing/update-usage-subscription-capped-amount.mjs
var UPDATE_USAGE_CAPPED_AMOUNT_MUTATION = `
${APP_SUBSCRIPTION_FRAGMENT}
mutation appSubscriptionLineItemUpdate($cappedAmount: MoneyInput!, $id: ID!) {
  appSubscriptionLineItemUpdate(cappedAmount: $cappedAmount, id: $id) {
    userErrors {
      field
      message
    }
    confirmationUrl
    appSubscription {
      ...AppSubscriptionFragment
    }
  }
}
`;
function updateUsageCappedAmount(config2) {
  return async function updateUsageCappedAmount2(params) {
    var _a2, _b2, _c, _d, _e, _f, _g, _h, _i;
    if (!config2.billing) {
      throw new BillingError({
        message: "Attempted to update line item without billing configs",
        errorData: []
      });
    }
    const { session, subscriptionLineItemId, cappedAmount: { amount, currencyCode } } = params;
    const GraphqlClient2 = graphqlClientClass({ config: config2 });
    const client = new GraphqlClient2({ session });
    try {
      const response = await client.request(UPDATE_USAGE_CAPPED_AMOUNT_MUTATION, {
        variables: {
          id: subscriptionLineItemId,
          cappedAmount: {
            amount,
            currencyCode
          }
        }
      });
      if ((_b2 = (_a2 = response.data) == null ? void 0 : _a2.appSubscriptionLineItemUpdate) == null ? void 0 : _b2.userErrors.length) {
        throw new BillingError({
          message: "Error while updating usage subscription capped amount",
          errorData: (_d = (_c = response.data) == null ? void 0 : _c.appSubscriptionLineItemUpdate) == null ? void 0 : _d.userErrors
        });
      }
      const appSubscription = (_f = (_e = response.data) == null ? void 0 : _e.appSubscriptionLineItemUpdate) == null ? void 0 : _f.appSubscription;
      if (appSubscription && appSubscription.lineItems) {
        appSubscription.lineItems = convertLineItems(appSubscription.lineItems);
      }
      return {
        confirmationUrl: (_h = (_g = response.data) == null ? void 0 : _g.appSubscriptionLineItemUpdate) == null ? void 0 : _h.confirmationUrl,
        appSubscription
      };
    } catch (error) {
      if (error instanceof GraphqlQueryError) {
        throw new BillingError({
          message: error.message,
          errorData: (_i = error.response) == null ? void 0 : _i.errors
        });
      }
      throw error;
    }
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/billing/index.mjs
function shopifyBilling(config2) {
  return {
    check: check(config2),
    request: request(config2),
    cancel: cancel(config2),
    subscriptions: subscriptions(config2),
    createUsageRecord: createUsageRecord(config2),
    updateUsageCappedAmount: updateUsageCappedAmount(config2)
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/flow/validate.mjs
function validateFactory2(config2) {
  return async function validate2({ rawBody, ...adapterArgs }) {
    return validateHmacFromRequestFactory(config2)({
      type: HmacValidationType.Flow,
      rawBody,
      ...adapterArgs
    });
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/flow/index.mjs
function shopifyFlow(config2) {
  return {
    validate: validateFactory2(config2)
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/fulfillment-service/validate.mjs
function validateFactory3(config2) {
  return async function validate2({ rawBody, ...adapterArgs }) {
    return validateHmacFromRequestFactory(config2)({
      type: HmacValidationType.FulfillmentService,
      rawBody,
      ...adapterArgs
    });
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/fulfillment-service/index.mjs
function fulfillmentService(config2) {
  return {
    validate: validateFactory3(config2)
  };
}

// node_modules/@shopify/shopify-api/dist/esm/lib/index.mjs
function shopifyApi({ future, restResources, ...config2 }) {
  const libConfig = { ...config2, future, restResources };
  const validatedConfig = validateConfig(libConfig);
  const shopify = {
    config: validatedConfig,
    clients: clientClasses(validatedConfig),
    auth: shopifyAuth(validatedConfig),
    session: shopifySession(validatedConfig),
    utils: shopifyUtils(validatedConfig),
    webhooks: shopifyWebhooks(validatedConfig),
    billing: shopifyBilling(validatedConfig),
    flow: shopifyFlow(validatedConfig),
    fulfillmentService: fulfillmentService(validatedConfig),
    logger: logger(validatedConfig),
    rest: {}
  };
  if (restResources) {
    shopify.rest = loadRestResources({
      resources: restResources,
      config: validatedConfig,
      RestClient: restClientClass({ config: validatedConfig })
    });
  }
  shopify.logger.info(`version ${SHOPIFY_API_LIBRARY_VERSION}, environment ${abstractRuntimeString()}`).catch((err) => console.log(err));
  logDisabledFutureFlags(validatedConfig, shopify.logger);
  return shopify;
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/types.mjs
var AppDistribution;
(function(AppDistribution2) {
  AppDistribution2["AppStore"] = "app_store";
  AppDistribution2["SingleMerchant"] = "single_merchant";
  AppDistribution2["ShopifyAdmin"] = "shopify_admin";
})(AppDistribution || (AppDistribution = {}));
var LoginErrorType;
(function(LoginErrorType2) {
  LoginErrorType2["MissingShop"] = "MISSING_SHOP";
  LoginErrorType2["InvalidShop"] = "INVALID_SHOP";
})(LoginErrorType || (LoginErrorType = {}));

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/boundary/headers.mjs
function headersBoundary(headers) {
  const { parentHeaders, loaderHeaders, actionHeaders, errorHeaders } = headers;
  if (errorHeaders && Array.from(errorHeaders.entries()).length > 0) {
    return errorHeaders;
  }
  return new Headers([
    ...parentHeaders ? Array.from(parentHeaders.entries()) : [],
    ...loaderHeaders ? Array.from(loaderHeaders.entries()) : [],
    ...actionHeaders ? Array.from(actionHeaders.entries()) : []
  ]);
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/boundary/error.mjs
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function errorBoundary(error) {
  if (error.constructor.name === "ErrorResponse" || error.constructor.name === "ErrorResponseImpl") {
    return (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: error.data || "Handling response" } });
  }
  throw error;
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/boundary/index.mjs
var boundary = {
  /**
   * A function that handles errors or thrown responses.
   *
   * @example
   * <caption>Catching errors in a route</caption>
   * ```ts
   * // /app/routes/admin/widgets.ts
   * import { boundary } from "@shopify/shopify-app-react-router/server";
   *
   * export function ErrorBoundary() {
   *   return boundary.error(useRouteError());
   * }
   * ```
   */
  error: errorBoundary,
  /**
   * A function that sets the appropriate document response headers.
   *
   * @example
   * <caption>Catching errors in a route</caption>
   * ```ts
   * // /app/routes/admin/widgets.ts
   * import { boundary } from "@shopify/shopify-app-react-router/server";
   *
   * export const headers = (headersArgs) => {
   *   return boundary.headers(headersArgs);
   * };
   * ```
   */
  headers: headersBoundary
};

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/version.mjs
var SHOPIFY_REACT_ROUTER_LIBRARY_VERSION = "1.0.3";

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/webhooks/register.mjs
function registerWebhooksFactory({ api, logger: logger2 }) {
  return async function registerWebhooks({ session }) {
    return api.webhooks.register({ session }).then((response) => {
      Object.entries(response).forEach(([topic, topicResults]) => {
        topicResults.forEach(({ success, ...rest }) => {
          if (success) {
            logger2.debug("Registered webhook", {
              topic,
              shop: session.shop,
              operation: rest.operation
            });
          } else {
            logger2.error("Failed to register webhook", {
              topic,
              shop: session.shop,
              result: JSON.stringify(rest.result)
            });
          }
        });
      });
      return response;
    }).catch((error) => {
      var _a2, _b2;
      const graphQLErrors = ((_b2 = (_a2 = error.body) == null ? void 0 : _a2.errors) == null ? void 0 : _b2.graphQLErrors) || [];
      const throttled = graphQLErrors.find(({ extensions: { code } }) => code === "THROTTLED");
      if (throttled) {
        logger2.error("Failed to register webhooks", {
          shop: session.shop,
          error: JSON.stringify(error)
        });
      } else {
        throw error;
      }
    });
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/const.mjs
var APP_BRIDGE_URL = "https://cdn.shopify.com/shopifycloud/app-bridge.js";
var POLARIS_URL = "https://cdn.shopify.com/shopifycloud/polaris.js";
var CDN_URL = "https://cdn.shopify.com";
var REAUTH_URL_HEADER = "X-Shopify-API-Request-Failure-Reauthorize-Url";
var RETRY_INVALID_SESSION_HEADER = {
  "X-Shopify-Retry-Invalid-Session-Request": "1"
};

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/ensure-cors-headers.mjs
function ensureCORSHeadersFactory(params, request2, corsHeaders = []) {
  const { logger: logger2, config: config2 } = params;
  return function ensureCORSHeaders(response) {
    const origin = request2.headers.get("Origin");
    if (origin && origin !== config2.appUrl) {
      logger2.debug("Request comes from a different origin, adding CORS headers");
      const corsHeadersSet = /* @__PURE__ */ new Set([
        "Authorization",
        "Content-Type",
        ...corsHeaders
      ]);
      response.headers.set("Access-Control-Allow-Origin", "*");
      response.headers.set("Access-Control-Allow-Headers", [...corsHeadersSet].join(", "));
      response.headers.set("Access-Control-Expose-Headers", REAUTH_URL_HEADER);
    }
    return response;
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/redirect-to-bounce-page.mjs
var redirectToBouncePage = (params, url) => {
  const { config: config2 } = params;
  const searchParams = url.searchParams;
  searchParams.delete("id_token");
  searchParams.set("shopify-reload", `${config2.appUrl}${url.pathname}?${searchParams.toString()}`);
  throw redirect(`${config2.auth.patchSessionTokenPath}?${searchParams.toString()}`);
};

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/respond-to-invalid-session-token.mjs
function respondToInvalidSessionToken({ params, request: request2, retryRequest = false }) {
  const { api, logger: logger2, config: config2 } = params;
  const isDocumentRequest = !request2.headers.get("authorization");
  if (isDocumentRequest) {
    return redirectToBouncePage({ config: config2 }, new URL(request2.url));
  }
  throw new Response(void 0, {
    status: 401,
    statusText: "Unauthorized",
    headers: retryRequest ? RETRY_INVALID_SESSION_HEADER : {}
  });
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/get-shop-from-request.mjs
function getShopFromRequest(request2) {
  const url = new URL(request2.url);
  return url.searchParams.get("shop");
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/validate-session-token.mjs
async function validateSessionToken(params, request2, token, { checkAudience = true, retryRequest = true } = {}) {
  const { api, logger: logger2 } = params;
  const shop = getShopFromRequest(request2);
  logger2.debug("Validating session token", { shop });
  try {
    const payload = await api.session.decodeSessionToken(token, {
      checkAudience
    });
    logger2.debug("Session token is valid - validated", {
      shop,
      payload: JSON.stringify(payload)
    });
    return payload;
  } catch (error) {
    logger2.debug(`Failed to validate session token: ${error.message}`, {
      shop
    });
    throw respondToInvalidSessionToken({ params, request: request2, retryRequest });
  }
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/get-session-token-header.mjs
var SESSION_TOKEN_PARAM = "id_token";
function getSessionTokenHeader(request2) {
  var _a2;
  return (_a2 = request2.headers.get("authorization")) == null ? void 0 : _a2.replace("Bearer ", "");
}
function getSessionTokenFromUrlParam(request2) {
  const url = new URL(request2.url);
  return url.searchParams.get(SESSION_TOKEN_PARAM);
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/reject-bot-request.mjs
var SHOPIFY_POS_USER_AGENT = /Shopify POS\//;
var SHOPIFY_MOBILE_USER_AGENT = /Shopify Mobile\//;
var SHOPIFY_USER_AGENTS = [SHOPIFY_POS_USER_AGENT, SHOPIFY_MOBILE_USER_AGENT];
function respondToBotRequest({ logger: logger2 }, request2) {
  const userAgent = request2.headers.get("User-Agent") ?? "";
  if (SHOPIFY_USER_AGENTS.some((agent) => agent.test(userAgent))) {
    logger2.debug("Request is from a Shopify agent, allow");
    return;
  }
  if (isbot(userAgent)) {
    logger2.debug("Request is from a bot, skipping auth");
    throw new Response(void 0, { status: 410, statusText: "Gone" });
  }
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/respond-to-options-request.mjs
function respondToOptionsRequest(params, request2, corsHeaders) {
  if (request2.method === "OPTIONS") {
    const ensureCORSHeaders = ensureCORSHeadersFactory(params, request2, corsHeaders);
    throw ensureCORSHeaders(new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Max-Age": "7200"
      }
    }));
  }
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/invalidate-access-token.mjs
async function invalidateAccessToken(params, session) {
  const { logger: logger2, config: config2 } = params;
  logger2.debug(`Invalidating access token for session - ${session.id}`, {
    shop: session.shop
  });
  session.accessToken = void 0;
  await config2.sessionStorage.storeSession(session);
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/billing/cancel.mjs
function cancelBillingFactory(params, request2, session) {
  return async function cancelBilling(options) {
    const { api, logger: logger2 } = params;
    logger2.debug("Cancelling billing", { shop: session.shop, ...options });
    try {
      return await api.billing.cancel({
        session,
        subscriptionId: options.subscriptionId,
        isTest: options.isTest,
        prorate: options.prorate
      });
    } catch (error) {
      if (error instanceof HttpResponseError && error.response.code === 401) {
        logger2.debug("API token was invalid, responding to invalid session", {
          shop: session.shop
        });
        await invalidateAccessToken(params, session);
        throw respondToInvalidSessionToken({
          params,
          request: request2,
          retryRequest: true
        });
      }
      throw error;
    }
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/billing/require.mjs
function requireBillingFactory(params, request2, session) {
  const { api, logger: logger2 } = params;
  return async function requireBilling(options) {
    const logContext = {
      shop: session.shop,
      plans: options.plans,
      isTest: options.isTest
    };
    logger2.debug("Checking billing for the shop", logContext);
    let data;
    try {
      data = await api.billing.check({
        session,
        plans: options.plans,
        isTest: options.isTest,
        returnObject: true
      });
    } catch (error) {
      if (error instanceof HttpResponseError && error.response.code === 401) {
        logger2.debug("API token was invalid, responding to invalid session", logContext);
        await invalidateAccessToken(params, session);
        throw respondToInvalidSessionToken({
          params,
          request: request2,
          retryRequest: true
        });
      }
      throw error;
    }
    if (!data.hasActivePayment) {
      logger2.debug("Billing check failed", logContext);
      throw await options.onFailure(new Error("Billing check failed"));
    }
    logger2.debug("Billing check succeeded", logContext);
    return data;
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/redirect-with-app-bridge-headers.mjs
function redirectWithAppBridgeHeaders(redirectUri) {
  throw new Response(void 0, {
    status: 401,
    statusText: "Unauthorized",
    headers: getAppBridgeHeaders(redirectUri)
  });
}
function getAppBridgeHeaders(url) {
  return new Headers({ [REAUTH_URL_HEADER]: url });
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/billing/helpers.mjs
function redirectOutOfApp(params, request2, url, shop) {
  const { config: config2, logger: logger2 } = params;
  logger2.debug("Redirecting out of app", { shop, url });
  const requestUrl = new URL(request2.url);
  const isEmbeddedRequest2 = requestUrl.searchParams.get("embedded") === "1";
  const isXhrRequest = request2.headers.get("authorization");
  if (isXhrRequest) {
    throw new Response(void 0, {
      status: 401,
      statusText: "Unauthorized",
      headers: getAppBridgeHeaders(url)
    });
  } else if (isEmbeddedRequest2) {
    const params2 = new URLSearchParams({
      shop,
      host: requestUrl.searchParams.get("host"),
      exitIframe: url
    });
    throw redirect(`${config2.auth.exitIframePath}?${params2.toString()}`);
  } else {
    throw redirect(url);
  }
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/billing/request.mjs
function requestBillingFactory(params, request2, session) {
  return async function requestBilling({ plan, isTest, returnUrl, ...overrides }) {
    const { api, logger: logger2 } = params;
    logger2.info("Requesting billing", {
      shop: session.shop,
      plan,
      isTest,
      returnUrl
    });
    let result;
    try {
      result = await api.billing.request({
        plan,
        session,
        isTest,
        returnUrl,
        returnObject: true,
        ...overrides
      });
    } catch (error) {
      if (error instanceof HttpResponseError && error.response.code === 401) {
        logger2.debug("API token was invalid, responding to invalid session", {
          shop: session.shop
        });
        await invalidateAccessToken(params, session);
        throw respondToInvalidSessionToken({
          params,
          request: request2,
          retryRequest: true
        });
      }
      throw error;
    }
    throw redirectOutOfApp(params, request2, result.confirmationUrl, session.shop);
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/billing/check.mjs
function checkBillingFactory(params, request2, session) {
  return async function checkBilling(options = {}) {
    const { api, logger: logger2 } = params;
    logger2.debug("Checking billing plans", { shop: session.shop, ...options });
    try {
      return await api.billing.check({
        session,
        plans: options.plans,
        isTest: options.isTest,
        returnObject: true
      });
    } catch (error) {
      if (error instanceof HttpResponseError && error.response.code === 401) {
        logger2.debug("API token was invalid, responding to invalid session", {
          shop: session.shop
        });
        await invalidateAccessToken(params, session);
        throw respondToInvalidSessionToken({
          params,
          request: request2,
          retryRequest: true
        });
      }
      throw error;
    }
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/billing/create-usage-record.mjs
function createUsageRecordFactory(params, request2, session) {
  return async function createUsageRecord2(options) {
    const { api, logger: logger2 } = params;
    logger2.debug("Create usage record", { shop: session.shop, ...options });
    try {
      return await api.billing.createUsageRecord({
        ...options,
        session
      });
    } catch (error) {
      if (error instanceof HttpResponseError && error.response.code === 401) {
        logger2.debug("API token was invalid, responding to invalid session", {
          shop: session.shop
        });
        await invalidateAccessToken(params, session);
        throw respondToInvalidSessionToken({
          params,
          request: request2,
          retryRequest: true
        });
      }
      throw error;
    }
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/billing/update-usage-subscription-capped-amount.mjs
function updateUsageCappedAmountFactory(params, request2, session) {
  return async function updateUsageCappedAmount2(options) {
    const { api, logger: logger2 } = params;
    logger2.debug("Updating usage subscription capped amount", {
      shop: session.shop,
      ...options
    });
    let result;
    try {
      result = await api.billing.updateUsageCappedAmount({
        session,
        subscriptionLineItemId: options.subscriptionLineItemId,
        cappedAmount: options.cappedAmount
      });
    } catch (error) {
      if (error instanceof HttpResponseError && error.response.code === 401) {
        logger2.debug("API token was invalid, responding to invalid session", {
          shop: session.shop
        });
        await invalidateAccessToken(params, session);
        throw respondToInvalidSessionToken({
          params,
          request: request2,
          retryRequest: true
        });
      }
      throw error;
    }
    throw redirectOutOfApp(params, request2, result.confirmationUrl, session.shop);
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/clients/admin/graphql.mjs
function graphqlClientFactory({ params, handleClientError, session }) {
  return async function query(operation, options) {
    const client = new params.api.clients.Graphql({
      session,
      apiVersion: options == null ? void 0 : options.apiVersion
    });
    try {
      const apiResponse = await client.request(operation, {
        variables: options == null ? void 0 : options.variables,
        retries: (options == null ? void 0 : options.tries) ? options.tries - 1 : 0,
        headers: options == null ? void 0 : options.headers,
        signal: options == null ? void 0 : options.signal
      });
      return new Response(JSON.stringify(apiResponse));
    } catch (error) {
      if (handleClientError) {
        throw await handleClientError({ error, params, session });
      }
      throw error;
    }
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/clients/admin/factory.mjs
function adminClientFactory({ params, handleClientError, session }) {
  return {
    graphql: graphqlClientFactory({ params, session, handleClientError })
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/create-admin-api-context.mjs
function createAdminApiContext(session, params, handleClientError) {
  return adminClientFactory({
    session,
    params,
    handleClientError
  });
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/redirect-to-shopify-or-app-root.mjs
async function redirectToShopifyOrAppRoot(request2, params, responseHeaders) {
  const { api, config: config2 } = params;
  const url = new URL(request2.url);
  const host = api.utils.sanitizeHost(url.searchParams.get("host"));
  const shop = api.utils.sanitizeShop(url.searchParams.get("shop"));
  let redirectUrl;
  if (config2.distribution === AppDistribution.ShopifyAdmin) {
    redirectUrl = `/?shop=${shop}&host=${encodeURIComponent(host)}`;
  } else {
    redirectUrl = await api.auth.getEmbeddedAppUrl({ rawRequest: request2 });
  }
  throw redirect(redirectUrl, { headers: responseHeaders });
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/ensure-app-is-embedded-if-required.mjs
var ensureAppIsEmbeddedIfRequired = async (params, request2) => {
  const { api, logger: logger2, config: config2 } = params;
  const url = new URL(request2.url);
  const shop = url.searchParams.get("shop");
  if (config2.distribution !== AppDistribution.ShopifyAdmin && url.searchParams.get("embedded") !== "1") {
    logger2.debug("App is not embedded, redirecting to Shopify", { shop });
    await redirectToShopifyOrAppRoot(request2, { api, config: config2 });
  }
};

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/ensure-session-token-search-param-if-required.mjs
var SESSION_TOKEN_PARAM2 = "id_token";
var ensureSessionTokenSearchParamIfRequired = async (params, request2) => {
  const { logger: logger2, config: config2 } = params;
  const url = new URL(request2.url);
  const shop = url.searchParams.get("shop");
  const searchParamSessionToken = url.searchParams.get(SESSION_TOKEN_PARAM2);
  const isEmbedded = url.searchParams.get("embedded") === "1";
  if (config2.distribution !== AppDistribution.ShopifyAdmin && isEmbedded && !searchParamSessionToken) {
    logger2.debug("Missing session token in search params, going to bounce page", { shop });
    redirectToBouncePage(params, url);
  }
};

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/app-bridge-url.mjs
var appBridgeUrlOverride;
function appBridgeUrl() {
  return appBridgeUrlOverride || APP_BRIDGE_URL;
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/add-response-headers.mjs
function addDocumentResponseHeadersFactory(params) {
  const { api, config: config2 } = params;
  return function(request2, headers) {
    const { searchParams } = new URL(request2.url);
    const shop = api.utils.sanitizeShop(searchParams.get("shop"));
    const isEmbeddedApp = config2.distribution !== AppDistribution.ShopifyAdmin;
    addDocumentResponseHeaders(headers, isEmbeddedApp, shop);
  };
}
function addDocumentResponseHeaders(headers, isEmbeddedApp, shop) {
  if (shop) {
    headers.set("Link", `<${CDN_URL}>; rel="preconnect", <${APP_BRIDGE_URL}>; rel="preload"; as="script", <${POLARIS_URL}>; rel="preload"; as="script"`);
  }
  if (isEmbeddedApp) {
    if (shop) {
      headers.set("Content-Security-Policy", `frame-ancestors https://${shop} https://admin.shopify.com https://*.spin.dev https://admin.myshopify.io https://admin.shop.dev;`);
    }
  } else {
    headers.set("Content-Security-Policy", `frame-ancestors 'none';`);
  }
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/validate-redirect-url.mjs
var FILE_URI_MATCH = /\/\/\//;
var INVALID_RELATIVE_URL = /[/\\][/\\]/;
var WHITESPACE_CHARACTER = /\s/;
var VALID_PROTOCOLS = ["https:", "http:"];
function isSafe(domain, redirectUrl, requireSSL = true) {
  if (typeof redirectUrl !== "string") {
    return false;
  }
  if (FILE_URI_MATCH.test(redirectUrl) || WHITESPACE_CHARACTER.test(redirectUrl)) {
    return false;
  }
  let url;
  try {
    url = new URL(redirectUrl, domain);
  } catch (error) {
    return false;
  }
  if (INVALID_RELATIVE_URL.test(url.pathname)) {
    return false;
  }
  if (!VALID_PROTOCOLS.includes(url.protocol)) {
    return false;
  }
  if (requireSSL && url.protocol !== "https:") {
    return false;
  }
  return true;
}
function sanitizeRedirectUrl(domain, redirectUrl, options = {}) {
  if (isSafe(domain, redirectUrl, options.requireSSL)) {
    return new URL(redirectUrl, domain);
  } else if (options.throwOnInvalid === false) {
    return void 0;
  } else {
    throw new ShopifyError("Invalid URL. Refusing to redirect");
  }
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/render-app-bridge.mjs
function renderAppBridge({ config: config2 }, request2, redirectTo) {
  let redirectToScript = "";
  if (redirectTo) {
    const destination = sanitizeRedirectUrl(config2.appUrl, redirectTo.url);
    const target = redirectTo.target ?? "_top";
    redirectToScript = `<script>window.open(${JSON.stringify(destination.toString())}, ${JSON.stringify(target)})<\/script>`;
  }
  const responseHeaders = new Headers({
    "content-type": "text/html;charset=utf-8"
  });
  const isEmbeddedApp = config2.distribution !== AppDistribution.ShopifyAdmin;
  addDocumentResponseHeaders(responseHeaders, isEmbeddedApp, new URL(request2.url).searchParams.get("shop"));
  throw new Response(`
      <script data-api-key="${config2.apiKey}" src="${appBridgeUrl()}"><\/script>
      ${redirectToScript}
    `, { headers: responseHeaders });
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/redirect.mjs
function redirectFactory(params, request2, shop) {
  const { config: config2, logger: logger2 } = params;
  return function redirect$1(url, init) {
    const { searchParams } = new URL(request2.url);
    const { url: parsedUrl, target } = parseURL({
      params,
      url,
      base: config2.appUrl,
      shop,
      init
    });
    logger2.debug("Redirecting", { shop, url: parsedUrl.toString() });
    const isSameOrigin = parsedUrl.origin === config2.appUrl;
    if (isSameOrigin || url.startsWith("/")) {
      searchParams.forEach((value, key) => {
        if (!parsedUrl.searchParams.has(key)) {
          parsedUrl.searchParams.set(key, value);
        }
      });
    }
    if (target === "_self") {
      if (isBounceRequest(request2)) {
        throw renderAppBridge(params, request2, {
          url: parsedUrl.toString(),
          target
        });
      } else {
        return redirect(parsedUrl.toString(), init);
      }
    } else if (isDataRequest(request2)) {
      throw redirectWithAppBridgeHeaders(parsedUrl.toString());
    } else if (isEmbeddedRequest(request2)) {
      throw renderAppBridge(params, request2, {
        url: parsedUrl.toString(),
        target
      });
    }
    return redirect(url, init);
  };
}
function isBounceRequest(request2) {
  return Boolean(getSessionTokenHeader(request2)) && request2.headers.has("X-Shopify-Bounce");
}
function isDataRequest(request2) {
  const isGet = request2.method === "GET";
  const sessionTokenHeader = Boolean(getSessionTokenHeader(request2));
  return sessionTokenHeader && !isBounceRequest(request2) && (!isEmbeddedRequest(request2) || !isGet);
}
function isEmbeddedRequest(request2) {
  const { searchParams } = new URL(request2.url);
  return searchParams.get("embedded") === "1";
}
function parseURL({ params, base, init, shop, url }) {
  let target = typeof init !== "number" && (init == null ? void 0 : init.target) ? init.target : void 0;
  if (isAdminRemotePath(url)) {
    const { config: config2 } = params;
    const adminPath = getAdminRemotePath(url);
    const cleanShopName = shop.replace(".myshopify.com", "");
    if (!target) {
      target = config2.distribution === AppDistribution.ShopifyAdmin ? "_self" : "_parent";
    }
    return {
      url: new URL(`https://admin.shopify.com/store/${cleanShopName}${adminPath}`),
      target
    };
  } else {
    return {
      url: new URL(url, base),
      target: target ?? "_self"
    };
  }
}
var ADMIN_REGEX = /^shopify:\/*admin\//i;
function isAdminRemotePath(url) {
  return ADMIN_REGEX.test(url);
}
function getAdminRemotePath(url) {
  const parsedUrl = removeRestrictedParams(new URL(url)).href;
  return parsedUrl.replace(ADMIN_REGEX, "/");
}
var embeddedFrameParamsToRemove = [
  "hmac",
  "locale",
  "protocol",
  "session",
  "id_token",
  "shop",
  "timestamp",
  "host",
  "embedded",
  // sent when clicking rel="home" nav item
  "appLoadId"
];
function removeRestrictedParams(url) {
  const newUrl = new URL(url);
  embeddedFrameParamsToRemove.forEach((param) => newUrl.searchParams.delete(param));
  return newUrl;
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/validate-shop-and-host-params.mjs
function validateShopAndHostParams(params, request2) {
  const { api, config: config2, logger: logger2 } = params;
  if (config2.distribution !== AppDistribution.ShopifyAdmin) {
    const url = new URL(request2.url);
    const shop = api.utils.sanitizeShop(url.searchParams.get("shop"));
    if (!shop) {
      logger2.debug("Missing or invalid shop, redirecting to login path", {
        shop
      });
      throw redirectToLoginPath(request2, params);
    }
    const host = api.utils.sanitizeHost(url.searchParams.get("host"));
    if (!host) {
      logger2.debug("Invalid host, redirecting to login path", {
        shop,
        host: url.searchParams.get("host")
      });
      throw redirectToLoginPath(request2, params);
    }
  }
}
function redirectToLoginPath(request2, params) {
  const { config: config2, logger: logger2 } = params;
  const { pathname } = new URL(request2.url);
  if (pathname.endsWith(config2.auth.loginPath)) {
    const message2 = `Detected call to shopify.authenticate.admin() from configured login path ('${config2.auth.loginPath}'), please make sure to call shopify.login() from that route instead.`;
    logger2.debug(message2);
    throw new Response(message2, { status: 500 });
  }
  throw redirect(config2.auth.loginPath);
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/redirect-to-install-page.mjs
async function redirectToInstallPage(params, shop, optionalScopes = []) {
  const installUrl = buildInstallUrl(params, shop, optionalScopes);
  if (params.config.distribution === AppDistribution.ShopifyAdmin) {
    throw redirect(installUrl);
  } else {
    throw redirectWithAppBridgeHeaders(installUrl);
  }
}
function buildInstallUrl(params, shop, optionalScopes = []) {
  const baseInstallUrl = buildBaseInstallUrl(params, shop);
  baseInstallUrl.search = buildParamsInstallUrl(params, optionalScopes).toString();
  return baseInstallUrl.href;
}
function buildBaseInstallUrl({ api }, shop) {
  const cleanShop = api.utils.sanitizeShop(shop, true);
  return new URL(`https://${cleanShop}/admin/oauth/install`);
}
function buildParamsInstallUrl({ config: config2 }, optionalScopes = []) {
  var _a2;
  const optionalScopesParam = optionalScopes && optionalScopes.length > 0 ? { optional_scopes: optionalScopes.join(",") } : void 0;
  const query = {
    client_id: config2.apiKey,
    scope: ((_a2 = config2.scopes) == null ? void 0 : _a2.toString()) || "",
    ...optionalScopesParam
  };
  return new URLSearchParams(query);
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/scope/client/fetch-scopes-details.mjs
var FETCH_SCOPES_DETAIL_QUERY = `#graphql
query FetchAccessScopes{
  app {
    requestedAccessScopes {
      handle
    }
    optionalAccessScopes {
      handle
    }
    installation {
      accessScopes {
        handle
      }
    }
  }
}`;
async function fetchScopeDetail(admin) {
  const fetchScopeDetailResult = await admin.graphql(FETCH_SCOPES_DETAIL_QUERY);
  const resultContent = await fetchScopeDetailResult.json();
  return resultContent.data;
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/scope/request.mjs
function requestScopesFactory(params, session, admin) {
  return async function requestScopes(scopes) {
    const { logger: logger2 } = params;
    logger2.debug("Requesting optional scopes: ", { shop: session.shop, scopes });
    if (scopes.length === 0)
      return;
    if (await alreadyGranted(scopes, admin))
      return;
    throw await redirectToInstallPage(params, session.shop, scopes);
  };
  async function alreadyGranted(scopes, admin2) {
    const scopesDetail = await fetchScopeDetail(admin2);
    const grantedScopes = scopesDetail.app.installation.accessScopes.map((scope) => scope.handle);
    return new AuthScopes(grantedScopes).has(scopes);
  }
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/scope/query.mjs
function queryScopesFactory(params, session, admin) {
  return async function queryScopes() {
    const { logger: logger2 } = params;
    logger2.debug("Querying scopes details: ", {
      shop: session.shop
    });
    const scopesDetail = await fetchScopeDetail(admin);
    return mapFetchScopeDetail(scopesDetail);
  };
}
function mapFetchScopeDetail(scopesDetailResponse) {
  const appInformation = scopesDetailResponse.app;
  const granted = new AuthScopes(appInformation.installation.accessScopes.map((scope) => scope.handle)).toArray(true);
  const required = new AuthScopes(appInformation.requestedAccessScopes.map((scope) => scope.handle)).toArray(true);
  const optional = new AuthScopes(appInformation.optionalAccessScopes.map((scope) => scope.handle)).toArray(true);
  return {
    granted,
    required,
    optional
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/scope/client/revoke-scopes.mjs
var REVOKE_SCOPE_MUTATION = `#graphql
mutation AppRevokeAccessScopes($scopes: [String!]!) {
  appRevokeAccessScopes(scopes: $scopes){
    revoked {
      handle
    }
    userErrors {
      field
      message
    }
  }
}`;
async function revokeScopes(admin, scopes) {
  const revokeScopesResult = await admin.graphql(REVOKE_SCOPE_MUTATION, {
    variables: {
      scopes
    }
  });
  const resultContent = await revokeScopesResult.json();
  return resultContent.data.appRevokeAccessScopes;
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/scope/revoke.mjs
function revokeScopesFactory(params, session, admin) {
  return async function revoke(scopes) {
    var _a2;
    const { logger: logger2 } = params;
    await validateScopes(scopes);
    logger2.debug("Revoke scopes: ", {
      shop: session.shop,
      scopes
    });
    const revokeScopesResult = await revokeScopes(admin, scopes);
    if (((_a2 = revokeScopesResult.userErrors) == null ? void 0 : _a2.length) > 0) {
      logger2.error("Failed to revoke scopes: ", {
        shop: session.shop,
        errors: revokeScopesResult.userErrors
      });
      throw new Response(JSON.stringify(revokeScopesResult.userErrors), {
        status: 422,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    return {
      revoked: revokeScopesResult.revoked.map((scope) => scope.handle)
    };
  };
}
async function validateScopes(scopes) {
  if (!scopes || scopes.length === 0) {
    throw new Response("No scopes provided", { status: 400 });
  }
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/scope/factory.mjs
function scopesApiFactory(params, session, admin) {
  return {
    query: queryScopesFactory(params, session, admin),
    request: requestScopesFactory(params, session, admin),
    revoke: revokeScopesFactory(params, session, admin)
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/authenticate.mjs
function authStrategyFactory({ strategy, ...params }) {
  const { api, logger: logger2, config: config2 } = params;
  async function respondToBouncePageRequest(request2) {
    const url = new URL(request2.url);
    if (url.pathname.endsWith(config2.auth.patchSessionTokenPath)) {
      logger2.debug("Rendering bounce page", {
        shop: getShopFromRequest(request2)
      });
      throw renderAppBridge({ config: config2 }, request2);
    }
  }
  async function respondToExitIframeRequest(request2) {
    const url = new URL(request2.url);
    if (url.pathname.endsWith(config2.auth.exitIframePath)) {
      const destination = url.searchParams.get("exitIframe");
      logger2.debug("Rendering exit iframe page", {
        shop: getShopFromRequest(request2),
        destination
      });
      throw renderAppBridge({ config: config2 }, request2, { url: destination });
    }
  }
  function createContext(request2, session, authStrategy, sessionToken) {
    let context = {
      admin: createAdminApiContext(session, params, authStrategy.handleClientError(request2)),
      billing: {
        require: requireBillingFactory(params, request2, session),
        check: checkBillingFactory(params, request2, session),
        request: requestBillingFactory(params, request2, session),
        cancel: cancelBillingFactory(params, request2, session),
        createUsageRecord: createUsageRecordFactory(params, request2, session),
        updateUsageCappedAmount: updateUsageCappedAmountFactory(params, request2, session)
      },
      session,
      cors: ensureCORSHeadersFactory(params, request2)
    };
    context = addEmbeddedFeatures(context, request2, session, sessionToken);
    context = addScopesFeatures(context);
    return context;
  }
  function addEmbeddedFeatures(context, request2, session, sessionToken) {
    if (config2.distribution === AppDistribution.ShopifyAdmin) {
      return context;
    }
    return {
      ...context,
      sessionToken,
      redirect: redirectFactory(params, request2, session.shop)
    };
  }
  function addScopesFeatures(context) {
    return {
      ...context,
      scopes: scopesApiFactory(params, context.session, context.admin)
    };
  }
  return async function authenticateAdmin(request2) {
    try {
      respondToBotRequest(params, request2);
      respondToOptionsRequest(params, request2);
      await respondToBouncePageRequest(request2);
      await respondToExitIframeRequest(request2);
      if (!getSessionTokenHeader(request2)) {
        validateShopAndHostParams(params, request2);
        await ensureAppIsEmbeddedIfRequired(params, request2);
        await ensureSessionTokenSearchParamIfRequired(params, request2);
      }
      logger2.info("Authenticating admin request", {
        shop: getShopFromRequest(request2)
      });
      const { payload, shop, sessionId, sessionToken } = await getSessionTokenContext(params, request2);
      logger2.debug("Loading session from storage", { shop, sessionId });
      const existingSession = sessionId ? await config2.sessionStorage.loadSession(sessionId) : void 0;
      const session = await strategy.authenticate(request2, {
        session: existingSession,
        sessionToken,
        shop
      });
      return createContext(request2, session, strategy, payload);
    } catch (errorOrResponse) {
      if (errorOrResponse instanceof Response) {
        logger2.debug("Authenticate returned a response", {
          shop: getShopFromRequest(request2)
        });
        ensureCORSHeadersFactory(params, request2)(errorOrResponse);
      }
      throw errorOrResponse;
    }
  };
}
async function getSessionTokenContext(params, request2) {
  const { api, config: config2, logger: logger2 } = params;
  const headerSessionToken = getSessionTokenHeader(request2);
  const searchParamSessionToken = getSessionTokenFromUrlParam(request2);
  const sessionToken = headerSessionToken || searchParamSessionToken;
  logger2.debug("Attempting to authenticate session token", {
    shop: getShopFromRequest(request2),
    sessionToken: JSON.stringify({
      header: headerSessionToken,
      search: searchParamSessionToken
    })
  });
  if (config2.distribution !== AppDistribution.ShopifyAdmin) {
    const payload = await validateSessionToken(params, request2, sessionToken);
    const dest = new URL(payload.dest);
    const shop2 = dest.hostname;
    logger2.debug("Session token is valid - authenticated", { shop: shop2, payload });
    const sessionId2 = config2.useOnlineTokens ? api.session.getJwtSessionId(shop2, payload.sub) : api.session.getOfflineId(shop2);
    return { shop: shop2, payload, sessionId: sessionId2, sessionToken };
  }
  const url = new URL(request2.url);
  const shop = url.searchParams.get("shop");
  const sessionId = await api.session.getCurrentId({
    isOnline: config2.useOnlineTokens,
    rawRequest: request2
  });
  return { shop, sessionId, payload: void 0, sessionToken };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/handle-client-error.mjs
function handleClientErrorFactory({ request: request2, onError }) {
  return async function handleClientError({ error, params, session }) {
    if (error instanceof HttpResponseError !== true) {
      params.logger.debug(`Got a response error from the API: ${error.message}`, { shop: session.shop });
      throw error;
    }
    params.logger.debug(`Got an HTTP response error from the API: ${error.message}`, {
      shop: session.shop,
      code: error.response.code,
      statusText: error.response.statusText,
      body: JSON.stringify(error.response.body)
    });
    if (onError) {
      await onError({ request: request2, session, error });
    }
    throw new Response(JSON.stringify(error.response.body), {
      status: error.response.code,
      headers: {
        "Content-Type": error.response.headers["Content-Type"]
      }
    });
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/create-or-load-offline-session.mjs
async function createOrLoadOfflineSession(shop, { api, config: config2, logger: logger2 }) {
  if (config2.distribution === AppDistribution.ShopifyAdmin) {
    logger2.debug("Creating custom app session from configured access token", {
      shop
    });
    return api.session.customAppSession(shop);
  } else {
    logger2.debug("Loading offline session from session storage", { shop });
    const offlineSessionId = api.session.getOfflineId(shop);
    const session = await config2.sessionStorage.loadSession(offlineSessionId);
    return session;
  }
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/webhooks/authenticate.mjs
function authenticateWebhookFactory(params) {
  const { api, logger: logger2 } = params;
  return async function authenticate(request2) {
    if (request2.method !== "POST") {
      logger2.debug("Received a non-POST request for a webhook. Only POST requests are allowed.", { url: request2.url, method: request2.method });
      throw new Response(void 0, {
        status: 405,
        statusText: "Method not allowed"
      });
    }
    const rawBody = await request2.text();
    const check2 = await api.webhooks.validate({
      rawBody,
      rawRequest: request2
    });
    if (!check2.valid) {
      if (check2.reason === WebhookValidationErrorReason.InvalidHmac) {
        logger2.debug("Webhook HMAC validation failed", check2);
        throw new Response(void 0, {
          status: 401,
          statusText: "Unauthorized"
        });
      } else {
        logger2.debug("Webhook validation failed", check2);
        throw new Response(void 0, { status: 400, statusText: "Bad Request" });
      }
    }
    const session = await createOrLoadOfflineSession(check2.domain, params);
    const webhookContext = {
      apiVersion: check2.apiVersion,
      shop: check2.domain,
      topic: check2.topic,
      webhookId: check2.webhookId,
      payload: JSON.parse(rawBody),
      subTopic: check2.subTopic || void 0,
      session: void 0,
      admin: void 0
    };
    if (!session) {
      return webhookContext;
    }
    const admin = adminClientFactory({
      params,
      session,
      handleClientError: handleClientErrorFactory({ request: request2 })
    });
    return {
      ...webhookContext,
      session,
      admin
    };
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/override-logger.mjs
function overrideLogger(logger2) {
  const baseContext = { package: "shopify-app" };
  const warningFunction = (message2, context = {}) => logger2.warning(message2, { ...baseContext, ...context });
  function deprecated2(warningFunction2) {
    return function(version, message2) {
      if (compare(SHOPIFY_REACT_ROUTER_LIBRARY_VERSION, version, ">=")) {
        throw new FeatureDeprecatedError(`Feature was deprecated in version ${version}`);
      }
      return warningFunction2(`[Deprecated | ${version}] ${message2}`);
    };
  }
  return {
    ...logger2,
    log: (severity, message2, context = {}) => logger2.log(severity, message2, { ...baseContext, ...context }),
    debug: (message2, context = {}) => logger2.debug(message2, { ...baseContext, ...context }),
    info: (message2, context = {}) => logger2.info(message2, { ...baseContext, ...context }),
    warning: warningFunction,
    error: (message2, context = {}) => logger2.error(message2, { ...baseContext, ...context }),
    deprecated: deprecated2(warningFunction)
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/login/login.mjs
function loginFactory(params) {
  const { api, config: config2, logger: logger2 } = params;
  return async function login(request2) {
    const url = new URL(request2.url);
    const shopParam = url.searchParams.get("shop");
    if (request2.method === "GET" && !shopParam) {
      return {};
    }
    const shop = shopParam || (await request2.formData()).get("shop");
    if (!shop) {
      logger2.debug("Missing shop parameter", { shop });
      return { shop: LoginErrorType.MissingShop };
    }
    const shopWithoutProtocol = shop.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const shopWithDomain = (shop == null ? void 0 : shop.indexOf(".")) === -1 ? `${shopWithoutProtocol}.myshopify.com` : shopWithoutProtocol;
    const sanitizedShop = api.utils.sanitizeShop(shopWithDomain);
    if (!sanitizedShop) {
      logger2.debug("Invalid shop parameter", { shop });
      return { shop: LoginErrorType.InvalidShop };
    }
    const authPath = `${config2.appUrl}${config2.auth.path}?shop=${sanitizedShop}`;
    const adminPath = api.utils.legacyUrlToShopAdminUrl(sanitizedShop);
    const installPath = `https://${adminPath}/oauth/install?client_id=${config2.apiKey}`;
    const shouldInstall = config2.distribution !== AppDistribution.ShopifyAdmin;
    const redirectUrl = shouldInstall ? installPath : authPath;
    logger2.info(`Redirecting login request to ${redirectUrl}`, {
      shop: sanitizedShop
    });
    throw redirect(redirectUrl);
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/errors.mjs
var SessionNotFoundError = class extends ShopifyError {
};

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/unauthenticated/admin/factory.mjs
function unauthenticatedAdminContextFactory(params) {
  return async (shop) => {
    const session = await createOrLoadOfflineSession(shop, params);
    if (!session) {
      throw new SessionNotFoundError(`Could not find a session for shop ${shop} when creating unauthenticated admin context`);
    }
    return {
      session,
      admin: adminClientFactory({ params, session })
    };
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/public/extension/authenticate.mjs
function authenticateExtensionFactory(params, requestType) {
  return async function authenticateExtension(request2, options = {}) {
    const { logger: logger2 } = params;
    const corsHeaders = options.corsHeaders ?? [];
    respondToBotRequest(params, request2);
    respondToOptionsRequest(params, request2, corsHeaders);
    const sessionTokenHeader = getSessionTokenHeader(request2);
    logger2.info(`Authenticating ${requestType} request`, {
      shop: getShopFromRequest(request2)
    });
    if (!sessionTokenHeader) {
      logger2.debug("Request did not contain a session token", {
        shop: getShopFromRequest(request2)
      });
      throw new Response(void 0, {
        status: 401,
        statusText: "Unauthorized"
      });
    }
    return {
      sessionToken: await validateSessionToken(params, request2, sessionTokenHeader, { checkAudience: false, retryRequest: false }),
      cors: ensureCORSHeadersFactory(params, request2, corsHeaders)
    };
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/public/checkout/authenticate.mjs
function authenticateCheckoutFactory(params) {
  return authenticateExtensionFactory(params, "checkout");
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/clients/storefront/factory.mjs
function storefrontClientFactory({ params, session }) {
  const { api } = params;
  return {
    graphql: async (query, options = {}) => {
      const client = new api.clients.Storefront({
        session,
        apiVersion: options.apiVersion
      });
      const apiResponse = await client.request(query, {
        variables: options == null ? void 0 : options.variables,
        retries: (options == null ? void 0 : options.tries) ? options.tries - 1 : 0,
        headers: options == null ? void 0 : options.headers
      });
      return new Response(JSON.stringify(apiResponse));
    }
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/public/appProxy/authenticate.mjs
function authenticateAppProxyFactory(params) {
  const { api, config: config2, logger: logger2 } = params;
  return async function authenticate(request2) {
    const url = new URL(request2.url);
    const shop = url.searchParams.get("shop");
    logger2.info("Authenticating app proxy request", { shop });
    if (!await validateAppProxyHmac(params, url)) {
      logger2.info("App proxy request has invalid signature", { shop });
      throw new Response(void 0, {
        status: 400,
        statusText: "Bad Request"
      });
    }
    const sessionId = api.session.getOfflineId(shop);
    const session = await config2.sessionStorage.loadSession(sessionId);
    if (!session) {
      logger2.debug("Could not find offline session, returning empty context", {
        shop,
        ...Object.fromEntries(url.searchParams.entries())
      });
      const context2 = {
        liquid,
        session: void 0,
        admin: void 0,
        storefront: void 0
      };
      return context2;
    }
    const context = {
      liquid,
      session,
      admin: adminClientFactory({ params, session }),
      storefront: storefrontClientFactory({ params, session })
    };
    return context;
  };
}
var liquid = (body, initAndOptions) => {
  const processedBody = processLiquidBody(body);
  if (typeof initAndOptions !== "object") {
    return new Response(processedBody, {
      status: initAndOptions || 200,
      headers: {
        "Content-Type": "application/liquid"
      }
    });
  }
  const { layout, ...responseInit } = initAndOptions || {};
  const responseBody = layout === false ? `{% layout none %} ${processedBody}` : processedBody;
  const headers = new Headers(responseInit.headers);
  headers.set("Content-Type", "application/liquid");
  return new Response(responseBody, {
    ...responseInit,
    headers
  });
};
async function validateAppProxyHmac(params, url) {
  const { api, logger: logger2 } = params;
  try {
    let searchParams = new URLSearchParams(url.search);
    if (!searchParams.get("index")) {
      searchParams.delete("index");
    }
    let isValid = await api.utils.validateHmac(Object.fromEntries(searchParams.entries()), { signator: "appProxy" });
    if (!isValid) {
      const cleanPath = url.pathname.replace(/^\//, "").replace(/\/$/, "").replaceAll("/", ".");
      const data = `routes%2F${cleanPath}`;
      searchParams = new URLSearchParams(`?_data=${data}&${searchParams.toString().replace(/^\?/, "")}`);
      isValid = await api.utils.validateHmac(Object.fromEntries(searchParams.entries()), { signator: "appProxy" });
      if (!isValid) {
        const searchParams2 = new URLSearchParams(`?_data=${data}._index&${url.search.replace(/^\?/, "")}`);
        isValid = await api.utils.validateHmac(Object.fromEntries(searchParams2.entries()), { signator: "appProxy" });
      }
    }
    return isValid;
  } catch (error) {
    const shop = url.searchParams.get("shop");
    logger2.info(error.message, { shop });
    throw new Response(void 0, { status: 400, statusText: "Bad Request" });
  }
}
function processLiquidBody(body) {
  return body.replaceAll(/<(form[^>]+)action="(\/[^"?]+)(\?[^"]+)?">/g, '<$1action="$2/$3">').replaceAll(/<(a[^>]+)href="(\/[^"?]+)(\?[^"]+)?">/g, '<$1href="$2/$3">');
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/public/customer-account/authenticate.mjs
function authenticateCustomerAccountFactory(params) {
  return authenticateExtensionFactory(params, "customer account");
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/public/factory.mjs
function authenticatePublicFactory(params) {
  const authenticateCheckout = authenticateCheckoutFactory(params);
  const authenticateAppProxy = authenticateAppProxyFactory(params);
  const authenticateCustomerAccount = authenticateCustomerAccountFactory(params);
  const context = {
    checkout: authenticateCheckout,
    appProxy: authenticateAppProxy,
    customerAccount: authenticateCustomerAccount
  };
  return context;
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/unauthenticated/storefront/factory.mjs
function unauthenticatedStorefrontContextFactory(params) {
  return async (shop) => {
    const session = await createOrLoadOfflineSession(shop, params);
    if (!session) {
      throw new SessionNotFoundError(`Could not find a session for shop ${shop} when creating unauthenticated storefront context`);
    }
    return {
      session,
      storefront: storefrontClientFactory({ params, session })
    };
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/trigger-after-auth-hook.mjs
async function triggerAfterAuthHook(params, session, request2, authStrategy) {
  const { config: config2, logger: logger2 } = params;
  if (config2.hooks.afterAuth) {
    logger2.info("Running afterAuth hook", { shop: session.shop });
    const admin = createAdminApiContext(session, params, authStrategy.handleClientError(request2));
    await config2.hooks.afterAuth({
      session,
      admin
    });
  }
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/strategies/token-exchange.mjs
var createTokenExchangeStrategy = (params) => {
  const { api, config: config2, logger: logger2 } = params;
  async function exchangeToken({ request: request2, shop, sessionToken, requestedTokenType }) {
    var _a2;
    try {
      return await api.auth.tokenExchange({
        sessionToken,
        shop,
        requestedTokenType
      });
    } catch (error) {
      if (error instanceof InvalidJwtError || error instanceof HttpResponseError && error.response.code === 400 && ((_a2 = error.response.body) == null ? void 0 : _a2.error) === "invalid_subject_token") {
        throw respondToInvalidSessionToken({
          params: { api, config: config2, logger: logger2 },
          request: request2,
          retryRequest: true
        });
      }
      throw new Response(void 0, {
        status: 500,
        statusText: "Internal Server Error"
      });
    }
  }
  async function handleAfterAuthHook(session, request2, sessionToken) {
    await config2.idempotentPromiseHandler.handlePromise({
      promiseFunction: () => {
        return triggerAfterAuthHook(params, session, request2, {
          authenticate,
          handleClientError
        });
      },
      identifier: sessionToken
    });
  }
  async function authenticate(request2, sessionContext) {
    const { shop, session, sessionToken } = sessionContext;
    if (!sessionToken)
      throw new InvalidJwtError();
    if (!session || !session.isActive(void 0)) {
      logger2.info("No valid session found", { shop });
      logger2.info("Requesting offline access token", { shop });
      const { session: offlineSession } = await exchangeToken({
        request: request2,
        sessionToken,
        shop,
        requestedTokenType: RequestedTokenType.OfflineAccessToken
      });
      await config2.sessionStorage.storeSession(offlineSession);
      let newSession = offlineSession;
      if (config2.useOnlineTokens) {
        logger2.info("Requesting online access token", { shop });
        const { session: onlineSession } = await exchangeToken({
          request: request2,
          sessionToken,
          shop,
          requestedTokenType: RequestedTokenType.OnlineAccessToken
        });
        await config2.sessionStorage.storeSession(onlineSession);
        newSession = onlineSession;
      }
      logger2.debug("Request is valid, loaded session from session token", {
        shop: newSession.shop,
        isOnline: newSession.isOnline
      });
      try {
        await handleAfterAuthHook(newSession, request2, sessionToken);
      } catch (errorOrResponse) {
        if (errorOrResponse instanceof Response) {
          throw errorOrResponse;
        }
        throw new Response(void 0, {
          status: 500,
          statusText: "Internal Server Error"
        });
      }
      return newSession;
    }
    return session;
  }
  function handleClientError(request2) {
    return handleClientErrorFactory({
      request: request2,
      onError: async ({ session, error }) => {
        if (error.response.code === 401) {
          logger2.debug("Responding to invalid access token", {
            shop: getShopFromRequest(request2)
          });
          await invalidateAccessToken({ config: config2, logger: logger2 }, session);
          respondToInvalidSessionToken({
            params: { config: config2, api, logger: logger2 },
            request: request2
          });
        }
      }
    });
  }
  return {
    authenticate,
    handleClientError
  };
};

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/strategies/merchant-custom-app.mjs
var createMerchantCustomAuthStrategy = (params) => {
  const { api, logger: logger2 } = params;
  async function authenticate(_request, sessionContext) {
    const { shop } = sessionContext;
    logger2.debug("Building session from configured access token for merchant custom app", { shop });
    const session = api.session.customAppSession(shop);
    return session;
  }
  function handleClientError(request2) {
    return handleClientErrorFactory({
      request: request2,
      onError: async ({ error }) => {
        if (error.response.code === 401) {
          logger2.info("Request failed with 401. Review your API credentials or generate new tokens. https://shopify.dev/docs/apps/build/authentication-authorization/access-token-types/generate-app-access-tokens-admin#rotating-api-credentials-for-admin-created-apps ");
          throw new ShopifyError("Unauthorized: Access token has been revoked.");
        }
      }
    });
  }
  return {
    authenticate,
    handleClientError
  };
};

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/idempotent-promise-handler.mjs
var IDENTIFIER_TTL_MS = 6e4;
var IdempotentPromiseHandler = class {
  constructor() {
    __publicField(this, "identifiers");
    this.identifiers = /* @__PURE__ */ new Map();
  }
  async handlePromise({ promiseFunction, identifier }) {
    try {
      if (this.isPromiseRunnable(identifier)) {
        await promiseFunction();
      }
    } finally {
      this.clearStaleIdentifiers();
    }
    return Promise.resolve();
  }
  isPromiseRunnable(identifier) {
    if (!this.identifiers.has(identifier)) {
      this.identifiers.set(identifier, Date.now());
      return true;
    }
    return false;
  }
  async clearStaleIdentifiers() {
    this.identifiers.forEach((date, identifier, map) => {
      if (Date.now() - date > IDENTIFIER_TTL_MS) {
        map.delete(identifier);
      }
    });
  }
};

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/flow/authenticate.mjs
function authenticateFlowFactory(params) {
  const { api, config: config2, logger: logger2 } = params;
  return async function authenticate(request2) {
    logger2.info("Authenticating flow request");
    if (request2.method !== "POST") {
      logger2.debug("Received a non-POST request for flow. Only POST requests are allowed.", { url: request2.url, method: request2.method });
      throw new Response(void 0, {
        status: 405,
        statusText: "Method not allowed"
      });
    }
    const rawBody = await request2.text();
    const result = await api.flow.validate({
      rawBody,
      rawRequest: request2
    });
    if (!result.valid) {
      logger2.error("Received an invalid flow request", { reason: result.reason });
      throw new Response(void 0, {
        status: 400,
        statusText: "Bad Request"
      });
    }
    const payload = JSON.parse(rawBody);
    logger2.debug("Flow request is valid, looking for an offline session", {
      shop: payload.shopify_domain
    });
    const sessionId = api.session.getOfflineId(payload.shopify_domain);
    const session = await config2.sessionStorage.loadSession(sessionId);
    if (!session) {
      logger2.info("Flow request could not find session", {
        shop: payload.shopify_domain
      });
      throw new Response(void 0, {
        status: 400,
        statusText: "Bad Request"
      });
    }
    logger2.debug("Found a session for the flow request", { shop: session.shop });
    return {
      session,
      payload,
      admin: adminClientFactory({ params, session })
    };
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/fulfillment-service/authenticate.mjs
function authenticateFulfillmentServiceFactory(params) {
  const { api, logger: logger2 } = params;
  return async function authenticate(request2) {
    logger2.info("Authenticating fulfillment service request");
    if (request2.method !== "POST") {
      logger2.debug("Received a non-POST request for fulfillment service. Only POST requests are allowed.", { url: request2.url, method: request2.method });
      throw new Response(void 0, {
        status: 405,
        statusText: "Method not allowed"
      });
    }
    const rawBody = await request2.text();
    const result = await api.fulfillmentService.validate({
      rawBody,
      rawRequest: request2
    });
    if (!result.valid) {
      logger2.error("Received an invalid fulfillment service request", {
        reason: result.reason
      });
      throw new Response(void 0, {
        status: 400,
        statusText: "Bad Request"
      });
    }
    const payload = JSON.parse(rawBody);
    const shop = request2.headers.get(ShopifyHeader.Domain) || "";
    logger2.debug("Fulfillment service request is valid, looking for an offline session", {
      shop
    });
    const session = await createOrLoadOfflineSession(shop, params);
    if (!session) {
      logger2.info("Fulfillment service request could not find session", {
        shop
      });
      throw new Response(void 0, {
        status: 400,
        statusText: "Bad Request"
      });
    }
    logger2.debug("Found a session for the fulfillment service request", {
      shop
    });
    return {
      session,
      payload,
      admin: adminClientFactory({ params, session })
    };
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/pos/authenticate.mjs
function authenticatePOSFactory(params) {
  return authenticateExtensionFactory(params, "pos");
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/shopify-app.mjs
function shopifyApp(appConfig) {
  const api = deriveApi(appConfig);
  const config2 = deriveConfig(appConfig, api.config);
  const logger2 = overrideLogger(api.logger);
  if (appConfig.webhooks) {
    api.webhooks.addHandlers(appConfig.webhooks);
  }
  const params = { api, config: config2, logger: logger2 };
  let strategy;
  if (config2.distribution === AppDistribution.ShopifyAdmin) {
    strategy = createMerchantCustomAuthStrategy(params);
  } else {
    strategy = createTokenExchangeStrategy(params);
  }
  const authStrategy = authStrategyFactory({
    ...params,
    strategy
  });
  const shopify = {
    sessionStorage: config2.sessionStorage,
    addDocumentResponseHeaders: addDocumentResponseHeadersFactory(params),
    registerWebhooks: registerWebhooksFactory(params),
    authenticate: {
      admin: authStrategy,
      flow: authenticateFlowFactory(params),
      fulfillmentService: authenticateFulfillmentServiceFactory(params),
      pos: authenticatePOSFactory(params),
      public: authenticatePublicFactory(params),
      webhook: authenticateWebhookFactory(params)
    },
    unauthenticated: {
      admin: unauthenticatedAdminContextFactory(params),
      storefront: unauthenticatedStorefrontContextFactory(params)
    }
  };
  if (isAppStoreApp(shopify, appConfig) || isSingleMerchantApp(shopify, appConfig)) {
    shopify.login = loginFactory(params);
  }
  return shopify;
}
function isAppStoreApp(_shopify, config2) {
  return config2.distribution === AppDistribution.AppStore;
}
function isSingleMerchantApp(_shopify, config2) {
  return config2.distribution === AppDistribution.SingleMerchant;
}
function deriveApi(appConfig) {
  let appUrl;
  try {
    appUrl = new URL(appConfig.appUrl);
  } catch (error) {
    const message2 = appConfig.appUrl === "" ? `Detected an empty appUrl configuration, please make sure to set the necessary environment variables.
If you're deploying your app, you can find more information at https://shopify.dev/docs/apps/launch/deployment/deploy-web-app/deploy-to-hosting-service#step-4-set-up-environment-variables` : `Invalid appUrl configuration '${appConfig.appUrl}', please provide a valid URL.`;
    throw new ShopifyError(message2);
  }
  if (appUrl.hostname === "localhost" && !appUrl.port && process.env.PORT) {
    appUrl.port = process.env.PORT;
  }
  appConfig.appUrl = appUrl.origin;
  let userAgentPrefix = `Shopify React Router Library v${SHOPIFY_REACT_ROUTER_LIBRARY_VERSION}`;
  if (appConfig.userAgentPrefix) {
    userAgentPrefix = `${appConfig.userAgentPrefix} | ${userAgentPrefix}`;
  }
  return shopifyApi({
    ...appConfig,
    hostName: appUrl.host,
    hostScheme: appUrl.protocol.replace(":", ""),
    userAgentPrefix,
    isEmbeddedApp: true,
    isCustomStoreApp: appConfig.distribution === AppDistribution.ShopifyAdmin,
    billing: appConfig.billing,
    future: {
      unstable_managedPricingSupport: true
    },
    _logDisabledFutureFlags: false
  });
}
function deriveConfig(appConfig, apiConfig) {
  if (!appConfig.sessionStorage && appConfig.distribution !== AppDistribution.ShopifyAdmin) {
    throw new ShopifyError("Please provide a valid session storage. Refer to https://github.com/Shopify/shopify-app-js/blob/main/README.md#session-storage-options for options.");
  }
  const authPathPrefix = appConfig.authPathPrefix || "/auth";
  appConfig.distribution = appConfig.distribution ?? AppDistribution.AppStore;
  return {
    ...appConfig,
    ...apiConfig,
    billing: appConfig.billing,
    scopes: apiConfig.scopes,
    idempotentPromiseHandler: new IdempotentPromiseHandler(),
    canUseLoginForm: appConfig.distribution !== AppDistribution.ShopifyAdmin,
    useOnlineTokens: appConfig.useOnlineTokens ?? false,
    hooks: appConfig.hooks ?? {},
    sessionStorage: appConfig.sessionStorage,
    future: appConfig.future ?? {},
    auth: {
      path: authPathPrefix,
      callbackPath: `${authPathPrefix}/callback`,
      patchSessionTokenPath: `${authPathPrefix}/session-token`,
      exitIframePath: `${authPathPrefix}/exit-iframe`,
      loginPath: `${authPathPrefix}/login`
    },
    distribution: appConfig.distribution
  };
}

// node_modules/@shopify/shopify-app-react-router/dist/esm/server/index.mjs
setAbstractRuntimeString(() => {
  return `React Router`;
});
export {
  ApiVersion,
  AppDistribution,
  BillingInterval,
  BillingReplacementBehavior,
  DeliveryMethod,
  LogSeverity,
  LoginErrorType,
  Session,
  SessionNotFoundError,
  boundary,
  shopifyApp
};
//# sourceMappingURL=@shopify_shopify-app-react-router_server.js.map
