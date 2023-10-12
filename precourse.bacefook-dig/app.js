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

  // const newTextEl = document.createElement("div");
  let newText = document.getElementById("newText");
  newText.value = `${loginName}さん、今日のお酒を投稿(カンパイ）しましょう😊🍺`;


  let startIndex = 0;
  let latestIndex = bacefook.newsfeed.length;

  const toPostBacefook = () => {
  for (let index = startIndex; index < latestIndex; index++) {
    const post = bacefook.newsfeed[index];
    
    const postEl = document.createElement("div");
    postEl.className="frame1"
    const postEl2 = document.createElement("div");
    postEl2.className="frame2"
    const postEl3 = document.createElement("div");
    postEl3.className="frame3"

    postEl2.innerText = post.text;

    const friendEl = document.createElement("div");
    friendEl.className = "friend";
    friendEl.innerText = post.friend;


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
    postEl3.append(feelingEl);

    //image
    const imageEl = document.createElement("img");
    imageEl.className="pic";
    imageEl.src = post.image;


    postEl3.append(friendEl);
    postEl3.append(timestampEl)
    
    postEl2.append(postEl3);
    postEl.append(imageEl);
    postEl.append(postEl2);
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
  
newText.addEventListener("focus", ()=>{
  newText.value = "";
})
  
const newPostbtn = document.getElementById("newPost");
newPostbtn.addEventListener("click", ()=>{
  let nameText = document.getElementById("uname");

  const postEl = document.createElement("div");
  postEl.className="frame1"
  const postEl2 = document.createElement("div");
  postEl2.className="frame2"
  const postEl3 = document.createElement("div");
  postEl3.className="frame3"

  const newTextEl = document.createElement("div");
  let newText = document.getElementById("newText");
  newTextEl.innerText = newText.value;

  postEl3.append("🥴🍺");
  postEl3.append(loginName);
  postEl3.append("posted 0 seconds ago");
  postEl2.append(newTextEl)
  postEl2.append(postEl3);
  postEl.append(postEl2);
  containerEl.append(postEl);
  newText.value = `${loginName}さん、今日のお酒を投稿しましょう`;

})
});

