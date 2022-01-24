import { BASE_USER_URL } from "./index";
const apiKey = '334H7SGhAEiIPqPfCg+pfA=='

// GET --------------------------------------------------------------------------------------------

async function getUser(username) {
    const response = await fetch(`${BASE_USER_URL}?username=${username}`);
    const data = await response.json();
    return data.find(x => x.username === username);
}

export let currentUser = null;

export async function apiUserLogin(username) {
    const user = await getUser(username)
    if (user) {
        currentUser = user
    } else {
        const result = await apiUserRegister(username);
        currentUser = result[1];
    }

    return currentUser;
}




//POST------------------------------------------------------------------------------------------
export async function apiUserRegister(username) {
    try {
        const config = {

            method: "POST",
            headers: {
                'X-API-Key': apiKey,
                "content-type": "application/json"
            },
            body: JSON.stringify({

                username,
                score: 0
            })
        }

        const response = await fetch(`${BASE_USER_URL}`, config);
        const data = await response.json();
        return [null, data];
    } catch (error) {
        console.log(error.message)
        return [error.message, null];
    }
}