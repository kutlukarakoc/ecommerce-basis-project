import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state=initialState.cart, action){
	switch (action.type) {
		case actionTypes.ADD_TO_CART:
			let addedItem = state.find(item => item.product.id === action.payload.product.id);
			if(addedItem){
				let newState = state.map(cartItem => {
					if(cartItem.product.id === action.payload.product.id){
						return {...addedItem, quantity: addedItem.quantity+1};
					}
					return cartItem;
				})
				return newState;
			}else{
				return [...state, {...action.payload}]
			}



		case actionTypes.RESET_CART:
			return [];



		case actionTypes.REMOVE_FROM_CART:
			let removeItemState = state.filter(item => item.product.id !== action.payload.product.id);
			return removeItemState;

			
			
		case actionTypes.QUANTITY_DECREMENT:
			let removedCartItem = state.find(item => item.product.id === action.payload.product.id);
			if(removedCartItem){
				let decrementState = state.map(cartItem => {
					if(cartItem.product.id === action.payload.product.id){
						if(cartItem.quantity > 0){
							return{...removedCartItem, quantity: removedCartItem.quantity-1};
						}
					}
					return cartItem;
				});
				let filteredState = decrementState.filter(cartItem => cartItem.quantity !== 0);
				return filteredState;

			}else{
				return [...state, {...action.payload}];
			}
	
		default:
			return state;
	}
}