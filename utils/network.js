

export const getApiResource = async (url) => {
   
    try{
        const res = await fetch(url);

        if(!res.ok){
            console.error('could not fetch', res.status);
            return false;
        }

        return await res.json();

    }
    catch (error){
        console.error('could not fetch');
        return false;
    }

}


// getApiResource(KITSU_ROOT + KITSU_MANGA)
//     .then(body =>console.log(body))


// (async () => {
//     const body = await getApiResource(KITSU_ROOT + KITSU_MANGA);
//     console.log(body);
// })();