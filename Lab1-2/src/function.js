function loadRecipes(category) {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    let recipeList = document.getElementById("recipeList");
    recipeList.innerHTML = "";

    let filteredRecipes = category ? recipes.filter(recipe => recipe.category === category) : recipes;

    if (filteredRecipes.length === 0) {
        recipeList.innerHTML = "<p>Немає рецептів у цій категорії.</p>";
        return;
    }

    filteredRecipes.forEach((recipe, index) => {
        let recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        let imageSrc = recipe.image ? recipe.image : "default.jpg";
        recipeCard.style.backgroundImage = `url('${imageSrc}')`;
        recipeCard.style.backgroundSize = "cover";
        recipeCard.style.backgroundPosition = "center";

        recipeCard.innerHTML = `
            <div class="recipe-overlay">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
                <a href="comments.html?id=${index}" class="comment-link">Перейти до коментарів</a>
            </div>
        `;
        recipeList.appendChild(recipeCard);
    });
}
