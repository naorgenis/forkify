//import icons from '../img/icons.svg';
import recipeView from './views/recipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import * as model from './model.js';
import 'core-js/stable'; // poliffiling everything else
import 'regenerator-runtime/runtime'; //poliffiling async/await
import searchView from './views/searchView.js';
import { async } from 'regenerator-runtime/runtime';
import resultView from './views/resultView.js';
import bookmarkedView from './views/bookmarksView.js';
import AddRecipeView from './views/addRecipeView.js';

import paginationView from './views/paginationView';
import addRecipeView from './views/addRecipeView.js';

//https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    console.log(id);
    recipeView.renderSpinner();

    //loading recipe
    await model.loadRecipe(id);
    console.log(model.state.recipe);

    //render bookmarks
    bookmarkedView.update(model.state.bookmarks);

    //update marker recipe
    resultView.update(model.getSearcheResultsPage());

    //rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();

    //get search query
    const query = searchView.getQuery();
    if (!query) return;

    //load search results
    await model.loadSearchResult(query);

    //render results
    resultView.render(model.getSearcheResultsPage(1));

    //render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlAddRecipe = function () {};

const controlPagination = function (goToPage) {
  //render new results
  resultView.render(model.getSearcheResultsPage(goToPage));

  //render new initial pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (servings) {
  //update the recipe servings (in state)
  model.updateServings(servings);

  //update the recipe view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe); // only update the necessery value without rendering the all page
};

const controlAddNewBookmark = function () {
  //check if the bookmark exist - if not added else delete it
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  //update the recipe view
  recipeView.update(model.state.recipe);

  //render bookmarks
  bookmarkedView.render(model.state.bookmarks);
  console.log(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarkedView.render(model.state.bookmarks);
};

//async function to get the error message
const controlAddNewRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //render recipe
    recipeView.render(model.state.recipe);

    //success message
    addRecipeView.renderMessage();

    //close form window
    setTimeout(function () {
      //AddRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

    //render bookmark
    bookmarkedView.render(model.state.bookmarks);

    //change id in url
    window.history.pushState('', '', `#${model.state.recipe.id}`);
  } catch (err) {
    console.log(err);
    addRecipeView.renderError(err.message);
  }
};

//publisher-subscriber pattern - connect between the controller to the view
const init = function () {
  bookmarkedView.addhandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addhandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddNewBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addhandlerUpload(controlAddNewRecipe);
  console.log('hello');
};

init();
