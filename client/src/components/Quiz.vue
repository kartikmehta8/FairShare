<template>
  <v-app>
    <v-container fill-height fluid>
      <v-row align-self="center">
        <v-col align-self="center">
          <v-card class="mx-auto" max-width="60%" style="background-color: pink;" align="center">
            <div class="header-quiz">  
              <h2>Check your awareness level and investment appetite</h2>
            </div>
            <div style="padding: 20px;">
              <div class="step-progress" :style="{'width':progress + '%'}"></div>
              <div class="box" v-for="(question,index) in questions.slice(a,b)" :key="index" v-show="quiz">
                <div class="box-question">
                  <h2>Question {{b}}/{{questions.length}}</h2>
                  <p>{{question.question}}</p>
                </div>
                <div class="box-propositions">
                  <ul>
                    <li v-for="(proposition,index) in question.propositions" :key="index" class="li" @click="selectResponse(proposition,index)" :class=" correct ? check(proposition) : ''">{{proposition.props}} <div class="fas fa-check" v-if="correct ?  proposition.correct: ''"></div><div class="fas fa-times" v-if="correct ?  !proposition.correct: ''"></div></li>
                  </ul>
                  <!-- <iframe src="https://codesandbox.io/embed/r1r0p8543m?fontsize=14&hidenavigation=1&theme=dark"
                    style="width:80%; height:300px; border:0; border-radius: 0px; overflow:hidden;"
                    title="My Profile"
                    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                  ></iframe> -->
                </div>
              </div>
              <div class="box-score" v-if="score_show">
                <v-row>
                  <v-col class="score">
                    <h2 style="padding-bottom: 30px;">Your risk appetite</h2>
                    <div v-if="percentage > 79 && percentage <= 100" style="padding-top: 5px; padding-bottom: 33px;">
                      <v-progress-linear
                        v-model="percentage"
                        color="teal"
                        height="55"
                      >
                        <template v-slot:default="{ value }">
                          <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                      </v-progress-linear>
                      <h2 style="padding-top: 15px; color: teal;">Aggressive</h2>
                    </div>
                    <div v-if="percentage < 80 && percentage > 49" style="padding-top: 5px; padding-bottom: 33px;">
                      <v-progress-linear
                        v-model="percentage"
                        color="rgb(106, 128, 202)"
                        height="55"
                      >
                        <template v-slot:default="{ value }">
                          <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                      </v-progress-linear>
                      <h2 style="padding-top: 15px; color: rgb(106, 128, 202);">Moderate</h2>
                    </div>
                    <div v-else-if="percentage < 50" style="padding-top: 5px; padding-bottom: 33px;">
                      <v-progress-linear
                        v-model="percentage"
                        color="red"
                        height="55"
                      >
                        <template v-slot:default="{ value }">
                          <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                      </v-progress-linear>
                      <h2 style="padding-top: 15px; color: salmon;">Talk to Us</h2>
                    </div>
                    <h3>80% - 100%</h3>
                    <h3 style="color: teal; padding-bottom:30px;">Aggressive: Equity / Crowdfunding</h3>
                    <h3>50% - 79%</h3>
                    <h3 style="color: rgb(106, 128, 202); padding-bottom:15px;">Moderate: Crowdfunding / Mutual Funds/ Retail Bonds </h3>
                    <h3>0% - 49%</h3>
                    <h3 style="color: salmon; padding-bottom:15px;">Talk to Us</h3>
                  </v-col>
                  <v-col>                    
                    <div class="yt-container">
                      <iframe text-align="center" src="https://www.youtube.com/embed/A5QRZCc50HI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="video"></iframe>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
            <div class="footer-quiz">
              <div v-if="progress < 100" class="box-button">
                <button  @click="skipQuestion()" :style="next ? 'background-color: rgb(106, 128, 202)' : ''">Skip</button>
                <button  @click="nextQuestion()" :style="!next ? 'background-color: rgb(106, 128, 202)' : ''">Next</button>
              </div>
              <div v-if="score_show" class="btn-restart" style="margin-top: 5px;">
                <button @click="restartQuiz">Restart <i class="fas fa-sync-alt"></i></button>
              </div>  
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'


export default {
  data(){
    return{
      questions:[
        {
          question:"How many percent of venture capital was secured by women in recent years?",
          propositions:[
            {props:'About 15%',correct:true},
            {props:'More than 20%'},
            {props:'More than 50%'},
            {props:'Equal to men'}
          ]
        },
        {
          question:"How do algorithms make finance biased?",
          propositions:[
            {props:'Boost bank profitability'},
            {props:'Equal opportunities to all'},
            {props:'Marginalise women and certain segments of society',correct:true},
          ]
          
        },
        {
          question:"What are the avenues (regulated) to finance women founders apart from loans and venture capital?",
          propositions:[
            {props:'Family and friends'},
            {props:'Bonds',correct:true},
            {props:'Crowdfunding',correct:true},
            {props:'Stock market or equity',correct:true},
          ]
          
        },
        {
          question:"How can we eridicate unbiased finance towards women?",
          propositions:[
            {props:'Nothing'},
            {props:'Provide equitable access to financing via open banking',correct:true},
            {props:'Regulation'},
            {props:'Protest'},
          ]
          
        },
        {
          question:"What is the ultimate impact for funding women founders in society?",
          propositions:[
            {props:'Boost economy with job creation'},
            {props:'Equitable and inclusive finance for all'},
            {props:'Innovation and creativity'},
            {props:'all the above',correct:true},
          ]
          
        },
        {
          question:"What are the internationally-benchmarked parameters for a healthy gender lens scorecard as laid out by SEAF?",
          propositions:[
            {props:'Board representation', correct:true},
            {props:'Pay', correct:true},
            {props:'Hours'},
            {props:'Family friendly policies'},
          ]
          
        },
        {
          question:"Gender lens investing is not for men?",
          propositions:[
            {props:'False', correct:true},
            {props:'True'},            
          ]
          
        },
        {
          question:"Women founders deliver more returns versus male for every dollar invested despite only securing 15% of venture capital",
          propositions:[
            {props:'True', correct:true},
            {props:'False'},
            
          ]
          
        },{
          question:"What will be your cut loss position in any investment?",
          propositions:[
            {props:'No more than 20%'},
            {props:'More than 20%',correct:true },
            {props:'I dont want to lose any of my capital'},
            
          ]
          
        },
        {
          question:"What are the kind of returns you are looking for?",
          propositions:[
            {props:'Returns that has social impact', correct:true},
            {props:'High returns with or without social impact'},
            {props:'Higher than risk-free rate and capital guaranteed'},
          ]
          
        },
        {
          question:"What is/are your investment objective(s)?",
          propositions:[
            {props:'To diversify income into instruments with social impact', correct:true},
            {props:'To have stable returns over the medium to longer term', correct:true},
            {props:'For retirement, education and big items purchase', correct:true},
            {props:'Any return that is better than current savings or fixed deposit'},
          ]          
        },
      ],
      a:0,
      b:1,
      next:true,
      score_show:false,
      quiz:true,
      score:0,
      correct:false,
      progress:0,
      percentage:0,
      
    }
  },
  name: 'Quiz', 
  methods:{
    selectResponse(e){
      this.correct = true;
      this.next = false;
      if (e.correct) {
        this.score++;
      }
      this.percentage = (this.score/11)*100
    },
    check(status){
        if (status.correct) {
          return 'correct'
        }else{
          return 'incorrect' 
        }
    },
    nextQuestion(){
      if (this.next) {
        return;
      }
      this.progress = this.progress + (100/this.questions.length);
      if(this.questions.length - 1 == this.a){
        this.score_show = true;
        this.quiz = false;    
      }
      else{
        this.a++;
        this.b++;
        this.correct = false;
        this.next = true;
      }
    },
    skipQuestion(){
      if (!this.next) {
        return;
      }
      this.progress = this.progress + (100/this.questions.length);
      if(this.questions.length - 1 == this.a){
        this.score_show = true;
        this.quiz = false;
      }else{
        this.a++;
        this.b++;
      }
    },
    
    restartQuiz(){
      Object.assign(this.$data, this.$options.data()); // reset data in vue
    },
  }
}
</script>


<style scoped>
v-card {
  display: flex;
}

.header-quiz {
  background-color: #E7EAE0;
}

.box-question p {
  margin-top: 20px;
  padding: 15px;
}

.box-propositions {
  margin: auto;
  display: flex;
  width: 100%;
  justify-content: center;
}

ul {
  display: flex;
  width: 80%;
  margin: 0;
  padding: 0;
  flex-flow: column;
}

li {
  list-style: none;
  line-height: 2;
  border: 1px solid #cdd2d2;
  margin-bottom: 20px;
  border-radius: 15px;
  cursor: pointer;
  transition: 0.3s;
  background: white;
}

li:hover {
  /*transform: scale(1.1);*/
  background-color: #e7eae0;
}

li>div {
  float: right;
  margin-top: 7px;
  margin-right: 7px;
  color: white;
}

.check {
  color: rgb(74, 219, 74);
}

.footer-quiz {
  display: flex;
  width: 100%;
  height: 15%;
  justify-content: center;
  border-top: 1px solid #e7eae0;
  background-color: #e7eae0;
  border-radius: 0px 0px 10px 10px;
  padding-top: 5px;
}

.box-button {
  display: flex;
  width: 100%;
}

.footer-quiz .box-button button {
  width: 150px;
  height: 35px;
  outline: none;
  border: 0;
  color: white;
  font-size: 18px;
  cursor: pointer;
  border-radius: 15px;
  margin: auto;
  margin-bottom: 10px;
  letter-spacing: 2px;
  background-color: #a09f9ff5;
}

li.correct {
  border: 1px solid rgb(74, 219, 74);
  background-color: rgb(74, 219, 74);
  color: white;
  font-weight: 600;
}

li.incorrect {
  border: 1px solid rgb(240, 117, 100);
  background-color: rgb(240, 117, 100);
  color: white;
  font-weight: 600;
}

.box-score {
  display: flex;
  width: 100%;
  height: 70%;
  flex-flow: column;
  padding: 20px;
}

i {
  display: none;
  color: white;
}

.step-progress {
  display: flex;
  width: 100%;
  height: 5px;
  background-color: rgb(106, 128, 202);
  transition: 0.5s;
}

.btn-restart {
  display: flex;
  width: 100%;
  height: auto;
  justify-content: center;
  /* margin-top: 50px; */
}

.btn-restart button {
  width: 150px;
  height: 35px;
  outline: none;
  border: 0;
  background-color: rgb(106, 128, 202);
  color: white;
  font-size: 18px;
  cursor: pointer;
  border-radius: 15px;
  margin: auto;
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.next {
  background-color: rgb(106, 128, 202);
}

@media screen and (max-width: 720px) {
  .footer-quiz .box-button button {
      width: 100px;
  }
}

.yt-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}

.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>
