import React, {useState, useEffect} from 'react';
import {  useNavigate, useParams } from "react-router-dom";
import {getCurrentRepos} from "../../actions/repos";
import {getContributors} from "../../actions/repos"
import './card.scss';

export default function Card() {
    const {username, reponame} = useParams(); // Получение определенных частей из URL запроса
    const [repo, setRepo] = useState({owner: {}});
    const [contributors, setContibutors] = useState([])

    useEffect(() => {
        getCurrentRepos(username, reponame, setRepo);
        getContributors(username, reponame, setContibutors);
    }, [])

    const navigate = useNavigate(); // Для возвращение на предыдущую страницу 

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            <div className="card">
                <img src={repo.owner.avatar_url} alt="" />
                <div className="name">{repo.name}</div>
                <div className="stars">{repo.stargazers_count}</div>
            </div>
            {contributors.map((c, index) => 
                <div>{index + 1}. {c.login}</div>
            )}
        </div>
    )
}
