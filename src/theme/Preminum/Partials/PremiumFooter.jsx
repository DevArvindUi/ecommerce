import React from 'react'
import { Link } from 'react-router-dom'

const PremiumFooter = () => {
    return (
        <div className='setionfooterSection'>
            <div style={{maxWidth: '1144px', padding: '0px 20px 20px 20px'}}>
                <div className='footerRow' style={{paddingBottom: '30px'}}>
                    <div className='footerColumn'>
                        <div>
                            <h3 className='textWhite pb-20'>LOGO</h3>
                            <div>
                                <p className='textOffWhite footerText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                            </div>
                            <div>
                                <div className='d-flex linkWrapperImg'>
                                    <img className='footerIconImg' src="images/callIcon.png" alt="" />
                                    <Link type='tell'></Link>
                                    <a href="tel:+1000123456789" className="textOffWhite">+(1) 000 123 456 789</a>
                                </div>
                                <div className='d-flex linkWrapperImg'>
                                    <img className='footerIconImg' src="images/EmailIcon.png" alt="" />
                                    <a href="mailto:info@example.com" className="textOffWhite">info@example.com</a>
                                </div>
                                <div className='d-flex linkWrapperImg'>
                                    <img className='footerIconImg' src="images/chekInImg.png" alt="" />
                                    <p className='textOffWhite footerText'>No: 58 A, East Madison Street, Baltimore, MD, USA 4508</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h4 className='textWhite pb-40 footerLinkHeading'>Information</h4>
                            <div className='d-flex flex-column footerLinkWrapper'>
                                <Link className='footerLink textOffWhite' to=''>About</Link>
                                <Link className='footerLink textOffWhite' to=''>Faq</Link>
                                <Link className='footerLink textOffWhite' to=''>Blog</Link>
                                <Link className='footerLink textOffWhite' to=''>Contact</Link>
                                <Link className='footerLink textOffWhite' to=''>Reviews</Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h4 className='textWhite pb-40'>Help</h4>
                            <div className='d-flex flex-column footerLinkWrapper'>
                                <Link className='footerLink textOffWhite' to=''>Return Policy</Link>
                                <Link className='footerLink textOffWhite' to=''>Privacy Policy</Link>
                                <Link className='footerLink textOffWhite' to=''>Shipping Policy</Link>
                                <Link className='footerLink textOffWhite' to=''>Terms of Service</Link>
                                <Link className='footerLink textOffWhite' to=''>Accessibility</Link>
                                <Link className='footerLink textOffWhite' to=''>Account Login</Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h4 className='textWhite pb-40'>Support</h4>
                            <div className='d-flex flex-column footerLinkWrapper'>
                                <Link className='footerLink textOffWhite' to=''>Skincare</Link>
                                <Link className='footerLink textOffWhite' to=''>Beauty</Link>
                                <Link className='footerLink textOffWhite' to=''>Wellness</Link>
                                <Link className='footerLink textOffWhite' to=''>My Account</Link>
                                <Link className='footerLink textOffWhite' to=''>Investors</Link>
                                <Link className='footerLink textOffWhite' to=''>Gift Cards</Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h4 className='textWhite pb-20'>Newsletter</h4>
                            <div>
                                <p className='textOffWhite footerText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <div >
                                <input className='footerEmailContact textOffWhite' type="text" placeholder='Email Address' />
                            </div>
                            <div className='d-flex'>
                                <div className='footerSocialIcon'>
                                    <img src="images/faceBookImg.png" alt="" />
                                </div>
                                <div className='footerSocialIcon'>
                                    <img src="images/twitterImg.png" alt="" />
                                </div>
                                <div className='footerSocialIcon'>
                                    <img src="images/youtubeImg.png" alt="" />
                                </div>
                                <div className='footerSocialIcon'>
                                    <img src="images/InstagramImg.png" alt="" />
                                </div>
                                <div className='footerSocialIcon'>
                                    <img src="images/linkedinImg.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footerBottom d-flex justify-content-between' style={{padding: '40px 0 0px 0px'}}>
                    <div className='d-flex promotionImageBox'>
                        <div className='promtionImgWrapper'>
                            <img src="images/PromotionImg1.png" alt="" />
                        </div>
                        <div className='promtionImgWrapper'>
                            <img src="images/PromotionImg2.png" alt="" />
                        </div>
                        <div className='promtionImgWrapper'>
                            <img src="images/PromotionImg3.png" alt="" />
                        </div>
                        <div className='promtionImgWrapper'>
                            <img src="images/PromotionImg4.png" alt="" />
                        </div>
                        <div className='promtionImgWrapper'>
                            <img src="images/PromotionImg5.png" alt="" />
                        </div>
                    </div>
                    <div>
                        <p className='textOffWhite footerText'>© 2024 Cosmetic, Witmates Technologies Pvt. Ltd., All Right Reserved.</p>
                    </div>
                    <div>
                        <div className='d-flex'>
                            <div>
                                <Link className='footerLink textOffWhite'>{"Terms & Conditions"}</Link>
                            </div>
                            |
                            <div>
                                <Link className='footerLink textOffWhite'>{"Privacy & Policy"}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PremiumFooter
