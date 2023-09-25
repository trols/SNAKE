export class Snake {

    // 1-3 создаем направление смещения змейки
    currentDirection = 'right';

    // 1 создаем точку откуда будет начинаться змейка
    snake = [
        {x: 10, y: 20}
    ];
    context = null;
    positionsCount = null;
    positionsSize = null;

    constructor(context, positionsCount, positionsSize) {

        this.context = context;
        this.positionsCount = positionsCount;
        this.positionsSize = positionsSize;


        // вызовем здесь функцию из пункта 4
        this.addKeyboardHandler();

    }

    // 4 отрабатываем нажатие на клавиатуру
    addKeyboardHandler() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft' && this.currentDirection !== 'right') {
                this.currentDirection = 'left';
            } else if (event.key === 'ArrowRight' && this.currentDirection !== 'left') {
                this.currentDirection = 'right';
            } else if (event.key === 'ArrowUp' && this.currentDirection !== 'down') {
                this.currentDirection = 'up';
            } else if (event.key === 'ArrowDown' && this.currentDirection !== 'up') {
                this.currentDirection = 'down';
            }
        })
    }


    // 1-2 делаем так, чтобы точка с координатами(10,10) отрисовывалась
    showSnake(foodPosition) {

        // 11 чтобы змея росла от встречи с едой
        let result = {
            gotFood: false,
            collision: false,
        };


        for (let i = 0; i < this.snake.length; i++) {
            this.context.fillStyle = 'black';
            this.context.beginPath();
            this.context.fillRect(this.snake[i].x * this.positionsSize - this.positionsSize,
                this.snake[i].y * this.positionsSize - this.positionsSize,
                this.positionsSize, this.positionsSize);
        }
        // 1- 4  проверяем в каком направлении движется змейка

        let newHeadPosition = {
            x: this.snake[0].x,
            y: this.snake[0].y,
        }

        // 11-1  проверяем есть ли еда, если да - то голова находится на той же самой клетке
        if (foodPosition && foodPosition.x === newHeadPosition.x && foodPosition.y === newHeadPosition.y) {
            // если еда есть
            result.gotFood = true;
        } else {
            // 1-4 -1  для удаления последнего фрагмента змейки и смещения
            this.snake.pop();
        }


        // 1-4 -1  для удаления последнего фрагмента змейки и смещения
        //this.snake.pop();
        // 1-4-2
        if (this.currentDirection === 'left') {
            // чтобы не выходила за границы зеленой рамки
            if (newHeadPosition.x === 1) {
                newHeadPosition.x = this.positionsCount;
            } else {
                newHeadPosition.x -= 1;
            }
            // если движемся влево
            // newHeadPosition.x -= 1;

        } else if (this.currentDirection === 'right') {
            // если движется вправо
            //newHeadPosition.x += 1;

            if (newHeadPosition.x === this.positionsCount) {
                newHeadPosition.x = 1;
            } else {
                newHeadPosition.x += 1;
            }

        } else if (this.currentDirection === 'up') {
            // если движется вверх
            // newHeadPosition.y -= 1;

            if (newHeadPosition.y === 1) {
                newHeadPosition.y = this.positionsCount;
            } else {
                newHeadPosition.y -= 1;
            }


        } else if (this.currentDirection === 'down') {
            // если движется вверх
            //newHeadPosition.y += 1;

            if (newHeadPosition.y === this.positionsCount) {
                newHeadPosition.y = 1;
            } else {
                newHeadPosition.y += 1;
            }

        }

        // есть ли столкновения
        if (!this.checkNewHeadPositionCollision(newHeadPosition)) {
            this.snake.unshift(newHeadPosition);
        } else {
            result.collision = true;
        }


        // 1-4-3 добавляет элемент в начало нашего массива
        // this.snake.unshift(newHeadPosition);
        return result;
    }

    // проверяем не сталкивается ли змейка со своим хвостом
    checkNewHeadPositionCollision(newHeadPosition) {
        for (let i = 0; i < this.snake.length; i++) {
            if (newHeadPosition.x === this.snake[i].x && newHeadPosition.y === this.snake[i].y) {
                return true;
            }
        }
        return false;
    }
}