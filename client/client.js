const form = document.querySelector("form");
const elLoading = document.querySelector(".loading");
const elTweets = document.querySelector(".tweets");
const API_URL = "http://localhost:5000/tweets";

elLoading.style.display = "";

listAllTweets();

form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const content = formData.get("content");

    const tweet = {
        name,
        content
    };

    form.style.display = "none";
    elLoading.style.display = "";

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(tweet),
        headers: {
            "content-type": "application/json"
        }
    }).then(response => response.json())
        .then(createdTweet => {
            form.reset();
            elLoading.style.display = "none";
            listAllTweets();
        });
});

function listAllTweets() {
    elTweets.innerHTML = "";
    fetch(API_URL)
        .then(response => response.json())
        .then(tweets => {
            tweets.reverse();
            tweets.forEach(tweet => {
                const div = document.createElement("div");
                
                const header = document.createElement("h3");
                header.textContent = tweet.name;

                const contents = document.createElement("p");
                contents.textContent = tweet.content;

                const date = document.createElement("small");
                date.textContent = new Date(tweet.created);

                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);

                elTweets.append(div);
            });
            elLoading.style.display = "none";
            setTimeout(() => {
                form.style.display = "";
            }, 1);
        }); 
}