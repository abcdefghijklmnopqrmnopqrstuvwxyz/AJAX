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

    * WriteData(index)
    {
        yield this.List[index];
    }
}

const progress = document.getElementById("progress");
const cards = document.getElementById("cards");
const tablehead = document.getElementById("head");
const tablebody = document.getElementById("body");
const stat = document.getElementById("status");
const Request = new XMLHttpRequest();
const BaseData = new Base();

Request.onload = () => {
    BaseData.AddData(Request.response.data);
    visualizeCard();
    visualizeTable();
};
Request.addEventListener("progress", updateProgress);
Request.addEventListener("load", transferComplete);
Request.addEventListener("error", transferFailed);
Request.addEventListener("abort", transferCanceled);

Request.open("GET", "https://datausa.io/api/data?drilldowns=Nation&measures=Population");
Request.responseType = "json";
Request.send();

function updateProgress(event) {
    if (event.lengthComputable) {
        progress.innerHTML += (event.loaded / event.total) * 100;
    } else {
        progress.innerHTML += "Progress is not computable.";
    }
}

function transferComplete() {
    stat.innerHTML += "The transfer is complete.";
}

function transferFailed() {
    stat.innerHTML += "An error occurred while transferring the file.";
}

function transferCanceled() {
    stat.innerHTML += "The transfer has been canceled by the user.";
}

function visualizeCard() {
    for(var x in BaseData.List)
    {
        let card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("mx-2");
        let cardbody = document.createElement("div");
        cardbody.classList.add("card-body");
        let h5 = document.createElement("h4");
        h5.classList.add("card-title");
        h5.innerHTML = "Data item " + x;
        let div = document.createElement("div");
        div.classList.add("d-block");

        for(var y in BaseData.List[x])
        {
            let p = document.createElement("p");
            p.classList.add("card-text");
            p.innerHTML = y + ": " + BaseData.List[x][y];
            div.appendChild(p);
        }

        cardbody.appendChild(h5);
        cardbody.appendChild(div);
        card.appendChild(cardbody);
        cards.appendChild(card);
    }
}

function visualizeTable() {
    for(let i = BaseData.List.length - 1; i < BaseData.List.length; i++)
    {
        for(var x in BaseData.List[i])
        {
            let th = document.createElement("th");
            th.setAttribute("scope", "col");
            th.innerHTML = x;
            tablehead.appendChild(th);
        }
    }

    for(var x in BaseData.List)
    {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.innerHTML = x;
        tr.appendChild(th);

        for(var y in BaseData.List[x])
        {
            let td = document.createElement("td");
            td.innerHTML = BaseData.List[x][y];
            tr.appendChild(td);
        }

        tablebody.appendChild(tr);
    }
}
