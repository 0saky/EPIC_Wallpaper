let available;
let date = new Date(Date.now());
let again = false;
let _URL;

function writeDate(char){
    let lang = "en-US";
        let write = "";
        let options1 = { timeZone: "UTC", year: "numeric" };
        write += new Intl.DateTimeFormat(lang, options1).format(date) + char;
       
        let options2 = { timeZone: "UTC", month: "2-digit" };
        write += new Intl.DateTimeFormat(lang, options2).format(date) + char;
        
        let options3 = { timeZone: "UTC", day: "2-digit" };
        write += new Intl.DateTimeFormat(lang, options3).format(date);
    return write;
}

async function getAvailable() {
    do {
        
        const write = writeDate("-");
        _URL = "https://epic.gsfc.nasa.gov/api/natural/date/" +write+ "?api_key=oBTCvFs4VtUpgM23uXlPuOi5uxK7WEfgKjDbJvys";
        console.log("URL-tested", _URL);
        const response = await fetch(_URL);

        available = await response.json();
        
        if (available.length == 0) {

            again = true;
            date.setDate(date.getDate() - 1);
           // console.log("New Date: ", date);
        } else {
            again = false;
        }


    } while (again);

    console.log("Date of most recent: ", date);
    const imagename = available[available.length - 1].image;
    const write = writeDate("/");
    var myImage = new Image();
    myImage.src = 'https://epic.gsfc.nasa.gov/archive/natural/'+write+'/png/' + imagename + '.png';
    myImage.height = window.innerHeight;
    myImage.style = "";
    document.body.style = "margin: 0px; background: black";
    //myImage.style = "margin: 0px";
    document.getElementById("uro").appendChild(myImage);
}


getAvailable();

//every day at 12am UTC//or when started check for availlaibility if not checked every hour;

//make gif of 13 last images;