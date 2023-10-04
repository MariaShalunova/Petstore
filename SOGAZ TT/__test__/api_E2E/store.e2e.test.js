const request = require('supertest');
const readFile = require('../helper/ReadFile.js');
const testData = require('../helper/TestData.js');

describe.each(readFile.file())('STORE | Позитивный e2e тест', ({id, quantity, complete}) => {   
    
    test('Создание заказа | POST status 200', async() => {
        const requestBody = {
            "id": id,
            "quantity": quantity,
            "complete": complete
        }

        const response = await request(testData.baseUrl)
            .post(`/store/order`)
            .send(requestBody)

        expect(response.status).toBe(200);
        // Проверка полученных данных c отправленными
        expect(id).toEqual(response.body.id);
        expect(quantity).toEqual(response.body.quantity);
        expect(complete).toEqual(response.body.complete);
    });
   
    test(`Получение заказа ${id} | GET status 200`, async() => {
        const response = await request(testData.baseUrl)
            .get(`/store/order/${id}`)

        expect(response.status).toBe(200);
        // Проверка полученных данных c отправленными
        expect(id).toEqual(response.body.id);
        expect(quantity).toEqual(response.body.quantity);
        expect(complete).toEqual(response.body.complete);
    });

    test(`Удаление заказа ${id} | DELETE status 200 `, async() => {
        const response = await request(testData.baseUrl)
            .delete(`/store/order/${id}`)

        expect(response.status).toBe(200);

    });

    test(`Проверка удаления заказа ${id} | GET status 200`, async() => {
        const response = await request(testData.baseUrl)
            .get(`/store/order/${id}`)

        expect(response.status).toBe(404);
        expect(response.text).toContain('Order not found');
    });
});