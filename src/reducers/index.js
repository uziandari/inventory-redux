import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth';
import FieldReducer from './searchField';
import LocationFieldReducer from './locationField';
import LocationReducer from './location';
import InventoryReducer from './inventory';
import ReturnReducer from './return';
import ModalReducer from './returnModal';
import ReturnViewReducer from './returnView';
import AdjustmentsReducer from './adjustments';
import ItemReducer from './item';


const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  inventory: InventoryReducer,
  searchField: FieldReducer,
  return: ReturnReducer,
  returnView: ReturnViewReducer,
  modal: ModalReducer,
  locations: LocationReducer,
  locationField: LocationFieldReducer,
  adjustments: AdjustmentsReducer,
  item: ItemReducer
});

export default rootReducer;