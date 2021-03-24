import React from 'react';

import SHOP_DATA from './shop.data.js';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

//componenente Statefull
class ShopPage extends React.Component {
    constructor(props){
        super(props); //heredando props de react componenets, no es necesario especificar
        this.state ={
            collections: SHOP_DATA
        };
    }

    render(){
        //simplificacion de this.state...
        const { collections }= this.state //destructuracion de propiedaes dcel state
        return(
            <div className='shop-page'>
                {collections.map(({id, ...otherCollectionsProps})=>(
                    <CollectionPreview key={id} {...otherCollectionsProps} />
                ))}
            </div>
        );
    }
}
export default ShopPage;
