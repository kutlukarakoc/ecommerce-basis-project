import React, { Component } from "react";
import {UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem,NavItem,NavLink} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { toast } from 'react-toastify';
import {Link} from "react-router-dom";

class CartSummary extends Component {
	
	removeFromCart(cartItem){
		this.props.actions.removeFromCart(cartItem);

		toast.warn(cartItem.product.productName + ' removed from cart!', {
			position: "bottom-left",
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
			theme: "colored",
		});
	}

	resetCart(){
		this.props.actions.resetCart();
		toast.info('Cart has been emptied!', {
			position: "bottom-left",
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
			theme: "colored",
		});

	}

	renderEmpty(){
		return <NavItem style={{position:"absolute",right:"18%"}}><NavLink>Lets Shop!</NavLink></NavItem>
	}

	renderCartSummary(){
		return (
			<UncontrolledDropdown
                inNavbar
                nav
                style={{ position: "absolute", right: "18%" }}
            >
                <DropdownToggle caret nav>
                    Cart 
                </DropdownToggle>
                <DropdownMenu>
					{
						this.props.cart.map(item=> (
							<DropdownItem
							key={item.product.id}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <FontAwesomeIcon
									onClick={()=> this.removeFromCart(item)}
                                    icon={faTrash}
                                    style={{ marginRight: "10px" }}
                                    color="grey"
                                    size="lg"
                                />
                                {item.product.productName}
                            </div>
                            <div>
                                <span
                                    style={{
                                        border: "1px solid #000",
                                        width: "24px",
                                        height: "26px",
                                        display: "inline-block",
                                        textAlign: "center",
                                        fontSize: "17px",
                                        color: "#000",
                                        marginLeft: "3px",
                                    }}
                                >
                                    {item.quantity}
                                </span>
                                <span
									onClick={()=> this.props.actions.addToCart(item)}
                                    style={{
                                        display: "inline-block",
                                        marginLeft: "4px",
                                        color: "#fff",
                                        backgroundColor: "#198754",
                                        fontSize: "17px",
                                        height: "25px",
                                        width: "25px",
                                        textAlign: "center",
                                    }}
                                >
                                    +
                                </span>
                                <span
									onClick={()=> this.props.actions.decreaseQuantity(item)}
                                    style={{
                                        display: "inline-block",
                                        marginLeft: "4px",
                                        color: "#fff",
                                        backgroundColor: "#dc3545",
                                        fontSize: "17px",
                                        height: "25px",
                                        width: "25px",
                                        textAlign: "center",
                                    }}
                                >
                                    -
                                </span>
                            </div>
                        </DropdownItem>
						))
					}
                    
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.resetCart()}>
                        Reset Cart
                    </DropdownItem>
					<DropdownItem divider />
					<DropdownItem>
						<Link to="/cart" style={{color: "#1e2125", textDecoration:"none", display:"inline-block",width:"100%"}}>Go to Cart</Link>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
		)
	}
    render() {
		return (
			<>
           	 	{
					this.props.cart.length ? this.renderCartSummary() : this.renderEmpty()
				}
			</>
        );
    }
}

function mapStateToProps(state){
	return{
		cart: state.cartReducer
	}
}

function mapDispatchToProps(dispatch){
	return{
		actions: {
			addToCart: bindActionCreators(cartActions.addToCart, dispatch),
			resetCart: bindActionCreators(cartActions.resetCart, dispatch),
			removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
			decreaseQuantity: bindActionCreators(cartActions.decreaseQuantity, dispatch)
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(CartSummary)