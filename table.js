
var classData = d3.json("classData.json");

var getGrade = function(category)
{
    
    return category.grade
}
var drawTable = function(classData)
{
    console.log("drawing table")
    var rows = d3.select("table tbody")
    .selectAll("tr")
    .data(classData)
    .enter()
    .append("tr");
    
    rows.append("td")
    .append("img")
    .attr("src", function(penguin)
          {return "imgs/" + penguin.picture})
    
    rows.append("td")
    .text(function(penguin)
         {
        
        var homeworkArray = penguin.homework.map(getGrade)
        
        return d3.mean(homeworkArray)
    })
    
    rows.append("td")
    .text(function(penguin)
         {
        var quizArray = penguin.quizes.map(getGrade)
        return d3.mean(quizArray)
        
    })
    
    rows.append("td")
    .text(function(penguin)
         {
        
        var testArray = penguin.test.map(getGrade)
        return d3.mean(testArray)
    })
    
    rows.append("td")
    .text(function(penguin)
         {
        return penguin.final[0].grade
    })
    
}

var compareHw = function(penguin1,penguin2)
{
    var homeworkArray1 = penguin1.homework.map(getGrade)
    var hw1 = d3.mean(homeworkArray1)
    var homeworkArray2 = penguin2.homework.map(getGrade)
    var hw2 = d3.mean(homeworkArray2)
    if (hw1 == hw2)
        {return 0}
    else if (hw1 > hw2)
        {return -1}
    else{return 1}
    
}
var sortOnHwMean = function(classData)
{
    console.log("sortonmean running")
d3.select("#hw")
    .on("click", 
        function()
        {classData.sort(compareHw)
        console.log("clicked")
    d3.select("table tbody")
    .selectAll("*")
    .remove()
    drawTable(classData) })
}


var successFCN = function(classData)
{
    console.log("got data")
    drawTable(classData)
    sortOnHwMean(classData)
}

var failureFCN = function(classData)
{
    console.log("couldn't find data")
}

classData.then(successFCN,failureFCN)