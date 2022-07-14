const SET_REPOS = "SET_REPOS";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_ERROR_FETCHING = "SET_ERROR_FETCHING";

const defaultState = {
    items: [],
    isFetching: true, // загрузка 
    currentPage: 1, // текущая страница 
    perPage: 10, // сколько репозиторией на одной странице 
    totalCount: 0, // все полученные от GitHub репозитории 
    isFetchError: false // ошибки 

}

export default function reposReducer(state = defaultState, action){
    switch(action.type){
        case SET_REPOS:
            return {
                ...state,
                items: action.payload.items,
                totalCount: action.payload.total_count,
                isFetching: false // т.к вызываем после того как запрос выполниться 
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case SET_ERROR_FETCHING:
            return {
                ...state,
                isFetchError: action.payload
            }
        default:
            return state
    }
}

/* Action Creators */
export const setRepos = (repos) => ({type: SET_REPOS, payload:repos})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload:bool})
export const setCurrentaPage = (page) => ({type: SET_CURRENT_PAGE, payload:page})
export const setFetchError = (bool) => ({type: SET_ERROR_FETCHING, payload:bool})

