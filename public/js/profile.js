document.querySelector("#new-comment-form").addEventListener("submit", e => {
    e.preventDefault();
    const commentObj = {
        comment: document.querySelector("#comment-input").value
    }
    fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(commentObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.reload()
        } else {
            alert("There was an error making your comment")
        }
    })
})