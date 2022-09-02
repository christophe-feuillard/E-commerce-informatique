import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Profil() {

    const [user, setUser] = useState('');

    useEffect(() => {
        const fetcheData = async () => {
            const result = await axios(
                `http://localhost:8000/api/user/${id}`
            )
        }
        fetcheData();
    }, [])
  return (
    <div>

    </div>
  )
}
import Input from '../input/Input';

export default Profil