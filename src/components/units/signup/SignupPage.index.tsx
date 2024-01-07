import Link from 'next/link';
import { useSignup } from '../../hooks/useSignup';
import * as S from './SignupPage.styles';
import { useRouter } from 'next/router';
import { kakaoKey } from '../../../../pages/_app';
import { KakaoLoggedIn, isLoggedIn } from '../../../commons/globalstate/globalstate';
import { useRecoilState } from 'recoil';
import { Modal } from 'antd';

export default function SignupPage(): JSX.Element {
  const { onChangeEmail, onChangePassword, onChangeCheckPassword, onClickSignup, match } = useSignup();
  const [, setLoggedin] = useRecoilState<boolean | null>(isLoggedIn);
  const [, setKakaoLoggedin] = useRecoilState<boolean | null>(KakaoLoggedIn);
  const router = useRouter();

  const success = () => {
    Modal.success({
      content: '로그아웃에 성공하였습니다!',
    });
  };

  const kakaoLogin = async () => {
    //@ts-ignore
    Kakao.Auth.login({
      success: function (authObj: any) {
        router.push('/');
        setLoggedin(true);
        setKakaoLoggedin(true);
        console.log(authObj); // 액세스 토큰이 포함된 객체
        // 사용자 정보 요청
        //@ts-ignore
        Kakao.API.request({
          url: '/v2/user/me',
          success: function (response: any) {
            console.log(response); // 사용자 정보 객체
          },
          fail: function (error: any) {
            console.log(error);
          },
        });
      },
      fail: function (err: any) {
        console.error(err);
      },
    });
  };
  const kakaoLogout = () => {
    //@ts-ignore
    if (Kakao.Auth.getAccessToken()) {
      //@ts-ignore
      Kakao.API.request({
        url: '/v1/user/unlink',
        success: function (response: any) {
          console.log(response);
          window.location.href = '/';
          setKakaoLoggedin(false);
          setLoggedin(false);
        },
        fail: function (error: any) {
          console.log(error);
        },
      });
      //@ts-ignore
      Kakao.Auth.setAccessToken(undefined);
    }
  };

  return (
    <S.Wrapper>
      <S.HomeButtonWrapper>
        <Link href="/">
          <S.BackButton />
        </Link>

        <S.Title>회원가입</S.Title>
        <Link href="/">
          <S.HomeButton />
        </Link>
      </S.HomeButtonWrapper>

      <S.CouponDiv>
        <S.CouponImg>🎁</S.CouponImg>
        회원 가입시 <S.ColorText>&nbsp;&nbsp;제휴 맛집 쿠폰&nbsp;&nbsp;</S.ColorText> 즉시 지급
      </S.CouponDiv>
      <S.kakaoText>간편 회원가입</S.kakaoText>
      <S.Button onClick={kakaoLogin}>
        <S.logo src="/kakao.png" />
      </S.Button>
      <S.Button onClick={kakaoLogout}>aaa</S.Button>
      <>
        <hr style={{ margin: '8%', width: '100%', height: '1px', backgroundColor: '#E6E6E6' }} />
      </>

      <S.InputTitle>이메일</S.InputTitle>
      <S.Input placeholder="이메일을 입력해주세요." />
      <S.InputTitle>비밀번호</S.InputTitle>
      <S.Input placeholder="비밀번호를 입력해주세요" />
      <S.InputTitle>비밀번호 확인</S.InputTitle>
      <S.Input placeholder="비밀번호를 입력해주세요" />
      <S.SignupButton>회원가입하기</S.SignupButton>
      <Link href="/login">
        <S.LoginRouter>
          이미 아이디가 있으신가요?&nbsp;&nbsp;
          <S.UnderLine>로그인</S.UnderLine>
        </S.LoginRouter>
      </Link>
    </S.Wrapper>
  );
}
