export const demoScenario = {
  shopName: '山あいの宿 つぎて庵',
  sceneId: 'tea-service',
  sceneName: '客室のお茶出し準備',
  currentTrainee: '継ぎ手候補: 佐伯さん',
  okami: '先代女将: 澄子さん',
  pitchLine: '見て覚えろ、をAIで残して継ぐ。',
}

export const guideScenes = [
  {
    id: 'tea-service',
    name: '客室のお茶出し準備',
    status: 'ライブ判定対応',
    lastScore: 82,
    logs: 18,
    priority: 'MVP核心',
    summary: '湯呑みの向き、茶托の余白、菓子皿の位置を先代の正解状態と比較。',
  },
  {
    id: 'morning-water',
    name: '朝の打ち水',
    status: '登録済み',
    lastScore: 74,
    logs: 9,
    priority: '次点',
    summary: '玄関石畳の濡らし方と客導線の安全性を確認。',
  },
  {
    id: 'room-check',
    name: '客室最終確認',
    status: 'モック',
    lastScore: 68,
    logs: 5,
    priority: '低',
    summary: '床の間、浴衣、香り、窓の開き具合をチェック。',
  },
] as const

export const archiveInterviews = [
  {
    id: 'interview-okami',
    title: '先代女将インタビュー: 常連客を迎える所作',
    duration: '12:48',
    status: '抽出完了',
    tags: 7,
    date: '2026-05-05',
    excerpt:
      '常連様は名前を呼ぶ前に、前回の会話を一言だけ添える。覚えていることを見せすぎないのが品。',
  },
  {
    id: 'interview-tea',
    title: 'お茶出しの判断基準',
    duration: '08:15',
    status: '文字起こし済み',
    tags: 4,
    date: '2026-05-04',
    excerpt: '熱すぎる茶は急かしているように見える。到着直後は香りが立つ温度を優先する。',
  },
  {
    id: 'interview-rain',
    title: '雨の日の玄関対応',
    duration: '06:32',
    status: 'アップロード済み',
    tags: 0,
    date: '2026-05-03',
    excerpt: '傘を受け取る前に足元を見る。濡れている場所が先に危険になる。',
  },
] as const

export const tacitTags = [
  {
    situation: '常連客が予定より早く到着した',
    judgment: '部屋へ急がせず、庭が見える席で温かい茶を出す',
    reason: '早着は期待の表れ。待たせる時間をもてなしに変える。',
  },
  {
    situation: '客室に茶器を置く',
    judgment: '湯呑みの絵柄を客側へ、茶托の木目を横に揃える',
    reason: '最初に目に入る小物の乱れが、宿全体の印象になる。',
  },
  {
    situation: '雨の日に玄関が混み合う',
    judgment: '挨拶より先に濡れた荷物の置き場を作る',
    reason: '客が困っている物理状態を先に解くと、言葉が届く。',
  },
  {
    situation: '新人が手順を忘れた',
    judgment: '否定せず、抜けた一点だけを短く戻す',
    reason: '所作は緊張で崩れる。注意量を増やすほど再現性が落ちる。',
  },
] as const

export const agentMessages = [
  {
    role: 'user',
    text: '常連の田中様が早く着いたら、部屋に通していいですか？',
  },
  {
    role: 'assistant',
    text: 'すぐ部屋へ通すより、庭側の席で一息ついてもらいなさい。早く来る方は宿を楽しみにしている。待ち時間を詫びるより、季節の一言を添えて歓迎に変えるの。',
    source: '先代女将インタビュー: 常連客を迎える所作',
  },
] as const

export const mvpMetrics = [
  { label: '登録シーン', value: '3', note: '所作判定' },
  { label: '暗黙知タグ', value: '14', note: '抽出済み' },
  { label: 'ライブ判定', value: '2秒', note: '応答速度' },
] as const
