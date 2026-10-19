// 크롬 바스 일반 2인 가이드 데이터. 내용을 고칠 때는 이 파일만 수정한다.
// 항목 형식: { t: 문자열 또는 (설정) => 문자열, g: 근거 등급, req: 설정 id 또는 함수, timer: 타이머 id }
// 근거 등급: sure=확실(공식), high=가능성 높음(위키·다수 공략), guess=추측(운용안·단일 글), measure=직접 재야 함
// 글자 안의 **굵게**는 강조로 표시된다.

window.GUIDE = {
  version: "2026-10-19",
  title: "크롬 바스 일반 · 닼메 + 세바 2인",

  sources: {
    official0710: { label: "공식 2025-07-10 NEW RISE", url: "https://mabinogi.nexon.com/page/news/notice_view.asp?id=4892875" },
    official1120: { label: "공식 2025-11-20 크롬 개선", url: "https://mabinogi.nexon.com/page/news/notice_view.asp?id=4893148" },
    official0129: { label: "공식 2026-01-29 디버프·펫 개선", url: "https://mabinogi.nexon.com/page/news/notice_view.asp?id=4893308" },
    official0212: { label: "공식 2026-02-12 쉬움·일반 횟수 공유", url: "https://mabinogi.nexon.com/page/news/notice_view.asp?id=4893335" },
    official0512: { label: "공식 2026-05-14 세인트 바드 개편", url: "https://mabinogi.nexon.com/m/news/notice_view.asp?id=4893513" },
    official0618: { label: "공식 2026-06-18 연습 모드·다크메이지", url: "https://mabinogi.nexon.com/page/news/notice_view.asp?id=4893577" },
    official0813: { label: "공식 2026-08-13 각성 스킬", url: "https://mabinogi.nexon.com/m/news/notice_view.asp?id=4893714" },
    official0910: { label: "공식 2026-09-10 던전 입장 쿨 초기화", url: "https://mabinogi.nexon.com/page/news/notice_view.asp?id=4893828" },
    officialPet: { label: "공식 2025-04-08 펫 디버프", url: "https://mabinogi.nexon.com/page/news/notice_view.asp?id=4892699" },
    officialMomo: { label: "공식 2026-04-23 모모", url: "https://mabinogi.nexon.com/m/news/notice_view.asp?id=4893480" },
    namuCrom: { label: "나무위키 크롬 바스 일반 공략 (2026-09-08)", url: "https://namu.wiki/w/%ED%81%AC%EB%A1%AC%20%EB%B0%94%EC%8A%A4/%EB%A7%A4%EC%9A%B0%20%EC%96%B4%EB%A0%A4%EC%9B%80%20%EB%82%9C%EC%9D%B4%EB%8F%84%20%EA%B3%B5%EB%9E%B5" },
    namuIrusha: { label: "나무위키 이루샤 (2026-10-16)", url: "https://namu.wiki/w/%EC%9D%B4%EB%A3%A8%EC%83%A4" },
    namuTrait: { label: "나무위키 특성 (2026-10-14)", url: "https://namu.wiki/w/%EB%A7%88%EB%B9%84%EB%85%B8%EA%B8%B0/%ED%8A%B9%EC%84%B1" },
    arcaSolo: { label: "아카 크롬 일반 솔플 추종자 공략 (2026-07-02)", url: "https://arca.live/b/mabi/175666500" },
    arcaRework: { label: "아카 개편 후 크롬 일반 공략 (2025-07-21)", url: "https://arca.live/b/mabi/142936116" },
    arca80: { label: "아카 크롬 일반 80버 공략 정리 (2025-07-26)", url: "https://arca.live/b/mabi/143433098" },
    arcaShuriker: { label: "아카 쉬리커·점성 유도 (2025-08-16)", url: "https://arca.live/b/mabi/145352217" },
    arcaPet: { label: "아카 펫 디버프 정리 (2026-01-29)", url: "https://arca.live/b/mabi/160904372" },
    video: { label: "조미간 크롬 바스 최신 공략 영상 (2025-12-08)", url: "https://www.youtube.com/watch?v=7bjZgqOugfo" },
    pertyon: { label: "다크메이지 정리 (pertyon, 2026-08-29)", url: "https://pertyon.tistory.com/192" },
    labanyuSkill: { label: "라바뉴 스킬 DB (비공식)", url: "https://mabi.labanyu.com/skill/314" },
    mwiki: { label: "Mabinogi World Wiki Crom Bás", url: "https://wiki.mabinogiworld.com/view/Crom_B%C3%A1s" }
  },

  settings: [
    { group: "펫", id: "pet_yaong", label: "야옹 (용감한/똑똑한)", type: "bool", def: true },
    { group: "펫", id: "pet_mir", label: "미르 또는 케라우노스", type: "bool", def: true },
    { group: "펫", id: "pet_momo", label: "모모", type: "bool", def: true },
    { group: "펫", id: "pet_cart", label: "카트 (물풍선 던지기)", type: "bool", def: true },
    { group: "펫", id: "pet_foxtrot", label: "폭스롯 또는 무등고래 (모모가 없을 때)", type: "bool", def: false },
    { group: "펫", id: "pet_owner", label: "펫 디버프 담당", type: "choice", def: "dm", options: [["dm", "다크메이지"], ["sb", "세인트 바드"]] },
    { group: "다크메이지", id: "dm_deathmarker", label: "데스 마커 (체인 슬래시)", type: "bool", def: true },
    { group: "다크메이지", id: "dm_support", label: "상태 지원 특성", type: "bool", def: true },
    { group: "다크메이지", id: "dm_pierce", label: "급소 관통 특성", type: "bool", def: true },
    { group: "다크메이지", id: "dm_quick", label: "쾌속 특성", type: "bool", def: true },
    { group: "다크메이지", id: "dm_impulse", label: "도르카 임펄스 (각성 31 이상)", type: "bool", def: false },
    { group: "다크메이지", id: "dm_twcount", label: "시간 왜곡 횟수", type: "number", def: 5, min: 1, max: 6 },
    { group: "다크메이지", id: "dm_twsec", label: "시간 왜곡 지속(초)", type: "number", def: 30, min: 30, max: 40 },
    { group: "다크메이지", id: "dm_demigod_cd", label: "반신화 쿨(분)", type: "number", def: 14, min: 7, max: 14 },
    { group: "다크메이지", id: "dm_demigod_dur", label: "반신화 지속(분)", type: "number", def: 4, min: 2, max: 4 },
    { group: "세인트 바드", id: "sb_conj", label: "그랜드 컨정션 (스타사인 스프레드)", type: "bool", def: true },
    { group: "세인트 바드", id: "sb_hanged", label: "매달린 남자 카드", type: "bool", def: false },
    { group: "세인트 바드", id: "sb_chorus", label: "소생의 찬가: 제창 (오검 조합)", type: "bool", def: false },
    { group: "운용", id: "burst_at", label: "큰 카드 쓰는 그로기", type: "choice", def: "80", options: [["80", "80% 추종자 (권장)"], ["90", "90% 쉬리커"]] },
    { group: "알림", id: "alert_vibe", label: "타이머 끝나면 진동", type: "bool", def: true },
    { group: "알림", id: "alert_beep", label: "타이머 끝나면 소리", type: "bool", def: false }
  ],

  // dur: 지속(초), cd: 재사용 대기(초). 지속이 끝나면 쿨을 센다. cd가 0이면 끝났다고 빨갛게 알린다.
  timers: [
    { id: "pets600", label: "펫 방어 감소", who: "pet", dur: 600, cd: 0, req: (s) => s.pet_yaong || s.pet_mir },
    { id: "momo", label: "모모", who: "pet", dur: 300, cd: 0, req: "pet_momo" },
    { id: "deathmarker", label: "데스 마커", who: "dm", dur: 200, cd: 0, req: "dm_deathmarker" },
    { id: "discord", label: "불협화음", who: "sb", dur: 180, cd: 0 },
    { id: "demigod", label: "반신화", who: "dm", dur: (s) => s.dm_demigod_dur * 60, cd: (s) => Math.max(0, s.dm_demigod_cd - s.dm_demigod_dur) * 60 },
    { id: "fraga", label: "프라가라흐", who: "dm", dur: 180, cd: 420 },
    { id: "timewarp", label: "시간 왜곡", who: "dm", dur: (s) => s.dm_twsec, cd: (s) => 900 - s.dm_twsec },
    { id: "pierce", label: "급소 관통", who: "dm", dur: 180, cd: 420, req: "dm_pierce" },
    { id: "storm", label: "스노우 스톰", who: "dm", dur: 10, cd: 50 },
    { id: "collapse", label: "붕괴의 파동", who: "sb", dur: 10, cd: 170 },
    { id: "starsign", label: "스타사인", who: "sb", dur: 30, cd: 0, req: "sb_conj" },
    { id: "hanged", label: "매달린 남자", who: "sb", dur: 60, cd: 0, req: "sb_hanged" },
    { id: "pulse", label: "정화의 고동", who: "sb", dur: 15, cd: 45 }
  ],

  cards: [
    {
      id: "prep", step: "준비", title: "출발 전 점검",
      lead: "연습 모드(보스만, 보상 없음, 내구도 안 닳음)에서 패턴과 추종자 자리를 먼저 익힌다.",
      both: [
        { t: "종합 장비 레벨 **550 이상**. 주 10회, 쉬움과 횟수를 같이 쓴다", g: "sure" },
        { t: "포션은 재사용 30초. 추종자 의식 중에는 포션을 못 쓴다", g: "high" },
        { t: "부활 수단: **나오스톤·수호 영혼석·고급 깃털·풍선은 금지**, 일반 피닉스 깃털·파티 깃털·펫 구급키트는 된다", g: "high" }
      ],
      dm: [
        { t: "스태프 + **보조 무기**(흰색 추종자는 마법 면역이라 근접이나 원거리가 필요)", g: "high" },
        { t: "탑승 펫(노란 추종자는 펫 공격만 통한다. 탄 채로 치면 주인 공격력이 더해진다)", g: "high" },
        { t: "단축키: 컨버트:마나·컨버트:도르카, 마나 블로케이드, 체인, 런지, 스톰, 썬더, 앵커 러시, 반신화, 프라가라흐, 시간 왜곡, 급소 관통", g: "high" }
      ],
      sb: [
        { t: "연주 세트와 보조 무기, 펫", g: "high" },
        { t: "흰색 추종자를 세바가 잡을 수단(보조 무기)을 정해 둔다. 세바 마법은 흰색에 안 통한다", g: "measure" }
      ],
      pet: [
        { t: (s) => `소환 본체에 **야옹**, 친구 소환 슬롯에 ${[s.pet_mir && "**미르/케라**", s.pet_momo && "**모모**"].filter(Boolean).join("와 ")}를 넣고 **"소환 스킬 동시 적용"** 체크`, g: "sure", req: (s) => s.pet_yaong && (s.pet_mir || s.pet_momo) },
        { t: (s) => `야옹이 없으니 ${[s.pet_mir && "미르/케라", s.pet_momo && "모모"].filter(Boolean).join("·")}를 하나씩 소환한다`, g: "sure", req: (s) => !s.pet_yaong && (s.pet_mir || s.pet_momo) },
        { t: "카트(물풍선)는 따로 소환해서 직접 맞혀야 한다", g: "sure", req: "pet_cart" },
        { t: "하데스는 야옹과 같은 계열이라 같이 꺼낼 필요 없다", g: "sure" }
      ],
      src: ["official0710", "official0212", "official0618", "official0129", "officialMomo", "mwiki", "arcaSolo"]
    },
    {
      id: "rooms", step: "1~3번 방", title: "던전 입장 → 1·2·3번 방",
      lead: "입장할 때 큰 스킬 쿨이 모두 초기화된다. 보스방 진입 때는 다시 초기화되지 않는다.",
      both: [
        { t: "**방마다 종을 전부 친다.** 안 치면 최종결전 웨이브가 늘어난다", g: "high" },
        { t: "마법진은 **붉은색**(에르그 +20)", g: "sure" },
        { t: "2번 방을 멜시 디아플 사념파 전에 끝내면 최종결전이 4웨이브로 줄어든다는 서술이 있다", g: "guess" }
      ],
      dm: [
        { t: "스노우 스톰으로 모으고 파이어볼·썬더로 정리", g: "high" },
        { t: "**얼어붙은 카리**는 나오자마자 **마나 블로케이드** → 피해 감소 장판을 못 쓴다(어둠의 카리는 못 막음)", g: "high" },
        { t: "반신화·프라가라흐·시간 왜곡·급소 관통은 **보스방 들어가기 약 15분 전부터 쓰지 않는다**", g: "guess" }
      ],
      sb: [
        { t: "점성술로 몹을 모으고 고동으로 버틴다", g: "high" },
        { t: "종 치기 담당", g: "guess" }
      ],
      src: ["official0910", "official0710", "namuCrom", "arcaRework"]
    },
    {
      id: "irusha", step: "이루샤", title: "이루샤",
      lead: "샤프클로의 죽음의 낙인은 2025-11-20에 삭제됐다.",
      both: [
        { t: "**마법 솥**(체력 90·65·15%): **45초 안에** 솥에서 **7초** 상호작용. 한 명이 로나운을 붙잡고 한 명이 솥", g: "high" },
        { t: "**나이트메어 타수**(위키 75·50·25%, 옛 공략 80%): 시전 전 3초 무적이니 큰 기술을 아낀다. 둘 다 타수에 참여", g: "high" },
        { t: "2인 요구 타수는 공식 수치가 없다. 몇 타였는지 실측 메모에 적는다", g: "measure" },
        { t: "붉은 장판은 약 3초 뒤 폭발(생명력·마나·스태미나 1). 캐스팅을 끊고 빠진다", g: "high" },
        { t: "레이저는 허약의 낙인(걷기만, 포션 불가). 부하가 5마리 넘게 쌓이지 않게 한다", g: "high" }
      ],
      dm: [
        { t: "타수는 여러 번 맞히는 **썬더**", g: "high" }
      ],
      sb: [
        { t: "기본 솥 담당. 상호작용 직전에 보호기를 켜면 맞아도 안 끊긴다는 공략이 있다", g: "high" }
      ],
      src: ["official1120", "official0710", "namuIrusha", "arcaRework"]
    },
    {
      id: "finalwave", step: "최종결전", title: "최종결전 (보스 전 웨이브)",
      lead: "여기서 큰 카드를 쓰면 보스 버스트 때 쿨이 돌아오지 않을 수 있다. 보스방 진입 때 초기화가 없으니 남은 쿨을 보고 아낀다.",
      both: [
        { t: "추격자 게이지 **90% 이상이면 최소 4웨이브**", g: "high" },
        { t: "맵이 넓다. 구석에 몰아 붙잡고 잡는다", g: "high" }
      ],
      dm: [
        { t: "반신화·프라가라흐 **쓰지 않는다**. 스톰·볼트·체인으로만", g: "high" },
        { t: "보스방 들어가기 직전: **컨버트:마나 → 15초 안에 컨버트:도르카**(순증 5)로 도르카를 채운다", g: "high" }
      ],
      sb: [
        { t: "버프 갱신(비바체·서곡)", g: "high" },
        { t: "링크8 이상: **생명력·부상이 모두 회복된** 대상에게 치유의 손길·구원의 메아리·음파의 세례로 회복을 넣어 생명의 장막을 만든다", g: "sure" }
      ],
      src: ["namuCrom", "video", "official0910", "pertyon"]
    },
    {
      id: "b100", step: "100→90%", title: "보스 100 → 90%",
      lead: "보스를 1번 추종자 자리(제단을 위에 두고 좌상, 10~11시)로 끌고 간다. 중앙은 비운다.",
      both: [
        { t: "보스 위치: **1번 추종자 자리(10~11시)**. 6시도 쓰지만 그때는 5·7시 추종자를 범위 공격에 휘말리게 하지 않는다", g: "high" },
        { t: "중앙을 가로지르지 않는다(보스가 중앙으로 점프하면 버스트가 막힌다)", g: "high" }
      ],
      dm: [
        { t: "**데스 마커**(200초)", g: "high", req: "dm_deathmarker", timer: "deathmarker" },
        { t: "자기에게 **상태 지원 5231**. 적에게 거는 3152는 2026-01 이후 가치가 거의 없다", g: "high", req: "dm_support" },
        { t: "마나 블로케이드 → 체인 → 런지 → 파이어볼·썬더로 평소 딜", g: "high" }
      ],
      sb: [
        { t: "비바체·전장의 서곡 유지", g: "high" },
        { t: "음파의 세례 7타로 **불협화음 5중첩**(180초)", g: "sure", timer: "discord" },
        { t: "점성술로 쉬리커를 끌어올 준비", g: "high" }
      ],
      pet: [
        { t: (s) => s.pet_yaong ? `**야옹 소환**${[s.pet_mir && "미르/케라", s.pet_momo && "모모"].filter(Boolean).length ? ` → ${[s.pet_mir && "미르/케라", s.pet_momo && "모모"].filter(Boolean).join("·")} 동시 적용` : ""}` : `**${[s.pet_mir && "미르/케라", s.pet_momo && "모모"].filter(Boolean).join("·")} 소환**`, g: "sure", req: (s) => s.pet_yaong || s.pet_mir || s.pet_momo, timer: "pets600" },
        { t: "모모 타이머(받는 피해 +15%는 공식, 5분은 비공식 DB)", g: "high", req: "pet_momo", timer: "momo" },
        { t: "**카트 물풍선** 맞히기", g: "sure", req: "pet_cart" },
        { t: "폭스롯 또는 고래(받는 피해 +10%, 300초)", g: "sure", req: (s) => s.pet_foxtrot && !s.pet_momo }
      ],
      src: ["namuCrom", "arca80", "video", "official0129", "officialPet", "officialMomo", "namuTrait"]
    },
    {
      id: "b90", step: "90% 쉬리커", title: "90% 쉬리커",
      lead: "쉬리커는 사람을 쫓아와 닿으면 터진다. 무시하지 않는다.",
      both: [
        { t: "폭발을 보스에게 **4~5번** 맞히면 보스가 무릎을 꿇는다(그로기)", g: "high" },
        { t: "보스가 **패턴을 쓰는 중이면** 쉬리커를 맞아도 안 꿇는다. 패턴이 끝난 뒤 붙인다", g: "high" },
        { t: "내가 끌고 다니다 보스에 붙인 뒤 **앵커 러시로 빠진다**", g: "high" }
      ],
      dm: [
        { t: (s) => s.burst_at === "90"
            ? "설정: **90에서 큰 카드.** 쉬리커 그로기가 오면 버스트 카드(반신화→프라가라흐→시간 왜곡…)를 여기서 쓴다"
            : "쉬리커 그로기가 와도 **평소 딜만**(체인 → 런지 → 파이어볼·썬더). 큰 카드는 80%용", g: "guess" }
      ],
      sb: [
        { t: "점성술로 쉬리커를 끌어오고, **수호의 축복**을 켜고 다가가 보스에 터뜨린다", g: "high" }
      ],
      src: ["video", "arcaShuriker", "arcaRework", "namuCrom"]
    },
    {
      id: "b81", step: "85→81%", title: "80% 진입 준비",
      lead: "81%에서 공격을 멈추고, 쉬리커가 한꺼번에 터질 때 80%로 넘긴다.",
      both: [
        { t: "**81%에서 직접 공격을 멈춘다.** 80% 아래로는 안 깎이지만 넘어가는 순간 의식이 시작된다", g: "high" },
        { t: "**쉬리커가 한꺼번에 터지는 순간** 80%로 넘긴다. 늦으면 쉬리커가 남은 채로 의식을 한다", g: "high" },
        { t: "연속 공격 같은 추가 타격이 터지면 상한 아래로 깎여 부하가 먼저 나올 수 있다", g: "high" }
      ],
      dm: [
        { t: "**반신화 → 프라가라흐** 켜고 보스를 쳐서 감소를 한도까지 쌓는다(아이콘 확인). 프라가라흐는 3분", g: "guess", timer: "fraga", req: (s) => s.burst_at === "80" },
        { t: "반신화 타이머", g: "high", timer: "demigod", req: (s) => s.burst_at === "80" },
        { t: "컨버트로 **도르카를 15 가까이** 채운다", g: "high" }
      ],
      sb: [
        { t: "쉬리커 위치를 콜한다", g: "guess" },
        { t: "매달린 남자 다시 걸기(30등급 기준 +5%·60초). 발동 스킬에 **맞은** 적만 적용 → 스타사인 스프레드로 걸려면 컨정션에 **'추가 공격'**을 넣는다", g: "high", req: "sb_hanged", timer: "hanged" }
      ],
      src: ["arcaSolo", "namuTrait", "pertyon"]
    },
    {
      id: "ritual", step: "80% 의식", title: "80% 어둠의 의식 (30초)",
      lead: "Z순서로 30초 안에 4마리. 순서가 틀리면 화면이 뒤집히고, 실패하면 전멸.",
      both: [
        { t: "순서: 제단을 위에 두고 **좌상 → 우상 → 좌하 → 우하**", g: "high" },
        { t: "**빨강 근접 면역 · 파랑 원거리 면역 · 흰색 마법 면역 · 노랑 펫만**", g: "high" },
        { t: "한 마리에 **최소 4타**. 순서가 아닌 추종자를 쓰러뜨리지 않는다", g: "high" },
        { t: "이동할 때 **중앙을 가로지르지 않고** 빙 돌아간다", g: "high" },
        { t: "포션 불가. 블랙홀이 나오면 카운트다운이 멈추고 그동안에도 잡을 수 있다", g: "high" },
        { t: "실패할 것 같으면 반신화 상태의 **이클립스**로 전멸을 막는다는 공략이 있다", g: "high" }
      ],
      dm: [
        { t: "**빨강·파랑을 썬더로**", g: "high" },
        { t: "내 몫이 끝나면 **컨버트로 도르카 채우기**", g: "guess" }
      ],
      sb: [
        { t: "**흰색(보조 무기)·노랑(펫, 탑승 공격)** 담당", g: "guess" },
        { t: "중앙에 디바인 링크 펫이나 고동을 미리 깐다", g: "high" }
      ],
      src: ["arcaSolo", "arcaRework", "arca80", "namuCrom", "video"]
    },
    {
      id: "burst", step: "그로기", title: "그로기 버스트",
      lead: "추종자 의식 성공 뒤에는 보스가 머리를 감싸 쥐고 쓰러진다. 받는 피해 2배, 우리는 무적. 쉬리커·점프 그로기에서도 무적인지는 확인 못 했다.",
      both: [
        { t: "아래 **전체 순서는 2인 운용안**이다. 항목별 등급은 각 효과의 근거다. 연습 모드에서 다듬는다", g: "guess" }
      ],
      sb: [
        { t: "**스타사인 스프레드 + 그랜드 컨정션**(받는 피해 +45%·30초)을 미리 맞춘다", g: "sure", req: "sb_conj", timer: "starsign" },
        { t: "비바체 다시 걸기", g: "high" },
        { t: "닼메가 **\"딜 준비\"** 콜을 하면 **붕괴의 파동**(10초, 쿨 180초)", g: "high", timer: "collapse" },
        { t: "정화의 고동을 보스 자리에(적에게 마법 피해도 준다)", g: "sure", timer: "pulse" }
      ],
      dm: [
        { t: "**마나 블로케이드** 걸기 → 블로케이드 상태인 보스를 마법·다크메이지 스킬로 칠 때마다 도르카 +0.5(최대 10초). 봉쇄 성공 +1은 기대하지 않는다", g: "high" },
        { t: "**라이트닝 체인**(런지 피해 +30%)", g: "high" },
        { t: "**시간 왜곡**", g: "high", timer: "timewarp" },
        { t: "**급소 관통**(상태 지원 5231을 먼저 쓴 뒤에 켠다)", g: "high", req: "dm_pierce", timer: "pierce" },
        { t: "쾌속(효과 작음, 있으면)", g: "high", req: "dm_quick" },
        { t: (s) => `**익스플로전 런지 ${1 + Number(s.dm_twcount)}번**(평소 1 + 시간 왜곡 ${s.dm_twcount})`, g: "high" },
        { t: "**도르카 임펄스**(던전당 1회, 시간 왜곡 안 먹음)", g: "sure", req: "dm_impulse" },
        { t: "레이턴트 이그니션(충전됐으면) → 파이어볼·썬더", g: "high" }
      ],
      warn: [
        "시간 왜곡은 체인·스톰·임펄스에는 안 먹는다",
        "도르카가 0이 되면 아르카나 스킬이 멈춘다. 체인+런지 6번만 약 11.7 든다"
      ],
      src: ["namuCrom", "pertyon", "namuTrait", "official0813", "labanyuSkill", "official0129", "official0512"]
    },
    {
      id: "b75", step: "75% 부하", title: "75% 부하와 중앙",
      lead: "그로기 중에도 부하는 나온다. 카리 장판이 보스에 닿으면 딜이 거의 안 들어간다.",
      dm: [
        { t: "중앙 **스노우 스톰**은 공략상 미리 깐다. 둘이서 75%까지 오래 걸리면 **77~76%쯤**에 깐다(기본 10초, 링크8 이상 12초, 쿨 60초)", g: "guess", timer: "storm" }
      ],
      sb: [
        { t: "디바인 링크 펫이나 고동으로 중앙 어그로", g: "high" }
      ],
      both: [
        { t: "보스를 중앙에서 떨어진 외곽에 둔다", g: "high" }
      ],
      src: ["arca80", "video", "namuCrom", "pertyon"]
    },
    {
      id: "b50", step: "55→50%", title: "55% 부하 → 50% 의식",
      lead: "버스트로 못 끝냈을 때. 디버프가 끊겼는지 먼저 본다.",
      both: [
        { t: "55% 부하를 정리한다(위키는 65%로 적음)", g: "high" },
        { t: "50%는 **점프 착지 그로기**나 에르그 폭발 후딜에 맞춰 넘긴다", g: "high" },
        { t: "보스 체력바의 디버프 아이콘 남은 시간을 확인한다(300초짜리도 끝났을 수 있다)", g: "high" }
      ],
      dm: [
        { t: "도르카 다시 채우기. 큰 카드는 타이머에서 쿨이 돌아왔을 때만", g: "high" },
        { t: "데스 마커 다시", g: "high", req: "dm_deathmarker", timer: "deathmarker" }
      ],
      sb: [
        { t: "불협화음 5중첩 갱신", g: "high", timer: "discord" }
      ],
      pet: [
        { t: "펫 디버프가 끝났으면 다시 소환", g: "sure", req: (s) => s.pet_yaong || s.pet_mir || s.pet_momo, timer: "pets600" }
      ],
      src: ["arcaSolo", "arcaRework", "namuCrom"]
    },
    {
      id: "b35", step: "40→35%", title: "40% → 35% 의식 → 마무리",
      lead: "마지막 의식. 성공하면 그로기에서 끝낸다.",
      both: [
        { t: "**40% 전에 잡몹 정리**", g: "high" },
        { t: "36% 근처에서 쉬리커가 터질 때 35%로 넘긴다 → 의식 → 그로기", g: "high" },
        { t: "35% 의식 뒤에도 30%까지는 쉬리커를 조심한다", g: "high" }
      ],
      src: ["arcaSolo"]
    },
    {
      id: "danger", step: "위험 패턴", title: "언제든 나오는 위험 패턴", ref: true,
      both: [
        { t: "**블랙홀 = 사형 선고**: 보스가 **중앙으로 순간이동** → 보라 장판 3번. 위에 있으면 2초 뒤 사망. **이클립스·앵커 무적·피닉스로 못 버틴다.** 장판 밖으로 빠지고 장판 위로 지나가지 않는다", g: "high" },
        { t: "블랙홀은 80%부터 쓰고 체력이 낮을수록 자주 쓴다. 보스는 무적이 아니라 장판 밖에서 딜해도 된다", g: "high" },
        { t: "**점프**(80%부터): 한 명을 찍어 빨간 장판에 떨어진다. 넉백이 길다. **가끔 착지 후 무릎을 꿇는다 → 바로 딜**", g: "high" },
        { t: "**껌**(점프 때 다른 사람 발밑 보라 장판): 밟으면 10초 이동 불가. 블랙홀을 부른다는 서술도 있다", g: "guess" },
        { t: "**레이저·투아림 익스플로전**: 맞으면 펫이 풀리고 20초 소환 불가 → 노란 추종자 전에 특히 조심", g: "high" },
        { t: "광범위 참격: 약 2초 예고, 범위 밖으로", g: "high" },
        { t: "사형 선고로 죽을 때마다 보스 공격력 +4%", g: "high" }
      ],
      src: ["video", "namuCrom", "arcaRework", "mwiki"]
    },
    {
      id: "dorca", step: "도르카·쿨", title: "도르카와 쿨 관리", ref: true,
      dm: [
        { t: "최대 도르카: 도르카 마스터리 F랭크 10 ~ 1랭크 15", g: "high" },
        { t: "**채우기**: 컨버트:마나 → 15초 안에 컨버트:도르카(순증 5) · 체인 블레이드 평타 약 0.75/타(스내치 1랭크·링크10 기준) · 블로케이드 상태인 적을 마법·다크메이지 스킬로 칠 때마다 +0.5", g: "high" },
        { t: "**쓰기**(마나 피어스 켠 상태): 런지 1.6 · 체인 2.1 · 스톰 3.6 · 블로케이드 0.7 · 앵커 러시 1 · 데스 마커 2 · 이그니션 0", g: "high" },
        { t: "그로기 한 번에 체인+런지 6번 ≈ 11.7, 스톰까지 ≈ 15.3 → **들어가기 전에 꽉 채우고 의식 중에 다시 채운다**", g: "high" },
        { t: "쿨: 반신화 12~14분(세공으로 최대 5분 단축) · 프라가라흐 10분(지속 3분) · 시간 왜곡 15분(30~40초) · 급소 관통·쾌속 10분(3분) · 임펄스 던전당 1회", g: "high" },
        { t: "**쿨 초기화는 던전 입장 때 한 번.** 보스방 진입 때 초기화는 심연만", g: "sure" },
        { t: "방을 옮길 때 도르카가 유지되는지는 확인 못 했다", g: "measure" }
      ],
      src: ["pertyon", "namuTrait", "official0910", "official0813"]
    },
    {
      id: "sbref", step: "세바 스킬", title: "세인트 바드 스킬 표", ref: true,
      sb: [
        { t: "비바체: 마공·시전 속도. 쿨 5초(링크10) — 항상", g: "sure" },
        { t: "전장의 서곡: 아군 대미지 +20%, 크리 +11%, 기본 30초 — 항상", g: "high" },
        { t: "불협화음: 음파의 세례 7타, 최대 5중첩, 180초 — 보스 붙자마자", g: "sure" },
        { t: "**붕괴의 파동**: 방어/마방 −75, 보호/마보 −25, 10초 / 쿨 180초 — **그로기 시작 때만**", g: "high" },
        { t: "스타사인 스프레드 + 그랜드 컨정션 LV.2: 받는 피해 +45%, 30초 — 그로기 직전·중", g: "sure" },
        { t: "스타사인 스프레드 쿨 20초(비공식 DB)", g: "high" },
        { t: "매달린 남자: 30등급 기준 +5%·60초. 발동 스킬에 **맞은** 적만 → 스프레드로 걸려면 컨정션에 '추가 공격'을 넣는다", g: "high" },
        { t: "정화의 고동: 반경 7m 15초, 아군 회복·경직/다운 면역, 적에게 초당 마법 피해 3000 / 쿨 60초", g: "sure" },
        { t: "수호의 축복: 공격 무효 3초 — 쉬리커 유도·위급할 때", g: "high" },
        { t: "영혼의 부름: **세바 본인만** 부활, 쿨 60분", g: "sure" },
        { t: "소생의 찬가: 제창: 전원 소생, 부활 카운트와 무관, 던전당 1회", g: "sure", req: "sb_chorus" },
        { t: "생명의 장막: 링크8 이상, **생명력·부상이 모두 회복된** 대상에게 치유의 손길·구원의 메아리·음파의 세례로 회복을 넣으면 생긴다", g: "sure" }
      ],
      src: ["official0512", "official0618", "official0129", "official0813", "labanyuSkill"]
    },
    {
      id: "petref", step: "펫 디버프", title: "펫 디버프 표", ref: true,
      pet: [
        { t: "야옹(폭풍 질주): 방어/마방 −20, 보호/마보 −15, 600초, 소환 시 자동", g: "sure" },
        { t: "하데스: −15/−10, 600초. 야옹이 걸려 있으면 지속 시간만 갱신", g: "sure" },
        { t: "미르·케라우노스: −15/−10, 600초, 소환 시 자동(야옹과 따로 겹친다)", g: "sure" },
        { t: "모모(클로버): 받는 피해 +15%, 한 번 소환으로 최대치(공식 2026-04-30)", g: "sure" },
        { t: "모모 지속 5분(비공식 DB)", g: "high" },
        { t: "폭스롯·무등고래: 받는 피해 +10%, 300초. 모모와 같은 계열", g: "sure" },
        { t: "카트(물풍선 던지기): −5/−3, 직접 맞혀야 함", g: "sure" },
        { t: "같은 계열은 겹치지 않는다: 야옹·하데스 / 미르·케라 / 모모·폭스롯·고래 / 카트 따로. 야옹이 걸려 있으면 하데스는 지속 시간만 갱신한다. 모모 개편 뒤 폭스롯·고래와의 덮어쓰기는 확인 못 했다", g: "high" }
      ],
      src: ["officialPet", "official0129", "officialMomo", "arcaPet"]
    },
    {
      id: "measure", step: "실측 메모", title: "직접 재서 적기", ref: true, measure: true,
      lead: "근거가 없는 것들. 연습 모드나 실전에서 재서 적어 두면 가이드를 고칠 수 있다.",
      fields: [
        { id: "m_groggy", label: "80% 추종자 그로기 몇 초" },
        { id: "m_shuriker", label: "쉬리커 몇 발에 보스가 꿇었나" },
        { id: "m_nightmare_hp", label: "이루샤 나이트메어 시작 체력(75? 80?)" },
        { id: "m_nightmare_hits", label: "이루샤 2인 요구 타수" },
        { id: "m_summon_hp", label: "보스 부하 소환 체력(55? 65?)" },
        { id: "m_blackhole_hp", label: "블랙홀 처음 나온 체력" },
        { id: "m_dorca_room", label: "방 옮길 때 도르카 유지됐나" },
        { id: "m_deathmarker", label: "스태프 든 채 데스 마커 되나" },
        { id: "m_white", label: "세바가 흰색 추종자 잡은 방법" },
        { id: "m_clear", label: "클리어 시간 / 수표 금액" }
      ]
    }
  ]
};
