import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js'

const appSettings = {
    databaseURL: "https://pwa-app-86df5-default-rtdb.asia-southeast1.firebasedatabase.app"
}
const app = initializeApp(appSettings)
const database = getDatabase(app);
const List = ref(database, 'list')
const checkedList = ref(database, 'Checked-list')

const inputDate = document.getElementById("input-field");
const addBtn = document.getElementById("add-btn");
const tagsList = document.getElementById("tag-lists");
const checkList = document.getElementById("check-lists")

addBtn.addEventListener("click", () => {
    let inputValue = inputDate.value;
    if (inputValue != '') {
        push(List, inputValue)
        clearInputDataField()
    }
})

onValue(List, function (snapshot) {
    const dbName = "list"
    tagsList.innerHTML = ''
    if (snapshot.exists()) {
        let tagArray = Object.entries(snapshot.val())
        for (let i = 0; i < tagArray.length; i++) {
            let currentlist = tagArray[i]
            if (currentlist == "")
                continue
            appendList(currentlist, dbName)
        }
    }

})
onValue(checkedList, function (snapshot) {
    const dbName = "Checked-list"
    checkList.innerHTML = ''
    if (snapshot.exists()) {
        let checkArray = Object.entries(snapshot.val())
        for (let i = 0; i < checkArray.length; i++) {
            let currentCheckList = checkArray[i]
            appendList(currentCheckList, dbName)
        }
    }
})


function appendList(currentList, dbName) {

    const listId = currentList[0]
    const listValue = currentList[1]

    const singleListContainer = document.createElement("div")

    const listContainer = document.createElement("div")
    listContainer.className = ("list-container")

    const checkBtn = document.createElement("button")


    checkBtn.className = ("check-btn")
    const listText = document.createTextNode(listValue)
    listContainer.appendChild(checkBtn)
    listContainer.appendChild(listText)

    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "✖"
    deleteBtn.className = ("delete-btn")

    singleListContainer.appendChild(listContainer)
    singleListContainer.appendChild(deleteBtn)
    if (dbName == "list") {
        singleListContainer.className = "single-list-container"
        checkBtn.innerText = "✔"
        tagsList.append(singleListContainer)
    } else {
        singleListContainer.className = "checked-list-container"
        checkBtn.innerText = "—"
        checkList.append(singleListContainer)
    }
    checkBtn.addEventListener("click", () => checkTogglebtn(listId, listValue))
    deleteBtn.addEventListener("click", () => deleteList(dbName, listId))
}

function clearInputDataField() {
    inputDate.value = ""
}

function checkTogglebtn(listId, listValue) {

    push(checkedList, listValue)
    deleteList(listId)
}

function deleteList(dbName, listId) {

    let remorelist = ref(database, `${dbName}/${listId}`)
    remove(remorelist)

}
