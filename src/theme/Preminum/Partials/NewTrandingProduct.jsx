import React from 'react';

const NewTrandingProduct = () => {
    const gridLayout = [
        { url: '/images/trendingProductImg.png', text: 'ORGANIC', heading: 'Face Scrub' },
        { url: '/images/trendingProductImg.png', text: 'long lasting', heading: 'Fragrance' },
        { url: '/images/trendingProductImg.png', text: 'Combo', heading: 'Makeup Kit' },
        { url: '/images/trendingProductImg.png', text: 'natural', heading: 'Bathing Salts' },
        { url: '/images/trendingProductImg.png', text: 'bodycare', heading: 'Body Lotion' },
        { url: '/images/trendingProductImg.png', text: 'SMOOTH', heading: 'Moisturizer' }
    ];

    return (
        <div className='sectionNewTrendingProduct'>
            <div className='containerPremium position-relative section-gap'>
                <div className="premiumTopTile">
                    <div className="premiumTopTileInner d-flex flex-column align-items-center">
                        <p className="topMiniTitle">TOP Rated</p>
                        <div>
                            <span className="reddishBrownColor topTitle">{'New & Trending'}</span>&nbsp;&nbsp;
                            <span className="topTitle">Products</span>
                        </div>
                    </div>
                </div>
                <div className='premiumGridLayout'>
                    <div className='gridLayoutInner'>
                        {gridLayout.map((data, index) => (
                            <div key={index} className='gridLayoutItem'>
                                <img src={data.url} alt="" />
                                <div className='gridLayoutOverlay'>
                                    <p className='textUpperCase gridLayoutOverlayText'>{data.text}</p>
                                    <h4 className='gridLayoutOverlayHeading'>{data.heading}</h4>
                                    <button className='textUpperCase gridLayoutOverlayBtn'>Shop Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewTrandingProduct;
