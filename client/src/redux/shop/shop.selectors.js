import { createSelector } from "reselect";

import memoize from "lodash.memoize";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const sellectCollectionForPreview = createSelector(
  [selectCollections],
  collections => 
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => (collections ? collections[collectionUrlParam] : null)
  )
);

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

//se validara que las collections sean cargadas 'loaded'
//se convertira este valor a bollean valiendose del
//operador - !! (doble exclamacion es el operador)-
export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
);
//esta funcionalidad reemplaza 'selectIsCollectionFetching'
//para hacer funcionar de nuevo el spinner