import styled from "styled-components";

const PremiumStyle = styled.div`
.containerPremium{
    max-width: 1184px;
    padding: 50px 20px;
    margin:  0 auto;
}
.textUpperCase{
  text-transform: uppercase;
}
.textWhite{
  color: #ffffff;
}
.textOffWhite{
  color: #ffffff;
  opacity: 0.8;
}
.reddishBrownColor {
    color: #BF6159;
};
.premiumTopTileInner{
    padding: 50px 10px 50px 10px;
}
.premiumTopTile .topTitle{
    font-size: 36px;
    line-height: 54px;
    text-transform: uppercase;
}
.premiumTopTile .topMiniTitle{
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;
    margin-bottom: 0px;
}
.reddishBrownColorBg{
    background-color: #BF6159;
}
  .bg-banner {
    background-image: url('images/cardItemsBg.png');
    background-size: cover;
    padding: 20px 0px;
  }

  .itemsCardRow {
    grid-gap: 30px;
  }

  .itemscardInner {
    position: relative;
    transition: background-color 0.3s ease;
  }

  .fourColumnCardImgBox {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top: -40px;
    transform: translate(-50%, -10%);
    transition: background-color 0.3s ease, transform 0.3s ease; /* Adding transition effect */
  }

  .fourColumnCardImgBox:hover,
  .itemscardInner:hover .fourColumnCardImgBox {
    background-color: #BF6159;
  }

  .fourColumnCardImgBox img {
    position: absolute;
  }

  .itemsCardContentBox {
    padding: 60px 10px 20px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .itemscard {
    background-color: rgba(191, 97, 89, 0.15);
    transition: background-color 0.3s ease;
  }

  .itemsCardContent {
    max-width: 222px;
    font-size: 14px;
    line-height: 21px;
    text-align: center;
  }

  .itemsCardheading {
    font-size: 20px;
    line-height: 30px;
  }

  .itemscardBtn {
    background-color: transparent;
    border: none;
    text-decoration: underline;
    color: #BF6159;
  }
  .latestBlogBtn{
    width: 150px;
    height: 44px;
    border: 1px solid #BF6159;
    color: #BF6159;
    background-color: transparent;
    transition: all 0.3s ease;
  };
  .latestBlogBtn:hover{
    background-color: #BF6159;
    color: #ffffff;
  };
  .cardTitleLatesBlog{
    max-width: 320px;
    color: #000000;
    font-size: 25px;
    line-height: 36px;
  }
  .cardDateLatesBlog{
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.5px;
    color: #787878;
  };
  .cardDetailedBy{
    font-size: 12px;
    line-height: 18px;
    text-transform: uppercase;
    color: #141414;
  };
  .cardContentLatesBlog{
    font-size: 14px;
    line-height: 21px;
    max-width: 320px;
  }
  .cardLatesBlog {
    background-color: #FAE9DA;
  transition: background-color 0.3s ease;
  border: none;
}


.cardLatesBlog:hover .cardTitleLatesBlog{
  color: #BF6159;
  transition: color 0.3s ease; 
}
.cardLatesBlog:hover .latestBlogBtn{
    background-color: #BF6159;
    color: #ffffff;
}
.GridSpace30 {
  grid-gap:30px;
}
.InfoColumn{
  position: relative;
}
.InfoColumn:not(:last-child)::after {
  content: '-';
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 16px;
  height: 1px;
  background-color: #000000;
  color: white;
}

/* css for section new & trending products */
.gridLayoutItem {
  position: relative;
  overflow: hidden;
  margin: 10px;
  height: 255px;
}

.gridLayoutItem img {
  width: 100%;
  height: auto;
  display: block;
  height: 255px;
  object-fit: cover;
}

.gridLayoutItem:nth-child(3),
.gridLayoutItem:nth-child(4) {
  grid-column: span 2;
  height: 424px;
}

.gridLayoutItem:nth-child(3) img,
.gridLayoutItem:nth-child(4) img {
  grid-column: span 2;
  height: 424px;
}

.gridLayoutItem:nth-child(4) {
  margin-top: -160px;
}

.gridLayoutInner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.gridLayoutOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;
  color: white;
  padding: 20px;
}

.gridLayoutOverlay p,
.gridLayoutOverlay h4 {
  margin: 0;
}
.gridLayoutOverlayText{
  font-size: 12px;
  line-height: 18px;
}

.gridLayoutOverlayHeading{
  font-size: 28px;
  line-height: 42px;
  margin-bottom: 8px;
}
.gridLayoutOverlayBtn {
  background-color: transparent;
  width: 120px;
  height: 36px;
  color: white;
  font-size: 14px;
  line-height: 21px;
  border: 2px solid #ffffff;
  transition: 0.3s ease;
}
.gridLayoutOverlayBtn:hover{
  background-color: #BF6159;
  border: 2px solid #BF6159;
}

/* css for products by categories */
.categoriesItemBox{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}
.categoriesItem{
  max-width: 262px;
}
.categoriesImgBox{
  height: 324px;
  background-color: #FAE9DA;
}
.categoriesImgBox .categoriesImg{
  max-width: 70px;
  object-fit: contain;
}
.categoriesBtn{
  border: none;
  border-radius: 0px;
  width: 100%;
  height: 44px;
}
.categoriesoverlayImgBox{
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s all ease;
}
.categoriesoverlayImgBox:hover{
  background-color: #BF6159;
}
.catergoriesHeartEye{
  position: absolute;
  right: 0;
  top: 0;
}
/* footer section css */
.setionfooterSection{
  background-color: #64382c;
  padding-top: 75px;
}
.footerRow{
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1.5fr;
  grid-gap: 20px;
}
.footerLinkWrapper{
  grid-gap: 15px;
}
.footerLinkHeading{
  font-size: 22px;
  line-height: 33px;
}
.footerLink{
  font-size: 14px;
  line-height: 21px;
  text-decoration: none;
  transition: 0.3s ease;
}
.footerIconImg{
  width: 13px;
  height: 15px;
  object-fit: contain;
}
.footerLink:hover{
color: #BF6159;
}
.linkWrapperImg{
  grid-gap: 10px;
}
.linkWrapperImg:not(:last-child){
  margin-bottom: 20px;
}
.footerSocialIcon{
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #ffffff;
  transition: 0.3s ease;
}
.footerSocialIcon:hover{
  background-color: #BF6159
}
.footerEmailContact{
  background-color: #784c4c;
}
.footerSocialIcon:not(:last-child){
  margin-right: 8px;
}

.footerEmailContact{
  background-color: #784c4c;
    width: 244px;
    height: 44px;
    border: none;
    color: white;
    border-radius: 4px;
    margin: 20px 0px 40px 0px;
    padding-left: 10px;
}
.footerEmailContact::placeholder{
  color: #ffffff;
}
.promtionImgWrapper{
  width: 46px;
  height: 24px;
  background-color: #ffffff;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.promtionImgWrapper:not(:last-child){
  margin-right: 8px;
}
.pb-20{
  padding-bottom: 20px;
}
.pb-40{
  padding-bottom: 40px;
}
.footerBottom{
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.footerText{
  font-size: 14px;
  line-height: 21px;
}
@media screen and (max-width: 850px) {
  .footerRow{
    grid-template-columns: 1fr;
  }
  .footerBottom{
    flex-direction: column;
    grid-gap: 15px;
  }
  .footerBottom .footerText{
    margin-bottom: 0px;
  }
}

`;

export default PremiumStyle;
