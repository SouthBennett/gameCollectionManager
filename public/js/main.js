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
    await fetch ('/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGame)
    });

    // refresh UI / triggers GET / games and pulls updated data
    fetchGames();

    // reset form
    gameForm.reset();

  } catch(error) {
    console.error('Error adding game:', error);
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
