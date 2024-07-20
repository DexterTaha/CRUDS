let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

function getTotal() {
    let priceValue = parseFloat(price.value) || 0;
    let taxesValue = parseFloat(taxes.value) || 0;
    let adsValue = parseFloat(ads.value) || 0;
    let discountValue = parseFloat(discount.value) || 0;

    let result = priceValue + taxesValue + adsValue - discountValue;
    total.innerHTML = result.toFixed(2); // Fixing to 2 decimal points
    total.style.background = '#040';
}

price.addEventListener('keyup', getTotal);
taxes.addEventListener('keyup', getTotal);
ads.addEventListener('keyup', getTotal);
discount.addEventListener('keyup', getTotal);

let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}

submit.onclick = function () {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
        }
    } else {
        dataPro.push(newPro);
    }
    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
}

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '0.00';
    total.style.background = '#a00d02';
    count.value = '';
    category.value = '';
}

function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})">Update</button></td>
            <td><button onclick="deleteData(${i})">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `;
    } else {
        btnDelete.innerHTML = '';
    }
}

function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll() {
    localStorage.clear();
    dataPro = [];
    showData();
}

showData();
