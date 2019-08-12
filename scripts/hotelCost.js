"use strict"

// Array that stores the pricing info of our hotel
let priceList =
[
    {room: "Queen", capacity: 5, highrate:250, price:150},
    {room: "King", capacity: 2, highrate: 250, price:150},
    {room: "King Suite", capacity: 4, highrate: 310, price:190},
    {room: "2-Bedroom Suite", capacity: 6, highrate: 350, price:210}
]

/* Helper function to determine if the room can hold the customers
*
* @param roomType (Number) - number representing the user's room selection
* @param numAdults (Number) - the number of adults staying at the hotel
* @param numKids (Number) - the number of children staying at the hotel
* @param roomCapacity (Number) - the max occupancy of the user selected room
* @param numTenants (Number) - the total number of guests staying at the hotel
*
*/
function canRoomHoldCustomer(roomType, numAdults, numKids)
{
    // roomType calls the user input for the desired room
    let roomCapacity = priceList[roomType].capacity
    
    // the following if statements validate whether good data was entered by the user
    if (numAdults < 1)
    {
        alert("At least one adult must be present")
        return;
    }
    if (numKids < 0)
    {
        alert("Please enter a valid number of children")
        return;
    }
    let numTenants = numAdults + numKids;
    if (numTenants < 1)
    {
        alert("At least one tenant must be entered")
        return;
    }
    if (roomCapacity < numTenants)
    {
        document.getElementById("occupantAlert").style.display = "block"
        return;
    }
    else 
    {
        document.getElementById("occupantAlert").style.display = "none"
    }
}

/* This helper function determines the cost of the room
*
* @param roomType (Number) - number representing the user's room selection
* @param checkInDate (Number) - user selected date of check-in
* @param numNights (Number) - the number of nights the customer will be staying
* @param roomPrice (Number) - cost of a given room for a single night
* @param roomCost (Number) - total cost of just the room choice
*
*/
function getRoomCost(roomType, checkInDate, numNights)
{
    // roomPrice pulls the per night cost of the room from the array
    let roomPrice = priceList[roomType].price;
    let roomCost = roomPrice * numNights;
    return roomCost;    
}

/* This helper function determines the cost of breakfast for the customer
*
* @param numAdults (Number) - the number of adults staying at the hotel
* @param numKids (Number) - the number of children staying at the hotel
* @param numNights (Number) - the number of nights the customer will be staying
* @param discountType (Number) - a number that represents the selected discount on the form
* @param adultBf (Number) - the cost of breakfast for all adults for one night
* @param kidBf (Number) - the cost of breakfast for all children for one night
* @param breakfastCost - total cost of breakfast for the customer
*
*/
function getBreakfastCost(numAdults, numKids, numNights, discountType)
{
    let adultBf = numAdults * 6.96;
    let kidBf = numKids * 3.95;
    let breakfastCost = (adultBf + kidBf) * numNights
    if (discountType == 1)
    {
        breakfastCost = 0;
    }
    return breakfastCost;
}

/* This helper function determines the total discount amount
* 
* @param roomCost (Number) - total cost of just the room choice
* @param discountType (Number) - a number that represents the selected discount on the form
* @param discountRate (Number) - actual decimal value of the given discount
* @param discount (Number) - the product of the discount % and the room cost
*
*/
function getDiscount(roomCost, discountType)
{
    let discountRate = 0;
    if (discountType == 0)
    {
        discountRate = .1;
    }
    else if (discountType == 1)
    {
        discountRate = .1;
    }
    else if (discountType == 2)
    {
        discountRate = .2;
    }
    else
    {
        discountRate = 0;
    }
    let discount = roomCost * discountRate;
    return discount;
}

// Master function that runs when the button is clicked
function processEstimate()
{
    // variable parameters that are pulled from the user input fields
    let numAdults = Number(document.getElementById("numAdults").value); 
    let numKids = Number(document.getElementById("numKids").value);
    const room = document.getElementById("roomType");
    let roomType = room.selectedIndex;

    // helper function that determines whether a valid combo of occupants and room selection
    // was entered
    canRoomHoldCustomer(roomType, numAdults, numKids);

    // variable parameters that are pulled from the user input fields    
    let numNights = document.getElementById("numNights").value;
    if (numNights < 0 || numNights > 28)
    {
        alert("Visit must be between 1 and 28 days")
        return;
    }

    // variables used in calculating dates
    let timeZoneOffset = 1000 * 60 * 60 * 4
    let msec_per_day = 1000 * 60 * 60 * 24
    let startTime = new Date(document.getElementById("checkInDate").value)
    let startDate = Date.parse(startTime)
    let checkInDate = new Date(startDate + timeZoneOffset);
    let elapsedTime = msec_per_day * numNights
    let checkOutDate = new Date(elapsedTime + startDate + timeZoneOffset)

    
    if (isNaN(checkInDate))
    {
        alert("Please Select a check-in Date")
        return;
    }

    // assigns the room cost that was calculated in our helper function to a variable
    let roomCost = getRoomCost(roomType, checkInDate, numNights)

    // series of if statements determine which discount is being applied
    let discountType;
    if (document.getElementById("aaa").checked)
    {
        discountType = 0;
    }
    else if (document.getElementById("senior").checked)
    {
        discountType = 1;
    }
    else if (document.getElementById("military").checked)
    {
        discountType = 2;
    }
    else
    {
        discountType = 3;
    }

    // determines if breakfast is selected and the price of breakfast
    let breakfastCost = 0;
    if (document.getElementById("breakfast").checked)
    {
        breakfastCost = getBreakfastCost(numAdults, numKids, numNights, discountType);
    }

    // assigns value of the discount to a variable
    let totalDiscount = getDiscount(roomCost, discountType)

    // Relevant pricing info is assigned to variables
    let subtotal = roomCost + breakfastCost;
    let tax = (subtotal - totalDiscount) * .12
    let totalCost = subtotal - totalDiscount - tax

    

    // pushes the check-in date into the output field on the form
    const checkInField = document.getElementById("checkIn");
    checkInField.value = checkInDate;

    // pushes the check-out date into the output field on the form
    const checkOutField = document.getElementById("checkOut");
    checkOutField.value = checkOutDate;

    // pushes the subtotal into the output field on the form
    const subtotalField = document.getElementById("subtotal");
    subtotalField.value = "$ " + subtotal.toFixed(2);

    // pushes the discount into the output field on the form
    const discountField = document.getElementById("totalDiscount");
    discountField.value = "$ " + totalDiscount.toFixed(2);

    // pushes the tax into the output field on the form
    const taxField = document.getElementById("tax");
    taxField.value = "$ " + tax.toFixed(2);

    // pushes the the final cost into the output field on the form
    const totalCostField = document.getElementById("totalHotelCost");
    totalCostField.value = "$ " + totalCost.toFixed(2);


}



window.onload = function()
{
    const btn = document.getElementById("getPrice")
    btn.onclick = processEstimate;
}