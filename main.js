let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let table = document.getElementById("tbody");
mood = "create";
let r;

function totalprice() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = " ";
    total.style.background = "rgb(215, 115, 32)";
  }
}

// Create product

submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (title.value != "" && price.value != "" && category.value != "") {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataPro.push(newProduct);
        }
      } else {
        dataPro.push(newProduct);
      }
    } else {
      dataPro[r] = newProduct;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
  }

  localStorage.setItem("product", JSON.stringify(dataPro));
  cleardata();
  showproduct();
};

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

// claear Data

function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// Read Product

function showproduct() {
  totalprice();
  let table = "";

  for (let i = 1; i < dataPro.length; i++) {
    table += `
    <tr >
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">Update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
  </tr>
  
  `;
  }
  document.getElementById("tbody").innerHTML = table;
  let deletebtn = document.getElementById("deletebtn");
  if (dataPro.length > 0) {
    deletebtn.style.display = "block";
  } else {
    deletebtn.style.display = "none";
  }
}

showproduct();

// Delete Data

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showproduct();
}

// Delete all

function deleteall() {
  localStorage.clear();
  dataPro.splice(0);
  showproduct();
}

// update date
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  totalprice();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  r = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search

let searchMode = "title";
let search = document.getElementById("search");
function searchfn(id) {
  if (id == "searchbytitle") {
    searchMode = "title";
    search.placeholder = "Search by Title";
  } else {
    searchMode = "category";
    search.placeholder = "Search by Category";
  }
  showproduct();
}

function searchdata(value) {
  console.log(searchdata);
  let table = "";
  if (searchMode == "title") {
    for (let i = 0; i < dataPro.length; i++)
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
    <tr >
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">Update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
  </tr>
  
  `;
      }
  } else {
    for (let i = 0; i < dataPro.length; i++)
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
  <tr >
  <td>${i}</td>
  <td>${dataPro[i].title}</td>
  <td>${dataPro[i].price}</td>
  <td>${dataPro[i].taxes}</td>
  <td>${dataPro[i].ads}</td>
  <td>${dataPro[i].discount}</td>
  <td>${dataPro[i].total}</td>
  <td>${dataPro[i].category}</td>
  <td><button onclick="updateData(${i})" id="update">Update</button></td>
  <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
</tr>

`;
      }
  }
  document.getElementById("tbody").innerHTML = table;
}

console.log(dataPro);
