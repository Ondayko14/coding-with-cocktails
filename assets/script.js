//$("#test").css('color', 'red');

var titleEl = document.getElementById("drink-title")
var directionsEl = document.getElementById("directions")
var ingredientsEl = document.getElementById("ingredients")
var giphyNameSearch = "";
var savedArray = JSON.parse(localStorage.getItem("setTerms")) || [];

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
    //Random Cocktail's Name
    var cocktailName = data.drinks[0].strDrink;

    //Push and Save the coctail name to savedArray
    if (savedArray.length < 8) {
    savedArray.unshift(cocktailName);
    console.log(savedArray);
    } else {
      //Removes oldest search after 8
      savedArray.pop();
      savedArray.unshift(cocktailName);
    }
    localStorage.setItem("setTerms", JSON.stringify(savedArray));

    //Call Load function to bring in history buttons
    loadfunctions();

    //giphy search name parameter
    giphyNameSearch = cocktailName.replaceAll(" ", "%20");
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

  }).then(function(){
    //Call Img search
    cocktailImg();
  })

 }

 // Load Recent Cocktail When Button is Clicked
 var recentCocktail = function(recentName) {
$("#drink-wrapper").css("display", "flex");

var apiRecentCocktail = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + recentName
fetch(
  apiRecentCocktail
)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {

    //Recent Cocktail's Name
    var cocktailName = data.drinks[0].strDrink;
    $("#drink-title").empty().append(cocktailName)
    giphyNameSearch = cocktailName.replaceAll(" ", "%20");

    //Recent Cocktail's Instructions
    var cocktailInstructions = data.drinks[0].strInstructions
    $("#directions").empty().append(cocktailInstructions)

    //Recent Cocktail's Ingredients
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

  }).then(function(){
    //Call Img search
    cocktailImg();
  })

 }

 // Save Recent Searches to Local Storage, and Display Stored Searches
var loadfunctions = function() {
  var searchTerm = savedArray;
  //Remove Old Buttons
  $("#history-wrapper").empty();


  if(!searchTerm) {
    return;
  }

  for(var i = 0; i < searchTerm.length; i++) {
    var button = $("<button>").addClass("history").attr({type: "button", id: i}).text(searchTerm[i]);
    $("#history-wrapper").append(button);
  }
}
 //Get Corresponding Cocktail Img
 var cocktailImg = function () {
  var apiKey = "8FuSrS1RcUYjB1yNzrw16a59YJ3g0AUk";
	fetch("https://api.giphy.com/v1/gifs/search?api_key="+apiKey+"&q="+giphyNameSearch+"&rating=pg-13").then(function(response) {
		response.json().then(function(data) {
			giphyObj(data);
		});
	})
 };
 var giphyObj = function(data) {

    //if the image doesn't exist, display stock img

    if(!data.data[0]) {
      var imgSelect = "https://media2.giphy.com/media/UWpfAsp7klhw4/200.webp?cid=ecf05e470vrohag4v3mode6jf56nv67dbzkao59lusslf51p&rid=200.webp";
    } else {
      //random number for data
    var randomNum = Math.floor((Math.random()*data.data.length));
      //selects the img
    var imgSelect = data.data[randomNum].images.original.url;
    };
    $("#img-placer").attr("src", imgSelect).width("350px").height("300px");
 }

 // When "Click Me! " Button is Clicked, generate random cocktail
$("#random-button").on("click", function() {
    randomCocktail();
})

// When Recent Cocktail Button is clicked, reload recent cocktail
$(document).on("click", ".history", function() {
  var clickedName = $(this).text(); 
  recentCocktail(clickedName);
})


// Load Recent Cocktails from Local Storage when page loads
loadfunctions();
