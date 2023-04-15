import React from 'react'
// import DefaultLayout from '../layouts/DefaultLayout';

function Edit(props) {
    return ( 
        // <DefaultLayout>
            <div>
            <h1>Edit Item</h1>
            <div className='buttons' style={{ flexDirection: 'column' }}>
                <form action={`/items/${props.item._id}?_method=PUT`} method="POST">
                    <label htmlFor="nme">Name:</label><br />
                    <input type="text" id="nme" name="subject" defaultValue={props.item.name} /><br /><br />

                    <label htmlFor="clr">Description:</label><br />
                    <textarea name="description" id="clr" cols="30" rows="10" defaultValue={props.item.description} /><br /><br />

                    <label htmlFor="qua">Quantity:</label><br />
                     <textarea name="quantity" id="qua" cols="30" rows="10" defaultValue={props.item.quantity} /><br /><br />

                    <label htmlFor="itm">Item Is Damaged:</label>
                    <input type="checkbox" id="itm" name="itemIsDamaged" defaultValue={props.item.itemIsDamaged} /><br /><br />

                    <button>Submit</button>
                </form>
                <form action={`/items/${props.item._id}`}>
                    <button>Back</button>
                </form>
            </div>
            </div>
        // </DefaultLayout>
    );
}

export default Edit;