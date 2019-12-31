import React from 'react';
import './CSS/Node.css';

export default class Main extends React.Component{
    render(){
        const {
            gridNo,
            name, 
            author,
            avatar,
            url,
            currentPeriodStars,
            language
        } = this.props;

        // +1 since gridNo starts with 0
        let headerText = gridNo.toString();
        headerText = "#" + headerText;

        return(
            <div className="Node">
                <header className="Header">
                    <font size="6">{headerText}</font>
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
                        <li>👨‍💻 {author}</li>
                        <li>⭐ {currentPeriodStars}</li>
                        <li>📝 {language}</li>
                    </ul>
                </div>

                

            </div>
        );
    }

}