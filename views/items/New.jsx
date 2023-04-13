import React from 'react'
// import DefaultLayout from '../layouts/DefaultLayout';

function New() {
    return ( 
        // <DefaultLayout>
            <div>
            <h1>New Item</h1>
            <form action="/items" method="POST">
                <label htmlFor="nme">Name:</label><br />
                <input type="text" id="nme" name="name" /><br /><br />

                <label htmlFor="clr">Description:</label><br />
                <textarea name="description" id="clr" cols="30" rows="10" /><br /><br />

                <label htmlFor="qua">Quantity:</label><br />
                <textarea name="quantity" id="qua" cols="30" rows="10" /><br /><br />

                <label htmlFor="itm">Item Is Damaged:</label>
                <input type="checkbox" id="itm" name="itemIsDamaged" /><br /><br />

                <button>Submit</button>
            </form>
            </div>
        // </DefaultLayout>
    );
}

export default New;