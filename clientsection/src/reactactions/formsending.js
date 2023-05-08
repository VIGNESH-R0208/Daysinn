import axios from 'axios';
async function Posthotel(data){
    await axios.post('http://localhost:3002/posthotel',data)

}
export default Posthotel;