export default (event) => {
    const {
        recipient_name,
        line1,
        line2,
        city,
        state,
        postal_code,
        country_code,
    } = event.address;
    const fullAddress = `${line1}${
        line2 ? `, ${line2}` : ''
    }, ${city}, ${postal_code}, ${state}, ${country_code}`;

    const renderOrders = event.orders
        .map((order, index) => {
            return `**Order #${index + 1}**
Color: ${order.color}
Size/Bundle: ${order.size}
Amount: ${order.amount}
`;
        })
        .toString()
        .split(',').join(`

`);

    return `##Customer Information
Email: ${event.email}
Customer: ${recipient_name}
Full Address: ${fullAddress}
Address: ${line1}
Apt., Bldg, Suite #: ${line2 ? line2 : ''}
City: ${city}
Zip Code: ${postal_code}
State: ${state}
Country: ${country_code}

---

##Orders
Timestamp: ${event.timestamp}
Order ID: ${event.orderID}

${renderOrders}


**Total:** $${event.amount}`;
};
