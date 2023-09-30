import axios from "axios";

export const Backendpoint = "https://qtify-backend-labs.crio.do";

export const fetchTopAlbums = async ()=>{
    try {
        const res=await axios.get(`${Backendpoint}/albums/top`)
        return res.data
    }catch(err){
        console.log("Error in Api",err);
    }
}


export const fetchNewAlbums = async ()=>{
    try {
        const res=await axios.get(`${Backendpoint}/albums/new`)
        return res.data
    }catch(err){
        console.log("Error in Api",err);
    }
}
export const fetchAllSongs = async ()=>{
    try {
        const res=await axios.get(`${Backendpoint}/songs`)
        return res.data
    }catch(err){
        console.log("Error in Api",err);
    }
}