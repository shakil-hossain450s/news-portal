const loadCategories = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/news/categories");
  const data = await res.json();
  const categories = data.data.news_category;
  displayCategories(categories);
}

const displayCategories = categories => {
  const categoriesContainer = document.querySelector("#categories-container");
  categories.forEach(category => {
    const { category_id, category_name } = category;
    const categoryButton = document.createElement("button");
    categoryButton.innerHTML = `
            <button onclick="loadNews('${category_id}', '${category_name}')" class="hover:text-[#5D5FEF]">${category_name}</button>
        `;
    categoriesContainer.appendChild(categoryButton);
  });
}

const loadNews = async (category_id = "01", category_name = "Breaking News") => {
  loadingSpinner(true);
  const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
  const data = await res.json();
  const allNews = data.data;
  displayNews(allNews, category_name);
  loadingSpinner(false);
}

const displayNews = (allNews, category_name) => {
  document.querySelector("#news-count").innerText = allNews.length;
  document.querySelector("#category-name").innerText = category_name;

  const newsContainer = document.querySelector("#news-container");
  newsContainer.textContent = "";

  allNews.forEach(news => {
    const { image_url, details, title, total_view, rating: { number, badge }, author: { name, published_date, img } } = news;

    const newsCard = document.createElement("div");
    newsCard.classList = `card card-side flex-col lg:flex-row bg-base-100 shadow-xl p-5 mb-10 relative`;
    newsCard.innerHTML = `
        <figure style="align-items: stretch" class="rounded-xl w-full lg:w-3/12 ">
              <img
                src="${image_url}"
                alt="Movie"
              />
            </figure>
            <div class="card-body w-full lg:w-8/12">
              <div class="absolute right-5 top-5">
                <p class="badge badge-lg bg-[#5D5FEF] text-white font-medium">
                    ${number}
                    <span class="ml-2">${badge}</span>
                </p> 
              </div>
              <h2 class="card-title text-2xl mb-3">${title}</h2>
              <p>${details.length > 300 ? details.slice(0, 300) + "..." : details}</p>
              <div class="flex justify-between items-center mt-4">
                <div class="flex items-center gap-2.5">
                  <img src="${img}" class="h-10 w-10 rounded-full" alt="" />
                  <div class="-space-y-1">
                    <h4 class="font-medium">${name}</h4>
                    <p class="text-[#718797]">${published_date}</p>
                  </div>
                </div>
                <div class="flex gap-1 items-center">
                  <img src="./assets/carbon_view.png" alt="" />
                  <p>${total_view}</p>
                </div>
                <div>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <div>
                  <button class="text-lg text-[#5D5FEF]" href="">
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
        `;
    newsContainer.appendChild(newsCard);
  });
  
}

const loadingSpinner = isLoading => {
  const loader = document.querySelector("#loading-spinner");
  if(isLoading){
    loader.classList.remove("hidden");
  } else{
    loader.classList.add("hidden");
  }
}

loadNews();
loadCategories();