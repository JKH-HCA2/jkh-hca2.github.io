"use strict";

window.onload = function()
{
    let objs;
    $.getJSON("data/mountains.json", 
    function(data) {
        objs = data;
        let dropdown = document.getElementById("mountainSelector");
        let options = objs.mountains
        let len = options.length;
        for (var i = 0; i < len; i++)
        {
            let opt = options[i].name;
            let el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            dropdown.appendChild(el);
        }
    });

    let table = document.getElementById("mountain")
    const btn = document.getElementById("search")
    btn.onclick = function()
    {
        getHeadRow(table)
        getMtSearch(table, objs);
        
    }
}

function getMtSearch(table, objs)
{
    let mountain = document.getElementById("mountainSelector").selectedIndex;
    let chosenMountain = document.getElementsByTagName("option")[mountain].value

    let len = objs.mountains.length

    for (let i = 0; i < len; i++)
    {
        if (chosenMountain == objs.mountains[i].name)
        {
            let row = table.insertRow(table.rows.length);

            let cell1 = row.insertCell(0);
            cell1.innerHTML = objs.mountains[i].name;
            let cell2 = row.insertCell(1);            
            cell2.innerHTML = objs.mountains[i].elevation;
            let cell3 = row.insertCell(2);            
            cell3.innerHTML = objs.mountains[i].effort;
            let cell4 = row.insertCell(3);            
            cell4.innerHTML = objs.mountains[i].desc;
            let cell5 = row.insertCell(4);            
            cell5.innerHTML = objs.mountains[i].coords.lat + ", " + objs.mountains[i].coords.lng
            let cell6 = row.insertCell(5);
            cell6.innerHTML = '<img src=images/' + objs.mountains[i].img + ' />'
        }
    }
}

function getHeadRow(table)
{
    // Table wiped of past results
    mountain.innerHTML = "";

    // Creates and populates a row with the header data
    let row = table.insertRow()
    let cell1 = row.insertCell(0);
    cell1.innerHTML = "Name";
    let cell2 = row.insertCell(1);
    cell2.innerHTML = "Elevation";
    let cell3 = row.insertCell(2);
    cell3.innerHTML = "Effort";
    let cell4 = row.insertCell(3);
    cell4.innerHTML = "Description";
    let cell5 = row.insertCell(4);
    cell5.innerHTML = "Coordinates";
    let cell6 = row.insertCell(5);
    cell6.innerHTML = "Image";
}