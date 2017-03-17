import { OPEN_MODAL, CLOSE_MODAL } from '../actions';

const initialState =  {
  modalIsOpen: false,
  inputtedValues: null,
  selectedItem: null,
  items: null
};

export default function modal(state = initialState, action) {
  switch(action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalIsOpen: true,
        selectedItem: action.selectedItem,
        items: action.returnInventory,
        inputtedValues: action.values
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalIsOpen: false,
        selectedItem: null,
        values: null
      };
    default:
      return state;
  }
}