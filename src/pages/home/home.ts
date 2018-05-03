import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { InfoPage } from '../info/info';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
    @ViewChild('slides') slides: any;
 
    hasAnswered: boolean = false;
    score: number = 0;
 
    slideOptions: any;
    questions: any;
    
 
    

   

    
    constructor(public navCtrl: NavController, public dataService: Data) {
 
    }
 //function to load data from provider
    ionViewDidLoad() {
 
        this.slides.lockSwipes(true);
 
        this.dataService.load().then((data) => {
 
            data.map((question) => {
 
                let originalOrder = question.answers;
                question.answers = this.randomizeAnswers(originalOrder);
                return question;
 
            });    
 
            this.questions = data;
 
        });
 
    }
 //function for swapping slides
    nextSlide(){
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
    }
 
    selectAnswer(answer, question){
 
        this.hasAnswered = true;
        answer.selected = true;
        
 //counter on answer
        if(answer.correct){
            this.score++;
        }
 //function for timer to next slider after question is answered
        setTimeout(() => {
            this.hasAnswered = false;
            this.nextSlide();
            answer.selected = false;
           
        }, 200);
    }
 //function to randomize the position of the answers
    randomizeAnswers(randomanswer: any[]): any[] {
 
        for (let i = randomanswer.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = randomanswer[i];
            randomanswer[i] = randomanswer[j];
            randomanswer[j] = temp;
        }
 
        return randomanswer;
 
    }
 //f to restart quiz
    restartQuiz() {
        this.score = 0;
        this.slides.lockSwipes(false);
        this.slides.slideTo(1, 1000);
        this.slides.lockSwipes(true);
    }
    //f to navigate to revision page
    ReadInfo(){
        this.navCtrl.push(InfoPage);
    }
     
}