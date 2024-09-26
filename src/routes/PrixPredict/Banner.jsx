import styled from 'styled-components';
import Banner from '../../assets/banner-prixpredict.png'
 
const BannerContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;
 
const BannerImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`;
 
const Banner = () => {
  return (
    <BannerContainer>
      <BannerImage src={Banner} alt="Banner" />
    </BannerContainer>
  );
}
 
export default Banner;