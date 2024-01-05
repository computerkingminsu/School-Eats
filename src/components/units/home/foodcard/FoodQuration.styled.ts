import styled from '@emotion/styled';
import Slider from 'react-slick';

export const Wrapper = styled.div`
  height: 471px;
  margin-left: 14px;
  .slick-dots {
    top: 480px;
    left: 10px;
  }
  margin-right: 14px;
  cursor: pointer;
`;

export const Contents = styled.div`
  :hover {
    opacity: 0.9;
  }
`;
export const FoodImage1 = styled.div`
  height: 471px;
  background-image: url('/한식.jpg');
  width: 314px;
  border-radius: 15px;
  overflow: hidden;
`;
export const FoodImage2 = styled.div`
  height: 471px;
  background-image: url('/중식.jpg');
  width: 314px;
  border-radius: 15px;
  overflow: hidden;
`;
export const FoodImage3 = styled.div`
  height: 471px;
  background-image: url('/일식.jpg');
  width: 314px;
  border-radius: 15px;
  overflow: hidden;
`;
export const FoodImage4 = styled.div`
  height: 471px;
  background-image: url('/양식.jpg');
  width: 314px;
  border-radius: 15px;
  overflow: hidden;
`;

export const FoodTitle = styled.div`
  color: white;
  font-size: 35px;
  font-weight: 600;
  margin-left: 20px;
  margin-top: 30px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
`;

export const FoodText = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 400;
  margin-left: 20px;
  margin-top: 10px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
`;

export const SubTitle = styled.div`
  font-size: 15px;
  font-weight: 200;
  width: 500px;
  padding-left: 14px;
  color: #696d84;
  margin-top: 40px;
  margin-bottom: 6px;
`;
export const Title = styled.div`
  font-size: 22px;
  font-weight: 900;
  width: 500px;
  padding-left: 14px;
  color: #2b2e3b;
  margin-bottom: 15px;
`;
