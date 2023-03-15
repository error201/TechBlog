document.querySelector("#register-form").addEventListener("submit", e => {
    // Prevent the default behavior.
    e.preventDefault();
    const registerObj = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value
    }
    fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(registerObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.href = "/profile"
        } else {
            alert("There was a problem creating your account.")
        }
    })
});