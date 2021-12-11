import React from 'react';
function DashboardItem({item_img,item_desc,item_link,navigate}) {
    return ( 
        <div role={"button"} className='dashboard-item-container text-center p-3' onClick={() => navigate(item_link)}>
            <div className='item-logo'>
                <img src={item_img} width="40px" alt="dashboard item" />
            </div>
            <div className='item-desc '>
                    <p>{item_desc}</p>
            </div>
        </div>
     );
}

export default DashboardItem;