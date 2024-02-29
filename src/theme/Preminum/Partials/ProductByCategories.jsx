import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const ProductByCategories = () => {
    const categoriesCardItems = [
        {
            id: '1',
            url: 'images/productCateImg1.png',
            title: 'Lotion',
            description: 'Oil-Free Liquid Foundation',
            delPrice: '$25.00',
            actualPrice: '$20.00',
        },
        {
            id: '2',
            url: 'images/productCateImg1.png',
            title: 'Lotion',
            description: 'Oil-Free Liquid Foundation',
            delPrice: '$25.00',
            actualPrice: '$20.00',

        },
        {
            id: '3',
            url: 'images/productCateImg1.png',
            title: 'Lotion',
            description: 'Oil-Free Liquid Foundation',
            delPrice: '$25.00',
            actualPrice: '$20.00',

        },
        {
            id: '4',
            url: 'images/productCateImg1.png',
            title: 'Lotion',
            description: 'Oil-Free Liquid Foundation',
            delPrice: '$25.00',
            actualPrice: '$20.00',

        }
    ]
    return (
        <>
            <div className='sectionProductCategories'>
                <div className='containerPremium position-relative section-gap'>
                    <div className="premiumTopTile">
                        <div className="premiumTopTileInner d-flex flex-column align-items-center">
                            <p className="topMiniTitle">BEAUTY ESSENTIALS</p>
                            <div><h3 className="topTitle">Products by <span className="reddishBrownColor topTitle">categories</span></h3></div>
                        </div>
                    </div>
                    <div className='tabCategories'>
                        <Tabs
                            defaultActiveKey="Lotion"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="Lotion" title="Lotion">
                                <div className='categoriesItemBox'>
                                    {categoriesCardItems.map((items, index) => (
                                        <div key={index}>
                                            <div className='d-flex justify-content-center categoriesImgBox'>
                                                <img class="categoriesImg" src={items.url} alt="Card image cap" />
                                                <div className=' d-flex flex-column  catergoriesHeartEye p-2'>
                                                    <div className='categoriesoverlayImgBox mb-2'><img src="images/Heart.png" alt="" /></div>
                                                    <div className='categoriesoverlayImgBox'><img src="images/Eye.png" alt="" /></div>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <div className='d-flex justify-content-between'>
                                                    <h5 class="reddishBrownColor">{items.title}</h5>
                                                    <div>
                                                        <span><img src="images/star.png" alt="" /></span>
                                                        <span><img src="images/star.png" alt="" /></span>
                                                        <span><img src="images/star.png" alt="" /></span>
                                                        <span><img src="images/star.png" alt="" /></span>
                                                        <span><img src="images/star.png" alt="" /></span>
                                                    </div>
                                                </div>
                                                <div className='cardHeading'>
                                                    <h6>{items.description}</h6>
                                                </div>
                                                <div className='d-flex cardPrice'>
                                                    <span><del>{items.delPrice}</del></span>&nbsp;<span><p>{items.actualPrice}</p></span>
                                                </div>
                                            </div>
                                            <div className='textUpperCase'>
                                                <button type="button" class="btn btn-primary btn-block textUpperCase reddishBrownColorBg categoriesBtn">ADD TO CART</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Tab>
                            <Tab eventKey="cream" title="cream">
                                Tab content for Profile
                            </Tab>
                            <Tab eventKey="makeup" title="makeup">
                                Tab content for Contact
                            </Tab>
                            <Tab eventKey="fragrance" title="fragrance">
                                Tab content for Contact
                            </Tab>
                        </Tabs>
                    </div>
                    {/* <div className='card categoriesItem'>
                
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default ProductByCategories
