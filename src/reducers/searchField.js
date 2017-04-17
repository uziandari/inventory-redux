import { CHANGE_FIELD } from '../actions';

const initialState = {
  searchField: 'upc',
  searchFields: [{ label: 'UPC', value: 'upc' },
      { label: 'Location', value: 'location' },
      { label: 'SKU', value: 'sku' },
      { label: 'Parent', value: 'parent_sku' }]
};

export default function changeField(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FIELD:
      return {
        ...state,
        searchField: action.payload
      };
    default:
      return state;
  }
};