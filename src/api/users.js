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
    if (!user) {
        return false;
    }
    currentUser = user
    return true;
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
                score
            })
        }

        const response = await fetch(`${BASE_USER_URL}`, config);
        const { data } = await response.json();
        console.log(data)
        return [null, data];
    } catch (error) {
        return [error.message, null];
    }
}