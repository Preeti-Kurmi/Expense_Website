// const btn=document.getElementById('btn');
// btn.addEventListener('click',()=>{
//     const Name=document.getElementById('Name').value;
//     const Email=document.getElementById('Email').value;
//     const Password=document.getElementById('Password').value;
//     const collect={Name,Email,Password};
//     console.log(collect);
//     axios.post('http://localhost/post',collect)
//     .then((res)=>{
//         console.log(res.data);
//     })
//     .catch(err=>{
//         console.log(err);
//     })

// })
const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
    const Name = document.getElementById('Name').value;
    const Email = document.getElementById('Email').value;
    const Password = document.getElementById('Password').value;

    // Create an object to send in the POST request
    const collect = {
        Name: Name, // Make sure the keys match the names you use on the server
        Email: Email,
        Password: Password
    };

    console.log(collect);

    axios.post('http://localhost/post', collect)
        .then((res) => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
});
