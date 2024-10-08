import * as S from './Navbar.styles';
import HomeButton from '../../../public/common/homebutton.svg';
import PlaceButton from '../../../public/layout/navbar/placebutton.svg';
import BoardButton from '../../../public/layout/navbar/boardbutton.svg';
import MypageButton from '../../../public/layout/navbar/mypagebutton.svg';
import MapButton from '../../../public/layout/navbar/mapbutton.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { isLoggedIn } from '../../commons/globalstate/globalstate';

export default function Navbar(): JSX.Element {
  const router = useRouter();
  const login = useRecoilValue(isLoggedIn);
  return (
    <>
      <S.Wrapper>
        <S.ButtonWrapper>
          <S.Button>
            <Link href="/">
              <S.Div style={{ color: router.pathname === '/' ? '#f6786f' : '#000000' }}>
                <HomeButton style={{ fill: router.pathname === '/' ? '#f6786f' : '#000000' }} />
                <S.LineDiv />홈
              </S.Div>
            </Link>
          </S.Button>
          <S.Button>
            <Link href="/map">
              <S.Div style={{ color: router.pathname.startsWith('/map') ? '#f6786f' : '#000000' }}>
                <MapButton style={{ fill: router.pathname.startsWith('/map') ? '#f6786f' : '#000000' }} />
                <S.LineDiv />
                맛집지도
              </S.Div>
            </Link>
          </S.Button>
          <S.Button>
            <Link href="/place">
              <S.Div
                style={{
                  color: router.pathname === '/place' || router.pathname.startsWith('/place/') ? '#f6786f' : '#000000',
                }}
              >
                <PlaceButton
                  style={{
                    fill: router.pathname === '/place' || router.pathname.startsWith('/place/') ? '#f6786f' : '#000000',
                  }}
                />
                <S.LineDiv />
                맛집투어
              </S.Div>
            </Link>
          </S.Button>
          <S.Button>
            <Link href="/boards">
              <S.Div
                style={{
                  color:
                    router.pathname === '/boards' || router.pathname.startsWith('/boards/') ? '#f6786f' : '#000000',
                }}
              >
                <BoardButton
                  style={{
                    fill:
                      router.pathname === '/boards' || router.pathname.startsWith('/boards/') ? '#f6786f' : '#000000',
                  }}
                />
                <S.LineDiv />
                커뮤니티
              </S.Div>
            </Link>
          </S.Button>
          <S.Button>
            {!login ? (
              <Link href="/login">
                <S.Div>
                  <MypageButton />
                  <S.LineDiv />
                  마이페이지
                </S.Div>
              </Link>
            ) : (
              <Link href="/mypage">
                <S.Div
                  style={{
                    color:
                      router.pathname === '/mypage' || router.pathname.startsWith('/mypage/') ? '#f6786f' : '#000000',
                  }}
                >
                  <MypageButton
                    style={{
                      fill:
                        router.pathname === '/mypage' || router.pathname.startsWith('/mypage/') ? '#f6786f' : '#000000',
                    }}
                  />
                  <S.LineDiv />
                  마이페이지
                </S.Div>
              </Link>
            )}
          </S.Button>
        </S.ButtonWrapper>
      </S.Wrapper>
    </>
  );
}
