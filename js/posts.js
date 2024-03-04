const posts = async (searchText) => {
  console.log(searchText);
  if (searchText) {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
    );
    const data = await res.json();
    const posts = data.posts;
    displayPosts(posts);
  } else {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts`
    );
    const data = await res.json();
    const posts = data.posts;
    displayPosts(posts);
  }
};

const handleSearch = async () => {
  toggleSpinner(true);
  const fieldElement = document.getElementById("searchField");
  const fieldValueStr = fieldElement.value;
  posts(fieldValueStr);
};
const toggleSpinner = (isLoading) => {
  const loading = document.getElementById("circleSpinner");
  if (isLoading) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
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

  discussContainer.textContent = "";
  posts.forEach((post) => {
    console.log(post);

    const authorCard = document.createElement("div");
    authorCard.classList = `border-2 rounded-3xl flex flex-col lg:flex-row gap-4 lg:gap-10 p-4 lg:p-6 mx-4 lg:mx-0`;

    authorCard.innerHTML = `
     
        ${
          post.isActive
            ? `<div class="mx-auto lg:mx-0 w-full lg:w-32">
        <div class="indicator w-full lg:w-32">
          
          <span class="indicator-item badge  bg-green-600"id="indicator-badge"></span> 
         
          <div class="grid lg:w-32  lg:h-32  bg-base-300 place-items-center">
              <img src="${post.image}" class="rounded-xl"/>
          </div>`
            : `<div>
          <div class="indicator w-full lg:w-32">
            
            <span class="indicator-item badge  bg-red-600"id="indicator-badge"></span> 
           
            <div class="grid lg:w-32  lg:h-32  bg-base-300 place-items-center">
                <img src="${post.image}" class="rounded-xl"/>
            </div>`
        }
            
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
  toggleSpinner(false);
  latestPosts();
};

const latestPosts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  const latestPosts = data;
  // console.log(latestPosts);

  const latestCardContainer = document.getElementById("latestPostContainer");
  latestCardContainer.textContent = "";
  latestPosts.forEach((latestPost) => {
    console.log(latestPost);
    const createDiv = document.createElement("div");
    createDiv.classList = `card  border-2 p-3`;
    createDiv.innerHTML = `
    <figure><img src="${
      latestPost.cover_image
    }"class="rounded-xl" alt="Shoes" /></figure>
    <div class="card-body">
      <div class="flex gap-3">
          <img src="images/Frame.png" alt="">
          <p>${
            latestPost.author.posted_date
              ? latestPost.author.posted_date
              : "No Publish Date"
          }</p>
</div>
      <h2 class="card-title">${latestPost.title}</h2>
      <p>${latestPost.description.slice(0, 80)}...</p>
      <div class="card-actions flex items-center gap-4">
      <div class="avatar">
      <div class="w-[60px] rounded-full">
        <img src="${latestPost.profile_image}" />
      </div>
    </div>
          <div>
              <h3 class="text-xl font-semibold">${latestPost.author.name}</h3>
              <p>${
                latestPost.author.designation
                  ? latestPost.author.designation
                  : "Unknown"
              }</p>
          </div>
      </div>
    </div>
      `;

    latestCardContainer.appendChild(createDiv);
  });
};
posts();
