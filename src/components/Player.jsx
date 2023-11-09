import React, {useState} from 'react';

const Player = ({initialName, symbol, isActive, onSaveName}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    const handleEditClick = () => {
        setIsEditing((prevVal)=>{ return !prevVal});
        if(isEditing){
            onSaveName(symbol, playerName)
        }
    };
    const handleChange = (event)=>{
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className='player-name'>{playerName}</span>;
    if(isEditing){
        editablePlayerName =
          <input
            type='text'
            value={playerName}
            onChange={handleChange}
          />
    }

    return(
      <li className={isActive? 'active' : undefined}>
           <span className='player'>
               {editablePlayerName}
              <span className='player-symbol'>{symbol}</span>
           </span>
          <button onClick={handleEditClick}>
              {isEditing ? 'Save' : 'Edit'}
          </button>
      </li>
    )
};

export default Player;
