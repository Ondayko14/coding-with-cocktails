//$("#test").css('color', 'red');

var titleEl = document.getElementById("drink-title")
var directionsEl = document.getElementById("directions")
var ingredientsEl = document.getElementById("ingredients")

//Get Random Cocktail
 var randomCocktail = function() {
$("#drink-wrapper").css("display", "flex");

fetch(
  'https://www.thecocktaildb.com/api/json/v1/1/random.php?a=Alcoholic'
)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);

    //Random Cocktail's Name
    var cocktailName = data.drinks[0].strDrink
    $("#drink-title").empty().append(cocktailName)

    //Random Cocktail's Instructions
    var cocktailInstructions = data.drinks[0].strInstructions
    $("#directions").empty().append(cocktailInstructions)

    //Random Cocktail's Ingredients
    var ingredientArray = [
    data.drinks[0].strMeasure1 + data.drinks[0].strIngredient1, 
    data.drinks[0].strMeasure2 + data.drinks[0].strIngredient2,
    data.drinks[0].strMeasure3 + data.drinks[0].strIngredient3,
    data.drinks[0].strMeasure4 + data.drinks[0].strIngredient4,
    data.drinks[0].strMeasure5 + data.drinks[0].strIngredient5,
    data.drinks[0].strMeasure6 + data.drinks[0].strIngredient6,
    data.drinks[0].strMeasure7 + data.drinks[0].strIngredient7,
    data.drinks[0].strMeasure8 + data.drinks[0].strIngredient8,
    data.drinks[0].strMeasure9 + data.drinks[0].strIngredient9,
    data.drinks[0].strMeasure10 + data.drinks[0].strIngredient10,
    data.drinks[0].strMeasure11 + data.drinks[0].strIngredient11,
    data.drinks[0].strMeasure12 + data.drinks[0].strIngredient12,
    data.drinks[0].strMeasure13 + data.drinks[0].strIngredient13,
    data.drinks[0].strMeasure14 + data.drinks[0].strIngredient14,
    data.drinks[0].strMeasure15 + data.drinks[0].strIngredient15,
      ]

    $("#ingredients").empty()

    for (var i = 0; i < 14; ++i) {
      if (ingredientArray[i] !== 0) {
        var ingredientList = ingredientArray[i].replace("null", "");
        var listItem = document.createElement('li')
        listItem.append(ingredientList)
        ingredientsEl.append(listItem)
      }
    }

  });

 }

 // When "Click Me! " Button is Clicked, Generate Random Cocktail
$("#random-button").on("click", function () {
    randomCocktail()
})
