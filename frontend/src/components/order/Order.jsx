import React from "react";
import BackButton from "../other/BackButton";
function Order(props) {
    const data = props.data;
    console.log(data);
    return (
        <>
            <div>An Order</div>
            <div>{console.log(data)}</div>
        </>
    );
}

export default Order;
