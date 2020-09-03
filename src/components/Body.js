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
import Pricing from './pricing/Pricing';
import Admin from './admin/Admin';
import Login from './admin/Login';
import Total from './admin/Total';
import Daily from './admin/Daily';
import Designs from './admin/Designs';
import Wholesale from './admin/Wholesale';
import CreateWholesaleOrder from './admin/wholesale/CreateWholesaleOrder';
import WholesaleOrder from './admin/wholesale/WholesaleOrder';
import Todo from './admin/Todo';
import Policies from './misc/Policies';
import FAQ from './misc/FAQ';

function Body(props) {
    const {
        removeOrder,
        addOrder,
        orders,
        resetOrders,
        amount,
        mode,
        logReactPixelPurchase,
        usedDiscountButton,
        setUsedDiscountButton,
        showMoreObj,
        setShowMoreObj,
        yCoordinate,
        setYCoordinate,
        authenticated,
        setAuthenticated,
    } = props;

    return (
        <main className="body-class">
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route
                    exact
                    path="/admin"
                    render={(props) => (
                        <Admin
                            {...props}
                            authenticated={authenticated}
                            setAuthenticated={setAuthenticated}
                        />
                    )}
                />
                <Route exact path="/daily" component={Daily} />
                <Route exact path="/designs" component={Designs} />
                <Route
                    exact
                    path="/login"
                    render={(props) => (
                        <Login
                            {...props}
                            authenticated={authenticated}
                            setAuthenticated={setAuthenticated}
                        />
                    )}
                />
                <Route
                    exact
                    path="/selection"
                    render={(props) => (
                        <Selection
                            {...props}
                            showMoreObj={showMoreObj}
                            setShowMoreObj={setShowMoreObj}
                            yCoordinate={yCoordinate}
                            setYCoordinate={setYCoordinate}
                        />
                    )}
                />
                <Route
                    exact
                    path="/all"
                    render={(props) => (
                        <AllDesigns
                            {...props}
                            showMoreObj={showMoreObj}
                            setShowMoreObj={setShowMoreObj}
                            yCoordinate={yCoordinate}
                            setYCoordinate={setYCoordinate}
                        />
                    )}
                />
                <Route exact path="/total" component={Total} />
                <Route exact path="/todo" component={Todo} />
                <Route exact path="/wholesale" component={Wholesale} />
                <Route
                    exact
                    path="/wholesale/create"
                    component={CreateWholesaleOrder}
                />
                <Route exact path="/wholesale/:id" component={WholesaleOrder} />
                <Route
                    exact
                    path="/item/:id"
                    render={(props) => <Item {...props} addOrder={addOrder} />}
                />
                <Route
                    exact
                    path="/all/:id"
                    render={(props) => (
                        <AllItem {...props} addOrder={addOrder} />
                    )}
                />
                <Route exact path="/custom" component={CustomItem} />
                <Route exact path="/pricing" component={Pricing} />
                <Route
                    exact
                    path="/cart"
                    render={() => (
                        <Cart
                            {...props}
                            mode={mode}
                            removeOrder={removeOrder}
                            orders={orders}
                            resetOrders={resetOrders}
                            amount={amount}
                            logReactPixelPurchase={logReactPixelPurchase}
                            usedDiscountButton={usedDiscountButton}
                            setUsedDiscountButton={setUsedDiscountButton}
                        />
                    )}
                />
                <Route
                    exact
                    path="/success"
                    render={() => (
                        <Success
                            {...props}
                            orders={orders}
                            resetOrders={resetOrders}
                        />
                    )}
                />
                <Route exact path="/policies" component={Policies} />
                <Route exact path="/faq" component={FAQ} />
            </Switch>
        </main>
    );
}

export default Body;
