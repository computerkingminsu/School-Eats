import Link from 'next/link';
import * as S from './LayoutHeader.styles';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import { isLoggedIn } from '../../commons/globalstate/globalstate';

export default function LayoutHeader(): JSX.Element {
  const [login] = useRecoilState(isLoggedIn);
  const router = useRouter();
  const goBookmark = () => {
    if (!login) {
      Modal.error({
        title: '로그인이 필요합니다!',
      });
    } else {
      router.push('/mypage/bookmark');
    }
  };
  return (
    <>
      <S.Wrapper>
        <Link href="/">
          <S.Logo>
            <S.LogoImage />
            <S.Title>School Eats!</S.Title>
          </S.Logo>
        </Link>
        <S.IconWrapper>
          <Link href="/search">
            <S.SearchIcon />
          </Link>
          <S.BookmarkIcon onClick={goBookmark} />
        </S.IconWrapper>
      </S.Wrapper>
    </>
  );
}
