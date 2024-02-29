import React from 'react';



const ForItemsCard = () => {
    return (
        <div className='FourItemsCardSection mt-5'>
            <div className='bg-banner forColumnbgImage'>
                <div className={'containerPremium position-relative section-gap'}>
                    <div className="row itemsCardRow">
                        <div className="col itemscard">
                            <div className='itemscardInner'>
                                <div className='fourColumnCardImgBox'>
                                    <img src="images/cardImg1.png" alt="" />
                                </div>
                                <div className='itemsCardContentBox'>
                                    <h5 className='itemsCardheading'>Natural Ingredients</h5>
                                    <p className='itemsCardContent'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                    <button className='itemscardBtn'>Read More</button>
                                </div>
                            </div>
                        </div>
                        <div className="col itemscard">
                            <div className='itemscardInner'>
                                <div className='fourColumnCardImgBox'>
                                    <img src="images/itemsCard3.svg" alt="" />
                                </div>
                                <div className='itemsCardContentBox'>
                                    <h5 className='itemsCardheading'>Natural Ingredients</h5>
                                    <p className='itemsCardContent'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                    <button className='itemscardBtn'>Read More</button>
                                </div>
                            </div>
                        </div>
                        <div className="col itemscard">
                            <div className='itemscardInner'>
                                <div className='fourColumnCardImgBox'>
                                    <img src="images/itemsCard2.svg" alt="" />
                                </div>
                                <div className='itemsCardContentBox'>
                                    <h5 className='itemsCardheading'>Natural Ingredients</h5>
                                    <p className='itemsCardContent'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                    <button className='itemscardBtn'>Read More</button>
                                </div>
                            </div>
                        </div>
                        <div className="col itemscard">
                            <div className='itemscardInner'>
                                <div className='fourColumnCardImgBox'>
                                    <img src="images/itemsCard4.svg" alt="" />
                                </div>
                                <div className='itemsCardContentBox'>
                                    <h5 className='itemsCardheading'>Natural Ingredients</h5>
                                    <p className='itemsCardContent'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                    <button className='itemscardBtn'>Read More</button>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col">col</div>
                        <div className="col">col</div>
                        <div className="col">col</div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForItemsCard;
