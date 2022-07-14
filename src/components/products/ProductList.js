import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Badge, Button } from "reactstrap";
import * as productActions from "../../redux/actions/productActions";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { toast } from "react-toastify";

class ProductList extends Component {
    componentDidMount() {
        this.props.actions.getProducts();
    }

    addToCart(product) {
        this.props.actions.addToCart({ quantity: 1, product });

        toast.success(product.productName + " added to cart!", {
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

    render() {
        return (
            <>
                <Badge color="warning" pill style={{ fontSize: ".9em" }}>
                    Product List{" "}
                </Badge>
                <Badge color="success" pill style={{ fontSize: ".9em" }}>
                    {this.props.currentCategory.categoryName}
                </Badge>
                <Table style={{ marginTop: "17px" }}>
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Quantity Per Unit</th>
                            <th>Units In Stock</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.products.map((product) => (
                            <tr key={product.id}>
                                <th scope="row">{product.id}</th>
                                <td>{product.productName}</td>
                                <td>{product.unitPrice}</td>
                                <td>{product.quantityPerUnit}</td>
                                <td>{product.unitsInStock}</td>
                                <td>
                                    <Button
                                        color="success"
                                        onClick={() => this.addToCart(product)}
                                    >
                                        Add to Cart
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            getProducts: bindActionCreators(
                productActions.getProducts,
                dispatch
            ),
            addToCart: bindActionCreators(cartActions.addToCart, dispatch),
        },
    };
};

const mapStateToProps = (state) => {
    return {
        currentCategory: state.changeCategoryReducer,
        products: state.productListReducer,
        cartItems: state.cartReducer,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
