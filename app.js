//main data on the screen
let data = [];
let query = "cat";
let change = false;
//fetch request options
var myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Client-ID  URzNv4bzRZFRiYXzVW-HXeJ4TyN9jnlH90-RHnd9ZqA"
);
myHeaders.append("count", "1");
myHeaders.append("Cookie", "ugid=a28e8db77cdfc4fc3d6fa3d61aec615a5404185");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};
let i = 1;

//Fetch Images
fetchInitial();
async function fetchInitial() {
  await fetch(
    `https://api.unsplash.com/search/photos/?client_id=URzNv4bzRZFRiYXzVW-HXeJ4TyN9jnlH90-RHnd9ZqA&page=${i}&per_page=10&query=${
      query == "" ? "cats" : query
    }`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      if (change) {
        data = [];
        change = false;
      }
      data = [...data, ...JSON.parse(result).results];

      let images = document.querySelector(".images");

      let allImages = ``;

      for (let i = 0; i < data.length; i++) {
        let pic = `
            <div>
    
                <img src= "${data[i].urls.regular}" alt="${data[i].alt_description}" width="100%" height="200px"/>
                <h4> ${data[i].user.username}</h4>
            </div>
    
            `;

        allImages += pic;
      }

      images.innerHTML = allImages;
    })
    .catch((error) => console.log("error", error));

  loading.classList.remove("show");
}

//debouncing the user search
const debounceSearch = (fn, delay) => {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
};

const fetchNew = () => {
  query = document.getElementById("search").value.trim();
  change = true;
  fetchInitial();
};

let updateSearch = debounceSearch(fetchNew, 500);

//changing the navbar color on scroll
const navbar = document.querySelector(".nav");
window.onscroll = () => {
  if (window.scrollY > 250) {
    navbar.style.backgroundColor = "#181745";
  } else {
    navbar.style.backgroundColor = "transparent";
  }
};

// Infinite scroll

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop === scrollHeight) {
    showLoading();
  } else {
    loading.classList.remove("show");
  }
});

const loading = document.querySelector(".loading");

function showLoading() {
  loading.classList.add("show");
  setTimeout(() => {
    i++;
    fetchInitial();
  }, 1000);
}
