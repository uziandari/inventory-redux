import { browserHistory } from 'react-router';
import firebase from 'firebase';
//import {reset} from 'redux-form';
import moment from 'moment';

import config from '../config';

//user sign in/out
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';

//inventory search
export const SEARCH_INVENTORY = 'SEARCH_INVENTORY';
export const CHANGE_FIELD = 'CHANGE_FIELD';
export const SEARCH_INVENTORY_REQUESTED = "SEARCH_INVENTORY_REQUESTED";
export const SEARCH_INVENTORY_REJECTED = "SEARCH_INVENTORY_REJECTED";
export const SEARCH_INVENTORY_FULFILLED = "SEARCH_INVENTORY_FULFILLED";

//free location search
export const CHANGE_LOCATION_FIELD = "CHANGE_LOCATION_FIELD";
export const SEARCH_LOCATIONS = 'SEARCH_LOCATIONS';
export const SEARCH_LOCATIONS_REQUESTED = "SEARCH_LOCATIONS_REQUESTED";
export const SEARCH_LOCATIONS_REJECTED = "SEARCH_LOCATIONS_REJECTED";
export const SEARCH_LOCATIONS_FULFILLED = "SEARCH_LOCATIONS_FULFILLED";

//adjustments search
export const SEARCH_ADJUSTMENTS_REQUESTED = "SEARCH_ADJUSTMENTSY_REQUESTED";
export const SEARCH_ADJUSTMENTS_REJECTED = "SEARCH_ADJUSTMENTS_REJECTED";
export const SEARCH_ADJUSTMENTS_FULFILLED = "SEARCH_ADJUSTMENTS_FULFILLED";

//return search
export const VIEW_RETURNS = "VIEW_RETURNS";


//submit returns
export const RETURN_SUCCESSFUL = "RETURN_SUCCESSFUL";
export const RETURN_REJECTED = "RETURN_REJECTED";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

//item viewReturns
export const ITEM_INVENTORY = 'ITEM_INVENTORY';
export const ITEM_INVENTORY_REQUESTED = "ITEM_INVENTORY_REQUESTED";
export const ITEM_INVENTORY_REJECTED = "ITEMH_INVENTORY_REJECTED";
export const ITEM_INVENTORY_FULFILLED = "ITEM_INVENTORY_FULFILLED";

//item history
export const LOCATION_HISTORY_REQUESTED = 'LOCATION_HISTORY_REQUESTED';
export const LOCATION_HISTORY_FULFILLED = 'LOCATION_HISTORY_FULFILLED';
export const LOCATION_HISTORY_REJECTED = 'LOCATION_HISTORY_REJECTED';
export const PARENT_HISTORY_FULFILLED = 'PARENT_HISTORY_FULFILLED';
export const PRODUCTCODE_HISTORY_FULFILLED = 'PRODUCTCODE_HISTORY_FULFILLED';
export const RECEIPT_HISTORY_FULFILLED = 'RECEIPT_HISTORY_FULFILLED';

//receipt lookup
export const RECEIPT_HISTORY_REQUESTED = 'RECEIPT_HISTORY_REQUESTED';
export const RECEIPT_LOOKUP_FULFILLED = 'RECEIPT_LOOKUP_FULFILLED';
export const RECEIPT_HISTORY_REJECTED = 'RECEIPT_HISTORY_REJECTED';
export const RECEIPT_VISIBLE = 'RECEIPT_VISIBLE';


const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId
  };

firebase.initializeApp(firebaseConfig);

//user authentication and login
export function signInUser(credentials) {
  return function(dispatch) {
    firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
        browserHistory.push('/userhome');
      })
      .catch(error => {
        dispatch(authError(error));
      });
  }
}


export function signOutUser() {
  browserHistory.push('/');
  return {
    type: SIGN_OUT_USER
  }
}

export function verifyAuth() {
  return function (dispatch) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
      }
    });
  }
}

export function authUser() {
  return {
    type: AUTH_USER,
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
//end user auth

//Search Inventory
export function changeSearchField(searchField) {
  return {
    type: CHANGE_FIELD,
    payload: searchField
  }
}

export function changeLocationField(searchField) {
  return {
    type: CHANGE_LOCATION_FIELD,
    payload: searchField
  }
}

export function searchInventory(term, searchField) {

  return dispatch => {
    if (term !== '') {
      dispatch(searchInventoryRequested());
      return firebase.database().ref("inventory").orderByChild(searchField).equalTo(term.toUpperCase().trim()).limitToFirst(40).once('value', snap => {
        var itemsArr = [];
          snap.forEach(function(snap) {
              let item = {
                key: snap.key,
                sku: snap.val().sku,
                description: snap.val().description,
                upc: snap.val().upc,
                location: snap.val().location,
                imgUrl: snap.val().img_url,
                backstock: snap.val().backstock,
                inline: snap.val().inline,
                parentSku: snap.val().parent_sku,
                stock: snap.val().stock,
                committed: snap.val().committed
              }  
            itemsArr.push(item);
          });
        const inventory = itemsArr;
        dispatch(searchInventoryFulfilled(inventory));
        if (inventory.length > 0 && term.length > 1) {
          console.log(inventory);
          firebase.database().ref("searchLog").push({
            user: firebase.auth().currentUser.email,
            searchTerm: term,
            returnData: inventory
          })
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(searchInventoryRejected());
      });
    }
  }
}


function searchInventoryRequested() {
  return {
    type: SEARCH_INVENTORY_REQUESTED
  };
}

function searchInventoryRejected() {
  return {
    type: SEARCH_INVENTORY_REJECTED
  }
}

function searchInventoryFulfilled(inventory) {
  return {
    type: SEARCH_INVENTORY_FULFILLED,
    payload: inventory
  };
}

//handle returns
function returnSubmitSuccessful() {
  return {
    type: RETURN_SUCCESSFUL
  }
}

function returnSubmitRejected() {
  return {
    type: RETURN_REJECTED
  }
}


export function addReturn(values) {

  return dispatch => {
    values.submitTime = moment().format('MM/DD/YYYY h:m');

    dispatch(searchInventoryRequested());
    return firebase.database().ref("inventory").orderByChild('upc').equalTo(values.upc.toUpperCase().trim()).once('value', snap => {
      var itemsArr = [];
        snap.forEach(function(snap) {
            itemsArr.push(snap.val());
        });
      const returnInventory = itemsArr;
      if (returnInventory.length === 1) {
        
        console.log(`Your UPC matches to ${returnInventory[0].sku}`);

        if (!values.doNotRestock) {
          if (returnInventory[0].location === "NA" || returnInventory[0].location === "DROPSHIP") {
            values.doNotRestock = true;
            values.noRestockReason = "NA Location";
          }
        }

        values.sku = returnInventory[0].sku;
        values.description = returnInventory[0].description;
        values.location = returnInventory[0].location;

        firebase.database().ref("returns").push(values)
          .then(response => {
            dispatch(returnSubmitSuccessful());
          })

        Notification.requestPermission().then(function(result) {
          if (Notification.permission === "granted") {
            var notification = new Notification(`Return Successfully Added! \n Location is ${values.location}`);
          }
        });

        
      } else if (returnInventory.length === 0) {
        console.log(`You have ${returnInventory.length} matches to this UPC.`);
        alert("UPC doesn't match to any product!");
        values.description = prompt("Enter product description (or N/A)");
        firebase.database().ref("returns").push(values)
          .then(response => {
            dispatch(returnSubmitSuccessful());
          })
      } else {
        console.log(`You have ${returnInventory.length} matches to this UPC.`);
        //popup modal to select correct item
        dispatch(openModal(values, returnInventory));
      }     
    })
    .catch((error) => {
      console.log(error);
      dispatch(returnSubmitRejected());
    });
  }

}

//Modal
export function openModal(values, returnInventory) {
  return {
    type: OPEN_MODAL,
    values,
    returnInventory
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

export function addSelectedItem(returnInventory, index, values) {
  return dispatch => {
    values.sku = returnInventory[index].sku;
    values.description = returnInventory[index].description;
    values.location = returnInventory[index].location;

    if (!values.doNotRestock) {
      if (values.location === "NA" || values.location === "DROPSHIP") {
        values.doNotRestock = true;
        values.noRestockReason = "NA Location";
      }
    }

    firebase.database().ref("returns").push(values)
      .then(response => {
        dispatch(returnSubmitSuccessful());
      })

    Notification.requestPermission().then(function(result) {
      if (Notification.permission === "granted") {
        var notification = new Notification(`Return Successfully Added! \n Location is ${values.location}`);
      }
    });
  }
}


//View Return List
export function viewReturns() {
  return dispatch => {
    return firebase.database().ref("returns").limitToLast(100).on('value', snap => {
      var itemsArr = [];
        snap.forEach(function(snap) {
          let item = {
            key: snap.key,
            trackingNumber: snap.val().trackingNumber,
            orderNumber: snap.val().orderNumber,
            returnCode: snap.val().returnCode,
            sku: snap.val().sku,
            description: snap.val().description,
            upc: snap.val().upc,
            submitTime: snap.val().submitTime,
            completedReturn: snap.val().completedReturn,
            doNotRestock: snap.val().doNotRestock,
            noRestockReason: snap.val().noRestockReason,
            location: snap.val().location
          }
          
          itemsArr.push(item);
        });
      const returnInventory = itemsArr.reverse();
      dispatch(returnListFulfilled(returnInventory))
    })
  }
}

export function returnListFulfilled(returns) {
  return {
    type: VIEW_RETURNS,
    payload: returns
  };
}

//search free locations
export function searchLocations(term, searchField) {
  return dispatch => {
    dispatch(searchLocationsRequested());
    return firebase.database().ref("freeLocations").orderByChild(searchField).startAt(term.toUpperCase().trim()).limitToFirst(100).on('value', snap => {
      var itemsArr = [];
        snap.forEach(function(snap) {
            let item = {
              key: snap.key,
              location: snap.val().location,
              binSize: snap.val().bin_size,
              usedLocation: snap.val().usedLocation
            }  
          itemsArr.push(item);
        });
      const locations = itemsArr;
      dispatch(searchLocationsFulfilled(locations))
    })
  }
}


function searchLocationsRequested() {
  return {
    type: SEARCH_LOCATIONS_REQUESTED
  };
}

function searchLocationsRejected() {
  return {
    type: SEARCH_LOCATIONS_REJECTED
  }
}

function searchLocationsFulfilled(locations) {
  return {
    type: SEARCH_LOCATIONS_FULFILLED,
    payload: locations
  };
}

//search adjustments
export function searchAdjustments(term) {
  return dispatch => {
    dispatch(searchAdjustmentsRequested());
    return firebase.database().ref("inventory").orderByChild('sku').equalTo(term.toUpperCase().trim()).once('value', snap => {
      var parent;
      var field;
      var itemsArr = [];
      if (!snap.val()) {
        console.log(`nothing macthes to ${term}`)
        const adjustments = itemsArr;
        dispatch(searchAdjustmentsFulfilled(adjustments));
      } else {
          snap.forEach(function(snap) {
            if (snap.val().parent_sku === "") {
              parent = snap.val().sku;
              field = "sku";
            } 
            else {
              parent = snap.val().parent_sku;
              field = "parent_sku";
            }
            firebase.database().ref("adjustments").orderByChild(field).equalTo(parent.toUpperCase().trim()).once('value', snap => {
              let adjTotal = 0;
              snap.forEach(function(snap) {
                let adjTime = moment(snap.val().adjustment_date).format('DD-MM-YYYY')
                let item = {
                  key: snap.key,
                  sku: snap.val().sku,
                  date: adjTime,
                  change: snap.val().adjustment_amount,
                  term
                }
                adjTotal += snap.val().adjustment_amount  
                itemsArr.push(item);
              });
              const adjustments = itemsArr;
              adjustments.adjTotal = adjTotal
              dispatch(searchAdjustmentsFulfilled(adjustments));
            });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(searchAdjustmentsRejected());
    });
  }
}

function searchAdjustmentsRequested() {
  return {
    type: SEARCH_ADJUSTMENTS_REQUESTED
  };
}

function searchAdjustmentsRejected() {
  return {
    type: SEARCH_ADJUSTMENTS_REJECTED
  }
}

function searchAdjustmentsFulfilled(adjustments) {
  return {
    type: SEARCH_ADJUSTMENTS_FULFILLED,
    payload: adjustments
  };
}

//view single item

export function itemInventory(skuId) {
   
  return dispatch => {
    dispatch(itemInventoryRequested());
    return firebase.database().ref("inventory").orderByChild("sku").equalTo(skuId).once('value', snap => {
      var itemsArr = [];
        snap.forEach(function(snap) {
          let item = {
            key: snap.key,
            sku: snap.val().sku,
            description: snap.val().description,
            caTotal: snap.val().total,
            caAvailable: snap.val().available,
            caPending: snap.val().pending_checkout + snap.val().pending_payment,
            caFlag: snap.val().flag,
            upc: snap.val().upc,
            location: snap.val().location,
            imgUrl: snap.val().img_url,
            backstock: snap.val().backstock,
            inline: snap.val().inline,
            parentSku: snap.val().parent_sku,
            stock: snap.val().stock,
            committed: snap.val().committed,
            blocked: snap.val().is_blocked,
          }
          itemsArr.push(item);
       });
      const inventory = itemsArr;
      dispatch(itemInventoryFulfilled(inventory))
    })
    .catch((error) => {
      console.log(error);
      dispatch(itemInventoryRejected());
    });
  }
}

function itemInventoryRequested() {
  return {
    type: ITEM_INVENTORY_REQUESTED
  };
}

function itemInventoryRejected() {
  return {
    type: ITEM_INVENTORY_REJECTED
  }
}

function itemInventoryFulfilled(inventory) {
  return {
    type: ITEM_INVENTORY_FULFILLED,
    payload: inventory
  };
}

//find previous locations
export function findLocationHistory(skuId, typeId) {
  return dispatch => {
    dispatch(locationHistoryRequested());
    return firebase.database().ref("previousLocations").orderByChild(typeId).equalTo(skuId).once('value', snap => {
      var historyArr = [];
      if (typeId === "parent_sku") {
        snap.forEach(function(snap) {
          let locTime = moment(snap.val().changeDate).format('MM-DD-YYYY')
          let history = {
            key: snap.key,
            sku: snap.val().sku,
            submitDate: locTime,
            field: snap.val().changeField,
            locationMoved: snap.val().changeLoc
          }
          historyArr.push(history);
       });
       const history = historyArr;
       dispatch(parentsHistoryFulfilled(historyArr))
      } else {
        snap.forEach(function(snap) {
          let locTime = moment(snap.val().changeDate).format('MM-DD-YYYY')
          let history = {
            key: snap.key,
            submitDate: locTime,
            field: snap.val().changeField,
            locationMoved: snap.val().changeLoc
          }
          historyArr.push(history);
       });
       const history = historyArr;
       dispatch(locationHistoryFulfilled(history))
      }
      
    })
    .catch((error) => {
      console.log(error);
      dispatch(locationHistoryRejected());
    });
  }
}

function locationHistoryRequested() {
  return {
    type: LOCATION_HISTORY_REQUESTED
  };
}

function locationHistoryRejected() {
  return {
    type: LOCATION_HISTORY_REJECTED
  }
}

function locationHistoryFulfilled(historyArr) {
  return {
    type: LOCATION_HISTORY_FULFILLED,
    payload: historyArr
  };
}

function parentsHistoryFulfilled(historyArr) {
  return {
    type: PARENT_HISTORY_FULFILLED,
    payload: historyArr
  };
}

function upcHistoryFulfilled(historyArr) {
  return {
    type: PRODUCTCODE_HISTORY_FULFILLED,
    payload: historyArr
  };
}

function receiptHistoryFulfilled(historyArr) {
  return {
    type: RECEIPT_HISTORY_FULFILLED,
    payload: historyArr
  };
}

//find previous upcs
export function findUpcHistory(skuId) {
  return dispatch => {
    dispatch(locationHistoryRequested());
    return firebase.database().ref("previousProductCodes").orderByChild("sku").equalTo(skuId).once('value', snap => {
      var historyArr = [];
      snap.forEach(function(snap) {
        let upcTime = moment(snap.val().changeDate).format('MM-DD-YYYY')
        let history = {
          key: snap.key,
          submitDate: upcTime,
          changeUpc: snap.val().changeUpc
        }
        historyArr.push(history);
      });
      const history = historyArr;
      dispatch(upcHistoryFulfilled(history))
    })
    .catch((error) => {
      console.log(error);
      dispatch(locationHistoryRejected());
    });
  }
}

//find receipts
export function findReceiptHistory(skuId) {
  return dispatch => {
    dispatch(locationHistoryRequested());
    return firebase.database().ref("previousReceipts").orderByChild("sku").equalTo(skuId).once('value', snap => {
      var historyArr = [];
      snap.forEach(function(snap) {
        let receiptTime = moment(snap.val().receiptDate).format('MM-DD-YYYY')
        let history = {
          key: snap.key,
          receiptDate: receiptTime,
          documentNumber: snap.val().document,
          quantityReceived: snap.val().quantity,
          type: snap.val().type
        }
        historyArr.push(history);
      });
      const history = historyArr;
      dispatch(receiptHistoryFulfilled(history))
    })
    .catch((error) => {
      console.log(error);
      dispatch(locationHistoryRejected());
    });
  }
}

export function receiptInventory(docId) {
  return dispatch => {
    var receipts = [];
    dispatch(toggleReceiptVisible())
    dispatch(receiptHistoryRequested());
    return firebase.database().ref("previousReceipts").orderByChild("document").equalTo(parseInt(docId)).once('value', receiptSnap => {
      receiptSnap.forEach(function(receiptSnap) {
         firebase.database().ref("inventory").orderByChild("sku").equalTo(receiptSnap.val().sku).once('value', itemSnap => {
          itemSnap.forEach(function(itemSnap) {
            let lookup = {
              key: receiptSnap.key,
              sku: receiptSnap.val().sku,
              quantityReceived: receiptSnap.val().quantity,
              description: itemSnap.val().description,
              currentLocation: itemSnap.val().location,
              currentBackstock: itemSnap.val().backstock,
              currentQuantity: itemSnap.val().stock
            };
            receipts.push(lookup);  
          })
        })   
      });
    })
    .then(response => {
          dispatch(receiptLookupFulfilled(receipts));  
      })
    .catch((error) => {
      console.log(error);
      dispatch(receiptHistoryRejected());
    });
  }
}

function receiptHistoryRequested() {
  return {
    type: RECEIPT_HISTORY_REQUESTED
  };
}

function receiptHistoryRejected() {
  return {
    type: RECEIPT_HISTORY_REJECTED
  }
}

function receiptLookupFulfilled(receipts) {
  return {
    type: RECEIPT_LOOKUP_FULFILLED,
    payload: receipts
  };
}

function toggleReceiptVisible() {
  return {
    type: RECEIPT_VISIBLE
  }
}
