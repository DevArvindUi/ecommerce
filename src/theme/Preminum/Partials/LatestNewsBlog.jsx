import React from "react";

const LatestNewsBlog = () => {
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', });
    return (
        <div className="sectionLatestNewsBlog">
            <div className="containerPremium position-relative section-gap">
                <div className="premiumTopTile">
                    <div className="premiumTopTileInner d-flex flex-column align-items-center">
                        <p className="topMiniTitle">Trending</p>
                        <div><h3 className="topTitle">Latests <span className="reddishBrownColor topTitle">{'news & blog'}</span></h3></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card cardLatesBlog">
                            <img src="images/LatestImg1.png" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="cardTitleLatesBlog ">Beauty Spa Beauty And The Wellness Program</h5>
                                <p className="cardDateLatesBlog">{currentDate} <span className='cardDetailedBy'>By Elizabeth</span></p>
                                <p className="cardContentLatesBlog">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...</p>
                                <button className="latestBlogBtn" type="button" >Read more</button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card cardLatesBlog">
                            <img src="images/LatestImg2.png" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="cardTitleLatesBlog ">Top Services Packages For A Would-Be Bride</h5>
                                <p className="cardDateLatesBlog">{currentDate} <span className='cardDetailedBy'>By Elizabeth</span></p>
                                <p className="cardContentLatesBlog">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...</p>
                                <button className="latestBlogBtn" type="button" >Read more</button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card cardLatesBlog">
                            <img src="images/LatestImg3.png" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="cardTitleLatesBlog ">{"The Excellent Stress & Relaxation Spa Therapies"}</h5>
                                <p className="cardDateLatesBlog">{currentDate} <span className='cardDetailedBy'>By Elizabeth</span></p>
                                <p className="cardContentLatesBlog">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...</p>
                                <button className="latestBlogBtn" type="button" >Read more</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LatestNewsBlog;
