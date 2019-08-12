"use strict";

// Function will determine the total bill at a car rental center based on user input
function getTotalBill()
{
    let price = 0;
    
    let numDays = document.getElementById("numDays").value;
    if (numDays < 1)
    {
        alert("You must rent a car for at least one day")
        return;
    }

    const rental = document.getElementById("carType");
    let rentalPrice;
    if (rental.selectedIndex == 0)
    {
        rentalPrice = 29.99;
    }
    else if (rental.selectedIndex == 1)
    {
        rentalPrice = 39.99;
    }
    else if (rental.selectedIndex == 2)
    {
        rentalPrice = 49.99;
    }
    else
    {
        rentalPrice = 59.99;
    }

    let rentalCost = numDays * rentalPrice
    price += rentalCost

    let tollTagCost = 0;

    let tollTag = document.getElementById("tollTag").checked;
    if (tollTag)
    {
        tollTagCost = numDays * 3.95
        price += tollTagCost
    }

    let gpsCost = 0;

    let gps = document.getElementById("gps").checked;
    if (gps)
    {
        gpsCost = numDays * 2.95
        price += gpsCost
    }

    let roadsideAssistCost = 0;

    let roadsideAssist = document.getElementById("roadsideAssist").checked;
    if (roadsideAssist)
    {
        roadsideAssistCost = numDays * 2.95
        price += roadsideAssistCost
    }

    let optionalTotal = tollTagCost + gpsCost + roadsideAssistCost;

    let under25Cost = 0;
    if (document.getElementById("over25").checked)
    {
        under25Cost = 0
        price += 0
    }
    else
    {
        under25Cost = price * .3
        price += under25Cost
    }

    let pickupDate = new Date(document.getElementById("pickupDate").value);
    if (isNaN(pickupDate))
    {
        alert("Please Select a Pickup Date")
        return;
    }
    let msec_per_day = 1000 * 60 * 60 * 24;
    let elapsedTime = msec_per_day * numDays;
    let endDate = Date.parse(pickupDate);
    let dropoffDate = new Date(elapsedTime + endDate);


    const dateField = document.getElementById("dropoffDate")
    dateField.value = dropoffDate;

    const rentalField = document.getElementById("rentalCost");
    rentalField.value = "$ " + rentalCost.toFixed(2);

    const optionalField = document.getElementById("optionalCharges");
    optionalField.value = "$ " + optionalTotal.toFixed(2);

    const surchargeField = document.getElementById("under25Charge");
    surchargeField.value = "$ " + under25Cost.toFixed(2);

    const priceField = document.getElementById("totalBill");
    priceField.value = "$ " + price.toFixed(2);
}

window.onload = function()
{
    const btn = document.getElementById("getPrice")
    btn.onclick = getTotalBill;
}