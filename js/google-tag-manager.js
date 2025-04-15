class TagManagerService{
    static sendEvent = (eventName, params = {}) => {
        try{
            window.dataLayer?.push({
                event:eventName,
                ...params
            })
        }
        catch(e){
            console.error("Error enviando evento a GTM:", e)
        }
    }
}
