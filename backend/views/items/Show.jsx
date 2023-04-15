import React from 'react'
// import DefaultLayout from '../layouts/DefaultLayout'

function Show(props) {

    return (
            // <DefaultLayout title="Show View">
                <div className="a-item">
                    <h1>Item Details</h1>
                    <h3>{props.item.name}</h3>
                    <h5 style={{ opacity: '.3'}}>requested by {props.item.user} on {props.item.createdAt.toLocaleDateString()} at {props.item.createdAt.toLocaleTimeString()}</h5>
                    <p className='i-description'>Description:<br /> {props.item.description}</p>
                    <p>Quantity: <br />{props.item.quantity}</p>
                    <p>The item {props.item.itemIsDamaged ? 'is damaged': 'is NOT damaged'}</p>

                    {
                        props.item.comments.length ?
                        <>
                            <div>Comments:</div>
                            <p>{props.item.comments.map((comment, i) => 
                                <div key={i} className="comm">
                                    <div>{comment.user}</div>
                                    <div>{comment.body}</div>
                                    <form action={`/items/${props.item._id}/comments/${comment._id}?_method=DELETE`} method="POST"><input type="submit" value="X"/></form>
                                    <a href={`/items/${props.item._id}/comments/${comment._id}`}>+</a>
                                </div>
                            )}</p>
                            <br/><br/>
                        </>
                        : ''
                    }
                    <details>
                        <summary style={{ opacity: '.5' }}>Leave a comment:</summary>
                        <form action={`/items/${props.item._id}/comments`} method="POST">
                            <textarea name="body" id="lc" cols="1" rows="1" />
                            <button>Comment</button>
                        </form>
                    </details>
                    
                    <div className="buttons">
                        <form action={`/items/${props.item._id}?_method=DELETE`} method="POST">
                            <button>Delete</button>
                        </form>
                        <form action={`/items/${props.item._id}/edit`}>
                            <button>Edit</button>
                        </form>
                        <form action='/items'>
                            <button>Back</button>
                        </form>
                    </div>
                </div>
            // </DefaultLayout>
    )
}

export default Show