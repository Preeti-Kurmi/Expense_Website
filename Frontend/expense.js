

const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
let flag = false;
expenseForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById("amount").value);
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const expenseEntry = {
        amount, description, category
    }
    // if (flag) {
    //     axios.put(`http://localhost:7000/update/${selectedExpenseId}`, expenseEntry)
    //         .then(res => {
    //             console.log(res);
    //             fetchdata();
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });

    //     flag = false;
    //     selectedExpenseId = null;
    //     document.querySelector("button[type='submit']").textContent = "Add Expense";
    // } else {
        axios.post('http://localhost:80/add-expense', expenseEntry)
            .then(res => {
                console.log(res);
                fetchdata();
            })
            .catch(err => {
                console.log(err);
            });
    

    expenseForm.reset();
});
// function editclick(data) {

//     document.getElementById("amount").value = data.amount;
//     document.getElementById("description").value = data.expensename;
//     document.getElementById("category").value = data.expensetype;
//     selectedExpenseId = data.id;
//     document.querySelector("button[type='submit']").textContent = "Update Expense";
//     flag = true;


// }

function displayExpense(data) {
    expenseList.innerHTML = "";
    data.forEach((data) => {
        const expenselist = document.createElement('div');
        expenselist.innerHTML = `
            <div class="card mb-2">
                <div class="card-body">
                    <h4 class="card-title">${data.description}</h4>
                    <p>${data.category}</p>
                    <p>${data.amount}</p>
                    <button class="btn btn-danger delete-button" id="${data.id}">Delete Expense</button>
                    <button class="btn btn-danger edit-button" id="${data.id}">Edit</button>
                </div>
            </div>`;

        const deleteButton = expenselist.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            const id = this.getAttribute("id");
            console.log(id);
            deletedata(id);
        });

        // const editButton = expenselist.querySelector(".edit-button");
        // editButton.addEventListener("click", function () {            
        //     const card = this.closest(".card");
        //     card.remove();
        //     editclick(data);

        //     console.log("Edit", id);
        // });

        expenseList.appendChild(expenselist);
    });
}
function fetchdata() {
    axios.get('http://localhost:80/expenses')
        .then(res => {
            displayExpense(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}
function deletedata(id) {
    console.log("Delete", id);
    //displayExpense(id);
    axios.delete(`http://localhost:80/delete/${id}`)
        .then(res => {
            console.log(res);
            fetchdata();
        })
        .catch(err => {
            console.log(err);

        })}


document.addEventListener('DOMContentLoaded', () => {
    fetchdata();
})


