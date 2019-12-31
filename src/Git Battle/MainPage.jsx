import React from 'react';
import PopularRepos from './PopularRepos.jsx';
import BattlePage from './BattlePage';
import './CSS/MainPage.css';

export default class Main extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentPage : "PopularRepos"
        };
    }

    handleClickPopular(){
        this.setState({currentPage : "PopularRepos"});
    }

    handleClickBattle(){
        this.setState({currentPage : "Battle"});
    }

    renderPopular(){
        return (<PopularRepos/>);
    }

    handler(){
        this.setState({currentPage : "PopularRepos"});
    }

    renderBattle(){
        return (
            <BattlePage 
                className="BattlePage" 
                handler={() => this.handler()}
            >
            </BattlePage>);
    }

    render(){
        const currentPage = this.state.currentPage;
        return (
            <div className="Body">
                <div className="SelectionHeader">
                    <div
                    
                        className="HeaderOption"
                        onClick={() => this.handleClickPopular()}
                    >
                        Popular
                    </div>

                    <div 
                        className = "HeaderOption"
                        onClick={() => this.handleClickBattle()}
                    >
                        Battle
                    </div>
                </div>
                <div>
                    {(currentPage==="PopularRepos") ? this.renderPopular() : this.renderBattle()}
                </div>


            </div>
        );
    }

}