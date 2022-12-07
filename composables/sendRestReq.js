
export const sendRestReq = async (restURL, opts) => {
    try {
        const token = import.meta.env.VITE_STRAPI_TOKEN
        let res = await fetch(restURL, {
            method: "GET",
            // fetch options
            ...opts,
            headers: {
                Accept: "*/*",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        let result = await res.json();
        console.log(result);
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