// fetch API is the modern way of dealing with http requests.
const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

function sendHttpRequest(method, url, data) {
  // this is the global available function in modern browsers, it is not supported in internet explorer browser.
  return fetch(url, {
    // fetch() return a promise
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json" // this tells the server to an outgoing request that i have json data.
    } // data sent to a server will be always JSON, so we need to convert it into JSON format using JSON.stringify() method.
  })
    .then(response => {
      console.log(response);
      console.log(response.status);

      if (response.status >= 200 && response.status < 300) {
        // checking initially if we got success response status.
        return response.json(); //this will parson the JSON data into javascript data and also convert streamed parsed body into snapshot parsed body
      } else {
        throw new Error("Something went wrong!!!");
      }
    })
    .catch(error => {
      console.log(error);
      throw new Error("Something went wrong with network!!!");
    });
}

// an alternative to fetch post using async and await.
async function fetchPosts() {
  try {
    const responseData = await sendHttpRequest("GET", "https://jsonplaceholder.typicode.com/posts");
    const listOfPosts = responseData;
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    console.log(error);
  }
}
// Adding EventListener to the button
fetchButton.addEventListener("click", fetchPosts);

// Adding EventListener to the form
form.addEventListener("submit", event => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;

  createPost(enteredTitle, enteredContent);
});

// creating createPost method
async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId
  };

  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
}

// adding eventListener to ul element in the DOM
postList.addEventListener("click", () => {
  if (event.target.tagName === "BUTTON") {
    console.log("clicked on button!");
    const postId = event.target.closest("li").id;
    console.log(postId);
    sendHttpRequest("DELETE", `https://jsonplaceholder.typicode.com/posts/${postId}`); // check delete request status in network tab
  }
});
