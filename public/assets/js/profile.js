document.querySelector("#comment-form").addEventListener("submit", e => {
    
    // Prevent default behavior.
    e.preventDefault();
    const commentObj = {
        comment: document.querySelector("#comment-text").value
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
            alert("An error occurred while creating your comment.")
        }
    })
});