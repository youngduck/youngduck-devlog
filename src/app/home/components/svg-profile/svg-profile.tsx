"use client";
/**
 * 작성자: KYD
 * 기능: SVG ANIMATION GSAP으로 구현
 * 시나리오: 1. 오리가 순차적으로 그려짐 (0-3초)
 *          2. 오리 엄지척 후 별 등장
 *          3. 별 바깥쪽으로 이동
 *          4. 5초 대기 후 초기화
 *          5. 반복

 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import { useRef } from "react";
import Duck from "@public/assets/svg/duck.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface SvgProfileProps {
  width?: number;
  height?: number;
  className?: string;
}

const SvgProfile = ({
  width = 100,
  height = 100,
  className = "",
}: SvgProfileProps) => {
  //SECTION HOOK호출 영역
  const duckRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (duckRef.current) {
        const duckElement = duckRef.current;

        // SVG 요소 선택 - 실제 SVG 구조에 맞게 수정,
        // TODO: SVG에 class명을 지정해서 값으로 가져오는것이 안되는 이슈 존재.
        const paths = duckElement.querySelectorAll("path");

        const [
          head,
          mouseTop,
          mouseBottom,
          handThumbUp,
          noseWrinkle,
          star1,
          star2,
          star3,
          closeLeftEye,
          closeRightEye,
        ] = paths;
        const [leftOpenEye, rightOpenEye] =
          duckElement.querySelectorAll("ellipse");

        const [leftNostril, rightNostril] =
          duckElement.querySelectorAll("circle");

        // 초기 상태 설정 - 모든 요소 숨김
        gsap.set(
          [
            head,
            mouseTop,
            mouseBottom,
            handThumbUp,
            leftOpenEye,
            rightOpenEye,
            closeLeftEye,
            closeRightEye,
            leftNostril,
            rightNostril,
            noseWrinkle,
            star1,
            star2,
            star3,
          ],
          {
            opacity: 0,
            scale: 1,
          },
        );

        // 메인 타임라인 생성
        const timeline = gsap.timeline({
          repeat: -1,
          repeatDelay: 1,
          // onRepeat: () => {
          //   // 메인 타임라인이 반복될 때 눈 깜빡임도 재시작
          //   // blinkTimeline.restart();
          // },
        });

        // 눈 깜빡임 타임라인
        const blinkTimeline = gsap.timeline({
          repeat: -1,
          repeatDelay: 1,
          paused: true, // 처음에는 정지 상태로 생성
        });

        // 눈 깜빡임 애니메이션
        blinkTimeline
          .to([leftOpenEye, rightOpenEye], {
            opacity: 0,
            duration: 0.1,
            ease: "none",
          })
          .to(
            [closeLeftEye, closeRightEye],
            {
              opacity: 1,
              duration: 0.1,
              ease: "none",
            },
            "<",
          ) // 동시에 실행
          .to(
            [closeLeftEye, closeRightEye],
            {
              opacity: 0,
              duration: 0.1,
              ease: "none",
            },
            "+=0.1",
          )
          .to(
            [leftOpenEye, rightOpenEye],
            {
              opacity: 1,
              duration: 0.1,
              ease: "none",
            },
            "<",
          ); // 동시에 실행

        // 메인 애니메이션에서 오리가 나타나는 부분
        timeline.to(
          [
            head,
            leftOpenEye,
            rightOpenEye,
            leftNostril,
            rightNostril,
            noseWrinkle,
          ],
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power1.inOut",
            onComplete: () => {
              // 오리가 나타난 후 눈 깜빡임 시작
              blinkTimeline.play();
            },
          },
        );

        timeline.to(
          [mouseTop, mouseBottom],
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power1.inOut",
          },
          ">",
        );

        timeline.to(
          handThumbUp,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power1.inOut",
          },
          ">",
        );

        // 3개의 별들이 바깥으로 퍼지면서 등장
        timeline
          .set(
            [star1, star2, star3],
            {
              opacity: 1,
              scale: 1,
            },
            "-=0.3",
          )
          .to(
            [star1, star2, star3],
            {
              opacity: 1,
              scale: 1,
              x: (i) => [+10, -10, +5][i],
              y: (i) => [-15, -5, +10][i],
              rotation: (i) => [0, 0, 0][i],
              transformOrigin: "center",
              duration: 0.8,
              ease: "power1.out",
            },
            "<",
          );

        // 4.5초간 유지
        timeline.to({}, { duration: 4.5 }); // 4.5초 대기

        // 초기화 부분에서 눈 깜빡임도 멈춤
        timeline.to(
          [
            head,
            mouseTop,
            mouseBottom,
            handThumbUp,
            leftOpenEye,
            rightOpenEye,
            closeLeftEye,
            closeRightEye,
            leftNostril,
            rightNostril,
            noseWrinkle,
            star1,
            star2,
            star3,
          ],
          {
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut",
            onStart: () => {
              // 초기화가 시작될 때 눈 깜빡임 정지
              blinkTimeline.pause();
            },
          },
        );
      }
    },
    { scope: duckRef },
  );
  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역

  //!SECTION 메서드 영역

  return (
    <Duck ref={duckRef} width={width} height={height} className={className} />
  );
};

export default SvgProfile;
