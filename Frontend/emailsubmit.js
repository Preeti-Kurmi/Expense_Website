const forget =document.getElementById('forget');
forget.addEventListener('click',function (event) {
    event.preventDefault();
    const email=document.getElementById('email1').value;
    
    console.log(email);
   axios.post('http://localhost:80/forgetpassword',{email})
   .then((res)=>{
    console.log(res.data)
    display(res.data);

   })
   .catch((err)=>{
    console.log(err);
   })
   
});
function display(data){

axios.get(`http://localhost:80/resetpassword/:id`)
.then((res)=>{
    console.log(res.data)
  

   })
   .catch((err)=>{
    console.log(err);
   })
   
}