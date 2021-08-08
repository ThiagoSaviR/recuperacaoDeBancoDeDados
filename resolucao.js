/*
Teste de processo seletivo - Estágio em Web Development
Desenvolvido por Thiago Ribeiro
*/

// Resolução dos problemas encontrados no banco de dados corrompido

// Constante que recebe os dados do broken-database.json
const data = require('./broken-database.json')

// Constantes que vão ajustar o banco de dados
const correctName = []
const correctPrice = []
const correctQuantity = []

// função para ajuste dos Nomes dos itens
for (item of data){
    correctName.push({ ...item, name: item.name
        .replace(/æ/g, 'a')
        .replace(/ß/g, 'b')
        .replace(/¢/g, 'c')
        .replace(/ø/g, 'o')
    })
}

// função para passar todos os itens PRICE de String para Number
for (item of correctName){
    correctPrice.push({ ...item, price: Number(item.price)
    }) 
}

//função que adiciona o item QUANTITY com valor 0 
for (item of correctPrice){
    correctQuantity.push({ ...item, quantity: item.quantity? item.quantity : 0
    })
}

// Constante que consolida todo o tratamento do banco de dados corrompido
const finalData = correctQuantity 

// Função que converte para .JSON e salva o conteúdo da variável finalData em um aquivo "saida.json"
const fs = require('fs')
fs.writeFile('saida.json', JSON.stringify(finalData, null, '\t'), function(err, result) {
   if(err) console.log('error', err)
   else console.log("Corrected Data!")
})

// VALIDAÇÃO

/* Função que imprime os produtos ordenados por CATEGORY 
e nos casos de mais de um produto da mesma categoria ordena por ID */ 
finalData.sort((obj1, obj2) => {
    if(obj1.category > obj2.category) return 1
    if(obj1.category < obj2.category) return -1 
    || (obj1.id - obj2.id)
    return 0

})   
console.log(JSON.stringify(finalData, null, '\t'))

// Função que imprime o PRICE acumulado de cada CATEGORY

const name = []
const value = []

for(i in finalData){ 
    if(!name.includes(finalData[i].category)){ 
        name.push(finalData[i].category) && 
        value.push(finalData[i].quantity * finalData[i].price)
    } else{
        value[name.lastIndexOf(finalData[i].category)] += finalData[i].quantity * finalData[i].price
    }
}
var totalValueByCategory = {}

value.forEach((j, i) => totalValueByCategory[name[i]] = j);  

console.log(JSON.stringify(totalValueByCategory, null, '\t'))
