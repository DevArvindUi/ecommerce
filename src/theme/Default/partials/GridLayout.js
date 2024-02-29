import React from 'react';


const GridLayout = () => {
    const images = [
        { url: '/images/gridImg1.png', orientation: 'portraitImg' },
        { url: '/images/gridImg3.png', orientation: 'landscapeImg' },
        { url: '/images/gridImg4.png', orientation: 'portraitImg' },
        { url: '/images/gridImg2.png', orientation: 'portraitImg' },
        { url: '/images/gridImg5.png', orientation: 'portraitImg' },
        { url: '/images/gridImg6.png', orientation: 'portraitImg' },
        { url: '/images/gridImg7.png', orientation: 'portraitImg' },
        { url: '/images/gridImg6.png', orientation: 'portraitImg' },
      ];
    return (
        <>
            <div className="SectionGridLayout">
                <div className="container-fluid mt-5">
                    <div className="row p-0">
                        <div className="col-lg-12 p-0">
                            <div className="Gridrow">
                                <div className="imageGrid">
                                    {images.map((image, index) => (
                                        <div key={index} className={`imageItem ${image.orientation}`}>
                                            <img className='GridImage' src={image.url} alt={`Image ${index}`} />
                                            <div className='imgaeGridTtile'><p>DRESS | JUMPSUITS</p></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GridLayout;

