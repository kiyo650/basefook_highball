window.addEventListener("load", () => {
  // This is a check to see if there's a username stored
  let username = localStorage.getItem("username");
  if (!username) {
    // Prompt for one if a username isn't found
    username = window.prompt("What is your name?");
    localStorage.setItem("username", username);
  }

  const containerEl = document.querySelector("#newsfeed");

  // This makes things appear
  const loginName = localStorage.getItem("username");
  let startIndex = 0;
  let latestIndex = bacefook.newsfeed.length;
  const loginNameEl = document.getElementById("loginName");
  loginNameEl.innerText = loginName
  const toPostBacefook = () => {
  for (let index = startIndex; index < latestIndex; index++) {
    const post = bacefook.newsfeed[index];

    const friendEl = document.createElement("div");
    friendEl.className = "friend";
    friendEl.innerText = post.friend;

    const postEl = document.createElement("div");
    postEl.innerText = post.text;
    postEl.append(friendEl);

    //タイムスタンプ
    const timestampEl = document.createElement("div");
    const nowDate = moment();
    const passedTimeSeconds = nowDate.diff(post.timestamp) / 1000;
    const passedTimeUnit = 
      passedTimeSeconds < 60 ? "seconds"
     :passedTimeSeconds < 60 * 60 ? "minutes"
     :passedTimeSeconds < 60 * 60 * 24 ? "hours"
     :"days" 
    timestampEl.innerText = `posted ${nowDate.diff(post.timestamp, passedTimeUnit)} ${passedTimeUnit} ago`;
    postEl.append(timestampEl)
    
    //feeling
    const feelingEl = document.createElement("div");
    const feelingSymbol = 
    post.feeling === "happy" ? "😄"
    : post.feeling === "smug" ? "😏"
    : post.feeling === "lovestruck" ? "😍"
    : post.feeling === "gross" ? "😨"
    : post.feeling === "scared" ? "😱"
    : post.feeling === "tired" ? "😩"
    : post.feeling === "angry" ? "😡"
    : post.feeling === "frustrated" ? "😤"
    : post.feeling === "excited" ? "🤩"
    :  "";
    
    feelingEl.innerText = feelingSymbol;
    postEl.append(feelingEl);
    //image
    const imageEl = document.createElement("img");
    imageEl.classList.add("pic")
    imageEl.src = post.image;
    postEl.append(imageEl);
    containerEl.append(postEl);
  }
}
toPostBacefook();
const btn = document.getElementById("update");
btn.addEventListener("click", () => {
  startIndex = latestIndex;
  latestIndex = bacefook.newsfeed.length;
  toPostBacefook();
})
const newPostbtn = document.getElementById("newPost");
newPostbtn.addEventListener("click", ()=>{
  let nameText = document.getElementById("uname");

  const newNameEl = document.createElement("div");
  newNameEl.innerText = nameText.value;
  containerEl.append(newNameEl)

  const newTextEl = document.createElement("div");
  let newText = document.getElementById("newText");
  //const postEl = document.createElement("div");
  newTextEl.innerText = newText.value;
  containerEl.append(newTextEl)
  
})
});
