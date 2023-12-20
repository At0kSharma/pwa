import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js'

const appSettings = {
    databaseURL: "https://pwa-app-86df5-default-rtdb.asia-southeast1.firebasedatabase.app"
}
const app = initializeApp(appSettings)
const database = getDatabase(app);
const List = ref(database, 'list')


const inputDate = document.getElementById("input-field");
const addBtn = document.getElementById("add-btn");
const tagsList = document.getElementById("tag-list");

addBtn.addEventListener("click", () => {
    let inputValue = inputDate.value;

    push(List, inputValue)
    clearInputDataField()
})

onValue(List, function (snapshot) {
    let tagArray = Object.values(snapshot.val())
    tagsList.innerHTML = ''
    for (let i = 0; i < tagArray.length; i++) {
        let currentBook = tagArray[i]
        if (currentBook == "")
            continue
        appendTagList(currentBook)
    }
})


function appendTagList(inputValue) {
    tagsList.innerHTML += `<li>${inputValue}</li>`
}

function clearInputDataField() {
    inputDate.value = ""
}

