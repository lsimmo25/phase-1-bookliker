document.addEventListener("DOMContentLoaded", function () {
    const listPanel = document.querySelector("#list")
    const showPanel = document.querySelector("#show-panel")

    function fetchBookTitles() {
        fetch(`http://localhost:3000/books`)
            .then(response => response.json())
            .then(data => {
                data.forEach(book => listBooks(book))
            })
            .catch(error => (error))
    }

    function listBooks(book) {
        const bookListItem = document.createElement("li")
        bookListItem.textContent = book.title
        listPanel.appendChild(bookListItem)

        bookListItem.addEventListener("click", () => {
            fetchBookInfo(book.id)
        })
    }

    function fetchBookInfo(bookId) {
        fetch(`http://localhost:3000/books/${bookId}`)
            .then(response => response.json())
            .then(bookInfo => {
                displayBookInfo(bookInfo)
                likeButton(bookInfo)
            })
            .catch(error => (error))
    }

    function displayBookInfo(bookInfo) {
        showPanel.innerHTML = ""
        const displayBook = document.createElement("section")
        displayBook.classList = "display-book"
        displayBook.innerHTML = `
        <image src="${bookInfo.img_url}"/>
        <h2>${bookInfo.title}</h2>
        <h3>${bookInfo.subtitle}</h3>
        <h4>${bookInfo.author}</h4>
        <p>${bookInfo.description}</p>
        <ul id="liked-by-user"></ul>
        <button type="button" id="likeBtn">Like</button>     
        `
        showPanel.appendChild(displayBook)

        const likedByUserList = document.querySelector("#liked-by-user")
        bookInfo.users.forEach(user => {
            const userItem = document.createElement("li")
            userItem.textContent = user.username;
            likedByUserList.appendChild(userItem)
        })

    }

    function likeButton(bookInfo) {
        const likeButton = document.querySelector("#likeBtn")
        likeButton.addEventListener("click", () => {
            const userLiked = {
                id: 11,
                username: "Lyle"
            }

            bookInfo.users.push(userLiked)

            fetch(`http://localhost:3000/books/${bookInfo.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    users: bookInfo.users
                })
            })
                .then(response => response.json())
                .then(data => console.log(data))

        })
    }

    function init() {
        fetchBookTitles()
    }

    init()
});
