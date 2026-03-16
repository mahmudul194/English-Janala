const createElements = (arr) =>{
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`)
    return(htmlElements.join(' '))
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN";
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) =>{
    if(status === true){
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('word-container').classList.add('hidden')
    }
    else{
        document.getElementById('word-container').classList.remove('hidden')
        document.getElementById('spinner').classList.add('hidden')
    }
}

const loadlessons = ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => displayLessons(json.data))
}

const removeActive = () =>{
    const lessonButtons = document.querySelectorAll('.lesson-btn')
    lessonButtons.forEach((btn) => btn.classList.remove('active'))
}

const loadLevelword = (id) =>{
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    
    fetch(url)
    .then(res => res.json())
    .then(json => {

        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add('active')
        displayLevelWord(json.data)
    })
    
}

const loadWordDetail = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const details = await res.json();
    displayWordDetails(details.data)
}

const displayWordDetails = (word) =>{
    const detailsbox = document.getElementById('details-container')
    detailsbox.innerHTML = `
        <div class="">
          <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})</h2>
        </div>
        <div class="">
          <h2 class="text-2xl font-bold">Meaning</h2>
          <p class="font-bangla">${word.meaning}</p>
        </div>
        <div class="">
          <h2 class="text-2xl font-bold">Example</h2>
          <p class="font-bangla"> ${word.sentence} </p>
        </div>
        <div class="">
          <h2 class="text-2xl font-bold">Synonym</h2>
           <div class="">${createElements(word.synonyms)}</div>
        </div>
    
    
    `
    document.getElementById('word_modal').showModal();
}


const displayLevelWord = (words)=>{
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = '';

    if(words.length === 0){
        wordContainer.innerHTML = `
             <div class="col-span-full flex flex-col items-center justify-center text-center space-y-3" >
            <img src="./assets/alert-error.png" h-[100px] alt="">
            <p class="font-bangla text-xs text-gray-400" >এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla text-4xl" >নেক্সট Lesson এ যান</h2>
        </div>
        `
        manageSpinner(false)
        return;
    }

    words.forEach(word => {
        const card = document.createElement('div')
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-20 px-5 space-y-4">
            <h2 class='font-bold text-2xl'>${word.word ? word.word : 'শব্দটি খুঁজে পাওয়া যায়নি'}</h2>
            <p class="text-xl" >Meaning/Pronunciation</p>
            <div class="text-xl font-bangla" >${word.meaning ? word.meaning : 'অর্থ খুঁজে পাওয়া যায়নি'} / ${word.pronunciation ? word.pronunciation : 'উচ্চারণ খুঁজে পাওয়া যায়নি'}</div>

            <div class="flex justify-between items-center pt-10 px-20">
            <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
            </div>
        `
        wordContainer.appendChild(card)
    })
    manageSpinner(false);
}


const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = "";
    lessons.forEach((lesson) =>{
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelword(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn "> <i class="fa-solid fa-book-open"></i> Leason - ${lesson.level_no}</button>
        
        `

        levelContainer.appendChild(btnDiv)

    });
}


loadlessons();

const searchBtn = document.getElementById('btn-search')

searchBtn.addEventListener('click',()=>{
    removeActive();
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();
    
    fetch('https://openapi.programming-hero.com/api/words/all')
    .then(res => res.json())
    .then(json => {
        const allwords = json.data;
        const filterWords = allwords.filter(word => word.word.toLowerCase().includes(searchValue))

        displayLevelWord(filterWords)
    })
})