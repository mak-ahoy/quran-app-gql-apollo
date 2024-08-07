import axios from 'axios'


export const getSurahs = async () =>{
    try {
        const response = await axios.get('https://api.quran.com/api/v4/chapters') 
        

        return {success: true, message:"surahs retrived sucessfully", surahs: response.data.chapters }

    }
    catch(error) {
        return  {success: false, message:"An exception occurred", surahs: [] }
    }
}

export const getSurahVerses = async (_, {chapter}) =>{
    try {

        const response = await axios.get(`https://api.quran.com/api/v4/verses/by_chapter/${chapter}`, {
        params: {
            words: 'false',
            per_page: 286,
            fields: 'text_uthmani,chapter_id',
            translations: 131,
            page: 1
        }
        })  // works

    
    return ({success:true, message: "verses by surah retrived sucessfuly", verses: response.data.verses})


    }
    catch (error){
        return ({success:false, message: "An exception occured", verses: []})

    }
}

