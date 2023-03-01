//  const fs= require("fs");
// // const read=fs.readFileSync("txt/input.txt","utf-8");
// // const write=`the avocado ${read} in ${Date.now()}`;
// // fs.writeFileSync("txt/input.txt",write);
// // console.log(read);
// /////////////////
// fs.readFile("txt/start.txt","utf-8",(err,data)=>{
//     fs.readFile(`txt/${data}.txt`,"utf-8",(err,data2)=>{
//         fs.readFile("txt/final.txt","utf-8",(err,data3)=>{
//             fs.writeFile("txt/output.txt",`${data2} ${data3}`,"utf-8",(err)=>{
//                 if(err)console.log("error");
//             })
//         })
//         })
// })
////////////////////buildserver/////////////////////
const http= require("http");
const fs= require("fs");
const Url = require('url');
const replaceTemplate=require('./modules/replaceTemplate');
const data=fs.readFileSync("./dev-data/data.json","utf-8");
const dataObject=JSON.parse(data);
const overview=fs.readFileSync("./templates/overview.html","utf-8");
const product=fs.readFileSync("./templates/product.html","utf-8");
const card=fs.readFileSync("./templates/card.html","utf-8");


const server=http.createServer((req,res)=>{
    const url=req.url;
    let {query,pathname}=Url.parse(req.url,true);
    if(pathname=='/'||pathname=='/overview')
    {
        res.writeHead(200,{
            'content-type':'text/html',
        });
        const result=dataObject.map(el=>replaceTemplate(card,el)).join('');
        let resu=overview.replace('{%PRODUCT_CARD%}',result);
        res.end(resu);
    }
    else if(pathname=='/product')
    {
        let prodobj=dataObject[query.id];
        res.writeHead(200,{
            'content-type':'text/html',
        });
        let prodOutput=replaceTemplate(product,prodobj);
        res.end(prodOutput);
    }
    else if(pathname=='/card')
    {
        res.writeHead(200,{
            'content-type':'text/html',
        });
        res.end(card);
    }
    else if(pathname=='/api')
    {
res.writeHead(200,{
    'content-type':'application/json',
});
res.end(data);
    }
    else{
        res.writeHead(404,{
            'content-type':'text/html',
            'my-own-header':"hello"
        })
        res.end("<h1>page not found</h1>");
    }

})

server.listen(8000,'127.0.0.1',()=>{
    console.log("server running");
})
