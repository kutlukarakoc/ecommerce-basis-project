import React, { Component } from "react";
import { Collapse, Navbar, Nav, NavItem } from "reactstrap";
import CartSummary from "../cart/CartSummary";
import {Link} from "react-router-dom";

export default class Navigation extends Component {
    render() {
        return (
            <Navbar
                color="light"
                expand="md"
                fixed="top"
                light
                style={{ padding: "10px 0px 10px 18%" }}
            >
                My App
                <Collapse navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem
                            style={{ display: "block", padding: "0.5rem 2rem" }}
                        >
                            <Link to="/" style={{color:"#000", textDecoration:"none"}}>Home</Link>
                        </NavItem>
						<CartSummary
                        />
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}
