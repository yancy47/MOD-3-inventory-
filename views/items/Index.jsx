import React from 'react'
// import DefaultLayout from '../layouts/DefaultLayout'

function Index(props) {

    return (
            // <DefaultLayout title="Index View" >
            <div>
                <h1>Inventory System</h1>
                <div id="items">

                        {props.items.map((item, index) => 
                            <div className="a-item" key={index}>
                                <a href={`/items/${item._id}`}>{item.name}</a>
                            </div>
                        )}
            
                    <form action="/items/new">
                            <button>Inventory Request</button>
                    </form>
                </div>
            {/* // </DefaultLayout> */}
            </div>
    )
}

export default Index