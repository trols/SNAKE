
import {Snake} from "./snake.js"
import {Food} from "./food.js";

// здесь будем описывать всю логику игры
    export class Game {

        context = null;
        positionsCount = null;
        positionsSize = null;
        snake = null;
        scoreElement = null;
        // переменная для остановки игры
           interval = null;
       // для змеи при встрече с едой score
        score = 0;
    constructor(context, settings) {
        // 1 устанавливаем новую переменную
        this.context = context;

        this.positionsCount = settings.positionsCount;
        this.positionsSize = settings.positionsSize;

        //12   из HTML
        this.scoreElement = document.getElementById('score')

        // 2 вешаем обработчик событий на кнопку
        document.getElementById('start').onclick = () => {

            this.startGame(); // функция которая будет начинвть нашу игру , создадим её ниже
        }
     }

     // 2-1 создаем функцию startGame()
        startGame(){

        if(this.interval){
            clearInterval(this.interval);
        }


        // 6 создаем экземпляр для еды
            this.food = new Food(this.context, this.positionsCount, this.positionsSize);



        // 2-3 вызовем функцию отрисовки сетки
       // this.showGrid()

            // 2-4 создаем новый экземпляр змейки при каждом нажатии начать
               // snake = new Snake(this.context, this.positionsCount, this.positionsSize); меняем на нижнюю строку
                this.snake = new Snake(this.context, this.positionsCount, this.positionsSize);
              // snake.showSnake() удаляем после появления функции  gameProcess()

              // 10
                 this.food.setNewFoodPosition();



            // 2-5  установим интервал с каким змейка будет появляться
                 this.interval =  setInterval(this.gameProcess.bind(this)
                    // => {snake.showSnake();}
                      , 700)}

        // 3 будет удалять canvas чтобы змейка не растягивалась
             gameProcess(){
                  this.context.clearRect(0, 0, this.positionsCount * this.positionsSize,this.positionsCount * this.positionsSize);

                  this.showGrid();  // перенесли сюда из startGame() чтобы не стирался


                 // отрисовываем еду каждые секунды ,как и змейку и добавляем для удлинения змейки при встрече с едой
                 this.food.showFood();


                 let result = this.snake.showSnake(this.food.foodPosition);
                        if(result){
                            // если столкнулись сами с собой , то игра завершается по функции endGame
                              if(result.collision){
                                  this.endGame();
                              } else if(result.gotFood){
                                this.score += 1;
                                this.scoreElement.innerText = this.score;
                                // после того как съели еду - отображаем новую еду
                                this.food.setNewFoodPosition();
                            }
                        }
             }

             // 13  функция завершения игры
                    endGame(){
                        // остановим интервал который запускается каждые 700 млсекунд
                        clearInterval(this.interval);

                        // отображаем текст: вы набрали "столько-то" очков!
                        this.context.fillStyle = 'black';
                        this.context.font = 'bold 48px Ariel';
                        this.context.textAlign = 'center';
                        this.context.fillText('Вы набрали: ' + this.score + ' очков!',
                            (this.positionsCount * this.positionsSize) / 2,
                            (this.positionsCount * this.positionsSize) / 2,
                        )
                    }


             // 2-2 функция отрисовки сетки
        showGrid(){
        const size = this.positionsCount * this.positionsSize;
            for (let x = 0; x <= size; x += this.positionsSize) {
                this.context.moveTo(0.5 + x + this.positionsSize, 0);
                this.context.lineTo(0.5 + x + this.positionsSize, size + this.positionsSize);
            }

            for (let x = 0; x <= size; x += this.positionsSize) {
                this.context.moveTo(0, 0.5 + x + this.positionsSize);
                this.context.lineTo(size + this.positionsSize, 0.5 + x + this.positionsSize);
            }
            this.context.strokeStyle = "black";
            this.context.stroke();

        }

    }







