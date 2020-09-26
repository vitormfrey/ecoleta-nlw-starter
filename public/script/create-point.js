function pupulateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
        for (const state of states){
            ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>` 
        }
    })
}
pupulateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` 
    fetch(url)
    .then(res => res.json())
    .then(citys => {
        for (const city of citys){
        citySelect.innerHTML +=`<option value ="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })

}

document
.querySelector("select[name=uf]")
.addEventListener("change",getCities)

// Itens de coleta
//pegar todos os LI

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelecedItem)
}
const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelecedItem(event){

    const  itemLi= event.target

    //add ou remover uma classe com JS
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    // console.log('ITEM ID: ', itemId)

    const alreadySelected =  selectedItems.findIndex(item =>{
        const itemFound = item == itemId
        return itemFound
    })

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else{
        selectedItems.push(itemId)
    }

    // console.log('selectedItem: ', selectedItems)

    collectedItems.value = selectedItems   

}