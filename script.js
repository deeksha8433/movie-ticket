// ===== Movie Data =====
const movies = [
    {
        id: 1,
        title: "Dune: Part Two",
        genre: "action",
        duration: "2h 46m",
        rating: "8.8/10",
        price: 250,
        poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"
    },
    {
        id: 2,
        title: "Oppenheimer",
        genre: "drama",
        duration: "3h 0m",
        rating: "9.0/10",
        price: 300,
        poster: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg"
    },
    {
        id: 3,
        title: "The Super Mario Bros",
        genre: "comedy",
        duration: "1h 32m",
        rating: "7.1/10",
        price: 200,
        poster: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg"
    },
    {
        id: 4,
        title: "Ghostbusters",
        genre: "comedy",
        duration: "1h 55m",
        rating: "7.8/10",
        price: 220,
        poster: "https://image.tmdb.org/t/p/w500/wJmWliwXIgZOCCVOcGRBhce7xPS.jpg"
    },
    {
        id: 5,
        title: "Poor Things",
        genre: "drama",
        duration: "2h 21m",
        rating: "8.5/10",
        price: 280,
        poster: "https://image.tmdb.org/t/p/w500/if8QiqCI7WAGImKcJCfzp6VTyKA.jpg"
    },
    {
        id: 6,
        title: "Aquaman 2",
        genre: "action",
        duration: "2h 3m",
        rating: "6.5/10",
        price: 260,
        poster: "https://image.tmdb.org/t/p/w500/7lTnXOy0iNtBAdRP3TZvaKJ77F6.jpg"
    },
    {
        id: 7,
        title: "The Conjuring 4",
        genre: "horror",
        duration: "1h 42m",
        rating: "7.2/10",
        price: 280,
        poster: "https://image.tmdb.org/t/p/w500/z2UtGA1WggESspi6KOXeo66lvLx.jpg"
    },
    {
        id: 8,
        title: "Nightmare Factory",
        genre: "horror",
        duration: "1h 58m",
        rating: "6.9/10",
        price: 260,
        poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
    },
    {
        id: 9,
        title: "Fast & Furious 11",
        genre: "action",
        duration: "2h 15m",
        rating: "7.9/10",
        price: 270,
        poster: "https://image.tmdb.org/t/p/w500/A3ZbZsmsvNGdprRi2lKgGEeVLEH.jpg"
    },
    {
        id: 10,
        title: "The Pursuit of Happiness",
        genre: "drama",
        duration: "2h 17m",
        rating: "8.3/10",
        price: 290,
        poster: "https://image.tmdb.org/t/p/w500/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg"
    },
    {
        id: 11,
        title: "Barbie Dream House",
        genre: "comedy",
        duration: "1h 54m",
        rating: "8.1/10",
        price: 240,
        poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg"
    },
    {
        id: 12,
        title: "Insidious 6",
        genre: "horror",
        duration: "2h 11m",
        rating: "7.5/10",
        price: 300,
        poster: "https://image.tmdb.org/t/p/w500/z2UtGA1WggESspi6KOXeo66lvLx.jpg"
    },
    {
        id: 13,
        title: "DDLJ",
        genre: "drama",
        duration: "3h 6m",
        rating: "8.9/10",
        price: 320,
        poster: "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg"
    },
    {
        id: 14,
        title: "Mujhse Dosti Karoge",
        genre: "comedy",
        duration: "2h 16m",
        rating: "8.2/10",
        price: 280,
        poster: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg"
    },
    {
        id: 15,
        title: "3 Idiots",
        genre: "comedy",
        duration: "2h 50m",
        rating: "8.4/10",
        price: 310,
        poster: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg"
    }
];

// ===== State Management =====
let selectedMovie = null;
let selectedDate = null;
let selectedTime = null;
let selectedSeats = [];
let occupiedSeats = new Set();

// ===== DOM Elements =====
const moviesGrid = document.getElementById('moviesGrid');
const seatsContainer = document.getElementById('seatsContainer');
const dateInput = document.getElementById('showDate');
const timeSlots = document.querySelectorAll('.time-slot');
const filterTabs = document.querySelectorAll('.filter-tab');

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    initDatePicker();
    renderMovies(movies);
    generateSeats();
    setupEventListeners();
    checkAuthState();
});

// ===== Authentication State Management =====
function checkAuthState() {
    const currentUser = JSON.parse(localStorage.getItem('cinemaHubCurrentUser') || 'null');
    const userActions = document.querySelector('.user-actions');

    if (currentUser) {
        // User is logged in
        userActions.innerHTML = `
            <span class="user-greeting">Welcome, ${currentUser.name.split(' ')[0]}!</span>
            <button class="btn btn-outline" onclick="logout()">Logout</button>
        `;
    } else {
        // User is not logged in
        userActions.innerHTML = `
            <button class="btn btn-outline" onclick="window.location.href='login.html'">Login</button>
            <button class="btn btn-primary" onclick="window.location.href='signup.html'">Sign Up</button>
        `;
    }
}

function logout() {
    localStorage.removeItem('cinemaHubCurrentUser');
    localStorage.removeItem('cinemaHubRemember');
    showToast('Logged out successfully');
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// ===== Set Minimum Date =====
function initDatePicker() {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    dateInput.min = dateStr;
    dateInput.value = dateStr;
}

// ===== Render Movies =====
function renderMovies(moviesToRender) {
    moviesGrid.innerHTML = '';
    
    if (moviesToRender.length === 0) {
        moviesGrid.innerHTML = '<p class="no-results">No movies found</p>';
        return;
    }
    
    moviesToRender.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.dataset.genre = movie.genre;
        
        const img = document.createElement('img');
        img.src = movie.poster;
        img.alt = movie.title;
        img.className = 'poster';
        img.onerror = function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'poster-placeholder';
            placeholder.innerHTML = '<i class="fas fa-film"></i>';
            this.parentElement.insertBefore(placeholder, this);
        };
        
        card.appendChild(img);
        
        const priceTag = document.createElement('span');
        priceTag.className = 'price-tag';
        priceTag.textContent = `₹${movie.price}`;
        card.appendChild(priceTag);
        
        const movieInfo = document.createElement('div');
        movieInfo.className = 'movie-info';
        movieInfo.innerHTML = `
            <h3>${movie.title}</h3>
            <div class="meta">
                <span><i class="fas fa-clock"></i> ${movie.duration}</span>
                <span class="rating"><i class="fas fa-star"></i> ${movie.rating}</span>
            </div>
        `;
        card.appendChild(movieInfo);
        
        const bookBtn = document.createElement('button');
        bookBtn.className = 'book-btn';
        bookBtn.dataset.id = movie.id;
        bookBtn.innerHTML = '<i class="fas fa-ticket-alt"></i> Book';
        card.appendChild(bookBtn);
        
        bookBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectMovie(movie.id);
        });
        
        card.addEventListener('click', () => selectMovie(movie.id));
        moviesGrid.appendChild(card);
    });
}

// ===== Select Movie =====
function selectMovie(movieId) {
    selectedMovie = movies.find(m => m.id === movieId);
    
    // Update UI
    document.getElementById('selectedMovieTitle').textContent = selectedMovie.title;
    document.getElementById('selectedMovieGenre').textContent = `Genre: ${selectedMovie.genre.charAt(0).toUpperCase() + selectedMovie.genre.slice(1)}`;
    document.getElementById('selectedMovieDuration').textContent = `Duration: ${selectedMovie.duration}`;
    document.getElementById('selectedMovieRating').textContent = `Rating: ${selectedMovie.rating}`;
    
    const posterEl = document.getElementById('selectedMoviePoster');
    posterEl.innerHTML = '';
    
    const posterImg = document.createElement('img');
    posterImg.src = selectedMovie.poster;
    posterImg.alt = selectedMovie.title;
    posterImg.onerror = function() {
        this.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder-poster';
        placeholder.innerHTML = `<i class="fas fa-film"></i><span>${selectedMovie.title}</span>`;
        posterEl.innerHTML = '';
        posterEl.appendChild(placeholder);
    };
    posterEl.appendChild(posterImg);
    
    // Enable time slots
    timeSlots.forEach(slot => slot.disabled = false);
    
    // Reset selections
    selectedTime = null;
    timeSlots.forEach(slot => slot.classList.remove('selected'));
    
    // Update summary
    updateSummary();
    
    // Scroll to booking section
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    
    // Generate new seats for fresh movie
    generateSeats();
}

// ===== Filter Movies =====
filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const filter = tab.dataset.filter;
        if (filter === 'all') {
            renderMovies(movies);
        } else {
            const filtered = movies.filter(m => m.genre === filter);
            renderMovies(filtered);
        }
    });
});

// ===== Date Selection =====
dateInput.addEventListener('change', (e) => {
    selectedDate = e.target.value;
    generateSeats(); // Regenerate seats for new date
    updateSummary();
});

// ===== Time Slot Selection =====
timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
        if (slot.disabled) return;
        
        timeSlots.forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
        selectedTime = slot.dataset.time;
        
        // Generate new seats for new time slot
        generateSeats();
        updateSummary();
    });
});

// ===== Generate Seats =====
function generateSeats() {
    seatsContainer.innerHTML = '';
    selectedSeats = [];
    occupiedSeats.clear();
    
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seatsPerRow = 12;
    
    // Generate random occupied seats
    const occupiedCount = Math.floor(Math.random() * 15) + 10;
    while (occupiedSeats.size < occupiedCount) {
        const row = rows[Math.floor(Math.random() * rows.length)];
        const seat = Math.floor(Math.random() * seatsPerRow) + 1;
        occupiedSeats.add(`${row}${seat}`);
    }
    
    rows.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'seat-row';
        
        // Row label
        const label = document.createElement('span');
        label.className = 'row-label';
        label.textContent = row;
        rowDiv.appendChild(label);
        
        // Seats
        for (let i = 1; i <= seatsPerRow; i++) {
            const seatDiv = document.createElement('div');
            const seatId = `${row}${i}`;
            
            // Add aisle after seat 3 and 8
            if (i === 4 || i === 9) {
                const aisle = document.createElement('div');
                aisle.className = 'seat aisle';
                rowDiv.appendChild(aisle);
            }
            
            seatDiv.className = 'seat';
            seatDiv.dataset.seat = seatId;
            seatDiv.textContent = i;
            
            // VIP seats (middle rows)
            const isVIP = (rowIndex === 2 || rowIndex === 3) && (i >= 4 && i <= 8);
            if (isVIP) seatDiv.classList.add('vip');
            
            // Check if occupied
            if (occupiedSeats.has(seatId)) {
                seatDiv.classList.add('occupied');
            } else {
                seatDiv.classList.add('available');
                seatDiv.addEventListener('click', () => toggleSeat(seatDiv, seatId, isVIP));
            }
            
            rowDiv.appendChild(seatDiv);
        }
        
        seatsContainer.appendChild(rowDiv);
    });
    
    updateSummary();
}

// ===== Toggle Seat Selection =====
function toggleSeat(seatEl, seatId, isVIP) {
    const index = selectedSeats.indexOf(seatId);
    
    if (index > -1) {
        // Deselect
        selectedSeats.splice(index, 1);
        seatEl.classList.remove('selected');
        seatEl.classList.add('available');
    } else {
        // Select (max 6 seats)
        if (selectedSeats.length >= 6) {
            showToast('Maximum 6 seats allowed per booking');
            return;
        }
        selectedSeats.push(seatId);
        seatEl.classList.remove('available');
        seatEl.classList.add('selected');
    }
    
    updateSummary();
}

// ===== Update Summary =====
function updateSummary() {
    document.getElementById('summaryMovie').textContent = selectedMovie ? selectedMovie.title : '-';
    document.getElementById('summaryDate').textContent = selectedDate || '-';
    document.getElementById('summaryTime').textContent = selectedTime || '-';
    document.getElementById('summarySeats').textContent = selectedSeats.length > 0 ? selectedSeats.join(', ') : '-';
    
    // Calculate total
    let total = 0;
    selectedSeats.forEach(seatId => {
        const seatEl = document.querySelector(`[data-seat="${seatId}"]`);
        if (seatEl && seatEl.classList.contains('vip')) {
            total += 350; // VIP price in rupees
        } else {
            total += 250; // Regular price in rupees
        }
    });
    
    document.getElementById('summaryTotal').textContent = `₹${total.toFixed(2)}`;
    
    // Enable/disable book button
    const bookBtn = document.getElementById('bookTicketsBtn');
    bookBtn.disabled = !(selectedMovie && selectedDate && selectedTime && selectedSeats.length > 0);
}

// ===== Book Tickets =====
document.getElementById('bookTicketsBtn').addEventListener('click', () => {
    if (!selectedMovie || !selectedDate || !selectedTime || selectedSeats.length === 0) {
        return;
    }
    
    // Calculate total
    let total = 0;
    selectedSeats.forEach(seatId => {
        const seatEl = document.querySelector(`[data-seat="${seatId}"]`);
        total += (seatEl && seatEl.classList.contains('vip')) ? 350 : 250;
    });
    
    // Show success modal
    const bookingDetails = document.getElementById('bookingDetails');
    bookingDetails.innerHTML = `
        <p><strong>Movie:</strong> ${selectedMovie.title}</p>
        <p><strong>Date:</strong> ${selectedDate}</p>
        <p><strong>Time:</strong> ${selectedTime}</p>
        <p><strong>Seats:</strong> ${selectedSeats.join(', ')} (${selectedSeats.length})</p>
        <p><strong>Total:</strong> ₹${total.toFixed(2)}</p>
    `;
    
    document.getElementById('successModal').classList.add('show');
    
    // Mark seats as occupied
    selectedSeats.forEach(seatId => {
        const seatEl = document.querySelector(`[data-seat="${seatId}"]`);
        if (seatEl) {
            seatEl.classList.remove('selected');
            seatEl.classList.add('occupied');
        }
    });
    
    // Reset selections
    selectedSeats = [];
    updateSummary();
});

// ===== Close Modal =====
function closeModal() {
    document.getElementById('successModal').classList.remove('show');
}

// ===== Show Toast Notification =====
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--dark);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        border-left: 4px solid var(--primary);
        z-index: 2000;
        animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ===== Setup Event Listeners =====
function setupEventListeners() {
    // Close modal on background click
    document.getElementById('successModal').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });
    
    // Hero book now button
    document.querySelector('.hero-content .btn-accent').addEventListener('click', () => {
        document.getElementById('movies').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Newsletter form
    document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input').value;
        if (email) {
            showToast('Thank you for subscribing!');
            e.target.reset();
        }
    });
    
    // Add toast animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from { transform: translateX(-50%) translateY(100px); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @keyframes slideDown {
            from { transform: translateX(-50%) translateY(0); opacity: 1; }
            to { transform: translateX(-50%) translateY(100px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
