const request = require('request')



const fetchMyIp = ()=>{
   const argument = process.argv.slice(2).join("") 
   request('https://api.ipify.org?format=json',(error,response,body)=>{

   const ipAdress = JSON.parese(body);

   if (error){
callback(error,null)
return

   }

   if(response.statusCode!== 200){
       const msg = `Status Code ${response.statuscode}when fetching Ip. response: ${body}`;
       callback(Error(msg),null);
       return
   }
   callback(null,ipAdress.ip)
   });


};

modules.export = {fetchMyIp}