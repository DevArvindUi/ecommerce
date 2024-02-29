import React from 'react'

const Info = () => {
    return (
        <>
            <div className='sectionInfo'>
                <div className="bg-banner">
                    <div className='containerPremium position-relative section-gap'>
                        <div className="row">
                            <div className="col InfoColumn">
                                <div className='d-flex GridSpace30'>
                                    <div className='d-flex align-items-center'>
                                        <img style={{ maxWidth: '65px', maxHeight: '44px' }} src="images/infoImg1.png" alt="" />
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <p>Shipping</p>
                                        <h5>Free Shipping World Wide</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col InfoColumn">
                                <div className='d-flex GridSpace30'>
                                    <div className='d-flex align-items-center'>
                                        <img style={{ maxWidth: '65px', maxHeight: '44px' }} src="images/infoImg2.png" alt="" />
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <p>HASSLE FREE</p>
                                        <h5>24 x 7 Customer Support</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col InfoColumn">
                                <div className='d-flex GridSpace30'>
                                    <div className='d-flex align-items-center'>
                                        <img style={{ maxWidth: '65px', maxHeight: '44px' }} src="images/infoImg3.png" alt="" />
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <p>secured</p>
                                        <h5>{"Secure & Safe Packaging"}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col InfoColumn">
                                <div className='d-flex GridSpace30'>
                                    <div className='d-flex align-items-center'>
                                        <img style={{ maxWidth: '65px', maxHeight: '44px' }} src="images/infoImg4.png" alt="" />
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <p>On Return</p>
                                        <h5>Money back Guarantee</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Info