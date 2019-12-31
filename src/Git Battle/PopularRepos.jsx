import React from 'react';
import Node from './Node.jsx';
import './CSS/PopularRepos.css';

export default class Main extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : null,
            currentPage : "all"
        };
        this.renderGridData("all");
    }

    renderGridData(language){
        async function fetchData(){
            let link = "https://github-trending-api.now.sh/repositories";
            if(language !== "all"){
                link = link + "?language=" + language;
            }
            try{
                let response = await fetch(link);
                let responseJson = await response.json();
                return responseJson;
            }
            catch(error){
                console.log(error);
            }
        }
        fetchData().then((data) => {
            console.log(data);
            this.setState({
                data: data,
                currentPage : language
            });
        });
    }

    renderGrid(){
        const data = this.state.data;
        if(data === null){
            return; 
        }

        let totalNodes = Math.min(25, data.length);
        let nodes = [];

        // let nodes = new Array() is not used, bcz it adds null
        // values, and nodes.map() operation cannot be performed.
        for(let i=0; i<totalNodes; i++){
            nodes.push(i);
        }

        return nodes.map((node, nodeIdx) => {
            console.log(data[nodeIdx]);
            return(
                <Node 
                    // +1 since nodeIdx starts with 0
                    gridNo = {nodeIdx+1}
                    // name = {data[nodeIdx].username}
                    author = {data[nodeIdx].author}
                    avatar = {data[nodeIdx].avatar}
                    url = {data[nodeIdx].url}
                    description = {data[nodeIdx].description}
                    currentPeriodStars = {data[nodeIdx].currentPeriodStars}
                    language = {data[nodeIdx].language}
                ></Node>
            );
        });
    }

    getClassName(currentPage){
        if(currentPage === this.state.currentPage){
            return "LanguageIsCurrent";
        }
        return "Language";
    }
    
    

    render(){
        return(
            <div className="BodyPopularRepos">
                <div className="LanguagesList">
                    <div
                        className = {this.getClassName("all")}
                        onClick={() => {this.renderGridData("all")}}
                    >   
                        All
                    </div>

                    <div 
                        className = {this.getClassName("java")}
                        onClick={() => {this.renderGridData("java")}}
                    >
                        Java
                    </div>
                    
                    <div 
                        className = {this.getClassName("python")}
                        onClick={() => {this.renderGridData("python")}}
                    >
                        Python
                    </div>
                    
                    <div 
                        className = {this.getClassName("javascript")}
                        onClick={() => {this.renderGridData("javascript")}}
                    >
                        JavaScript
                    </div>
                </div>


                <div className="Grid">
                    {this.renderGrid()}
                </div>

            </div>
        );
    }
}

