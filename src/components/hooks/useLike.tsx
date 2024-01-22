import React, { ChangeEvent, useEffect, useState } from 'react';
import { useMoveToPage } from './useMoveToPage';
import { useRouter } from 'next/router';
import { authInstance, db, firebaseapp } from '../../../pages/_app';
import {
  DocumentData,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Modal } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedIn, userEmail } from '../../commons/globalstate/globalstate';
interface Like {
  id: string;
  text?: string;
  email?: string;
}

export const useLike = () => {
  const [login] = useRecoilState(isLoggedIn);
  const email = useRecoilValue(userEmail);
  const router = useRouter();
  const data = JSON.stringify(router.query); // boardId를 추출
  const jsonObject = JSON.parse(data);
  const postId = jsonObject.boardid;
  const [like, setLike] = useState<Like[]>([]);

  const getLike = async () => {
    let q;

    // q = query(collection(db, 'board', postId, 'like'));
    q = query(collection(db, 'boardlike'), where('boardId', '==', postId));

    const snapshot = await getDocs(q);
    const likeArr = snapshot.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setLike(likeArr);
  };

  // const addLike = async () => {
  //   if (login) {
  //     const likeRef = collection(db, 'board', postId, 'like');
  //     await addDoc(likeRef, {
  //       // placeId: postId,
  //       email,
  //     });
  //   } else {
  //     Modal.error({
  //       title: '로그인이 필요합니다!',
  //     });
  //   }
  // };
  const addLike = async () => {
    if (!login) {
      Modal.error({
        title: '로그인이 필요합니다!',
      });
      return;
    }

    // '좋아요' 객체 생성 및 UI 업데이트
    const newLikeObj = {
      email,
      // 임시 ID 할당
      id: Date.now().toString(),
      boardId: postId,
    };
    //@ts-ignore
    setLike([...like, newLikeObj]);
    setIsLiked(true);

    // 데이터베이스에 '좋아요' 추가
    try {
      // const likeRef = collection(db, 'board', postId, 'like');
      const likeRef = collection(db, 'boardlike');

      // await addDoc(likeRef, { email });
      await addDoc(likeRef, { email, boardId: postId });

      getLike(); // 최신 '좋아요' 상태를 다시 불러옴
    } catch (error) {
      console.error('Error adding like:', error);
      setLike(like.filter((l) => l.id !== newLikeObj.id)); // 실패 시 UI에서 '좋아요' 제거
      setIsLiked(false);
    }
  };

  // const deleteLike = async (likeId: any) => {
  //   const deletelike: any = doc(db, 'board', postId, 'like', likeId);

  //   await deleteDoc(deletelike);
  // };

  const deleteLike = async (likeId: string) => {
    // UI에서 '좋아요' 제거
    setLike(like.filter((l) => l.id !== likeId));
    setIsLiked(false);

    // 데이터베이스에서 '좋아요' 삭제
    try {
      // const deletelike = doc(db, 'board', postId, 'like', likeId);
      const deletelike = doc(db, 'boardlike', likeId);

      await deleteDoc(deletelike);
      getLike(); // 최신 '좋아요' 상태를 다시 불러옴
    } catch (error) {
      console.error('Error deleting like:', error);
      // 실패 시 오류 메시지 표시
      Modal.error({
        title: '좋아요 삭제에 실패했습니다.',
      });
    }
  };

  const [isLiked, setIsLiked] = useState(false);

  // const handleLike = async () => {
  //   if (isLiked) {
  //     const likeId = like.find((b) => b.email === email)?.id;
  //     if (likeId) await deleteLike(likeId);
  //   } else {
  //     await addLike();
  //   }
  //   await getLike();
  //   setIsLiked(!isLiked);
  // };
  const handleLike = async () => {
    const currentLike = like.find((l) => l.email === email);
    if (currentLike) {
      await deleteLike(currentLike.id);
    } else {
      await addLike();
    }
  };
  const updateLike = async (likeCount: number) => {
    const board = doc(db, 'board', postId);
    await updateDoc(board, {
      likecount: likeCount,
    });
  };

  // useEffect(() => {
  //   (async () => {
  //     if (postId) {
  //       await getLike();
  //       setIsLiked(like.some((b) => b.email === email));
  //     }
  //   })();
  // }, [postId, like]);

  // useEffect(() => {
  //   if (like.length > 0) {
  //     const likeCount = like.length;
  //     // 백그라운드에서 데이터베이스 업데이트
  //     updateLike(likeCount);
  //   }
  // }, [like]);

  useEffect(() => {
    if (postId) {
      getLike();
    }
  }, [postId]);

  useEffect(() => {
    const isUserLiked = like.some((l) => l.email === email);
    setIsLiked(isUserLiked);

    // 백그라운드에서 데이터베이스 업데이트
    const likeCount = like.length;
    updateLike(likeCount);
  }, [like, email]);

  return { addLike, deleteLike, getLike, like, handleLike, isLiked };
};