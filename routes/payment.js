const router = express.Router();
//We are using request for making an HTTP/HTTPS call to payumoney server
const request = require('request');
router.post('/payment_gateway/payumoney', (req, res) => {
req.body.txnid = //Here pass txnid and it should be different 
//  on every call
req.body.email = req.user.email;
req.body.firstname = req.user.firstname;
//Here save all the details in pay object 
 const pay = req.body;
const hashString = 'YOUR_MERCHANT_KEY' //store in in different file
 + '|' + pay.txnid
 + '|' + pay.amount 
 + '|' + pay.productinfo 
 + '|' + pay.firstname 
 + '|' + pay.email 
 + '|' + '||||||||||'
 + 'YOUR_MERCHANT_SALT' //store in in different file
const sha = new jsSHA('SHA-512', "TEXT");
sha.update(hashString);
//Getting hashed value from sha module
 const hash = sha.getHash("HEX");
 
 //We have to additionally pass merchant key to API
//  so remember to include it.
pay.key = 'YOUR_MERCHANT_KEY' //store in in different file;
 pay.surl = 'PROVIDE SUCCESS URL ROUTE';
 pay.furl = 'PROVIDE FAILRE URL ROUTE';
 pay.hash = hash;
//Making an HTTP/HTTPS call with request
request.post({
 headers: {
 'Accept': 'application/json',
 'Content-Type': 'application/json'
 },
 url: 'https://sandboxsecure.payu.in/_payment', //Testing url
 form: pay
 }, function (error, httpRes, body) {
if (error) 
 res.send(
 {status: false, 
 message:error.toString()
 }
 );
if (httpRes.statusCode === 200) {
 res.send(body);
 } else if (httpRes.statusCode >= 300 && 
 httpRes.statusCode <= 400) {
 res.redirect(httpRes.headers.location.toString());
 }
 })
});