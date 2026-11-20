// 프로젝트 데이터(한 곳에서 관리).
// card: 홈 3D 캐러셀 카드, 나머지: 프로젝트 상세 화면
export const projects = [
  {
    "id": "obsidian-shield",
    "kind": "TEAM 1차 · 5인 · DW아카데미",
    "period": "2026.06 – 07",
    "title": "Obsidian Shield",
    "one": "실시간 보행자 관제 시스템",
    "desc": "카메라 영상에서 사람을 찾고, 등록해 둔 탐지 대상이 나타나면 위치와 장면을 관제 화면에 알려주는 시스템입니다.",
    "tags": [
      "Python",
      "Flask",
      "YOLO",
      "InsightFace",
      "JSON"
    ],
    "flow": [
      "카메라 등록",
      "사람 탐지·추적",
      "얼굴 대조",
      "이벤트 기록·알림",
      "지도·로그 확인"
    ],
    "core": [
      [
        "사람 탐지·추적",
        "YOLO로 영상 속 사람을 찾고 프레임마다 추적"
      ],
      [
        "얼굴 대조",
        "InsightFace로 얼굴 특징을 뽑아 등록한 탐지 대상과 비교"
      ],
      [
        "이벤트 로그 · 실시간 알림",
        "일치하면 시각·위치 좌표·캡처 이미지를 기록하고 관제 화면에 알림"
      ],
      [
        "위치추적 지도",
        "이벤트가 발생한 위치를 탐지 대상별로 지도에 표시"
      ],
      [
        "회원·권한 관리",
        "검색·필터·정렬로 회원 조회, 가입 승인, 관리자·관제 요원 권한 부여",
        1
      ],
      [
        "통합 관제 대시보드",
        "등록 대상·미확인 이벤트·승인 사용자·실시간 영상·최근 탐지를 한 화면에 모음 (UI/UX 설계)",
        1
      ]
    ],
    "res": [
      [
        "한 화면 관제",
        "탐지 대상·미확인 이벤트·승인 사용자·실시간 영상을 대시보드에 함께 표시"
      ],
      [
        "이벤트 기록",
        "시각·좌표·캡처 이미지를 남기고 읽음 처리"
      ],
      [
        "권한 분리",
        "관리자와 관제 요원의 권한을 나눠 부여"
      ]
    ],
    "shots": [
      [
        "assets/obsidian-dashboard.jpg",
        "통합 관제 대시보드"
      ],
      [
        "assets/obsidian-members.jpg",
        "사용자 관리 화면 (샘플 데이터)"
      ]
    ],
    "links": [
      [
        "GitHub",
        "https://github.com/Kanabig/obsidian-shield"
      ],
      [
        "노션",
        "https://app.notion.com/p/410bd08dbbd28139b33bd769f4a63d4b"
      ]
    ],
    "gl": [
      [
        "해결하려는 문제",
        "여러 카메라 영상을 사람이 계속 지켜보며 특정 인물을 찾아야 한다."
      ],
      [
        "동작 방식",
        "영상 속 사람을 탐지·추적하고, 얼굴을 등록한 탐지 대상과 대조해 일치하면 이벤트로 기록한다."
      ],
      [
        "사용자",
        "관리자(회원·카메라·탐지 대상 관리)와 관제 요원(실시간 관제·이벤트 확인)"
      ],
      [
        "내 역할",
        "회원·권한 관리, 통합 관제 대시보드 UI/UX"
      ]
    ],
    "intro": [
      "assets/intro-obsidian-shield.mp4",
      "등록한 대상을 CCTV 영상에서 찾아 알려 주는 실시간 보행자 관제 시스템"
    ],
    "videos": [
      [
        "assets/obsidian-shield-1.mp4",
        "회원가입과 로그인, 탐지 대상 등록, 실시간 관제 화면에서 영상 속 인물을 식별하고 이벤트 로그에 기록하는 흐름, 사용자 관리와 카메라 관리"
      ]
    ],
    "card": {
      "group": "team",
      "label": "Obsidian Shield",
      "chip": "TEAM · 5인",
      "period": "2026.06–07",
      "hook": "찾는 사람이 나타나면 바로 알려 줍니다",
      "summary": "카메라 영상에서 사람을 찾아 알아보는 실시간 관제 시스템",
      "image": "assets/obsidian-members.jpg",
      "video": "assets/intro-obsidian-shield.mp4",
      "tags": [
        "Flask",
        "YOLO",
        "InsightFace"
      ],
      "colors": [
        "#0b1230",
        "#2f5bd8"
      ]
    }
  },
  {
    "id": "white-eyes",
    "kind": "TEAM 2차 · 6인 · DW아카데미",
    "period": "2026.10 – 11 예정",
    "title": "white-eyes",
    "one": "영상 기반 혼잡도 분석 서비스",
    "desc": "드론·CCTV 영상에서 사람을 세고, 구역별 혼잡을 한눈에 보여주는 군중 관제 서비스입니다.",
    "tags": [
      "Flask",
      "Spring Boot",
      "MySQL",
      "YOLOv8",
      "Docker"
    ],
    "flow": [
      "영상 입력",
      "사람 탐지·추적",
      "결과 전송 (1초)",
      "시간별·일별 집계",
      "지도·그래프 화면"
    ],
    "core": [
      [
        "분석 서버",
        "사람 탐지(YOLOv8m)와 추적, 유입/유출 판정, 체류 시간 계산. 결과를 1초마다 관리자 앱에 전송",
        1
      ],
      [
        "시간별·일별 통계 집계",
        "분석 결과를 1분·시간별·일별로 쌓아 통계 화면에서 조회",
        1
      ],
      [
        "누락 복구",
        "서버가 꺼져 있던 구간의 집계 누락을 찾아 다시 채움",
        1
      ],
      [
        "전송 실패 보관 · 재전송",
        "전송에 실패한 결과를 보관했다가 다시 전송",
        1
      ],
      [
        "서비스 구성",
        "nginx 하나를 입구로 사용자 앱·관리자 앱(Spring)·분석 서버(Flask)·MySQL을 docker compose로 구성"
      ]
    ],
    "res": [
      [
        "추적 번호 부여율 1~2% → 약 91%",
        "추적이 끊기지 않고 이어지도록 개선"
      ],
      [
        "전송 실패 결과 120건 재전송 확인",
        "보관한 결과가 빠짐없이 다시 전송됨"
      ],
      [
        "사람 수는 실제의 약 60~65%",
        "사진 120장으로 측정, 화면에서는 '추정 인원'으로 표시"
      ]
    ],
    "shots": [
      [
        "assets/white-eyes-dashboard.jpg",
        "관리자 대시보드"
      ],
      [
        "assets/we-admin-heatmap.jpg",
        "대시보드 + 히트맵"
      ],
      [
        "assets/we-admin-graph.jpg",
        "통계 그래프"
      ],
      [
        "assets/we-admin-zones.jpg",
        "구역 관리 (지도에서 구역 그리기)"
      ],
      [
        "assets/we-admin-cameras.jpg",
        "캠 관리"
      ],
      [
        "assets/we-user-dashboard.jpg",
        "사용자 대시보드"
      ],
      [
        "assets/we-user-graph.jpg",
        "사용자 통계 그래프"
      ]
    ],
    "links": [
      [
        "GitHub",
        "https://github.com/white-eyes1/white-eyes-introduce"
      ],
      [
        "노션",
        "https://app.notion.com/p/410bd08dbbd281978c38ec7c854cdea0"
      ]
    ],
    "gl": [
      [
        "해결하려는 문제",
        "인파가 몰려도 위험을 일찍 알아차리기 어렵고, 실제 보행 수요를 알기 어렵다."
      ],
      [
        "동작 방식",
        "영상에서 사람을 찾아 따라가며 구역별 인원·밀집도·유입/유출·체류 시간을 쌓고 지도·그래프로 보여준다."
      ],
      [
        "사용자",
        "통계를 보는 고객(사용자 앱)과 서비스를 운영하는 관리자(관리자 앱)"
      ],
      [
        "내 역할",
        "분석 서버(탐지·추적·유입/유출), 시간별·일별 통계 집계"
      ]
    ],
    "intro": [
      "assets/intro-white-eyes.mp4",
      "드론 영상으로 구역별 혼잡도를 세고 지도에 표시하는 혼잡도 분석 서비스"
    ],
    "videos": [
      [
        "assets/white-eyes-admin.mp4",
        "관리자 앱: 대시보드와 지도, 구역 그리기와 등록, 통계 그래프, 캠 등록, 관리자 관리, 작업 기록, 이벤트 로그"
      ],
      [
        "assets/white-eyes-user.mp4",
        "사용자 앱: 로그인 후 지도에서 구역별 혼잡 단계와 통계 그래프 확인"
      ],
      [
        "assets/white-eyes-signup.mp4",
        "사용자 앱 회원가입과 승인 대기 안내"
      ],
      [
        "assets/demo-white-eyes.mp4",
        "실제 분석 서버의 탐지기(VisDrone YOLOv8m, 신뢰도 0.3)로 분석한 결과를 원본 영상 위에 그린 화면 (초록 박스는 추적 중, 노란 박스는 번호 부여 전, 가려졌거나 작은 사람은 놓칠 수 있음)"
      ]
    ],
    "card": {
      "group": "team",
      "label": "white-eyes",
      "chip": "TEAM · 6인",
      "period": "2026.10–11",
      "hook": "지금 그곳, 얼마나 붐빌까?",
      "summary": "드론·CCTV 영상으로 사람을 세고 혼잡 단계를 지도에 보여 주는 서비스",
      "image": "assets/white-eyes-dashboard.jpg",
      "video": "assets/intro-white-eyes.mp4",
      "tags": [
        "Flask",
        "Spring Boot",
        "MySQL"
      ],
      "colors": [
        "#053d33",
        "#12b886"
      ]
    }
  },
  {
    "id": "gray-expedition",
    "kind": "PERSONAL",
    "period": "2026.09 – 11",
    "title": "잿빛 원정대",
    "one": "다크 고딕 덱빌딩 로그라이크",
    "desc": "성화가 꺼진 왕국에서 원정대가 불씨를 찾아 폐허로 들어가는 이야기를 카드 전투로 풀었습니다.",
    "tags": [
      "Godot 4",
      "GDScript",
      "Python"
    ],
    "flow": [
      "원정대원 선택",
      "안개 지도 이동",
      "전투 · 이벤트",
      "보상 · 상점",
      "보스"
    ],
    "core": [
      [
        "손패 전투",
        "에너지 3으로 손패를 운영하는 턴제 전투. 카드를 끌어 적을 조준하고 명중 타이밍에 맞춰 연출 재생"
      ],
      [
        "공통 상태 시스템",
        "독은 중첩만큼 방어를 무시하고 피해, 맹독은 최대 HP의 8%. 플레이어와 몬스터가 같은 UnitStatus 사용"
      ],
      [
        "안개 지도",
        "연결선 기준 두 칸까지만 공개, 지나온 길은 유지"
      ],
      [
        "데이터 중심 콘텐츠",
        "카드·유물·몬스터·이벤트를 JSON으로 관리하고 Python 도구가 검증 후 내보냄"
      ],
      [
        "도감 · 자동 저장",
        "만나지 못한 항목은 실루엣만 표시, 방과 방 사이마다 자동 저장"
      ]
    ],
    "res": [
      [
        "몬스터 46종 · 이벤트 175개",
        "5개 지역, 보스 5종"
      ],
      [
        "유물 115종 · 포션 15종",
        "원정대원 4명 전용 카드 풀"
      ],
      [
        "점검 스크립트 54개",
        "콘텐츠·저장·BGM 에셋 점검"
      ]
    ],
    "shots": [
      [
        "assets/game-battle.jpg",
        "전투 화면"
      ],
      [
        "assets/game-map.jpg",
        "안개 지도"
      ]
    ],
    "links": [
      [
        "GitHub",
        "https://github.com/j75390/gametest"
      ],
      [
        "노션",
        "https://app.notion.com/p/416bd08dbbd281128167dfdc0989405b"
      ]
    ],
    "gl": [
      [
        "무엇",
        "카드 손패로 싸우며 지도를 따라 나아가는 다크 고딕 덱빌딩 로그라이크 게임"
      ],
      [
        "만든 이유",
        "카드·유물·이벤트·지도·상점이 맞물려 돌아가는 한 판의 구조 전체를 직접 만들어 보려고"
      ],
      [
        "방식",
        "Godot 4(GDScript)로 게임을, 콘텐츠는 JSON과 Python 도구로 검증·내보내기"
      ],
      [
        "내 역할",
        "기획과 구현 전체 (개인)"
      ]
    ],
    "videos": [
      [
        "assets/gray-expedition-1.mp4",
        "타이틀, 원정 도감, 스토리 이벤트, 카드 전투"
      ]
    ],
    "card": {
      "group": "solo",
      "label": "잿빛 원정대",
      "chip": "PERSONAL",
      "period": "2026.09–11",
      "hook": "불이 꺼진 왕국에서 불씨를 찾아서",
      "summary": "카드로 싸우며 나아가는 다크 판타지 덱빌딩 게임",
      "image": "assets/game-battle.jpg",
      "video": "",
      "tags": [
        "Godot 4",
        "GDScript"
      ],
      "colors": [
        "#241046",
        "#8b5cf6"
      ]
    }
  },
  {
    "id": "studyseat",
    "kind": "PERSONAL",
    "period": "2026.11",
    "title": "StudySeat",
    "one": "스터디카페 좌석 예약 서비스",
    "desc": "전국 스터디카페를 지도에서 찾고, 매장 도면에서 좌석을 직접 골라 예약합니다.",
    "tags": [
      "Java 17",
      "Spring Boot",
      "JPA",
      "Flyway",
      "Thymeleaf"
    ],
    "flow": [
      "지점 찾기",
      "도면에서 좌석 선택",
      "포인트 결제",
      "QR 입실",
      "연장 · 후기"
    ],
    "core": [
      [
        "이중 예약 방지",
        "예약을 1시간 슬롯 행으로 나누고 (seat_id, slot_start) 유니크 제약으로 겹치는 요청을 DB가 거부"
      ],
      [
        "포인트 원장",
        "잔액을 고치지 않고 충전·사용·환불·적립을 원장에 쌓아 합계로 계산, 회원 행 비관적 락"
      ],
      [
        "도면 엔진",
        "좌석 수와 옵션만 주면 벽·스터디룸·사물함·키오스크까지 배치"
      ],
      [
        "혼잡도 통계",
        "예약을 시간·일 단위로 집계, 서버가 꺼졌던 구간은 시작 시 채움"
      ],
      [
        "전국 지점 데이터",
        "256개 시·군·구에 지점을 배치해 약 720곳, 좌석 약 1만 5천 석을 JDBC 배치로 생성"
      ]
    ],
    "res": [
      [
        "20명 동시 예약 → 1명 성공",
        "같은 좌석 동시 요청 시험"
      ],
      [
        "도면 756가지 조합 검증",
        "요소가 겹치지 않는지 시험"
      ],
      [
        "자동 시험 40개 통과",
        "동시성·포인트·도면"
      ]
    ],
    "shots": [
      [
        "assets/studyseat-booking.jpg",
        "도면 좌석 예약 화면"
      ],
      [
        "assets/studyseat-admin.jpg",
        "관리자 · 전국 현황과 혼잡도"
      ]
    ],
    "links": [
      [
        "GitHub",
        "https://github.com/j75390/studyseat"
      ],
      [
        "노션",
        "https://app.notion.com/p/414bd08dbbd281cb9c76de38d90cff32"
      ]
    ],
    "gl": [
      [
        "해결하려는 문제",
        "스터디카페는 가 보기 전에는 자리가 있는지, 어떤 자리인지 알기 어렵고 미리 정해 둘 수도 없다."
      ],
      [
        "동작 방식",
        "지도에서 지점을 찾고, 도면에서 좌석을 골라 포인트로 결제하면 QR이 발급된다."
      ],
      [
        "핵심 과제",
        "같은 좌석에 동시에 요청이 들어와도 한 명만 예약되고, 포인트가 어긋나지 않아야 한다."
      ],
      [
        "내 역할",
        "기획·설계·구현 전체 (개인)"
      ]
    ],
    "intro": [
      "assets/intro-studyseat.mp4",
      "지도에서 지점을 찾고 도면에서 좌석을 골라 예약하는 스터디카페 좌석 예약 서비스"
    ],
    "videos": [
      [
        "assets/studyseat-1.mp4",
        "지점 찾기(지도), 지점 상세, 가입과 로그인, 도면에서 좌석 선택과 예약, 입실 화면"
      ]
    ],
    "card": {
      "group": "solo",
      "label": "StudySeat",
      "chip": "PERSONAL",
      "period": "2026.11",
      "hook": "내 자리, 미리 잡아두세요",
      "summary": "지도에서 찾고 도면에서 고르고 QR로 입실하는 스터디카페 예약",
      "image": "assets/studyseat-booking.jpg",
      "video": "assets/intro-studyseat.mp4",
      "tags": [
        "Spring Boot",
        "JPA",
        "Flyway"
      ],
      "colors": [
        "#0d5c57",
        "#5eead4"
      ]
    }
  },
  {
    "id": "ai-team-console",
    "kind": "PERSONAL",
    "period": "2026.11",
    "title": "AI 팀 관제",
    "one": "AI 리뷰어 호출·한도 확인 웹 앱",
    "desc": "Codex와 Gemini에게 같은 요청을 동시에 보내고, 결과와 남은 한도를 한 화면에서 봅니다.",
    "tags": [
      "Python",
      "Canvas 2D"
    ],
    "flow": [
      "요청 입력",
      "리뷰어 동시 호출",
      "결과 · 한도 카드",
      "관제실 신호",
      "추적 · 재시도 · 해소"
    ],
    "core": [
      [
        "리뷰어 병렬 호출",
        "스레드로 동시에 호출해 한쪽이 느리거나 실패해도 다른 결과는 바로 표시. Codex는 읽기 전용 샌드박스"
      ],
      [
        "한도 표시",
        "Codex는 응답 문구, Gemini는 429 응답, Claude는 5시간·주간 한도를 읽어 AI별 카드에 표시"
      ],
      [
        "관제실 신호",
        "호출 실패·한도 소진을 레이더 신호로 띄우고 추적·재시도·해소 선택"
      ],
      [
        "결과 모아 보기",
        "AI마다 형식이 다른 응답을 카드 하나로 맞춰 결과와 남은 한도를 나란히 표시"
      ]
    ],
    "res": [
      [
        "자동 시험 60개 통과",
        "호출·한도 표시"
      ],
      [
        "외부 패키지 없이 구현",
        "Python 표준 라이브러리만 사용"
      ]
    ],
    "shots": [
      [
        "assets/ai-console.jpg",
        "관제실 화면"
      ]
    ],
    "links": [
      [
        "GitHub",
        "https://github.com/j75390/ai-team-console"
      ],
      [
        "노션",
        "https://app.notion.com/p/414bd08dbbd281feb70dd7434209a903"
      ]
    ],
    "gl": [
      [
        "해결하려는 문제",
        "AI를 역할별로 나눠 쓰면 창이 흩어지고, 한도 확인 방식도 AI마다 달라 한눈에 보기 어렵다."
      ],
      [
        "동작 방식",
        "Codex와 Gemini에 같은 요청을 동시에 보내고, 결과와 남은 한도를 카드로 모아 보여준다."
      ],
      [
        "쓰는 경우",
        "코드를 고치기 전에 여러 AI에게 리뷰를 받을 때, 한 번 요청해서 결과를 비교한다."
      ],
      [
        "내 역할",
        "기획·설계·구현 전체 (개인)"
      ]
    ],
    "intro": [
      "assets/intro-ai-team-console.mp4",
      "Claude · Codex · Gemini를 한 화면에서 호출하고 한도를 확인하는 앱"
    ],
    "videos": [
      [
        "assets/ai-console-1.mp4",
        "AI 연동 전: 관제실 화면과 AI 연동 창"
      ],
      [
        "assets/ai-console-2.mp4",
        "AI 연동 후: Codex와 Gemini에 동시에 요청하고 리뷰가 진행되는 화면"
      ]
    ],
    "card": {
      "group": "solo",
      "label": "AI 팀 관제",
      "chip": "PERSONAL",
      "period": "2026.11",
      "hook": "AI 셋에게 한 번에 물어보면?",
      "summary": "여러 AI에게 리뷰를 동시에 맡기고 결과와 한도를 한 화면에서 확인",
      "image": "assets/ai-console.jpg",
      "video": "assets/intro-ai-team-console.mp4",
      "tags": [
        "Python",
        "Canvas 2D"
      ],
      "colors": [
        "#04230f",
        "#22c55e"
      ]
    }
  },
  {
    "id": "barodam",
    "kind": "PERSONAL",
    "period": "2026.11",
    "title": "바로담 마켓",
    "one": "필요한 모든 것을, 바로 담다 — 종합 쇼핑몰",
    "desc": "오늘의 특가와 실시간 랭킹, 쿠폰·적립금 주문, 고객센터와 채용 사이트까지. 7개 카테고리 상품 536개를 한 곳에서 담는 종합 쇼핑몰입니다.",
    "tags": [
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Vitest"
    ],
    "flow": [
      "홈 · 검색",
      "상품 상세",
      "쿠폰·적립금 주문",
      "주문 상태 진행",
      "취소 · 구매확정 · 상품평"
    ],
    "core": [
      [
        "서버가 금액을 다시 계산",
        "적립금·쿠폰·주문 테이블은 클라이언트가 직접 쓸 수 없고, place_order 함수가 금액 합계·쿠폰·잔액을 검사한 뒤에만 저장"
      ],
      [
        "시간으로 계산하는 주문 상태",
        "저장하지 않고 결제 시각으로 계산(0·1·3·10분), 같은 규칙을 TypeScript와 SQL에 둬 화면과 서버가 항상 일치"
      ],
      [
        "Backend 인터페이스",
        "화면은 31개 메서드만 사용, Supabase와 브라우저 저장소 구현을 갈아 끼움 — 서버 이전 때 화면 코드 변경 없음"
      ],
      [
        "사진 1장 = 상품 1개",
        "상품 ID를 사진 번호로 고정하고 가격·옵션은 ID 시드 난수로 생성해 사진을 추가해도 ID·가격 불변"
      ],
      [
        "경로별 링크 미리보기",
        "빌드 후 상품 536개 포함 634개 경로마다 제목·대표 사진(Open Graph) HTML 생성"
      ]
    ],
    "res": [
      [
        "서버 규칙 점검 20/20 통과",
        "금액 조작·적립금 직접 수정·쿠폰 위조를 서버가 거절"
      ],
      [
        "단위 테스트 28개 통과",
        "주문 상태·쿠폰·적립금·상품 데이터"
      ],
      [
        "상품 536개 · 브랜드 32개",
        "화면 30여 개, 고객센터·채용 사이트 포함"
      ]
    ],
    "shots": [
      [
        "assets/barodam-home.jpg",
        "홈 화면"
      ],
      [
        "assets/barodam-order.jpg",
        "쿠폰·적립금 주문서"
      ]
    ],
    "links": [
      [
        "GitHub",
        "https://github.com/j75390/barodam"
      ],
      [
        "노션",
        "https://app.notion.com/p/41dbd08dbbd281dfb816de02e5b332fc"
      ],
      [
        "서비스",
        "https://barodam.kro.kr"
      ]
    ],
    "gl": [
      [
        "해결하려는 문제",
        "쇼핑몰 프로젝트는 상품 목록에서 끝나기 쉽지만, 실제 어려움은 쿠폰·적립금·취소처럼 돈이 오가는 흐름에 있다."
      ],
      [
        "동작 방식",
        "상품을 찾아 쿠폰·적립금으로 주문하면 시간에 따라 상태가 진행되고, 배송 전에는 취소하면 쿠폰·적립금이 돌아온다."
      ],
      [
        "핵심 과제",
        "브라우저 코드를 고쳐도 금액이나 적립금이 조작되지 않아야 한다."
      ],
      [
        "내 역할",
        "기획·설계·구현 전체 (개인)"
      ]
    ],
    "intro": [
      "assets/intro-barodam.mp4",
      "상품 탐색부터 주문·취소, 서버 금액 검증까지 담은 종합 쇼핑몰"
    ],
    "card": {
      "group": "solo",
      "label": "바로담 마켓",
      "chip": "PERSONAL",
      "period": "2026.11",
      "hook": "필요한 모든 것을, 바로 담다",
      "summary": "오늘의 특가·실시간 랭킹부터 쿠폰·적립금 주문까지, 7개 카테고리 상품 536개를 한 곳에서",
      "image": "assets/barodam-home.jpg",
      "video": "assets/intro-barodam.mp4",
      "tags": [
        "React",
        "TypeScript",
        "Supabase"
      ],
      "colors": [
        "#5a1e0c",
        "#e8461e"
      ]
    }
  },
  {
    "id": "depth-fill-robot",
    "kind": "PERSONAL · 진행 중",
    "period": "2026.11",
    "title": "depth-fill-robot",
    "one": "깊이 영상 빈 영역 보완 방법 비교 도구",
    "desc": "로봇 카메라의 깊이 영상에서 값이 빠진 영역을 채우는 방법들을, 같은 조건과 같은 지표로 공정하게 비교하는 평가 도구입니다.",
    "tags": [
      "Python",
      "NumPy",
      "PyTorch",
      "OpenCV",
      "pytest"
    ],
    "flow": [
      "정답 깊이에 구멍 만들기",
      "보완 방법 적용",
      "구멍 영역만 채점",
      "유형별 결과표",
      "실패 사례 분석"
    ],
    "core": [
      [
        "구멍 유형별 생성",
        "무작위·물체 가장자리·반사 영역 세 유형으로 값을 비우고, 시드를 고정해 같은 구멍을 언제든 다시 만듦"
      ],
      [
        "구멍 영역만 채점",
        "원래 값이 있던 곳은 평가에서 빼고, 비워 둔 영역의 MAE·RMSE만 계산. 계산 정밀도 문제를 잡으려 오차는 64비트로 계산"
      ],
      [
        "방법 공통 인터페이스",
        "단순 채우기와 작은 U-Net 등 어떤 방법이든 같은 입력·같은 출력 형식으로 끼워 넣어 같은 조건에서 비교"
      ],
      [
        "가려 맞히기 학습",
        "실제 로봇 데이터에는 정답 깊이가 없으므로, 측정된 값 일부를 일부러 가려 맞히게 하는 방식으로 학습할 계획"
      ],
      [
        "구조와 판단 기록",
        "폴더 구조 규칙과 판단 기록 문서를 두고, 안 된 시도도 그대로 남기는 방식으로 진행"
      ]
    ],
    "res": [
      [
        "평가 도구 뼈대 완료",
        "구멍 생성, 지표, 기준 방법까지 합성 장면으로 동작 확인"
      ],
      [
        "범위와 한계를 먼저 문서화",
        "실제 로봇이 아닌 공개 센서 데이터를 쓰고, 구멍은 규칙으로 만든다는 한계를 밝힘"
      ],
      [
        "진행 예정",
        "공개 데이터 연결, 작은 U-Net 학습, 유형별 비교표, 전/후 뷰어"
      ]
    ],
    "shots": [
      [
        "assets/depth-fill-random.jpg",
        "비교 화면: 무작위 덩어리 구멍"
      ],
      [
        "assets/depth-fill-edge.jpg",
        "비교 화면: 물체 가장자리 구멍"
      ],
      [
        "assets/depth-fill-reflect.jpg",
        "비교 화면: 반사 영역 구멍"
      ],
      [
        "assets/depth-fill-structure.png",
        "평가 도구 구조도"
      ]
    ],
    "links": [
      [
        "노션",
        "https://app.notion.com/p/41ebd08dbbd28166b575fcd9f3d6fcaf"
      ]
    ],
    "intro": [
      "assets/intro-depth-fill-robot.mp4",
      "깊이 영상의 빈 영역을 채우는 방법들을 같은 조건에서 비교하는 평가 도구"
    ],
    "videos": [
      [
        "assets/depth-fill-robot-1.mp4",
        "비교 화면: 구멍 유형(무작위·물체 가장자리·반사 영역)을 바꿔 가며 정답 깊이, 구멍, 보완 결과, 오차와 방법별 MAE·RMSE를 한 화면에서 확인 (합성 장면)"
      ]
    ],
    "gl": [
      [
        "해결하려는 문제",
        "깊이 카메라는 반사면·투명한 물체·가장자리에서 값이 비는 일이 많고, 빈 영역이 있으면 로봇이 물체의 위치와 높이를 잘못 추정한다."
      ],
      [
        "동작 방식",
        "정답 깊이에 구멍을 만들고, 여러 보완 방법을 같은 조건에서 적용해 구멍 유형별 오차와 실패 사례를 표와 이미지로 정리한다."
      ],
      [
        "현재 상태",
        "평가 도구 뼈대까지 만들었고, 공개 데이터 연결과 모델 학습은 진행 예정이다. 합성 장면의 숫자에는 의미를 두지 않는다."
      ],
      [
        "내 역할",
        "기획·설계·구현 전체 (개인)"
      ]
    ],
    "card": {
      "group": "solo",
      "label": "depth-fill-robot",
      "chip": "PERSONAL · 진행 중",
      "period": "2026.11",
      "hook": "빈 깊이 값, 어떤 방법이 가장 잘 채울까?",
      "summary": "깊이 영상의 빈 영역을 채우는 방법들을 같은 조건에서 비교하는 평가 도구",
      "image": "assets/depth-fill-random.jpg",
      "video": "assets/intro-depth-fill-robot.mp4",
      "tags": [
        "Python",
        "PyTorch",
        "OpenCV"
      ],
      "colors": [
        "#0b2a3d",
        "#2bb6d9"
      ]
    }
  },
  {
    "id": "persona-chat-server",
    "kind": "PERSONAL · 진행 중",
    "period": "2026.11",
    "title": "persona-chat-server",
    "one": "AI 캐릭터 채팅 서버",
    "desc": "AI 캐릭터와 대화하는 서비스에서 서버가 죽지 않고, 기억이 어긋나지 않고, 같은 메시지가 두 번 처리되지 않게 하는 서버 쪽 핵심을 작게 만든 프로젝트입니다.",
    "tags": [
      "Python",
      "asyncio",
      "SQLite",
      "FastAPI",
      "pytest"
    ],
    "flow": [
      "메시지 수신",
      "중복 확인",
      "기억 요약 + 프롬프트",
      "모델 라우팅",
      "스트리밍 · 저장"
    ],
    "core": [
      [
        "모델 전환",
        "첫 글자가 늦거나 실패하면 다른 모델로 넘기고, 응답 시간과 전환 횟수를 기록. 이미 글자가 나간 뒤 끊기면 다른 모델로 바꾸지 않음"
      ],
      [
        "중복·재시도 안전",
        "메시지마다 client_msg_id를 받고 DB 유니크 제약으로 막아, 같은 메시지를 다시 보내도 모델을 다시 부르지 않음"
      ],
      [
        "기억 요약",
        "최근 대화는 그대로 두고 오래된 대화는 요약해 프롬프트에 넣어 대화가 길어져도 이어지게 함"
      ],
      [
        "불완전한 답은 저장하지 않음",
        "끝까지 받은 답만 저장해 끊긴 문장이 대화 기록에 남지 않게 함"
      ],
      [
        "계층 구조",
        "핵심 로직은 표준 라이브러리만 쓰고 웹 프레임워크는 API 계층에서만 사용. 모델은 공통 인터페이스 뒤에 두어 가짜 모델로 비용 없이 시험"
      ]
    ],
    "res": [
      [
        "핵심 로직 뼈대 완료",
        "모델 전환·기억·중복 방지를 가짜 모델로 동작 확인"
      ],
      [
        "안전·비용 원칙 문서화",
        "오리지널 캐릭터만 사용, 실제 호출은 시연 위주로 제한하고 확인한 숫자만 기록"
      ],
      [
        "진행 예정",
        "실제 LLM 연결, 스트리밍 API, 장애 시나리오 시험, 채팅 화면"
      ]
    ],
    "shots": [
      [
        "assets/persona-fallback.jpg",
        "시나리오 화면: 모델 장애 → 전환"
      ],
      [
        "assets/persona-dup.jpg",
        "시나리오 화면: 같은 메시지 재전송"
      ],
      [
        "assets/persona-cut.jpg",
        "시나리오 화면: 답변 도중 끊김"
      ],
      [
        "assets/persona-memory.jpg",
        "시나리오 화면: 기억 요약"
      ],
      [
        "assets/persona-chat-structure.png",
        "서버 처리 흐름 구조도"
      ]
    ],
    "links": [
      [
        "노션",
        "https://app.notion.com/p/41ebd08dbbd281ffa48cc68c42a0cca6"
      ]
    ],
    "intro": [
      "assets/intro-persona-chat-server.mp4",
      "기억 · 모델 전환 · 중복 방지에 집중한 AI 캐릭터 채팅 서버"
    ],
    "videos": [
      [
        "assets/persona-chat-server-1.mp4",
        "시나리오 화면: 모델 장애 시 전환, 같은 메시지 재전송, 답변 도중 끊김, 기억 요약을 서버 기록과 함께 확인 (가짜 모델로 실행)"
      ]
    ],
    "gl": [
      [
        "해결하려는 문제",
        "LLM 채팅 서비스는 모델이 느려지거나 끊기고, 같은 메시지가 두 번 들어오고, 대화가 길어져 기억이 흐려지는 일이 흔하다."
      ],
      [
        "동작 방식",
        "메시지를 받아 중복을 거르고, 기억과 캐릭터 설정으로 프롬프트를 만들어 모델에 보내며, 실패하면 다른 모델로 넘기고 완성된 답만 저장한다."
      ],
      [
        "현재 상태",
        "핵심 로직 뼈대까지 가짜 모델로 만들었고, 실제 LLM 연결·API·채팅 화면은 진행 예정이다."
      ],
      [
        "내 역할",
        "기획·설계·구현 전체 (개인)"
      ]
    ],
    "card": {
      "group": "solo",
      "label": "persona-chat-server",
      "chip": "PERSONAL · 진행 중",
      "period": "2026.11",
      "hook": "모델이 흔들려도 대화는 끊기지 않게",
      "summary": "기억·모델 전환·중복 방지에 집중한 AI 캐릭터 채팅 서버",
      "image": "assets/persona-fallback.jpg",
      "video": "assets/intro-persona-chat-server.mp4",
      "tags": [
        "Python",
        "asyncio",
        "SQLite"
      ],
      "colors": [
        "#2a1046",
        "#d946a8"
      ]
    }
  }
];
