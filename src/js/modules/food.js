import {NumberUtils} from "../utils/number-utils.js";

export class Food {

    foodRadius = null;

    //1  храним позиция еды
    foodPosition = {
        x: 1,
        y: 1
    }
    context = null;
    positionsSize = 20;
    positionsCount = 30;

    constructor(context, positionsCount, positionsSize) {

        this.context = context;
        this.positionsCount = positionsCount;
        this.positionsSize = positionsSize;

        // радиус окружности еды
        this.foodRadius = this.positionsSize / 2;
    }

    // 3 функция для еды чтобы меняла позицию, рандомные X и Y
       setNewFoodPosition(){
        this.foodPosition = {
            x: NumberUtils.getRandomInt(1, this.positionsCount), // от 1 до 30 (this.positionsCount)
            y: NumberUtils.getRandomInt(1, this.positionsCount),
           }
    }

    // функция которая показывает еду
    showFood() {
        this.context.fillStyle = 'white';
        this.context.beginPath();
        // рисуем круг смещение по X,Y, радиус, углы
        this.context.arc(this.foodPosition.x * this.positionsSize - this.foodRadius,
                         this.foodPosition.y * this.positionsSize - this.foodRadius,
                          this.foodRadius,
                          0,2 * Math.PI,
        )
        this.context.fill();
    }
}