import { React, useState } from 'react';
import axios from 'axios';


const Email = (props) => {

    const [emailAdress, setEmailAdress] = useState("");

    const options = {
      url: 'http://localhost:5000/email',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        receiverEmail: emailAdress,
        selectedPokemon: props.name,
        selectedPokemonType: props.type,
        selectedPokemonImage: props.image,
        selectedPokemonNumber: props.number,
      }
    };

    const handleSubmit = (e) =>  {
        e.preventDefault();
        axios(options)
        .then(response => {
          console.log(response);
        }, (error) => {
          console.log(error)
        });
    }

    return (
        <div className='email-window'>
            <form onSubmit={handleSubmit}>
                <input id="email" type="email" placeholder="sample@email.com" value={emailAdress} onChange={(e) => setEmailAdress(e.target.value)}/>
                <button type="submit">Send Email</button>
            </form>
        </div>
    )
}

export default Email
