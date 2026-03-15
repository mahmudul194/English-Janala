const loadlessons = ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all").then(res => res.json()).then(json => displayLessons(json.data))
}

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = "";
    lessons.forEach((lesson) =>{
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
            <button class="btn btn-outline btn-primary"> <i class="fa-solid fa-book-open"></i> Leason - ${lesson.level_no}</button>
        
        `
        levelContainer.appendChild(btnDiv)
    })
}


loadlessons()