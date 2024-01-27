import * as S from './BoardDetail.styles';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { isLoggedIn, userEmail } from '../../../../commons/globalstate/globalstate';
import { Avatar, Modal } from 'antd';
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  LikeOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Image } from 'antd';
import { useGetDetailBoardPost } from '../../../hooks/useGetDetailBoardPost';
import { useBoardComments } from '../../../hooks/useBoardComments';
import { useScrap } from '../../../hooks/useScrap';
import { useLike } from '../../../hooks/useLike';

export default function BoardDetail(): JSX.Element {
  const { comments, newComment, setNewComment, addComment, deleteComment } = useBoardComments();
  const { post, usermatch, onClickDeletePost } = useGetDetailBoardPost();
  const { handleScrap, isScraped } = useScrap();
  const { handleLike, isLiked, like } = useLike();

  const login = useRecoilValue(isLoggedIn);
  const email = useRecoilValue(userEmail);

  const router = useRouter();
  const data = JSON.stringify(router.query);
  const jsonObject = JSON.parse(data);
  const postId = jsonObject.boardid;

  const goBack = () => {
    router.back();
  };

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
      <S.HeaderWrapper>
        <S.IconWrapper>
          <S.BackButton onClick={goBack} />
        </S.IconWrapper>
        <S.HeaderText>커뮤니티</S.HeaderText>
        <S.IconWrapper>
          <Link href="/search">
            <S.SearchIcon />
          </Link>
          <S.TitleBookmarkIcon onClick={goBookmark} />
        </S.IconWrapper>
      </S.HeaderWrapper>
      <S.Wrapper>
        <S.Infor>
          <Avatar
            size="large"
            shape="square"
            style={{ backgroundColor: '#f6786f', marginRight: '2%' }}
            icon={<UserOutlined rev={undefined} />}
          />
          <S.InforUser>
            <S.UserEmail>
              {post?.email?.split('@')[0]}
              <S.EditButton>
                {usermatch && (
                  <Link href={`/boards/${postId}/edit`}>
                    <EditOutlined rev={undefined} style={{ fontSize: '18px', marginRight: '15%' }} />
                  </Link>
                )}
                {usermatch && (
                  <DeleteOutlined onClick={onClickDeletePost} rev={undefined} style={{ fontSize: '18px' }} />
                )}
              </S.EditButton>
            </S.UserEmail>
            <S.Timestamp>{post?.timestamp}</S.Timestamp>
          </S.InforUser>
        </S.Infor>
        <S.ContentsWrapper>
          <S.ContentsTitle>{post?.title}</S.ContentsTitle>
          <S.Contents>{post?.contents}</S.Contents>
          <Image style={{ marginTop: '10%', borderRadius: '7px' }} width={150} src={post?.img} />
        </S.ContentsWrapper>
        <S.LikeCommentCount>
          <S.LikeCount>
            <LikeOutlined style={{ color: '#f6786f', marginRight: '15%' }} rev={undefined} />
            {like.length}
          </S.LikeCount>
          <S.CommentCount>
            <CommentOutlined style={{ color: '#2eccfa', marginRight: '15%' }} rev={undefined} /> {comments.length}
          </S.CommentCount>
        </S.LikeCommentCount>
        <S.ButtonWrapper>
          <S.LikeButton onClick={handleLike}>
            <LikeOutlined rev={undefined} />
            &nbsp; {isLiked ? '좋아요 취소' : '좋아요'}
          </S.LikeButton>
          <S.ScrapButton onClick={handleScrap}>
            <StarOutlined rev={undefined} />
            &nbsp;{isScraped ? '스크랩 취소' : '스크랩'}
          </S.ScrapButton>
        </S.ButtonWrapper>
        <S.CommentsTitle>댓글</S.CommentsTitle>
        <S.CommentsInput
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="여러분의 소중한 댓글을 남겨주세요!"
        ></S.CommentsInput>
        <S.SubmitWrapper>
          <S.SubmitButton onClick={addComment}>등록</S.SubmitButton>
        </S.SubmitWrapper>

        {comments.map((comment) => (
          <S.CommentsWrapper key={comment.id}>
            <S.CommentsUser>
              <S.CommentsUserEmail>
                <Avatar
                  size="small"
                  shape="square"
                  style={{ marginRight: '2%' }}
                  icon={<UserOutlined rev={undefined} />}
                />
                {comment.email?.split('@')[0]}
              </S.CommentsUserEmail>
              {comment.email === email && (
                <DeleteOutlined
                  onClick={() => deleteComment(comment.id)}
                  rev={undefined}
                  style={{ fontSize: '15px' }}
                />
              )}
            </S.CommentsUser>
            <S.Comments>{comment.text}</S.Comments>
            <S.CommentsTimestamp>{comment.timestamp}</S.CommentsTimestamp>
          </S.CommentsWrapper>
        ))}
      </S.Wrapper>
    </>
  );
}
