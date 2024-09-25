const loadCategories = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await res.json();
    // console.log(data.data.news_category);
    const categories = data.data.news_category;
    displayCategories(categories);
}

const displayCategories = categories => {
    const categoriesContainer = document.querySelector("#categories-container");
    categories.forEach(category => {
        const {category_name} = category;

        const categoryButton = document.createElement("button");
        categoryButton.classList.add("hover:text-[#5D5FEF]");
        categoryButton.innerText = category_name;
        
        categoriesContainer.appendChild(categoryButton);
    });
    
}
loadCategories();