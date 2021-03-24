import React from 'react';
//Hight order component
import {withRouter} from 'react-router-dom'; //permite darle definicion extra al componente
//permite darle propiedades nativas de ruta como si fueran del componente
import './menu-item.styles.scss'


const MenuItem =({title, imageUrl, size, linkUrl, history, match})=>(
    <div
        className={`${size} menu-item`} //Backtick para concatenear
        //onclick={() =>history.push(`${match.url}${linkUrl}`)}
        onClick={() => history.push(`${match.url}${linkUrl}`)} //Backtick para concatenear

    >
    <div className="background-image"
        style={
            {
                backgroundImage: `url(${imageUrl})` 
            }
        }
    >
    </div>
    <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle"> SHOP NOW</span>
    </div>
</div>
)
//se superpone HOC
export default withRouter(MenuItem);