


const loginbtn =document.getElementById('loginbtn');
loginbtn.addEventListener('click',()=>{
    const LEmail = document.getElementById('Email1').value;
    const LPassword = document.getElementById('Password1').value;
    const c={LEmail,LPassword};
    console.log(c);
   
    axios.post('http://localhost:80/login',c)
    .then(res=>{

        console.log(res.data);
        console.log(res.token);
        
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('isPremium',res.data.isPerimium);

       
        
        alert("User Login Successfully");
        if(res){
            window.location.href = './expense.html';
        }
    })
    .catch(err=>{
        console.log(err);
        alert(err.response.data);
    })
  

})
