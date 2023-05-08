import axios from "axios";

async function newtask()
{
    await axios.get("http://localhost:3002/client/home");
}