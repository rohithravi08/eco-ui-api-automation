import {test,expect} from '@playwright/test'
const fs = require('fs');
import * as path from 'path';
import { environment } from '../../playwright.config';


function generateUniqueEmail(baseEmail) {
    const timestamp = new Date().getTime();
    const uniqueEmail = `${baseEmail.split('@')[0]}_${timestamp}@${baseEmail.split('@')[1]}`;
    return uniqueEmail;
}
//Bearer token from the command line
const token = process.env.API_TOKEN;
//Reading the request body file from test-data folder
const requestBodyPath = path.join(__dirname, `../../test-data/requestBody.json`)
const requestBody = JSON.parse(fs.readFileSync(requestBodyPath, 'utf8'));
let userId:number;

test.describe('CRUD test of user flow', () => {

test.beforeAll('Create a User using POST request @regression @api', async({request}) =>{
    
    //generate unique email for every POST request
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
    //verify response contains the unique email id used in the request
    const text = await response.text();
    expect(text).toContain(uniqueEmail)

    //store the userid in a global variable
    const postResponseBody = await response.json();
    userId = postResponseBody.id; 

})

test('GET the user details using GET request @regression @api', async({request}) =>{

    const response = await request.get(`${environment.baseURLAPI}/public/v2/users/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    expect(response.status()).toBe(200)
    //verify response contains the name used in the request
    const text = await response.text();
    expect(text).toContain(requestBody.name)

})

test('Update the user name using PUT request @regression @api', async({request}) =>{

    requestBody.name ="John Jacob"
    const response = await request.put(`${environment.baseURLAPI}/public/v2/users/${userId}`, {
        data: requestBody,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    expect(response.status()).toBe(200)
    //verify response contains the updated name used in the request
    const text = await response.text();
    expect(text).toContain(requestBody.name)

})

test('Remove the user using DELETE request @regression @api', async({request}) =>{

    const response = await request.delete(`${environment.baseURLAPI}/public/v2/users/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    expect(response.status()).toBe(204)

    //verify whether the user details are available or not after deleting the details
    const getResponse = await request.get(`https://gorest.co.in/public/v2/users/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    expect(getResponse.status()).toBe(404)

})

});