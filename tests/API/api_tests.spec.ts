import {test,expect} from '@playwright/test'
const fs = require('fs');
import * as path from 'path';
import { environment } from '../../playwright.config';


function generateUniqueEmail(baseEmail) {
    const timestamp = new Date().getTime();
    const uniqueEmail = `${baseEmail.split('@')[0]}_${timestamp}@${baseEmail.split('@')[1]}`;
    return uniqueEmail;
}

const token = process.env.API_TOKEN;
const requestBodyPath = path.join(__dirname, `../../test-data/requestBody.json`)
const requestBody = JSON.parse(fs.readFileSync(requestBodyPath, 'utf8'));
let userId:number;

test.describe('CRUD test of user flow', () => {

test.beforeAll('Create a User using POST request @regression @api', async({request}) =>{
    
    const uniqueEmail = generateUniqueEmail(requestBody.email);
    requestBody.email =uniqueEmail
    const response = await request.post(`${environment.baseURLAPI}/public/v2/users`, {
        data: requestBody,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    expect(response.status()).toBe(201)

    const text = await response.text();
    expect(text).toContain(uniqueEmail)

    const postResponseBody = await response.json();
    userId = postResponseBody.id; 
    console.log(await response.json())

})

test('GET the user details using GET request @regression @api', async({request}) =>{

    const response = await request.get(`${environment.baseURLAPI}/public/v2/users/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    expect(response.status()).toBe(200)

    const text = await response.text();
    expect(text).toContain(requestBody.name)

    console.log(await response.json())

})

test('Update the user name using PUT request @regression @api', async({request}) =>{

    requestBody.name ="John Jacob"
    console.log(requestBody)

    const response = await request.put(`${environment.baseURLAPI}/public/v2/users/${userId}`, {
        data: requestBody,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    expect(response.status()).toBe(200)

    const text = await response.text();
    expect(text).toContain(requestBody.name)

    console.log(await response.json())

})

test('Remove the user using DELETE request @regression @api', async({request}) =>{

    const response = await request.delete(`${environment.baseURLAPI}/public/v2/users/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    expect(response.status()).toBe(204)

    const getResponse = await request.get(`https://gorest.co.in/public/v2/users/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    expect(getResponse.status()).toBe(404)

})

});