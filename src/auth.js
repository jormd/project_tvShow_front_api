export default class AuthHelperMethods {

    setAuthentificate = authen  =>{
        return localStorage.setItem("authentificate",authen);
    };
    getAuthentificate = () => {
        return localStorage.getItem("authentificate");
    };
    setToken = idToken => {
        // Saves user token to localStorage
        localStorage.setItem("id_token", idToken);
    };

    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem("id_token");
    };

    getId = () => {
        return localStorage.getItem('id_user');
    };

    setId = id => {
        return localStorage.setItem('id_user', id);
    };
}