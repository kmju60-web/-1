// 중학생 맞춤형 MBTI 질문 리스트 (E/I, S/N, T/F, J/P 순서)
const qnaList = [
    {
        q: "새로운 학기 첫날! 낯선 교실에 들어간 나는?",
        a: [
            { text: "먼저 옆자리 친구에게 다가가서 인사를 건넨다.", type: "E" },
            { text: "조용히 앉아서 누군가 먼저 말을 걸어주기를 기다린다.", type: "I" }
        ]
    },
    {
        q: "수업 시간에 선생님이 재밌는 썰을 푸실 때 나는?",
        a: [
            { text: "선생님 이야기 자체에 집중하며 재밌게 듣는다.", type: "S" },
            { text: "그 이야기에서 파생된 또 다른 상상의 나래를 펼친다.", type: "N" }
        ]
    },
    {
        q: "친구가 '나 수행평가 망쳐서 우울해ㅠㅠ'라고 할 때 나는?",
        a: [
            { text: "무슨 과목인데? 다음엔 어떻게 대비할까? (해결책 제시)", type: "T" },
            { text: "헐 ㅠㅠ 진짜 속상하겠다. 고생했어 괜찮아! (폭풍 공감)", type: "F" }
        ]
    },
    {
        q: "수학여행이나 체험학습을 갈 때 나는?",
        a: [
            { text: "몇 시에 어디서 뭘 할지 철저하게 계획을 짜둔다.", type: "J" },
            { text: "가서 끌리는 대로 재밌게 놀면 된다고 생각한다.", type: "P" }
        ]
    }
];

// 결과 데이터 (간단한 예시)
const resultInfo = {
    "ESTJ": "잔소리 대마왕 반장 스타일! 📝",
    "INFP": "감수성 풍부한 평화주의자 🌸",
    // 선생님께서 여기에 16가지 유형의 설명을 모두 추가하실 수 있습니다.
    "default": "매력 만점 중학생! ✨ (모든 결과 설명을 추가해 보세요)"
};

let currentQuestionIndex = 0;
let mbtiScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

// 테스트 시작
function startTest() {
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('question-screen').classList.add('active');
    showQuestion();
}

// 질문 보여주기
function showQuestion() {
    const qInfo = qnaList[currentQuestionIndex];
    document.getElementById('question-title').innerText = qInfo.q;
    document.getElementById('btn-A').innerText = qInfo.a[0].text;
    document.getElementById('btn-B').innerText = qInfo.a[1].text;
    
    // 진행바 업데이트
    const progressPercent = ((currentQuestionIndex) / qnaList.length) * 100;
    document.getElementById('progress').style.width = progressPercent + '%';
}

// 답변 선택 시
function nextQuestion(choiceIndex) {
    // 선택한 답변의 타입(E, I 등) 점수 올리기
    const selectedType = qnaList[currentQuestionIndex].a[choiceIndex].type;
    mbtiScores[selectedType]++;

    currentQuestionIndex++;

    if (currentQuestionIndex < qnaList.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// 결과 계산 및 화면 전환
function showResult() {
    let finalMBTI = "";
    finalMBTI += (mbtiScores.E >= mbtiScores.I) ? "E" : "I";
    finalMBTI += (mbtiScores.S >= mbtiScores.N) ? "S" : "N";
    finalMBTI += (mbtiScores.T >= mbtiScores.F) ? "T" : "F";
    finalMBTI += (mbtiScores.J >= mbtiScores.P) ? "J" : "P";

    document.getElementById('question-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');

    document.getElementById('mbti-result').innerText = finalMBTI;
    
    // 결과 설명 매칭 (정의되지 않은 유형은 default 메시지 출력)
    const desc = resultInfo[finalMBTI] || resultInfo["default"];
    document.getElementById('mbti-desc').innerText = desc;
}
