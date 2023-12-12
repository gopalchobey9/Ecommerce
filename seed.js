const mongoose  = require("mongoose");
const Product = require("./model/Product");

let  products =[
    {name:"charger" ,img:"https://p.turbosquid.com/ts-thumb/XF/B69ZNK/Dr/1previewimage0000/jpg/1609515072/1920x1080/fit_q87/d327c7d10418473c9bfd298f758b2e1784067f09/1previewimage0000.jpg" ,price:11,desc:"lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolorloerwrites vel diam "},
    { name:"earphone",img:"https://p.turbosquid.com/ts-thumb/XF/B69ZNK/Dr/1previewimage0000/jpg/1609515072/1920x1080/fit_q87/d327c7d10418473c9bfd298f758b2e1784067f09/1previewimage0000.jpg" ,price:19,desc:"lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolorloerwrites vel diam "},
    {name:"devendra",img:"https://p.turbosquid.com/ts-thumb/XF/B69ZNK/Dr/1previewimage0000/jpg/1609515072/1920x1080/fit_q87/d327c7d10418473c9bfd298f758b2e1784067f09/1previewimage0000.jpg" ,price:6,desc:"lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolorloerwrites vel diam "},
    {name:"usb ",img:"https://p.turbosquid.com/ts-thumb/XF/B69ZNK/Dr/1previewimage0000/jpg/1609515072/1920x1080/fit_q87/d327c7d10418473c9bfd298f758b2e1784067f09/1previewimage0000.jpg" ,price:15,desc:"lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolorloerwrites vel diam "}
]
async function seedDB() {
    await Product.insertMany(products);
     console.log("Data loaded");
}
module.exports =seedDB;