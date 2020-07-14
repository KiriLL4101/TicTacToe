import React from "react";

import "./ModalStartGame.scss";

export default function StartGame({ start }) {
    const [state, setState] = React.useState('')
    function handleChange(e){
        if(e.target.value){
            setState(e.target.value);
        }
    }
    function handleSubmit(e){
        if(state && state > 3){
            start(state);
        }else{
            alert('Размер поля не может быть пустым и должен быть больше 3х')
            setState('')
        }
        e.preventDefault();
    }
  return (
    <div className={`modal`}>
      <div className={`wrapper`}>
        <div className="modal__content">
        <p className='modal__title'>Игра крестики-нолики</p>
          <form action="#" onSubmit={handleSubmit}>
            <div className='players'>
              <p>Выберете режим игры:</p>
              <input type="radio" id="c1" name="one" />
              <label for="c1">
                <span></span>Игра с другом
              </label>
              <input type="radio" id="c2" name="one" />
              <label for="c2">
                <span></span>Игра с ботом
              </label>
            </div>
            <div className="size">
              <p>Введите размер поля:</p>
              <input type="text" value={state} className="board-size" onChange={handleChange}/>
              <span>на</span>
              <input type="text" value={state} className="board-size" disabled/>
            </div>
            <button className="modal__btn">Начать игру</button>
          </form>
        </div>
        <div className="about-game"></div>
      </div>
    </div>
  );
}
