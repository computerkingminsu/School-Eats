import * as S from '../../../src/styles/map/Map.styles';
import Link from 'next/link';
import useWesternMap from '../../../src/services/map/useWesternMap';

export default function WesternMap(): JSX.Element {
  useWesternMap();
  return (
    <S.Wrapper>
      <S.Title>조선대 맛집 지도😉</S.Title>
      <S.SubTitle>해시태그와 스쿨잇츠 로고를 눌러보세요!</S.SubTitle>
      <S.ButtonWrapper>
        <Link href="/map">
          <S.Button>#맛집</S.Button>
        </Link>
        <Link href="/map/koreanmap">
          <S.Button>#한식</S.Button>
        </Link>
        <Link href="/map/chinesemap">
          <S.Button>#중식</S.Button>
        </Link>
        <Link href="/map/japanesemap">
          <S.Button>#일식</S.Button>
        </Link>
        <S.SelectButton>#양식</S.SelectButton>
        <Link href="/map/cafemap">
          <S.Button>#카페</S.Button>
        </Link>
      </S.ButtonWrapper>
      <S.Map id="map" />
    </S.Wrapper>
  );
}
