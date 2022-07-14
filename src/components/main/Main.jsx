import React, {useEffect, useState} from 'react';
import './main.scss';
import {useDispatch, useSelector} from "react-redux";
import { getRepos } from '../../actions/repos';
import Repo from '../repo/Repo';
import { setCurrentaPage } from '../../reducers/reposReducer';
import {createPages} from "../../utils/pagesCreator";

export default function Main() {
    const dispatch = useDispatch();
    // Получаем данные из reposReducer
    const repos = useSelector(state => state.repos.items); 
    const isFetching = useSelector(state => state.repos.isFetching);
    const isFetchError = useSelector(state => state.repos.isFetchError);
    const currentPage = useSelector(state => state.repos.currentPage);
    const perPage = useSelector(state => state.repos.perPage);
    const totalCount = useSelector(state => state.repos.totalCount);

    const [searchValue, setSearchValue] = useState("");

    const pagesCount = Math.ceil(totalCount / perPage);
    const pages = [];
    createPages(pages, pagesCount, currentPage)

    // При первом рендере страницы вызываем обновлённую getRepos
    useEffect(() => {
        dispatch(getRepos(searchValue, currentPage, perPage))
    }, [currentPage])

    function searchHandler() {
        dispatch(setCurrentaPage(1))
        dispatch(getRepos(searchValue, currentPage, perPage))
    }
    
    return (
        <div>
            { isFetchError &&
            <div>Error!</div>

            }
            <div className="search">
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="Input repo name" className="search-input" />
                <button onClick={() => searchHandler()} className="search-btn">Search</button>
            </div>
            {
                isFetching === false || isFetchError === true
                ?
                repos.map(repo => <Repo repo={repo} />)
                :
                <div className="fetching"></div>    
            }
            <div className="pages">
                {pages.map((page, index) => 
                    <span 
                        key={index} 
                        className={currentPage == page ? "current-page" : "page"}
                        onClick={() => dispatch(setCurrentaPage(page))}
                    >
                        {page}
                    </span>
                )}
            </div>
        </div>
    )
}
