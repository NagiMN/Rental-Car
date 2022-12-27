
var output="";
var r;

function getCarRental()
{
    clearSearch();
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("displayRentalPage").innerHTML = xhr.responseText;
            setTimeout(loadData(),2000);
        }
    };
    xhr.open("GET", "rental.html", true);
    xhr.send();
}

function clearSearch()
{
    document.getElementById("boxed").innerHTML = "";
}

function dateANDtime()
{
    //date formatting
    var current_datetime = new Date()
    var formatted_date = "Date: " + current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
        + " / Time: " + current_datetime.getHours() + ":" +current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
    document.getElementById("dtfield").innerHTML = formatted_date;
}

var xhr1 = new XMLHttpRequest();
/*window.onload = loadData;*/
var r;
function loadData()
{
    document.getElementById("lastName").addEventListener("keyup", function() { displayFullName(this.value);},false);
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState == 4 && xhr1.status == 200) {
            r = JSON.parse(xhr1.responseText);
        }
    };
    xhr1.open("GET", "rentalclients.json", true);
    xhr1.send();
}

function displayFullName(lastName_temp)
{
    var search;
    for (var i = 0; i < r.length; i++) {
        var obj = r[i];
        search = obj.last_name;
        if (search.startsWith(lastName_temp)) {

            output += "<option value='"+i+"' >";
            output += obj.first_name;
            output += " ";
            output += obj.last_name;
            output += "</option>";
            output += "<br>";

            document.getElementById("firstName").value = obj.first_name;
            document.getElementById("lastNames").value = obj.last_name;
            document.getElementById("address").value = obj.address;
            document.getElementById("province").value = obj.state_prov;
            document.getElementById("email").value = obj.email;
            document.getElementById("phone").value = obj.phone;
        }
    }
    document.getElementById("boxed").innerHTML = output;
}

function getRentCalculate()
{
    var rentForDays = document.getElementById("rentFor").value;
    var optionRent1=0;
    var optionRent2=0;
    var finalTotal=0;
    var type=0;
    var message="";
    var totalvalue = 0;
    var resultmessage="";

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var address = document.getElementById("address").value;
    var province = document.getElementById("province").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    message = ( message + "<br>" + "Full name: " + firstName + " " + lastName);
    message = ( message + "<br>" + "Address: " + address);
    message = ( message + "<br>" + "Province: " + province);
    message = ( message + "<br>" + "Email Address: " + email);
    message = ( message + "<br>" + "Phone number: " + phone);
    message = ( message + "<br>");

    var rentType = document.querySelector('input[name=carType]:checked').value;
    if ( rentType == '15') {
        type = (rentType * rentForDays);
        finalTotal += type;
        message = ( message + "<br>" + " Compact - $15/day");
    } else if ( rentType == '20') {
        type = ( rentType * rentForDays);
        finalTotal += type;
        message = ( message + "<br>" + " Mid-size - $20/day");
    } else if ( rentType == '35') {
        type = (rentType * rentForDays);
        finalTotal += type;
        message = ( message + "<br>" + " Luxury - $35/day");
    } else if ( rentType == '40') {
        type = (rentType * rentForDays);
        finalTotal += type;
        message = ( message + "<br>" + " Van/Truck - $40/day");
    }

    if(document.querySelector('input[name=roofRack]:checked'))
    {
        optionRent1 = document.querySelector('input[name=roofRack]:checked').value;
        finalTotal += (optionRent1 * rentForDays);
        message = (message + "<br>" + "Roof Rack or Bike Rack - Extra $5/day");
    }

    if(document.querySelector('input[name=GPS]:checked'))
    {
        optionRent2 = document.querySelector('input[name=GPS]:checked').value;
        finalTotal += (optionRent2 * 1);
        message = ( message + "<br>" + "GPS - Extra $10")
    }

    if(document.querySelector('input[name=childSeat]:checked')){
        message = ( message + "<br>" + "Child Seat - Free");
    }

    totalvalue += finalTotal;
    resultmessage += (message + "<br>" + "Number of Days: " + rentForDays + "<br><br>" + "Total Cost: $" + totalvalue);
    document.getElementById("displayRentCalculate").innerHTML = resultmessage;
}

function controlForm(checkform) {

    var obj = r[checkform];
    document.getElementById("firstName").value = obj.first_name;
    document.getElementById("lastNames").value = obj.last_name;
    document.getElementById("address").value = obj.address;
    document.getElementById("province").value = obj.state_prov;
    document.getElementById("email").value = obj.email;
    document.getElementById("phone").value = obj.phone;

    document.getElementById("firstName").disabled = false;
    document.getElementById("lastNames").disabled = false;
    document.getElementById("address").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("phone").disabled = false;
    document.getElementById("province").disabled = false;

    document.getElementById("type1").disabled = false;
    document.getElementById("type2").disabled = false;
    document.getElementById("type3").disabled = false;
    document.getElementById("type4").disabled = false;
    document.getElementById("roofRack").disabled = false;
    document.getElementById("GPS").disabled = false;
    document.getElementById("childSeat").disabled = false;
    document.getElementById("rentFor").disabled = false;
    document.getElementById("rentNow").disabled = false;

}