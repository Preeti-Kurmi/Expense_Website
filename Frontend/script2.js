const loginbtn =document.getElementById('loginbtn');
loginbtn.addEventListener('click',()=>{
    const LEmail = document.getElementById('Email1').value;
    const LPassword = document.getElementById('Password1').value;
    const c={LEmail,LPassword};
    console.log(c);
   
    axios.post('http://localhost:80/login',c)
    .then(res=>{
        console.log(res.data);
    })
    .catch(err=>{
        console.log(err);
    })
  

})
