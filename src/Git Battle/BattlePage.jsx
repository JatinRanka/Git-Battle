import React from 'react';
import CompareGithub from './CompareGithub.jsx';
import './CSS/BattlePage.css';
import BattleNode from './BattleNode.jsx';

export default class Main extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data1 : null,
            data2 : null,
            isSubmitted : false,
            scores : null,
            result : null
        };
    }

    handleClick(){

        const userName1 = document.getElementById("userName1").value;
        const userName2 = document.getElementById("userName2").value;

        // If userName is empty
        if(userName1 == "" || userName2 == ""){
            alert("Enter username");
            return
        }

        async function fetchUserData(userName){
            try{
                let response = await fetch("https://api.github.com/users/" + userName);
                let responseJson = await response.json();
                return responseJson;
            }
            catch(error){
                console.log(error);
            }
        }

        fetchUserData(userName1).then((user1) => {
            this.setState({
                data1 : {user1}
            });

            // For user2
            fetchUserData(userName2).then((user2) => {
                this.setState({
                    data2 : {user2},
                });

                // If userName is unavailable/invalid
                if(this.state.data1.user1.message == "Not Found" || this.state.data2.user2.message == "Not Found"){
                    alert("User not found!");
                    return;
                }

                const scores = CompareGithub(this.state.data1.user1, this.state.data2.user2);
                
                // 0 states user1 won, 1 states user2 won.
                const result = (scores.scoreUser1 > scores.scoreUser2) ? 0 : 1;
                
                this.setState({
                    result,
                    scores,
                    isSubmitted : true
                });
            });

        });
    }

    fetchResultNodes(){

        let nodes = [this.state.data1.user1, this.state.data2.user2];
        return nodes.map((user, nodeIdx) => {
            return (
                <BattleNode
                    status={(this.state.result == nodeIdx) ? "WINNER" : "LOSER"}
                    avatar={user.avatar_url}
                    url={""}
                    name={user.name}
                    description={user.bio}
                    followers={user.followers}
                    following={user.following}
                    repos={user.public_repos}
                />
            );
        });
    }
    
    render(){
        return(
            <div className="BodyBattle">
                <main>
                    <div>
                        <text className="GitText">GITBATTLE</text>
                    </div>
                    
                    <div>
                        {(this.state.isSubmitted) ? 
                                <div className="ResultNodes"> {this.fetchResultNodes()} </div>
                                
                            :   
                            <div>
                                <form className="Form">
                                    <div className="FormElement">
                                        <input
                                            id="userName1" 
                                            type="text"
                                            placeholder="Enter username 1">
                                        </input>
                                    </div>

                                    <div className="FormElement">   
                                        <p className="Vs">vs</p>
                                        {/* <h1 className="Vs">vs</h1> */}
                                    </div>

                                    <div className="FormElement">
                                        <input
                                            id="userName2" 
                                            placeholder="Enter username 2">
                                        </input>
                                    </div>
                                </form>

                                <div className="SubmitButtonDiv">
                                    <button
                                        className="SubmitButton" 
                                        onClick={() => this.handleClick()}>
                                        BATTLE
                                    </button>
                                </div>
                            </div> 

                            }
                    </div>
                </main>
            </div>
        );
    }
}