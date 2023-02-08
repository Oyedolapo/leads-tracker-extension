let myLeads = []

const inputEl = document.getElementById("input-el")

const inputBtn = document.getElementById("input-btn")

const ulEl = document.getElementById("ul-el")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

const deleteBtn = document.querySelector(".delete-btn")

const tabBtn = document.querySelector(".tab-btn")

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
   
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push( tabs[0].url )
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads) {
    let listItems = ""

    for (let i = 0; i < myLeads.length; i++) {
        listItems += `
         <li> 
           <a target='_blank' href='${leads[i]}'>
            ${leads[i]}
            </a>
         </li>
        `
        //listItems += "<li>" + myLeads[i] + "</li>"
    }
    ulEl.innerHTML = listItems

}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    
})




