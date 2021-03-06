$(function(){
    loadingRecipes();
    $("#recipes").on("click",".btn-danger",deleteRecipe)
    $("#recipes").on("click",".btn-warning",handleUpdate)
    $("#addRecipe").on("click",addRecipe);
    $("#updateBtnUpdate").on("click",function(){

        var id = $("#updateId").val();
        var title = $("#updateTitle").val();
        var body = $("#updateBody").val();
        $.ajax({
            url:"https://usman-recipes.herokuapp.com/api/recipes/"+id,
            method:"PUT",
            data:{title,body},
            success:function(response){
                loadingRecipes();
                $("#updateModal").modal("hide");
            }
        })
    })
})

function handleUpdate(){
    $("#updateModal").modal("show");
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    var id = parentDiv.attr("data-id");

    $.get("https://usman-recipes.herokuapp.com/api/recipes/"+id,function(response){
        $("#updateId").val(response._id);
        $("#updateTitle").val(response.title);
        $("#updateBody").val(response.body);
    })
}

function addRecipe(title,body){
    var title=$("#title").val();
    var body=$("#body").val();
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method:"POST",
        data:{title,body},
        success:function(response){
            loadingRecipes();
        }
    })
}

function deleteRecipe(){
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    var id = parentDiv.attr("data-id");

    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes/"+id,
        method:"DELETE",
        success:function(){
            loadingRecipes();
        }
    })
}

function loadingRecipes(){
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method:"GET",
        success:function(response){
            var recipes = $("#recipes")
            recipes.empty();
            for(var i=0;i<response.length;i++){
                recipes.append(`<div class="recipe" data-id=${response[i]._id}><h3>${response[i].title}</h3><p> <button type="button" class="btn btn-danger btn-sm float-right">Delete</button> <button type="button" class="btn btn-warning btn-sm float-right">Edit</button> ${response[i].body}</p></div>`);
            }
            
        }
    })
}