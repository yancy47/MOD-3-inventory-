import React from 'react'
// import DefaultLayout from '../layouts/DefaultLayout';

function Edit(props) {
    return ( 
        // <DefaultLayout>
            <div>
            <h1>Edit Comment</h1>
            <div className='buttons' style={{ flexDirection: 'column' }}>
                <form action={`/items/${props.itemId}/comments/${props.comment._id}?_method=PUT`} method="POST">

                    <label htmlFor="clr">Body:</label><br />
                    <textarea name="body" id="clr" cols="30" rows="10" defaultValue={props.comment.body} /><br /><br />

                    <button>Submit</button>
                </form>
                <form action={`/items/${props.itemId}`}>
                    <button>Back</button>
                </form>
            </div>
            </div>
        // </DefaultLayout>
    );
}

export default Edit;