class Population
{

    constructor(ID_Nation, Nation, ID_Year, Year, Population, Slug_Nation)
    {
        this.ID_Nation = ID_Nation;
        this.Nation = Nation;
        this.ID_Year = ID_Year;
        this.Year = Year;
        this.Population = Population;
        this.Slug_Nation = Slug_Nation;
    }
}

class Base
{
    List = [];

    AddData(data)
    {
        for(let i = 0; i < data.length; i++)
        {
            this.List.push(new Population(
                data[i]["ID Nation"],
                data[i]["Nation"],
                data[i]["ID Year"],
                data[i]["Year"],
                data[i]["Population"],
                data[i]["Slug Nation"]
            ));
        }
    }

    WriteData()
    {
        this.List.forEach(element => {
            console.log(element);
        });
    }
}

const Request = new XMLHttpRequest();
const BaseData = new Base();

Request.open("GET", "https://datausa.io/api/data?drilldowns=Nation&measures=Population");
Request.responseType = "json";
Request.send();


Request.onload = (e) => {
    const resp = Request.response.data;
    BaseData.AddData(resp);
};
Request.addEventListener("progress", updateProgress);
Request.addEventListener("load", transferComplete);
Request.addEventListener("error", transferFailed);
Request.addEventListener("abort", transferCanceled);



function updateProgress(event) {
    if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
    } else {
    
    }
}

function transferComplete() {
    console.log("The transfer is complete.");
    BaseData.WriteData();
}

function transferFailed() {
    console.log("An error occurred while transferring the file.");
}

function transferCanceled() {
    console.log("The transfer has been canceled by the user.");
}