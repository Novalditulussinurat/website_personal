// Daftar admin yang valid
const admins = [
    { username: "agnes", password: "agnes123" },
    { username: "putri", password: "putri123" },
    { username: "admin3", password: "password3" },
    { username: "admin4", password: "password4" },
    { username: "admin5", password: "password5" }
];

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Cek apakah username dan password cocok dengan daftar admin
    const admin = admins.find(admin => admin.username === username && admin.password === password);

    if (admin) {
        // Simpan nama admin yang login di Local Storage
        localStorage.setItem("currentAdmin", username);
        window.location.href = "index.html"; // Arahkan ke halaman utama
    } else {
        message.textContent = "Username atau password salah";
    }
});
