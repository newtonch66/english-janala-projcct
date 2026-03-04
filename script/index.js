const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data));
};

const removeActive = () => {
    const lessonButton = document.querySelectorAll(".lesson-btn")
    // console.log(lessonButton);
    lessonButton.forEach((btn) => btn.classList.remove("active"));

}



const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            // console.log(clickBtn);
            clickBtn.classList.add("active");
            displayLevelWord(data.data)
        });
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

const displayWordDetails = (word) => {
    console.log(word);
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
      <div>
            <h1 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h1>
        </div>
        <div>
            <h1 class="font-bold">Meaning</h1>
            <p>${word.meaning}</p>
        </div>
        <div>
            <h1 class="font-bold">example</h1>
            <p>${word.sentence}</p>
        </div>
        <div>
            <h1 class="font-bold">synonym</h1>
            <span class="btn">sny1</span>
            <span class="btn">sny2</span>
            <span class="btn">sny3</span>
        </div>

     `;
    document.getElementById("my_modal_5").showModal();

}






const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container")
    // console.log(wordContainer)
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class=" text-center col-span-full space-y-5 py-8">
         <img class ="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-xl font-medium font-bangla text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="font-bangla text-3xl font-bold">নেক্সট Lesson এ যান।</h1>
       </div>
        `;
        return;
    }

    words.forEach(word => {
        console.log(word);
        const card = document.createElement("div")
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-md text-center py-10 px-5 space-y-4">
         <h1 class="font-bold text-3xl">${word.word ? word.word : "No Result"}</h1>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="font-bangla font-semibold text-2xl">"${word.meaning ? word.meaning : "No Result"} / ${word.pronunciation ? word.pronunciation : "No Result"}"</div>
        <div class="flex justify-between items-center">
            <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
       </div>
        `;

        wordContainer.append(card);
    })

}

const displayLesson = (lessons) => {
    console.log(lessons);
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    for (let lesson of lessons) {
        console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                               <button id ="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                               <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
                               </button>
        `;

        levelContainer.append(btnDiv);
    }

}
loadLessons();