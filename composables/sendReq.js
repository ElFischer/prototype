// ./composables/sendReq.js

// function to send requests
// pass GraphQL URL and request options
export const sendReq = async (graphqlURL, opts) => {
    try {
        const session = useSession();
        let headersList
        if (session.value.data) {
            console.log(session.value)
            headersList = {
                Accept: "*/*",
                Authorization: `Bearer ${session.value.data?.jwt}`,
                "Content-Type": "application/json",
            };
        } else {
            headersList = {
                Accept: "*/*",
                "Content-Type": "application/json",
            };
        }
        let res = await fetch(graphqlURL, {
            method: "POST",
            // fetch options
            ...opts,
            headers: headersList
        });
        let result = await res.json();
        /* console.log(result); */
        // Handle request errors
        if (result.errors) {
            result.errors.forEach((error) => alert(error.message));
            // Throw an error to exit the try block
            throw Error(JSON.stringify(result.errors));
        }
        // save result response to page data state
        return result.data;
    } catch (error) {
        console.log(error);
        return {
            errors: error,
        };
    }
}