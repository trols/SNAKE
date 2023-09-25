import {Game} from "./modules/game.js";

// этот файл точка входа в приложение
class App{

    settings = {
        // 1 сколько всего клеток будет в нашей сетке
        positionsCount: 30,
        // 2 размер одной ячейки
        positionsSize: 20
    }
    constructor() {
        // 3
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width',(this.settings.positionsCount * this.settings.positionsSize).toString());
        canvas.setAttribute('height', (this.settings.positionsCount * this.settings.positionsSize).toString());
        // 4 добавляем canvas на нашу страницу
        document.getElementById('container').appendChild(canvas)

        // 5 создаем переменную для работы с canvas, укажем что графика двухмерная 2d
          const context = canvas.getContext('2d');

        new Game(context, this.settings);

    }

}

(new App());