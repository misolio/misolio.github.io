function goBack() {
    window.history.back();
}


function loadComments() {
    let commentsContainer = document.getElementById("comments");
    commentsContainer.innerHTML = "";

    let recipeComments = comments[recipeId] || [];

    recipeComments.forEach(comment => {
        let commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        commentDiv.innerHTML = `<strong>${comment.name}:</strong> ${comment.text}`;
        commentsContainer.appendChild(commentDiv);
    });
}

function addComment() {
    let userName = document.getElementById("userName").value.trim();
    let commentInput = document.getElementById("commentInput");
    let commentText = commentInput.value.trim();

    if (!userName || !commentText) {
        alert("Будь ласка, введіть ім'я та коментар!");
        return;
    }

    if (!comments[recipeId]) {
        comments[recipeId] = [];
    }

    comments[recipeId].push({ name: userName, text: commentText });
    localStorage.setItem("comments", JSON.stringify(comments));

    document.getElementById("userName").value = "";
    commentInput.value = "";
    loadComments();
}

document.addEventListener("DOMContentLoaded", loadComments);
