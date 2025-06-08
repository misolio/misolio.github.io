document.addEventListener("DOMContentLoaded", loadRecipes);

function loadRecipes() {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    let recipeList = document.getElementById("recipeList");
    recipeList.innerHTML = "";

    if (recipes.length === 0) {
        recipeList.innerHTML = "<p>Немає доданих рецептів.</p>";
        return;
    }

    recipes.forEach((recipe, index) => {
        let recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        recipeCard.style.backgroundImage = recipe.image ? `url(${recipe.image})` : "url('default.jpg')";

        recipeCard.innerHTML = `
            <div class="recipe-info">
                <h3>${recipe.title.replace(/\n/g, "<br>")}</h3>
                <p style="white-space: pre-line;"><strong>Опис:</strong><br>${recipe.description}</p>
                <p><strong>Категорія:</strong><br>${recipe.category}</p>
            </div>
            <button class="delete-btn" onclick="deleteRecipe(${index})">Видалити</button>
        `;
        recipeList.appendChild(recipeCard);
    });
}


function addRecipe() {
    let title = document.getElementById("recipeTitle").value.trim();
    let description = document.getElementById("recipeDescription").value.trim();
    let category = document.getElementById("recipeCategory").value;
    let imageInput = document.getElementById("recipeImage");
    let imageFile = imageInput.files[0];

    if (title === "" || description === "") {
        alert("Будь ласка, заповніть всі поля!");
        return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        let imageBase64 = e.target.result;

        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push({ title, description, category, image: imageBase64 });
        localStorage.setItem("recipes", JSON.stringify(recipes));

        document.getElementById("recipeTitle").value = "";
        document.getElementById("recipeDescription").value = "";
        imageInput.value = "";

        loadRecipes();
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push({ title, description, category, image: null });
        localStorage.setItem("recipes", JSON.stringify(recipes));

        document.getElementById("recipeTitle").value = "";
        document.getElementById("recipeDescription").value = "";

        loadRecipes();
    }
}

function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    loadRecipes();
}
