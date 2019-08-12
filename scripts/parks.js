"use strict";


/*
*
* Function: Onload function populates the dropdown selectors and connects javascript functions
* to HTML button elements
*
* @param objs (JSON Array) - data file used to populate the tables on the page
* @param
*
*/
window.onload = function()
{
    getLocDropDown();
    getParkDropDown();

    let objs;
    $.getJSON("data/nationalparks.json", 
    function(data) {
        objs = data;
    })

    let table = document.getElementById("parks");
    const btn = document.getElementById("search")
    btn.onclick = function()
    {
        
        if (document.getElementById("location").checked)
        {
            parks.innerHTML = "";
            getHeadRow(table);
            getLocSearch(table, objs);
        }
        else
        {
            parks.innerHTML = "";
            getHeadRow(table);
            getParkTypeSearch(table, objs);
        }
    }
    const dispBtn = document.getElementById("displayAll")
    dispBtn.onclick = function()
    {
        parks.innerHTML = "";
        getHeadRow(table);
        displayAll(table, objs)
    }
}

/*
*
* Function: this function parses an array of locations and populates the dropdown list
* with the data from the array.
*
* Author: Jeremy Han
*
* @param: dropdown (HTML Element) - this var represents the selector element on the html file
* @param: options (Array) - this is an array containing the locations of the parks
* @param: len (Number) - this var represents the number of objects in the array
*
*/
function getLocDropDown()
{
    // Connects the HTML selector to the JS var
    let dropdown = document.getElementById("locationSelector")
    let options = [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "DC",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Islands",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
    ]

    let len = options.length;
    // Populates the selector with data from the array
    parseDropDown(len, options, dropdown);
}

/*
*
* Function: this function parses an array of locations and populates the dropdown list
* with the data from the array.
*
* Author: Jeremy Han
*
* @param: dropdown (HTML Element) - this var represents the selector element on the html file
* @param: options (Array) - this is an array containing the locations of the parks
* @param: len (Number) - this var represents the number of objects in the array
*
*/
function getParkDropDown()
{
    // Connects the HTML selector to JS var
    let dropdown = document.getElementById("parkTypeSelector")
    let options = [
        "National Park",    
        "National Monument",     
        "Recreation Area",  
        "Scenic Trail",    
        "Battlefield",
        "Historic", 
        "Memorial",    
        "Preserve",
        "Island",
        "River",    
        "Seashore",
        "Trail",        
        "Parkway"
    ]
    let len = options.length;
    // Populates the selector with data form the array
    parseDropDown(len, options, dropdown);

}

/*
*
* Function: This is a helper function that populates a selector with options when values from an
* array are thrown into it
*
* Author: Jeremy Han
*
* @param: len (Number) - this is the length of the given array
* @param: options (Array) - this is the list of options from the given array
* @param: dropdown (HTML Element) - this is where the options are being thrown
*
*/
function parseDropDown(len, options, dropdown)
{
    for (var i = 0; i < len; i++)
    {
        let opt = options[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        dropdown.appendChild(el);
    }
}

/*
*
* Function: Checks the radio buttons to see which option is selected and displays whichever
* dropdown the user chose
*
* Author: Jeremy Han
*
* @param selector1 (HTML Element) - represents the selector that is to be displayed
* @param selector2 (HTML Element) - represents the selector that is to be hidden
*
*/
function dropdownSwitch()
{
    if (document.getElementById("location").checked)
    {
        const selector1 = document.getElementById("locationSelector");
        selector1.style.display = "block";
        const selector2 = document.getElementById("parkTypeSelector");
        selector2.style.display = "none";
    }
    else
    {
        const selector1 = document.getElementById("parkTypeSelector");
        selector1.style.display = "block";
        const selector2 = document.getElementById("locationSelector");
        selector2.style.display = "none";
    }
}

/*
*
* Function: Helper function replaces the head row of the table after every search
*
* Author: Jeremy Han
*
* @param row (HTML Element) - represents the added row on the HTML table
* @param celli (HTML Element) - represents the additional cells added to the table
*
*/
function getHeadRow(table)
{
    // Table wiped of past results
    parks.innerHTML = "";

    // Creates and populates a row with the header data
    let row = table.insertRow()
    let cell1 = row.insertCell(0);
    cell1.innerHTML = "Location";
    let cell2 = row.insertCell(1);
    cell2.innerHTML = "Address";
    let cell3 = row.insertCell(2);
    cell3.innerHTML = "City";
    let cell4 = row.insertCell(3);
    cell4.innerHTML = "State";
    let cell5 = row.insertCell(4);
    cell5.innerHTML = "Zip Code";
    let cell6 = row.insertCell(5);
    cell6.innerHTML = "Phone Number";
    let cell7 = row.insertCell(6);
    cell7.innerHTML = "Website";
    let cell8 = row.insertCell(7);
    cell8.innerHTML = "Coordinates";
}

function getLocSearch(table, objs)
{
    let location = document.getElementById("locationSelector").selectedIndex;
    let chosenLocation = document.querySelectorAll("select#locationSelector > option")[location].value
    
    let len = objs.parks.length
    for (let i = 0; i < len; i++)
    {
        if (chosenLocation == objs.parks[i].State)
        {
            tablePopulation(table, objs, i);
        }
    }
}

function getParkTypeSearch(table, objs)
{
    let parkType = document.getElementById("parkTypeSelector").selectedIndex;
    let chosenParkType = document.querySelectorAll("select#parkTypeSelector > option")[parkType].value
    
    let len = objs.parks.length
    for (let i = 0; i < len; i++)
    {
        if (objs.parks[i].LocationName.search(new RegExp(chosenParkType, 'i')) != -1)
        {
            tablePopulation(table, objs, i);
        }
    }
}

function displayAll(table, objs)
{
    let len = objs.parks.length
    for (let i = 0;i < len; i++)
    {
        tablePopulation(table, objs, i);
    }
}

function tablePopulation(table, objs, i)
{
    let row = table.insertRow(table.rows.length)

    let cell1 = row.insertCell(0);
    cell1.innerHTML = objs.parks[i].LocationName;
    let cell2 = row.insertCell(1);
    cell2.innerHTML = objs.parks[i].Address;
    let cell3 = row.insertCell(2);
    cell3.innerHTML = objs.parks[i].City;
    let cell4 = row.insertCell(3);
    cell4.innerHTML = objs.parks[i].State;
    let cell5 = row.insertCell(4);
    cell5.innerHTML = objs.parks[i].ZipCode;
    let cell6 = row.insertCell(5);
    cell6.innerHTML = objs.parks[i].Phone;
    if (objs.parks[i].Visit != undefined) {
        let cell7 = row.insertCell(6);
        cell7.innerHTML = '<a href="' + objs.parks[i].Visit + '">' + objs.parks[i].Visit + '</a>'
    }
    else {
        let cell7 = row.insertCell(6);
        cell7.innerHTML = "&nbsp;"
    }
    let cell8 = row.insertCell(7);
    cell8.innerHTML = objs.parks[i].Latitude + ", " + objs.parks[i].Longitude;
}





