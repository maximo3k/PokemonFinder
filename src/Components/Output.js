import {React, useState } from 'react'

function Output(props) {

    var attacks = props.attacks;
    console.log(attacks);

    return (
            <div className={"card"}>
                <div className={"head-line"}>
                    <p>{props.name} ( No. {props.number} )</p>
                    <p>{props.hp} HP</p>
                </div>
                <img src={props.image} alt="" width="360px" />
                
                <div className={"details-pokemon"}>
                    {attacks.map((attack) =>
                    <div className={"attack-line"} key={attack.name}>
                        <p>{attack.name}</p>
                        <p>Damage: {attack.damage}</p>
                        <p>Type: {attack.type}</p>
                    </div>
                    )
                    }
                </div>
            </div>    
        
    )
}

export default Output
