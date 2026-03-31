// id of the game being edited
let editingGameId = null;

// ======================
// SELECT DOM ELEMENTS
// ======================
const gameForm = document.getElementById('game-form');
const gamesList = document.getElementById('games-list');

// ======================
// FECTH GAMES (READ)
// ======================
const fetchGames = async () => {
  try {
    const response = await fetch('/games');
    const games = await response.json();

    // clear list before rendering
    gamesList.innerHTML = '';

    // render each game
    games.forEach(game => {
      const li = document.createElement('li');

      const text = document.createElement('span');

      text.textContent = 
        game.title + ' - ' + game.platform + 
        ' (' + game.hours_played + ' hrs)' + 
        (game.completed ? ' yes' : ' no');
      
      // ==============
      // EDIT BUTTON
      // ==============
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';

      editBtn.addEventListener('click', () => {
        // populate form fields with selected game
        document.getElementById('title').value = game.title;
        document.getElementById('platform').value = game.platform;
        document.getElementById('hours').value = game.hours_played;
        document.getElementById('completed').checked = game.completed;

        // store id
        editingGameId = game.id;

        // change button text
        document.getElementById("submit-btn").textContent = 'Update Game';

        console.log('Editing game id:', editingGameId);
      });

      // ==================
      // DELETE BUTTON
      // ==================
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';

      deleteBtn.addEventListener('click', async () => {
        try {
          await fetch(`/games/${game.id}`, {
            method: 'DELETE'
          });

          fetchGames();

        } catch (error) {
          console.error('Error deleting game:', error);
        }
      });

      li.appendChild(text);
      li.appendChild(deleteBtn);
      li.appendChild(editBtn);

      gamesList.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching games:', error);
  }
};

// =======================
// ADD GAME (CREATE)
// =======================
const addGame = async (e) => {
  // stops default behavior so js can handle form submission
  e.preventDefault();

  // collect form data
  const newGame = {
    title: document.getElementById('title').value,
    platform: document.getElementById('platform').value,
    hours_played: document.getElementById('hours').value,
    completed: document.getElementById('completed').checked,
    user_id: 1 // temporary
  };

  try {
    // =========================
    // CHECK: EDIT OR ADD
    // =========================
    if (editingGameId !== null) {
      // ==========================
      // UPDATE EXISTING GAME (PUT)
      // ==========================
      await fetch(`/games/${editingGameId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGame)
      });

      console.log(`Game ${editingGameId} updated`);

      // reset editing state
      editingGameId = null;

      // reset button text
      document.getElementById("submit-btn").textContent = 'Add Game';

      // ======================
      // CREATE NEW GAME (POST)
      // ======================
    } else {
      await fetch ('/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGame)
    });

    console.log('New game added');
    }

    // ================
    // REFRESH UI
    // ================
    fetchGames();

    // ================
    // RESET FORM
    // ================
    gameForm.reset();

  } catch (error) {
    console.log('Error savig game:', error);
  }
};

// ===================
// EVENT LISTENERS
// ===================
gameForm.addEventListener('submit', addGame);

// ===================
// INITIAL LOAD
// ===================
fetchGames();
