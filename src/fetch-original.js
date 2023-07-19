export const fetchData = async (endpoint, accessToken) => {

    const headers = new Headers() ;
    const bearer = `Bearer ${accessToken}`;
    headers.append("Authorization", bearer);

    const options ={
        method: "GET",
        headers: headers
    };

    try {
        const response = await fetch(endpoint, options);
        return await response.json();
    } catch (error) {
        return console.log(error);
    }
}