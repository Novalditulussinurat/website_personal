document.addEventListener("DOMContentLoaded", function() {
    const itemForm = document.getElementById("itemForm");
    const itemListMasuk = document.getElementById("itemListMasuk");
    const itemListKeluar = document.getElementById("itemListKeluar");
    const totalItemsList = document.getElementById("totalItemsList");
    const currentMonthElement = document.getElementById("currentMonth");

    // Tampilkan bulan saat ini
    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'long', year: 'numeric' });
    currentMonthElement.textContent = currentMonth;

    let items = JSON.parse(localStorage.getItem("items")) || [];

    // Fungsi untuk menambahkan item baru
    itemForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const quantity = parseInt(document.getElementById("quantity").value);
        const type = document.getElementById("type").value;
        const date = document.getElementById("date").value;
        const admin = localStorage.getItem("currentAdmin");

        if (!name || !quantity || !date) {
            alert("Mohon isi semua kolom.");
            return;
        }

        const item = { name, quantity, type, date, admin };
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));

        addItemToTable(item);
        calculateMonthlyTotals();
        itemForm.reset();
    });

    // Fungsi untuk menampilkan item di tabel
    function addItemToTable(item) {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.date}</td>
            <td>${item.admin}</td>
            <td><button onclick="deleteItem('${item.date}', '${item.name}', '${item.type}')">Hapus</button></td>
        `;
        if (item.type === "masuk") {
            itemListMasuk.appendChild(tableRow);
        } else {
            itemListKeluar.appendChild(tableRow);
        }
    }

    // Fungsi untuk menghitung total bulanan per produk
    function calculateMonthlyTotals() {
        const totals = {};

        // Filter item berdasarkan bulan saat ini
        const filteredItems = items.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.getMonth() === today.getMonth() && itemDate.getFullYear() === today.getFullYear();
        });

        // Hitung total per produk
        filteredItems.forEach(item => {
            if (!totals[item.name]) {
                totals[item.name] = 0;
            }
            totals[item.name] += item.quantity;
        });

        // Tampilkan hasil perhitungan di tabel
        totalItemsList.innerHTML = "";
        for (const name in totals) {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${name}</td><td>${totals[name]}</td>`;
            totalItemsList.appendChild(row);
        }
    }

    // Fungsi untuk menghapus item dari tabel dan localStorage
    window.deleteItem = function(date, name, type) {
        items = items.filter(item => !(item.date === date && item.name === name && item.type === type));
        localStorage.setItem("items", JSON.stringify(items));
        renderItems();
        calculateMonthlyTotals();
    }

    // Fungsi untuk me-render ulang tabel barang masuk dan keluar
    function renderItems() {
        itemListMasuk.innerHTML = "";
        itemListKeluar.innerHTML = "";
        items.forEach(item => addItemToTable(item));
    }

    // Fungsi untuk logout
    window.logout = function() {
        localStorage.removeItem("currentAdmin");
        window.location.href = "login.html";
    }

    // Render awal saat halaman pertama kali dimuat
    renderItems();
    calculateMonthlyTotals();
});
