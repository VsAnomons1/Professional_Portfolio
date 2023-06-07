var reposContainer = $("#repos");
var url = "https://api.github.com/users/VsAnomons1/starred";

fetch(url)
.then(function(response){
    return response.json();
})
.then(function(data){
    renderRepos(data);
})
// creates and renders starred repos
function renderRepos(repos){
    for(var i = 0; i < repos.length; i++){
        var div = $("<div>");
        div.addClass("col-12 col-md-6 col-lg-4 mt-1 mb-2");
        var card = $("<div>");
        card.addClass("card px-0");
        card.attr("data-status", "unclicked");
        card.css({"min-height": "100%"});
        var cardHeader = $("<div>");
        cardHeader.addClass("card-header");
        var h4 = $("<h4>");
        var name = repos[i].name.includes("-") ? repos[i].name.split("-") : repos[i].name.split("_");
        var formatName = name.map((w) => pascalCase(w)).join(" ");
        h4.text(formatName);
        cardHeader.append(h4);
        var cardBody = $("<div>");
        cardBody.addClass("card-body");
        var img = $("<img>");
        img.addClass("img-fluid rounded");
        img.attr("src", `./assets/${repos[i].name}.png`);
        var description = $("<p>");
        description.text(repos[i].description);
        var info = $("<p>");
        info.css({"font-weight":"bolder"})
        info.text("Click to know more.");
        var ul = $("<ul>");
        ul.addClass("list-group text-center");
        ul.css({"display": "none"});
        var liOne = $("<li>");
        liOne.addClass("list-group-item border-0");
        var webLink = $("<a>");
        webLink.addClass("h4");
        webLink.css({"text-decoration-line": "none"});
        webLink.attr("href", repos[i].homepage);
        webLink.text("Website");
        var liTwo = $("<li>");
        liTwo.addClass("list-group-item border-0");
        var repoLink = $("<a>");
        repoLink.css({"text-decoration-line": "none"});
        repoLink.addClass("h4");
        repoLink.attr("href", repos[i].html_url);
        repoLink.text("Repo");
        liOne.append(webLink);
        liTwo.append(repoLink);
        ul.append(liOne);
        ul.append(liTwo);
        cardBody.append(img);
        cardBody.append(description);
        cardBody.append(info);
        cardBody.append(ul);
        card.append(cardHeader);
        card.append(cardBody);
        div.append(card);
        reposContainer.append(div);
    }
var cards = $("#repos").children().children();
cards.on("click", function(e){
    e.stopPropagation();
    var card = $(e.currentTarget);
    cardInfo(card);
})
}
function cardInfo(currentCard){
    var content = currentCard.children().children().not("ul");
    var list = currentCard.children().last().children().last();
    if(currentCard.attr("data-status") === "unclicked"){
    currentCard.css(
        {
            "transform-origin": "center",
            "transform": "rotate3d(0, 1, 0, 180deg)",
            "transition": "transform 2s"
        });
    content.css(
        {
            "transform-origin": "center",
            "transform": "rotate3d(0, 1, 0, 180deg)",
            "opacity": "0",
            "transition": "transform 2s, opacity ease-out 2s"
        });

    list.css(
        {
            "position": "relative",
            "top": "-15em",
            "display": "block",
            "transform": "rotate3d(0, 1, 0, 180deg)",
            "transition": "all 2s" 
        });
        currentCard.attr("data-status", "clicked");
    }
    else {
        currentCard.css(
            {
                "transform-origin": "center",
                "transform": "rotate3d(0, 0, 1, 0deg)",
                "transition": "transform 2s"
            });
        content.css(
            {
                "transform-origin": "center",
                "transform": "rotate3d(0, 0, 1, 0deg)",
                "opacity": "1",
                "transition": "transform 2s, opacity ease-in 2s"
            });
    
        list.css(
            {
                "position": "relative",
                "top": "-15em",
                "display": "none",
                "transform": "rotate3d(0, 0, 1, 0deg)",
                "transition": "all 2s" 
            });
            currentCard.attr("data-status", "unclicked");
    }
}
 // sets the repos name into pascal format
function pascalCase(word) {
    var pascal = "";
    for(var i = 0; i < word.length; i++){
        if(i === 0){
            pascal += word[i].toUpperCase();
        }
        else {
            pascal += word[i];
        }
    }
        return pascal;
}
