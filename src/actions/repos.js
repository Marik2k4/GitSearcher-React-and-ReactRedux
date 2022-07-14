import axios from 'axios';
import {setFetchError, setIsFetching, setRepos} from '../reducers/reposReducer';

export const getRepos = (searchQuery = "stars:%3E1", currentPage, perPage) => {
    if(searchQuery == "") {
        searchQuery = "stars:%3E1"
    }
    return async (dispatch) => {
        try {
            // до выполнения запроса isFetching = true 
            dispatch(setIsFetching(true))
            const response = await axios.get(`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&per_page=${perPage}&page=${currentPage}`);
            dispatch(setRepos(response.data)) // отправляем в reposReducer в setRepos
        } catch(e){
            dispatch(setFetchError(true))
            setTimeout(() => {
                dispatch(setFetchError(false))
            }, 2000)
        }
    }
}

export const getCurrentRepos = async (username, repoName, setRepo) => {
   const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
   setRepo(response.data); // что получили с сервера 
} 

export const getContributors = async (username, repoName, setContibutors) => {
    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/contributors?page=18&per_page=10`);
    setContibutors(response.data); // что получили с сервера 
} 