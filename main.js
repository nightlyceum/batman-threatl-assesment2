//Get the page ready to run the script
document.addEventListener('DOMContentLoaded', function() {

    // System status and time display (เวลา)

    const systemTimeElement = document.getElementById('systemTime');
    function updateSystemTime() {
        const now = new Date();
        systemTimeElement.textContent = now.toLocaleTimeString();
    }
    updateSystemTime();
    setInterval(updateSystemTime, 1000);

    // Sidebar -Menu Navigation
    const navItems = document.querySelectorAll('.sidebar .nav-item');
    const consoleSections = document.querySelectorAll('.content-area .console-section');

    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();

            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            consoleSections.forEach(section => {
                section.classList.remove('active');
                section.classList.add('hidden'); // Ensure hidden class is also managed 
            });

            const targetSectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.classList.add('active');
                if (targetSectionId === 'tip-submission'){
                    displaySubmittedTips();
                }
            }
        });
    });

    // Set default active section on load
    const initialActiveNavItem = document.querySelector('.sidebar .nav-item.active');
    if (initialActiveNavItem) {
        initialActiveNavItem.click();
    } else if (navItems.length > 0) {
        navItems[0].click();
    }

    // Criminal Database Logic - ฐานข้อมูลอาชญากร
    const criminalSearchInput = document.getElementById('criminalSearchInput');
    const searchButton = document.getElementById('searchButton');
    const criminalResultsDiv = document.getElementById('criminalResults');

    // Mock Criminal Data - แบบจำลองข้อมูลอาชญากร
    const criminals = [
        {
            id: 'CRIM001',
            name: 'The Joker',
            alias: 'The Clown Prince of Crime',
            status: 'Active',
            threatLevel: 'Extreme',
            lastLocation: 'Ace Chemical Processing Plant',
            description: 'Master criminal, nihilist, and psychopath. Known for his unpredictable and chaotic acts.',
            image: 'Clown.svg' //ตัวอย่างรูป
        },
        {
            id: 'CRIM002',
            name: 'Edward Nygma',
            alias: 'The Riddler',
            status: 'Active',
            threatLevel: 'High',
            lastLocation: 'Abandoned Gotham National Bank',
            description: 'Obsessed with riddles, puzzles, and games. Commits crimes to prove his intellectual superiority.',
            image: 'Riddle.svg' // ตัวอย่างรูป
        },
        {
            id: 'CRIM003',
            name: 'Oswald Cobblepot',
            alias: 'The Penguin',
            status: 'Active',
            threatLevel: 'High',
            lastLocation: 'The Iceberg Lounge',
            description: 'Feared crime lord operating out of his nightclub. Known for his collection of deadly umbrellas.',
            image: 'Penguin.svg' // ตัวอย่างรูป 
        },
        {
            id: 'CRIM004',
            name: 'Harleen Quinzel',
            alias: 'Harley Quinn',
            status: 'Active',
            threatLevel: 'High',
            lastLocation: 'Amusement Mile',
            description: "Psychiatrist turned psychopath, often in league with The Joker. Athletic and unpredictably violent.",
            image: 'Harley.svg' // ตัวอย่างรูป 
        },
        {
            id: 'CRIM005',
            name: 'Selina Kyle',
            alias: 'Catwoman',
            status: 'Active',
            threatLevel: 'Medium',
            lastLocation: 'East End',
            description: 'Skilled thief and burglar with a mysterious past. Often operates in a moral grey area.',
            image: 'Cat.svg' // ตัวอย่างรูป 
        },
        {
            id: 'CRIM006',
            name: 'Harvey Dent',
            alias: 'Two-Face',
            status: 'In Arkham',
            threatLevel: 'Extreme',
            lastLocation: 'Arkham Asylum',
            description: 'Former District Attorney, now a deranged criminal obsessed with duality and chance.',
            image: 'Twoface.svg' // ตัวอย่างรูป 
        },
        {
            id: 'CRIM007',
            name: 'Jonathan Crane',
            alias: 'Scarecrow',
            status: 'Active',
            threatLevel: 'High',
            lastLocation: 'Abandoned Asylum Wing',
            description: 'Psychologist who uses fear-inducing chemicals and toxins to terrorize Gotham.',
            image: 'Scarecrow.svg' // ตัวอย่างรูป 
        }
    ];

    // Function to display criminal data
    function displayCriminals(criminalList) {
        criminalResultsDiv.innerHTML = ''; // Clear previous results

        if (criminalList.length === 0) {
            criminalResultsDiv.innerHTML = '<p class="no-results-message">No matching criminals found.</p>';
            return;
        }

        criminalList.forEach(criminal => {
            const card = document.createElement('div');
            card.classList.add('criminal-card');
            card.innerHTML = `
                ${criminal.image ? `<img src="${criminal.image}" alt="${criminal.alias}" class="criminal-image">` : ''}
                <h3>${criminal.alias} (<span class="criminal-name">${criminal.name}</span>)</h3>
                <p><strong>ID:</strong> ${criminal.id}</p>
                <p><strong>Status:</strong> <span class="status">${criminal.status}</span></p>
                <p><strong>Threat Level:</strong> <span class="threat-level ${criminal.threatLevel.toLowerCase()}">${criminal.threatLevel}</span></p>
                <p><strong>Last Known:</strong> ${criminal.lastLocation}</p>
                <p><strong>Description:</strong> ${criminal.description}</p>
            `;
            criminalResultsDiv.appendChild(card);
        });
    }

    // Function to handle search
    function handleCriminalSearch() {
        const searchTerm = criminalSearchInput.value.toLowerCase();
        const filteredCriminals = criminals.filter(criminal => {
            return criminal.name.toLowerCase().includes(searchTerm) ||
                   criminal.alias.toLowerCase().includes(searchTerm) ||
                   criminal.id.toLowerCase().includes(searchTerm);
        });
        displayCriminals(filteredCriminals);
    }

    // Add event listeners for search
    searchButton.addEventListener('click', handleCriminalSearch);
    criminalSearchInput.addEventListener('keyup', handleCriminalSearch); // ค้นหาทันทีที่พิมพ์

    // Display all criminals when the page loads initially
    // displayCriminals(criminals); // ไม่ต้องแสดงทั้งหมดในตอนแรก ให้แสดงข้อความ initial message

    // Tip Submission Logic - ระบบป้อนเบาะแส
    // ดึง Element HTML ที่เกี่ยวข้อง
    const tipSubmissionForm = document.getElementById('tipSubmissionForm');
    const tipCategoryInput = document.getElementById('tipCategory');
    const tipSubjectInput = document.getElementById('tipSubject');
    const tipDescriptionInput = document.getElementById('tipDescription');
    const tipSubmissionMessage = document.getElementById('tipSubmissionMessage');
    const submittedTipsList = document.getElementById('submittedTipsList');
    
    //Array เก็บข้อมูลเบาะแส
    let submittedTips = [];

/**
     * @function displaySubmittedTips
     * @description แสดงเบาะแสที่ถูกส่งมาในส่วน 'Recent Intel Submissions'
     * ล้างข้อมูลเดิมก่อนแสดงข้อมูลใหม่
     */
    function displaySubmittedTips(){
        if (!submittedTipsList) return; // Guard clause
        
        submittedTipsList.innerHTML = '';
        if (submittedTips.length === 0){
            //ถ้าไม่มีเบาะแส ให้แสดงข้อความนี้
            submittedTipsList.innerHTML = '<p class="no-tips-message">No recent tips submitted.</p>';
            return; //Stop further execution
        }
        // Loop through submitted tips and display each one
        submittedTips.forEach(tip => {
            //Create new element for each tip
            const tipItem = document.createElement('div');
            //Add class 'tip-item' for styling
            tipItem.classList.add('tip-item');
            //Set inner HTML with tip details
            //Use template literals ('') for js variable to put them in string
            tipItem.innerHTML = `
                <p><strong>Category:</strong> ${tip.category}</p>
                ${tip.subject ? `<p><strong>Subject:</strong> ${tip.subject}</p>` : ''}
                <p><strong>Description:</strong> ${tip.description}</p>
                <span class="tip-timestamp">Submitted on ${tip.timestamp}</span>`;
                //Add tip item to the list (on display)
                submittedTipsList.appendChild(tipItem);
        });
    }

    /**
     * @function handleTipSubmission
     * @description Handle the submission or a new tip - จัดการเมื่อฟอร์มถูกส่ง
     * get Element values, create tip object, add to array, display updated list
     * @param {Event} event - The form submission event
     */
    if (tipSubmissionForm) {
        tipSubmissionForm.addEventListener('submit', function(event){
            //Prevent default form submission behavior
            event.preventDefault();
            //Get values from input fields -.value is getting the information from the input -.trim() is removing any extra spaces
            const category = tipCategoryInput.value;
            const subject = tipSubjectInput.value.trim();
            const description = tipDescriptionInput.value.trim();
            //Examine the values (cannot be empty)
            if(!category || !description){
                tipSubmissionMessage.textContent = 'Error: Category and Description are required fields.';
                tipSubmissionMessage.style.color = 'red';
                return; //Stop further execution
            }
            //Create new tip object from collected data
            const newTip = {
                category: category,
                subject: subject,
                description: description,
                timestamp: new Date().toLocaleDateString()//Note the current date and time
            };
            //Add new tip to the array
            submittedTips.unshift(newTip); //Add to the beginning of the array
            //Display submission message - แสดงข้อความยืนยันการส่ง
            tipSubmissionMessage.textContent = 'Intel Submitted Successfully!';
            tipSubmissionMessage.style.color = 'lightgreen';

            //Display updated list of submitted tips
            displaySubmittedTips();
            //Clear the form fields
            tipCategoryInput.value = ''; //Reset category dropdown
            tipSubjectInput.value = ''; //Clear subject input
            tipDescriptionInput.value = ''; //Clear description textarea
            //Clear the message after a few seconds
            setTimeout(() => {
                tipSubmissionMessage.textContent = '';
            }, 5000); // 5000 milliseconds = 5 seconds
        });
    }
});
    
    
