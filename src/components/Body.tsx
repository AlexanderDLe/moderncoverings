import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './landing/Landing';
import Selection from './order/Selection';
import AllDesigns from './order/alldesigns/AllDesigns';
import Item from './item/Item';
import AllItem from './order/alldesigns/AllItem';
import Cart from './checkout/Cart';
import Success from './checkout/Success';
import CustomItem from './order/CustomItem';
import Admin from './admin/Admin';
import Login from './admin/Login';
import Total from './admin/Total';
import Daily from './admin/Daily';
import Designs from './admin/Designs';
import Wholesale from './admin/Wholesale';
import CreateWholesaleOrder from './admin/wholesale/CreateWholesaleOrder';
import WholesaleOrder from './admin/wholesale/WholesaleOrder';
import Todo from './admin/Todo';
import Policies from './misc/Policies/Policies';
import FAQ from './misc/FAQ/FAQ';

const Body = () => {
    return (
        <main className="body-class">
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/daily" component={Daily} />
                <Route exact path="/designs" component={Designs} />
                <Route exact path="/login" component={Login} />
                <Route
                    exact
                    path="/selection/:category"
                    component={Selection}
                />
                <Route exact path="/all" component={AllDesigns} />
                <Route exact path="/total" component={Total} />
                <Route exact path="/todo" component={Todo} />
                <Route exact path="/wholesale" component={Wholesale} />
                <Route exact path="/item/:id" component={Item} />
                <Route exact path="/all/:id" component={AllItem} />
                <Route
                    exact
                    path="/wholesale/create"
                    component={CreateWholesaleOrder}
                />
                <Route exact path="/wholesale/:id" component={WholesaleOrder} />
                <Route exact path="/custom" component={CustomItem} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/success" component={Success} />
                <Route exact path="/policies" component={Policies} />
                <Route exact path="/faq" component={FAQ} />
                {/* <Route
                    exact
                    path="/cart"
                    render={() => (
                        <Cart
                            {...props}
                            logReactPixelPurchase={logReactPixelPurchase}
                        />
                    )}
                /> */}
            </Switch>
        </main>
    );
};

export default Body;
