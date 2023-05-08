import axios from 'axios';
async function Bookhotel(data){
    await axios.post('http://localhost:3002/bookhotel',data)

}
export default Bookhotel;