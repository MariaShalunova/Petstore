const fs = require('fs');
const path = require('path');
const csvToObj = require('csv-to-js-parser').csvToObj;

const filePath = path.join(__dirname, '../data/store.e2e.data.txt');


function getDataFromFile () {
//Метод fs.readFileSync() - чтение файла и возврат его содержимого
const data = fs.readFileSync(filePath, 'utf8').toString();

//Описание таблицы на вход csvToObj
const description = 
{
    id:         {type: 'number', group: 1},
    quantity:   {type: 'number', group: 2},
    complete:   {type: 'boolean', group: 3}
};

//File → в массив объектов JavaScript, выбрать разделитель'|'
return csvToObj(data, '|', description);
}
//console.log(getDataFromFile ());

module.exports.file = getDataFromFile;