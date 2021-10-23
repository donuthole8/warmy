<template>
<div>
    <Menu current="diagnose"></Menu>
    <div class="ui main container">
        <h1 class="custom-title">
            <span class="custom-underline">冷え性診断</span>
        </h1>
        <div id="app" class="" v-if="!completed">
            <div class="custom-contents">
                <p>冷え性は主に<span class="akap">4つのタイプ</span>に分かれます。</p>
                <p>
                腰から下が冷える<span class="akap">「下半身型」</span>。手足足先が冷える<span class="akap">「四肢末端型」</span>。
                </p>
                <p>
                お腹が冷える<span class="akap">「内臓型」</span>。そして、全身が冷える<span class="akap">「全身型」</span>があります。
                </p>
                <p>
                いくつかの質問に答えてあなたが<span class="akap">どのタイプ</span>か確かめてみましょう！
                </p>
                <div class="secondcontents">
                    <div class="ui segment">
                        <p class="question">
                            {{ currentQuestion.question }}
                        </p>
                        <div class="hako">
                            <button
                                class="fluid ui button color button"
                                v-for="(answer, index) in currentQuestion.answers"
                                :key="index"
                                @click="addAnswer(index)">
                                {{ index + 1 }}. {{ answer }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="completed">
            <div class="card">
                <div class="card-body result">
                    <p class="badge badge-dark result-t">あなたの冷え性のタイプは……</p>
                    <h2 class="result-title">「{{ results[result].title }}」</h2>
                    <p class="result-text">{{ results[result].text }}</p>
                    <button class="medium ui button custom-btn" @click="send()">終了</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
// import Template from '../../lambda/reference/Vue/Template.vue';
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from '@/assets/config.js';
import axios from "axios";
import Menu from "@/components/Menu.vue"

export default {
  name: 'Login',
  components: {
      Menu,
   // 読み込んだコンポーネント名をここに記述する
  },
  data() {
    return{
        completed: false,
        questionIndex: 0,
        answers: [],
        weightResult: [0,0,0,0,0],
        result: 0,
        questions: [
            {
                question: '主に体のどこが冷えると感じますか？',
                answers: [
                    '全身が冷える',
                    '手足が冷える',
                    '手は冷えないが下半身は冷える',
                    "お腹が冷える",
                    "冷えない"
                ],
            },{
                question: '汗をかきやすいですか？',
                answers: [
                    '汗をかきやすく冷えやすい',
                    '汗をあまりかかない',
                    '上半身に汗をかきやすい',
                ],
            },{
                question: '食事の量はどれが当てはまりますか？',
                answers: [
                    '食事の量が少ない',
                    '食事の量は普通',
                    '食事の量は多い',
                ],
            },{
                question: '睡眠はどれが当てはまりますか？',
                answers: [
                    'あまり眠れない',
                    '眠りに問題はない',
                ],
            },{
                question: 'イライラすることはありますか？',
                answers: [
                    'よくいらいらする',
                    'イライラすることはなく倦怠感を感じる',
                    'どれも当てはまらない',
                ],
            },{
                question: 'いずれか当てはまるものはありますか？',
                answers: [
                    'よくお腹を壊す',
                    'お腹に不調はない',
                    '便秘である',
                    'よくお腹を壊し、便秘でもある'
                ],
            }
        ],
        weights: [
            {
                question: [
                    {
                        weight:[1,0,0,0,0]
                    },{
                        weight:[0,1,0,0,0]
                    },{
                        weight:[0,0,1,0,0]
                    },{
                        weight:[0,0,0,1,0]
                    },{
                        weight:[0,0,0,0,1]
                    }
                ]
            },{
                question: [
                    {
                        weight:[0,0,0,1,0]
                    },{
                        weight:[1,1,0,0,1]
                    },{
                        weight:[0,0,1,0,0]
                    }
                ]
            },{
                question: [
                    {
                        weight:[1,1,0,0,0]
                    },{
                        weight:[0,0,1,0,1]
                    },{
                        weight:[0,0,0,1,0]
                    }
                ]
            },{
                question: [
                    {
                        weight:[1,1,0,1,0]
                    },{
                        weight:[0,0,1,0,1]
                    }
                ]
            },{
                question: [
                    {
                        weight:[0,0,1,0,0]
                    },{
                        weight:[1,0,0,0,0]
                    },{
                        weight:[0,0,0,0,1]
                    }
                ]
            },{
                question: [
                    {
                        weight:[1,0,0,0,0]
                    },{
                        weight:[0,1,1,0,1]
                    },{
                        weight:[0,0,1,0,0]
                    },{
                        weight:[0,0,0,1,0]
                    }
                ]
            }
        ],
        results: [
            {
                title: "全身型",
                text:"体内でつくられるはずの熱をつくったり、キープすることができず新陳代謝が下がってしまっている全身型。食事からの栄養がしっかり吸収できないため、エネルギーが低下していると考えられます。長年の冷えにより、通年寒さを感じ、手足も内臓も冷えてしまっている可能性があります。寝不足や過労は、体力を低下させ、エネルギーを放出させてしまうので厳禁です。乱れた生活リズムを整え、身体の外側と内側、両方からあたためていきましょう。"
            },{
                title: "四肢末端型",
                text:"酸素や栄養を体中に運んでくれる血液が足りないため、体をすみずみまで温められない四肢末端型。過去に無茶なダイエットをした人、今ダイエットしている人に多くみられることもあります。女性は生理があるため、血液が足りなくなりがちなので要注意。血をしっかり生み出せる体作りには、休息も大切です。栄養バランスも整えつつ、熱を生みやすいカラダに改善をしましょう。"
            },{
                title: "下半身型",
                text:"気や血のめぐりが悪く滞った状態のため、下半身は冷えているにも関わらず、上半身がのぼせてしまっている下半身型。顔はほてってるため、冷えとは気づきにくく注意が必要です。運動不足で下半身の筋肉が衰えてしまっていることや、過度なストレスも原因のひとつと考えられます。デスクワークなど座りっぱなしで仕事をしている人は特に要注意です。下半身を冷やさず、意識して体を動かす習慣づけをしましょう。"
            },{
                title: "内蔵型",
                text:"体にみずがたまりがちな、水はけの悪さが原因で冷えている内蔵型。典型的な症状が、むくみ。むくみといえば、顔や脚が気になりがちですが、実は内臓もむくみます。自律神経のバランスが乱れ、深部体温が冷えてしまっています。手や足は一年中温かいので健康だと勘違いされがちですが、内臓が冷えているので、全身の不調につながることに。副交感神経が優位なため、食欲が旺盛になりやすいので要注意です。まずはおなか周りのあたためポカポカ体を目指しましょう。"
            },{
                title: "冷え症の可能性は低いです",
                text:"冷え性の情報を知りたい方は是非サイトをご覧ください"
            },
        ]
    }
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
    currentQuestion: function() {
        return this.questions[this.questionIndex];
    },  
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
    addAnswer: function(index) {
        this.answers.push(index);
        if(this.questions.length == this.answers.length) {
            // クイズが完了したとき  
            let cnt;
            //重み付け
            for (let i = 0; i < this.answers.length; i++) {
                let ans = this.answers[i];
                // console.log(ans);
                cnt = this.weights[i].question[ans].weight;
                //重み計算
                for (let i = 0; i < cnt.length; i++) {
                    this.weightResult[i] += cnt[i];
                }
            }
            this.result = this.weightResult.indexOf(Math.max(...this.weightResult));
            this.completed = true;
        } else {
            this.questionIndex++;
        }
    },
    send(){
        const requestBody = {
            uName: localStorage.getItem("uName"),
            uCategory: this.results[this.result].title,
        }
        axios.post(baseUrl + "/user/update", requestBody)
        .then(() => {
          // 成功したときの処理はここに記述する
          this.$router.push({ name: "Home"});
        })
        .catch(() => {
          // レスポンスがエラーで返ってきたときの処理はここに記述する
        }
      );
    },

  }
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSは */
.custom-underline {
  border-bottom: solid 2px #000;
}
.custom-title {
  text-align: center;
  margin-top: 50px;
  letter-spacing: 0.1rem;
}
.custom-contents {
  text-align: center;
  margin-top: 50px;
  font-size: 1.3rem;
  font-weight: 600;
}
.akap {
  color: #ff8787;
}
.secondcontents {
  padding-top: 50px;
  width: 65%;
  margin: 0 auto;
}
.question {
  font-size: 1.6rem;
  padding-top: 10px;
}
.color {
  background-color: #ff8787;
  color: white;
}
.color:hover {
  background-color: #ff8787;
  color: white;
  opacity: 0.8;
}
.hako {
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 10px;
}
.button {
  height: 60px;
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
  margin-bottom: 10px;
}
.result {
  text-align: center;
}
.result-t {
  font-size: 2rem;
  margin-top: 100px;
}

.result-title {
  font-size: 5rem;
  margin-top: 30px;
  color: #ff8787;
}

.result-text {
  font-size: 1.2rem;
  margin-top: 50px;
  letter-spacing: 0.1rem;
  line-height: 2.2rem;
}

.custom-btn {
  margin-top: 50px;
  margin-bottom: 30px;
  text-align: center;
  font-size: 1.3rem;
  width: 10%;
  height: 45px;
}

.footer {
  font-weight: 300;
  letter-spacing: 0.1rem;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  margin-top: 50px;
  border-top: 1px solid #dddddd;
}
</style>