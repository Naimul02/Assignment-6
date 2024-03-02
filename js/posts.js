const posts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  const posts = data.posts;
  displayPosts(posts);
};

const counFn = async (id) => {
  const currentCountEle = document.getElementById("count");
  const currentCountStr = currentCountEle.innerText;
  const currentCount = parseInt(currentCountStr);

  const updateCount = currentCount + 1;
  currentCountEle.innerText = updateCount;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/post/${id}`
  );
  const data = await res.json();
  console.log(data);

  const cardContainer = document.getElementById("cardContainer");
  const div = document.createElement("div");
  div.classList = `card  bg-base-100 shadow-xl mt-3`;
  div.innerHTML = `
  
  <div class="card-body">
      <div class="flex gap-3">
          <h2 class="text-lg font-semibold">${data.title}</h2>
          <div class="flex gap-3 items-center">
            <img src="images/eye.png"/>  
            <p>${data.view_count}</p>
          </div>
      </div>
  </div>

  `;
  cardContainer.appendChild(div);
};

const displayPosts = (posts) => {
  const discussContainer = document.getElementById("discuss-container");
  // console.log(posts);

  posts.forEach((post) => {
    console.log(post);
    const authorCard = document.createElement("div");
    authorCard.classList = `border-2 rounded-3xl flex gap-10 p-6`;

    authorCard.innerHTML = `
     
     
            <div>
              <div class="indicator">
                <span class="indicator-item badge badge-secondary"></span> 
                <div class="grid w-32 h-32 bg-base-300 place-items-center">
                    <img src="${post.image}" class="rounded-xl"/>
                </div>
              </div>
            </div>
            <!-- ride side -->
            <div>
                <div class="flex gap-6">
                      <p># ${post.category}</p>
                      <p>${post.author.name}</p>
                </div>
                <div class="border-b-2 border-dashed space-y-2 pb-3">
                    <h1 class="text-xl font-semibold">${post.title}</h1>
                    <p>${post.description}</p>
                </div>
                
                <div class="flex justify-between mt-2">
                  <div class="flex gap-6">
                    <div class="flex gap-4">
                          <img src="images/msg.png"/>
                        <p>${post.comment_count}</p>
                    </div>
                    <div class="flex gap-4">
                    <img src="images/eye.png"/>
                        <p>${post.view_count}</p>
                    </div>
                    <div class="flex gap-4">
                    <img src="images/clock.png"/>
                        <p>${post.posted_time}</p>
                    </div>
                </div>

                <button class=""onclick="counFn('${post.id}')">
                    <img src="images/msgBtn.png"/>    
                </button>
                </div>
            </div>
   


      `;
    discussContainer.appendChild(authorCard);
  });
};
posts();
