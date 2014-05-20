
dragListener = d3.behavior.drag()
    .on("dragstart", function(d) {
       // console.log("dragstart");
    })
    .on("drag", function(d) {
        d3.select(this)
                .attr("cx", (d3.event.x - 50))
                .attr("cy", (d3.event.y - 50))
                .attr("transform", "translate(" + (d3.event.x - 50) + "," + (d3.event.y - 50) + ")");
        removeLines();
        makeSomeJoinWithBlocks();
    })
    .on("dragend", function(d) {
        // console.log("dragend");
    });

function makeBlock(withParam, andX, andY)
{
    var canv = d3.selectAll(".mapView")
                    .selectAll("svg");  

    var groupBlock = canv.append("g")
                            .attr("id", withParam.id)
                            .attr("cx", andX)
                            .attr("cy", andY)
                            .attr("transform", "translate(" + andX + "," + andY + ")")
                            .call(dragListener);

    var rect = groupBlock.append("rect")
        .style("fill", "steelblue")
        .attr("width", 80)
        .attr("height", 80);

    groupBlock.append("text")
        .text(withParam.id)
        .attr("fill", "black")
        .attr("x", 10)
        .attr("y", 15);

    groupBlock.append("text")
        .text(withParam.count)
        .attr("fill", "black")
        .attr("x", 10)
        .attr("y", 35);
}

function generateEventMenu()
{
    var menu = d3.select(".eventsView").append("ol");
    
    menu.selectAll("ol")
            .data(data.nodes)
        .enter().append("li")
            .on("click", addBlock)
            .on("dblclick", removeBlock)
            .text(function(d) {return d.id +" => "+ d.name});
}

function addBlock(item, index)
{
    makeBlock(item, dummyCoords(item.id).x, dummyCoords(item.id).y);

    makeSomeJoinWithBlocks();
}

function removeBlock(d)
{
    d3.selectAll("#"+d.id).remove();
}

function removeLines()
{
    d3.selectAll("line").remove();
}

function makeSomeJoinWithBlocks()
{
    for (var key in data.links) 
    {
        var s = d3.select("#"+data.links[key].source);
        var t = d3.select("#"+data.links[key].target);

        if(s.empty() == false &&
            t.empty() == false)
        {
            d3.select("svg")
                            .append("line")
                            .attr("id", "#123")
                            .attr("style", "stroke: #006600")
                            .attr("x1", function() { return parseInt(s.attr("cx")) + 50 })
                            .attr("y1", function() { return parseInt(s.attr("cy")) + 50 })
                            .attr("x2", function() { return parseInt(t.attr("cx")) + 50 })
                            .attr("y2", function() { return parseInt(t.attr("cy")) + 50 })

            // var sourceItem = d3.select("#"+data.links[key].source);
            // for (var key in data.links) 
            // {
            //     if(d3.select("#"+data.links[key].target).empty() == false)
            //     {
            //         var targetItem = d3.select("#"+data.links[key].target);
            //         var lineId = data.links[key].source+"-"+data.links[key].target;

            //         if(d3.selectAll("#"+lineId).empty() == true)
            //         {
            //             console.log(sourceItem, targetItem);
                        // d3.select("#"+data.links[key].source)
                        //     .append("line")
                        //     .attr("id", "#"+lineId)
                        //     .attr("style", "stroke: #006600")
                        //     .attr("x1", function() { return sourceItem.attr("cx") })
                        //     .attr("y1", function() { return sourceItem.attr("cy") })
                        //     .attr("x2", function() { return targetItem.attr("cx") })
                        //     .attr("y2", function() { return targetItem.attr("cy") })
            //         }
            //     }
            // }
        }
    }
}

function dummyCoords(forItem)
{
    // Sorry for this :)
    switch(forItem)
    {
        case "a":
            return {x:20, y:20}
        break;

        case "b":
            return {x:150, y:20}
        break;

        case "c":
            return {x:20, y:150}
        break;

        case "d":
            return {x:150, y:150}
        break;

        case "e":
            return {x:250, y:20}
        break;

        case "f":
            return {x:250, y:300}
        break;
    }
}
