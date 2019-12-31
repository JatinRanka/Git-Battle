import React from 'react';
import './CSS/BattleNode.css';

export default class Main extends React.Component{
    render(){
        const {
            status,
            avatar,
            url,
            name,
            description,
            followers,
            following,
            repos,
            result
        } = this.props;

        let headerClassName = "BattleNode-Header";
        if (status=="WINNER") {
            headerClassName += "-Winner";
        }


        return(
            
            <div className="BattleNode">
                <header className={headerClassName}>
                    <font size="6">{status}</font>
                </header>

                <div className="Image">
                    <img src={avatar} width="150" height="150"/>
                </div>

                <div className="NodeName">
                    <font size="5">
                        <a className="CenterText" href={url}>
                            {name}
                        </a>
                    </font>
                </div>

                <div>
                    <ul>
                        <li>{followers} followers</li>
                        <li>{following} following</li>
                        <li>{repos} repositories</li>
                    </ul>

                </div>

            </div>
        );
    }

}