import axios from "axios";

async function Hotelcollection()
{
    await axios.get('http://localhost:3002/client/home')
}
export default Hotelcollection;