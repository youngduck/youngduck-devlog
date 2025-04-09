"use client";
/**
 * 작성자: KYD
 * 기능:
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import { useRef } from "react";
import Duck from "@public/assets/svg/duck.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ISvgProfile {}

const SvgProfile: React.FC<ISvgProfile> = () => {
  //SECTION HOOK호출 영역
  const duckRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (duckRef.current) {
        const duckElement = duckRef.current;
        console.log("duckElement", duckElement);

        // SVG 요소 선택 - 실제 SVG 구조에 맞게 수정
        const paths = duckElement.querySelectorAll("path");
        // const head = paths[0]; // 첫 번째 path
        // const mouseTop = paths[1]; // 두 번째 path
        // const mouseBottom = paths[2]; // 세 번째 path
        // const handThumbUp = paths[3]; // 네 번째 path
        // const handDefault = paths[4]; // 다섯 번째 path
        // // 콧주름
        // const noseWrinkle = paths[5];

        const [head, mouseTop, mouseBottom, handDefault, noseWrinkle] = paths;

        // 타원과 원 요소 선택
        const ellipses = duckElement.querySelectorAll("ellipse");
        const leftEye = ellipses[0]; // 첫 번째 ellipse
        const rightEye = ellipses[1]; // 두 번째 ellipse

        const circles = duckElement.querySelectorAll("circle");
        const leftNostril = circles[0]; // 첫 번째 circle
        const rightNostril = circles[1]; // 두 번째 circle

        // 별 요소 (나머지 path들)
        const star1 = paths[6]; // 여섯 번째 path
        const star2 = paths[7]; // 일곱 번째 path
        const star3 = paths[8]; // 여덟 번째 path

        // 초기 상태 설정 - 모든 요소 숨김
        gsap.set(
          [
            head,
            mouseTop,
            mouseBottom,
            handDefault,
            leftEye,
            rightEye,
            leftNostril,
            rightNostril,
            star1,
            star2,
            star3,
          ],
          {
            opacity: 0,
            scale: 1,
          },
        );

        // 5초 시나리오 타임라인 생성
        const timeline = gsap.timeline({
          repeat: -1,
          repeatDelay: 1,
        });

        // 1. 오리가 순차적으로 그려짐 (0-3초)
        timeline.to([head, leftEye, rightEye, leftNostril, rightNostril], {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power1.inOut",
        });

        timeline.to(
          [mouseTop, mouseBottom],
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power1.inOut",
          },
          "+=0.2",
        );

        timeline.to(
          handDefault,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power1.inOut",
          },
          "+=0.2",
        );

        // 2. 기본 손이 사라지고 엄지 손으로 변경 (3-4초)
        timeline.to(
          handDefault,
          {
            opacity: 0,
            scale: 1,
            duration: 0.5,
            ease: "power1.inOut",
          },
          "+=0.5",
        );

        // 3. 별이 순차적으로 등장 (4-5초)
        timeline.to(
          star1,
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power1.inOut",
          },
          "+=0.2",
        );

        timeline.to(
          star2,
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power1.inOut",
          },
          "+=0.1",
        );

        timeline.to(
          star3,
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power1.inOut",
          },
          "+=0.1",
        );

        // 별들이 바깥쪽으로 이동
        timeline.to(
          star1,
          {
            x: -10,
            y: -10,
            duration: 0.5,
            ease: "power1.inOut",
          },
          "+=0.1",
        );

        timeline.to(
          star2,
          {
            x: -15,
            y: 0,
            duration: 0.5,
            ease: "power1.inOut",
          },
          "-=0.3",
        );

        timeline.to(
          star3,
          {
            x: -5,
            y: -15,
            duration: 0.5,
            ease: "power1.inOut",
          },
          "-=0.3",
        );
        // 잠시 유지 후 모든 요소 초기화
        timeline.to({}, { duration: 1 }); // 1초 대기

        // 모든 요소 초기화
        timeline.to(
          [
            head,
            mouseTop,
            mouseBottom,
            handDefault,
            leftEye,
            rightEye,
            leftNostril,
            rightNostril,
            star1,
            star2,
            star3,
          ],
          {
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power1.inOut",
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
    <>
      <Duck ref={duckRef} />
    </>
  );
};

export default SvgProfile;
