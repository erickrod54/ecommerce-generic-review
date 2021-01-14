import React from "react";
import { connect } from "react-redux";

import CollectionItem from "../../collection-item/collection-item.component";

import { selectCollection } from "../../../redux/shop/shop.selectors";

import "./collection.styles.scss";

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
  <div className="collection-page">
    <h2 className='title'>{ title}</h2>
    <div className="items">
      {
        items.map(item => (
          <CollectionItem key={item.id} item={item}/>
          ))}
    </div>
    <h1>Arreglar error de css en esta pagina,
      tiene que ver con los items, y en shop 
      component los links hacia estas secciones
    </h1>
  </div>
)};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);

