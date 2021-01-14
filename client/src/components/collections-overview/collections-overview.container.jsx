import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
/*esta libreria compose nos permite usar 'connect'
para invocar funciones, haciendo mas facil la implementacion 
del container*/
import { compose } from "redux";

import { selectIsCollectionFetching, selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;


