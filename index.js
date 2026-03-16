const loadlessons = ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all").then(res => res.json()).then(json => displayLessons(json.data))
}

const loadLevelword = (id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    
    fetch(url).then(res => res.json()).then(json => displayLevelWord(json.data))
    
}

const displayLevelWord = (words)=>{
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = '';

    if(words.length === 0){
        wordContainer.innerHTML = `
             <div class="col-span-full flex flex-col items-center justify-center text-center space-y-3">
            <img src="./assets/alert-error.png" class="h-[100px]" alt="">
            <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold">নেক্সট Lesson এ যান</h2>
        </div>
        `
        return;
    }
    words.forEach(word => {
        const card = document.createElement('div')
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-20 px-5 space-y-4">
            <h2 class='font-bold text-2xl'>${word.word}</h2>
            <p class="text-xl" >Meaning/Pronunciation</p>
            <div class="text-xl font-bangla" >${word.meaning} / ${word.pronunciation}</div>

            <div class="flex justify-between items-center pt-10 px-20">
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
            </div>
            
        `
        wordContainer.appendChild(card)
    })
}


const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = "";
    lessons.forEach((lesson) =>{
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
            <button onclick="loadLevelword(${lesson.level_no})" class="btn btn-outline btn-primary"> <i class="fa-solid fa-book-open"></i> Leason - ${lesson.level_no}</button>
        
        `
        levelContainer.appendChild(btnDiv)
    })
}


loadlessons()